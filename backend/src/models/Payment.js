import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Payment = sequelize.define('Payment', {
  payment_method: DataTypes.STRING,
  amount: DataTypes.DECIMAL,
  currency: DataTypes.STRING,
  culqi_charge_id: DataTypes.STRING,
  status: DataTypes.ENUM('success','failed','pending')
})

export default Payment
