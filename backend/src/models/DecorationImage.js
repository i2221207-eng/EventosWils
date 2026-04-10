import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

 const DecorationImage = sequelize.define('DecorationImage', {
    image_url: DataTypes.STRING,
    is_main: DataTypes.BOOLEAN
  })

  DecorationImage.associate = models => {
    DecorationImage.belongsTo(models.Decoration, {
      foreignKey: 'decoration_id'
    })
  }

export default DecorationImage