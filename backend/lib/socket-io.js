// Socket.io client initialization
import { io } from "socket.io-client"

let socket = null

export const initializeSocket = () => {
  if (socket) return socket

  socket = io("http://localhost:3001", {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  })

  socket.on("connect", () => {
    console.log("Connected to server:", socket.id)
  })

  socket.on("disconnect", () => {
    console.log("Disconnected from server")
  })

  return socket
}

export const getSocket = () => {
  return socket || initializeSocket()
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
