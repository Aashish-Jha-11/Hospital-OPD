// Prescription routes - writing, history, PDF generation
import express from "express"
import prisma from "../lib/db.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

router.use(authMiddleware)

// Create prescription
router.post("/", async (req, res) => {
  try {
    const { patientId, doctorId, appointmentId, medications, instructions } = req.body

    const prescription = await prisma.prescription.create({
      data: {
        patientId,
        doctorId,
        appointmentId,
        medications,
        instructions,
      },
      include: { patient: true, doctor: true },
    })

    res.status(201).json(prescription)
  } catch (error) {
    console.error("Prescription creation error:", error)
    res.status(500).json({ error: "Failed to create prescription" })
  }
})

// Get prescriptions
router.get("/", async (req, res) => {
  try {
    const { patientId, doctorId } = req.query

    const prescriptions = await prisma.prescription.findMany({
      where: {
        ...(patientId && { patientId: Number.parseInt(patientId) }),
        ...(doctorId && { doctorId: Number.parseInt(doctorId) }),
      },
      include: { patient: true, doctor: true },
    })

    res.json(prescriptions)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prescriptions" })
  }
})

// Get prescription by ID
router.get("/:id", async (req, res) => {
  try {
    const prescription = await prisma.prescription.findUnique({
      where: { id: Number.parseInt(req.params.id) },
      include: { patient: true, doctor: true },
    })

    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" })
    }

    res.json(prescription)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prescription" })
  }
})

export default router
