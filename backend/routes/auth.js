// Auth routes - login, signup, password reset
import express from "express"
import bcrypt from "bcryptjs"
import prisma from "../lib/db.js"
import { generateToken } from "../lib/auth.js"

const router = express.Router()

// Signup - naya user banao
router.post("/signup", async (req, res) => {
  try {
    const { email, password, role, name, phone, dateOfBirth } = req.body

    // Check karo user pehle se hai ya nahi
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    // Password hash karo
    const hashedPassword = await bcrypt.hash(password, 10)

    // User create karo
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    })

    // Agar patient hai to profile bhi banao
    if (role === "PATIENT") {
      await prisma.patient.create({
        data: {
          userId: user.id,
          name,
          phone,
          dateOfBirth: new Date(dateOfBirth),
          emergencyContact: phone,
        },
      })
    } else if (role === "DOCTOR") {
      await prisma.doctor.create({
        data: {
          userId: user.id,
          name,
          specialization: "",
          qualification: "",
          experience: 0,
          consultationFee: 0,
        },
      })
    }

    const token = generateToken(user.id, user.role)
    res.status(201).json({ user: { id: user.id, email, role }, token })
  } catch (error) {
    console.error("Signup error:", error)
    res.status(500).json({ error: "Signup failed" })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = generateToken(user.id, user.role)
    res.json({ user: { id: user.id, email, role: user.role }, token })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Login failed" })
  }
})

router.post("/password-reset", async (req, res) => {
  try {
    const { email, newPassword } = req.body

    // Find user
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    res.json({ message: "Password updated successfully" })
  } catch (error) {
    console.error("Password reset error:", error)
    res.status(500).json({ error: "Password reset failed" })
  }
})

export default router
