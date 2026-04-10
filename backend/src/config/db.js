import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

console.log("DB_URL:", process.env.DB_URL)

const db = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    connectTimeout: 60000
  }
})

export default db
