import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Province = sequelize.define("Province", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Province;