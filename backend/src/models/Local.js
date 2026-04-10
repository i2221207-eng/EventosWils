import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Local = sequelize.define('Local', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price_per_day: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'locals',
  timestamps: true
})

export default Local
