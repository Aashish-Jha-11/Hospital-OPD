// Auth middleware - token verify karne ke liye
import { verifyToken } from "../lib/auth.js"

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Access denied" })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return res.status(403).json({ error: "Invalid token" })
  }

  req.user = decoded
  next()
}

// Role check middleware
export const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" })
    }
    next()
  }
}

export const checkRole = roleMiddleware
