import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

import authRoutes from './routes/auth.routes.js'
import reservationRoutes from './routes/reservation.routes.js'
import localRoutes from './routes/local.routes.js'
import decorationRoutes from './routes/decoration.routes.js'
import decorationImageRoutes from './routes/decorationImage.routes.js'
import provinceRoutes from './routes/province.routes.js'
import districtRoutes from './routes/districtRoutes.js'
import locationRoutes from "./routes/location.routes.js"
import dniRoutes from './routes/dni.routes.js'
import paymentRoutes from "./routes/payment.routes.js"
import assistantRoutes from "./routes/assistant.routes.js"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// =============================
// MIDDLEWARES
// =============================

app.use(cors({
  origin: "*",
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}))

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// =============================
// ARCHIVOS ESTÁTICOS
// =============================
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// =============================
// RUTAS API
// =============================
app.use("/api/assistant", assistantRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/dni', dniRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/locals', localRoutes)
app.use('/api/decorations', decorationRoutes)
app.use('/api/decorations', decorationImageRoutes)
app.use('/api/provinces', provinceRoutes)
app.use('/api/districts', districtRoutes)
app.use("/api/payments", paymentRoutes)
app.use('/api', locationRoutes)

// =============================
// TEST
// =============================
app.get('/', (req, res) => {
  res.json({ message: 'API WILS funcionando' })
})

export default app