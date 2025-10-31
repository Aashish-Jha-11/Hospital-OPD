// Patient routes - profile, medical history, appointments
import express from "express"
import prisma from "../lib/db.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

router.use(authMiddleware)

// Get patient profile
router.get("/:id", async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { userId: Number.parseInt(req.params.id) },
      include: { user: { select: { email: true } } },
    })

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" })
    }

    res.json(patient)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patient" })
  }
})

// Update patient profile
router.put("/:id", async (req, res) => {
  try {
    const { name, phone, medicalHistory, emergencyContact, profilePhoto } = req.body

    const patient = await prisma.patient.update({
      where: { userId: Number.parseInt(req.params.id) },
      data: {
        name,
        phone,
        medicalHistory,
        emergencyContact,
        profilePhoto,
      },
    })

    res.json(patient)
  } catch (error) {
    res.status(500).json({ error: "Failed to update patient" })
  }
})

// Get patient appointments
router.get("/:id/appointments", async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { patient: { userId: Number.parseInt(req.params.id) } },
      include: { doctor: true, slot: true },
    })

    res.json(appointments)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" })
  }
})

export default router
