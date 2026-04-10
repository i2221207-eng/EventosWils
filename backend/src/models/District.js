import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const District = sequelize.define('District', {

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  province_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  tableName: 'districts'
})

export default District