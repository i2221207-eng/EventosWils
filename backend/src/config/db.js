import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// USAR URL COMPLETA DE RAILWAY (IMPORTANTE)
const db = new Sequelize(process.env.MYSQL_URL, {
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    connectTimeout: 60000
  }
});

export default db;
