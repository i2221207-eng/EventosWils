import { Sequelize } from 'sequelize'

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: false,   // 👈 MUY IMPORTANTE
    },
    logging: false
  }
)

export default db
