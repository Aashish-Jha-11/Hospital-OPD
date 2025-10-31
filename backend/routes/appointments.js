// Appointment routes - booking, status updates, calendar
import express from "express"
import prisma from "../lib/db.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

router.use(authMiddleware)

// Create appointment
router.post("/", async (req, res) => {
  try {
    const { patientId, doctorId, slotId, symptoms } = req.body

    // Check if slot is available
    const slot = await prisma.slot.findUnique({ where: { id: slotId } })
    if (!slot || !slot.isAvailable) {
      return res.status(400).json({ error: "Slot not available" })
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        slotId,
        symptoms,
        status: "SCHEDULED",
      },
      include: { doctor: true, slot: true, patient: true },
    })

    // Mark slot as unavailable
    await prisma.slot.update({
      where: { id: slotId },
      data: { isAvailable: false },
    })

    res.status(201).json(appointment)
  } catch (error) {
    console.error("Appointment creation error:", error)
    res.status(500).json({ error: "Failed to create appointment" })
  }
})

// Get appointments
router.get("/", async (req, res) => {
  try {
    const { patientId, doctorId } = req.query

    const appointments = await prisma.appointment.findMany({
      where: {
        ...(patientId && { patientId: Number.parseInt(patientId) }),
        ...(doctorId && { doctorId: Number.parseInt(doctorId) }),
      },
      include: { doctor: true, slot: true, patient: true },
    })

    res.json(appointments)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" })
  }
})

// Update appointment status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body

    const appointment = await prisma.appointment.update({
      where: { id: Number.parseInt(req.params.id) },
      data: { status },
      include: { doctor: true, slot: true, patient: true },
    })

    res.json(appointment)
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment" })
  }
})

// Cancel appointment
router.put("/:id/cancel", async (req, res) => {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: Number.parseInt(req.params.id) },
      data: { status: "CANCELLED" },
    })

    // Make slot available again
    await prisma.slot.update({
      where: { id: appointment.slotId },
      data: { isAvailable: true },
    })

    res.json(appointment)
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel appointment" })
  }
})

export default router
