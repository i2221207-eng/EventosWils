import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  decoration_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  province_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  district_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'pagado', 'cancelado'),
    defaultValue: 'pendiente'
  }
}, {
  tableName: 'reservations',
  timestamps: true
})

export default Reservation