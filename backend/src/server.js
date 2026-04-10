import app from './app.js'
import { sequelize } from './models/index.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 4000

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Conectado a MySQL correctamente')

    await sequelize.sync({ alter: true })
    console.log('Modelos sincronizados')

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`)
    })

  } catch (error) {
    console.error('Error al iniciar servidor:', error)
  }
}

startServer()