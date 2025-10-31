// Real-time routes for Socket.io events (backend)
export const handleRealtimeEvents = (io, socket) => {
  // Join user to a room
  socket.on("join-room", (data) => {
    socket.join(`user-${data.userId}`)
    console.log(`User ${data.userId} joined their room`)
  })

  // Send message
  socket.on("send-message", (data) => {
    io.to(`user-${data.recipientId}`).emit("receive-message", {
      ...data,
      isOwn: false,
    })
  })

  // Appointment status change
  socket.on("appointment-status-change", (data) => {
    io.to(`user-${data.patientId}`).emit("appointment-changed", {
      appointmentId: data.appointmentId,
      status: data.status,
      timestamp: new Date(),
    })

    io.emit("dashboard-update", {
      appointmentsToday: data.appointmentsToday || 0,
      patientsWaiting: data.patientsWaiting || 0,
      completedToday: data.completedToday || 0,
    })
  })

  // Prescription issued
  socket.on("prescription-issued", (data) => {
    io.to(`user-${data.patientId}`).emit("prescription-issued", {
      prescriptionId: data.prescriptionId,
      doctorName: data.doctorName,
      timestamp: new Date(),
    })
  })

  // Lab result ready
  socket.on("lab-result-ready", (data) => {
    io.to(`user-${data.patientId}`).emit("lab-result-ready", {
      labRequestId: data.labRequestId,
      timestamp: new Date(),
    })
  })

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`)
  })
}
