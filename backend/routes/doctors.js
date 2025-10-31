// Doctor routes - profiles, slots, prescriptions
import express from "express"
import prisma from "../lib/db.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

// Get all doctors with filters
router.get("/", async (req, res) => {
  try {
    const { specialization } = req.query

    const doctors = await prisma.doctor.findMany({
      where: specialization ? { specialization } : {},
      include: { slots: true },
    })

    res.json(doctors)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctors" })
  }
})

// Get doctor profile
router.get("/:id", async (req, res) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: Number.parseInt(req.params.id) },
      include: { slots: true },
    })

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" })
    }

    res.json(doctor)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctor" })
  }
})

// Update doctor profile (doctor only)
router.use(authMiddleware)

router.put("/:id", async (req, res) => {
  try {
    const { name, specialization, qualification, experience, consultationFee, profilePhoto } = req.body

    const doctor = await prisma.doctor.update({
      where: { id: Number.parseInt(req.params.id) },
      data: {
        name,
        specialization,
        qualification,
        experience,
        consultationFee,
        profilePhoto,
      },
    })

    res.json(doctor)
  } catch (error) {
    res.status(500).json({ error: "Failed to update doctor" })
  }
})

// Get doctor schedule
router.get("/:id/schedule", async (req, res) => {
  try {
    const slots = await prisma.slot.findMany({
      where: { doctorId: Number.parseInt(req.params.id) },
      orderBy: { date: "asc" },
    })

    res.json(slots)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch schedule" })
  }
})

export default router
