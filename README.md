# 🏥 Hospital OPD Management System

	⁠A revolutionary healthcare platform that combines cutting-edge AI, blockchain security, and modern web technologies to transform outpatient department management.

[![Made with Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-blue)](https://www.mysql.com/)
[![AI Powered](https://img.shields.io/badge/AI-OpenAI%20GPT--4-orange)](https://openai.com/)
[![Blockchain](https://img.shields.io/badge/Blockchain-Secured-purple)](https://ethereum.org/)

---

## 🌟 What Makes This Special?

While most hospital management systems are just glorified CRUD applications, we've built something that actually pushes boundaries. This isn't your typical college project - it's a production-ready healthcare platform with *45+ unique features* that solve real-world problems.

### 🚀 The "Wow" Features

*🤖 AI Medical Chatbot*  
24/7 intelligent assistant powered by OpenAI GPT-4 that helps patients with symptom assessment, appointment scheduling, and general health queries. It's like having a medical receptionist who never sleeps.

*🎙️ Voice-to-Text Prescriptions*  
Doctors can dictate prescriptions naturally - "Give paracetamol 500mg twice daily for 5 days" - and watch it automatically format into a proper prescription with drug interaction warnings. Revolutionary? We think so.

*🔐 Blockchain Medical Records*  
Your medical history isn't stored in some hackable database. It's secured on blockchain with smart contracts, giving patients full control over who accesses their data. HIPAA compliance meets Web3.

*📹 WebRTC Video Consultations*  
Crystal-clear telemedicine built right in. No third-party apps, no security concerns - just seamless doctor-patient video calls with screen sharing and session recording.

*📱 Progressive Web App*  
Install it like a native app, use it offline, get push notifications even when the browser is closed. It's 2025, and your healthcare system should work everywhere.

*⚡ Real-time Everything*  
Socket.io powers live appointment updates, instant chat, emergency alerts, and real-time doctor availability. Because waiting for page refreshes is so 2015.

---

## 🎯 Core Modules

### 1. 👤 Patient Registration & Management
•⁠  ⁠Comprehensive medical history tracking
•⁠  ⁠Emergency contact management
•⁠  ⁠Secure document storage with encryption
•⁠  ⁠Multi-device access with offline sync

### 2. 👨‍⚕️ Doctor Profiles & Slot Management
•⁠  ⁠Detailed profiles with specializations and qualifications
•⁠  ⁠Dynamic availability scheduling
•⁠  ⁠Conflict resolution for double bookings
•⁠  ⁠Smart break-time management

### 3. 📅 AI-Enhanced Appointment Scheduling
•⁠  ⁠ML-powered slot optimization
•⁠  ⁠No-show prediction algorithms
•⁠  ⁠Automated reminders via SMS, Email, WhatsApp
•⁠  ⁠Dynamic rescheduling suggestions

### 4. 💊 Voice-Activated Prescription System
•⁠  ⁠Medical terminology recognition
•⁠  ⁠Real-time drug interaction warnings
•⁠  ⁠Allergy alerts integrated with patient history
•⁠  ⁠Digital prescription generation

### 5. 🧪 Smart Lab Request Management
•⁠  ⁠Comprehensive test catalog
•⁠  ⁠Automated ordering workflows
•⁠  ⁠Result management with AI analysis
•⁠  ⁠PDF report generation

### 6. 💰 Blockchain-Secured Billing System
•⁠  ⁠Transparent invoice generation
•⁠  ⁠Multiple payment gateways
•⁠  ⁠Immutable transaction records
•⁠  ⁠Advanced financial reporting

### 7. 💬 Real-time Communication Hub
•⁠  ⁠Doctor-patient messaging
•⁠  ⁠Multi-channel notifications (Web Push, SMS, Email, WhatsApp)
•⁠  ⁠Emergency broadcast system
•⁠  ⁠In-app toast notifications

### 8. 📊 Predictive Analytics Dashboard
•⁠  ⁠Patient flow forecasting
•⁠  ⁠Resource utilization insights
•⁠  ⁠Early warning systems for overcrowding
•⁠  ⁠Performance metrics visualization

---

## 🛠️ Tech Stack

### Frontend Excellence
⁠ javascript
Next.js 14          // Server-side rendering & blazing performance
React 18            // Component architecture
TailwindCSS         // Beautiful, responsive design
Socket.io Client    // Real-time communication
React Query         // State management & caching
Framer Motion       // Smooth animations
React Hook Form     // Efficient form handling
React Speech Kit    // Voice recognition
 ⁠

### Backend Powerhouse
⁠ javascript
Node.js + Express   // RESTful API server
Prisma ORM          // Type-safe database queries
MySQL               // Reliable data storage
Socket.io           // WebSocket server
OpenAI API          // GPT-4 integration
Web Push            // Notification service
Twilio              // SMS & WhatsApp
JWT                 // Secure authentication
Bcrypt              // Password encryption
Helmet              // Security headers
 ⁠

### Revolutionary Add-ons
⁠ javascript
Blockchain          // Solidity smart contracts for medical records
WebRTC              // Peer-to-peer video consultations
Docker              // Containerization & microservices
Web3.js             // Blockchain integration
 ⁠

---

## 📁 Database Schema Highlights

⁠ prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      UserRole
  createdAt DateTime @default(now())
  patient   Patient?
  doctor    Doctor?
}

model Appointment {
  id            Int               @id @default(autoincrement())
  patientId     Int
  doctorId      Int
  scheduledAt   DateTime
  status        AppointmentStatus @default(SCHEDULED)
  aiInsights    Json?             // ML predictions & recommendations
  bookingMethod String            // voice, web, chatbot, etc.
  patient       Patient           @relation(fields: [patientId], references: [id])
  doctor        Doctor            @relation(fields: [doctorId], references: [id])
}
 ⁠

---

## 🚀 Getting Started

### Prerequisites
⁠ bash
Node.js 18+
MySQL 8.0+
Docker (optional but recommended)
 ⁠

### Installation

1.⁠ ⁠*Clone the repository*
⁠ bash
git clone https://github.com/Aashish-Jha-11/Hospital-OPD-.git
cd Hospital-OPD-
 ⁠

2.⁠ ⁠*Install dependencies*
⁠ bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
 ⁠

3.⁠ ⁠*Environment setup*
⁠ bash
# Backend .env
DATABASE_URL="mysql://user:password@localhost:3306/hospital_opd"
JWT_SECRET="your-secret-key"
OPENAI_API_KEY="your-openai-key"
VAPID_PUBLIC_KEY="your-vapid-public"
VAPID_PRIVATE_KEY="your-vapid-private"
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"

# Frontend .env.local
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_VAPID_KEY="your-vapid-public"
 ⁠

4.⁠ ⁠*Database setup*
⁠ bash
cd backend
npx prisma migrate dev
npx prisma db seed
 ⁠

5.⁠ ⁠*Run the application*
⁠ bash
# Using Docker (recommended)
docker-compose up

# Or manually
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
 ⁠

6.⁠ ⁠*Access the application*
•⁠  ⁠Frontend: ⁠ http://localhost:3000 ⁠
•⁠  ⁠Backend API: ⁠ http://localhost:3001 ⁠
•⁠  ⁠API Documentation: ⁠ http://localhost:3001/api-docs ⁠

---
