import sequelize from '../config/db.js'

import User from './User.js'
import Local from './Local.js'
import Decoration from './Decoration.js'
import Reservation from './Reservation.js'
import Payment from './Payment.js'
import DecorationImage from './DecorationImage.js'

import Province from './Province.js'
import District from './District.js'


/* ================= USER ================= */

User.hasMany(Reservation, {
  foreignKey: 'user_id'
})

Reservation.belongsTo(User, {
  foreignKey: 'user_id'
})


/* ================= LOCAL ================= */

Local.hasMany(Reservation, {
  foreignKey: 'local_id'
})

Reservation.belongsTo(Local, {
  foreignKey: 'local_id'
})


/* ================= DECORATION (1:N) 🔥 ================= */

Decoration.hasMany(Reservation, {
  foreignKey: 'decoration_id'
})

Reservation.belongsTo(Decoration, {
  foreignKey: 'decoration_id'
})


/* ================= PROVINCE - DISTRICT ================= */

Province.hasMany(District, {
  foreignKey: 'province_id'
})

District.belongsTo(Province, {
  foreignKey: 'province_id'
})


/* ================= DISTRICT - RESERVATION ================= */

District.hasMany(Reservation, {
  foreignKey: 'district_id'
})

Reservation.belongsTo(District, {
  foreignKey: 'district_id'
})


/* ================= PROVINCE - RESERVATION ================= */

Province.hasMany(Reservation, {
  foreignKey: 'province_id'
})

Reservation.belongsTo(Province, {
  foreignKey: 'province_id'
})


/* ================= RESERVATION - PAYMENT ================= */

Reservation.hasMany(Payment, {
  foreignKey: 'reservation_id',
  onDelete: 'CASCADE'
})

Payment.belongsTo(Reservation, {
  foreignKey: 'reservation_id'
})


/* ================= DECORATION IMAGES ================= */

Decoration.hasMany(DecorationImage, {
  foreignKey: 'decoration_id',
  as: 'images'
})

DecorationImage.belongsTo(Decoration, {
  foreignKey: 'decoration_id',
  as: 'decoration'
})


export {
  sequelize,
  User,
  Local,
  Decoration,
  Reservation,
  Payment,
  DecorationImage,
  Province,
  District
}