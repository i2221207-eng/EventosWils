import { Sequelize } from 'sequelize'

const db = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

export default db
