import { Sequelize } from 'sequelize'

const db = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    connectTimeout: 60000,
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 3,
    min: 0,
    acquire: 60000,
    idle: 10000
  },
  retry: {
    max: 5
  }
})

export default db
