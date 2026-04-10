import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  }
})

export { sequelize }
