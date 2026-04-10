import app from './app.js'
import { sequelize } from './models/index.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 4000

const startServer = async () => {
  try {

    // 🔍 ENV CHECK REAL
    console.log("===== ENV CHECK =====")
    console.log("PORT:", process.env.PORT)
    console.log("DB_URL:", process.env.DB_URL)
    console.log("=====================")

    if (!process.env.DB_URL) {
      throw new Error("DB_URL no está definida en variables de entorno")
    }

    console.log("Intentando conectar a la base de datos...")

    // 🔥 CONEXIÓN DB
    await sequelize.authenticate()
    console.log('✅ Conectado a la base de datos correctamente')

    // 🔥 SINCRONIZACIÓN
    console.log("Sincronizando modelos...")
    await sequelize.sync({ alter: true })
    console.log('✅ Modelos sincronizados')

    // 🔥 SERVIDOR
    app.listen(PORT, () => {
      console.log('=====================')
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
      console.log('=====================')
    })

  } catch (error) {

    console.log("===== ERROR START SERVER =====")
    console.error("Mensaje:", error.message)
    console.error("Código:", error.code)
    console.error("Original:", error.original)
    console.error("Stack:", error.stack)
    console.log("==============================")

  }
}

startServer()
