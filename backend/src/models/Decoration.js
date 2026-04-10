import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Decoration = sequelize.define('Decoration', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    category: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  })

  Decoration.associate = models => {
    Decoration.hasMany(models.DecorationImage, {
      foreignKey: 'decoration_id',
      as: 'images'
    })
  }

export default Decoration
