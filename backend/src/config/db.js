import { Sequelize } from 'sequelize'

const db = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

export default db
