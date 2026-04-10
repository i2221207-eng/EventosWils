import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.MYSQL_URL, {
  dialect: "mysql",
  logging: false,

  // 🔥 ESTO EVITA CONNECTION LOST
  dialectOptions: {
    connectTimeout: 60000,
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  }
});

export default db;
