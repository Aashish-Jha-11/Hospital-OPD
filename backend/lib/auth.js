// JWT token banane aur verify karne ke liye
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const JWT_EXPIRY = "7d"

// Token generate karo
export const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
}

// Token verify karo
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Token decode karo bina verify ke
export const decodeToken = (token) => {
  try {
    return jwt.decode(token)
  } catch (error) {
    return null
  }
}
