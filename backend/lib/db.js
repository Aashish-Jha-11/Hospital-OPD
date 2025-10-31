// Prisma database connection
import { PrismaClient } from "@prisma/client"

let prisma

// Production me naya instance, development me global use karo
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
