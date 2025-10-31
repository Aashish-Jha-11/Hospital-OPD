// Slot management routes - create, update, delete doctor time slots
import express from "express"
import prisma from "../lib/db.js"
import { authMiddleware, roleMiddleware } from "../middleware/auth.js"

const router = express.Router()

router.use(authMiddleware)

// Create slots (doctor only)
router.post("/", roleMiddleware(["DOCTOR"]), async (req, res) => {
  try {
    const { doctorId, date, startTime, endTime } = req.body

    const slot = await prisma.slot.create({
      data: {
        doctorId,
        date: new Date(date),
        startTime,
        endTime,
        isAvailable: true,
      },
    })

    res.status(201).json(slot)
  } catch (error) {
    res.status(500).json({ error: "Failed to create slot" })
  }
})

// Get available slots for a doctor
router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const slots = await prisma.slot.findMany({
      where: {
        doctorId: Number.parseInt(req.params.doctorId),
        isAvailable: true,
        date: {
          gte: new Date(),
        },
      },
      orderBy: { date: "asc" },
    })

    res.json(slots)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch slots" })
  }
})

// Delete slot
router.delete("/:id", roleMiddleware(["DOCTOR", "ADMIN"]), async (req, res) => {
  try {
    const slot = await prisma.slot.delete({
      where: { id: Number.parseInt(req.params.id) },
    })

    res.json(slot)
  } catch (error) {
    res.status(500).json({ error: "Failed to delete slot" })
  }
})

export default router
