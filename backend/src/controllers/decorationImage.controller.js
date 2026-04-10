import { DecorationImage } from '../models/index.js'

/* =============================
   SUBIR IMÁGENES
============================= */
export const uploadDecorationImages = async (req, res) => {
  try {
    const { decorationId } = req.params

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No se enviaron imágenes' })
    }

    const images = req.files.map((file, index) => ({
      image_url: `/uploads/decorations/${file.filename}`,
      is_main: index === 0,
      decoration_id: decorationId   // 🔥 CORREGIDO
    }))

    const savedImages = await DecorationImage.bulkCreate(images)

    res.json({
      message: 'Imágenes subidas correctamente',
      images: savedImages
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}


/* =============================
   OBTENER IMÁGENES
============================= */
export const getDecorationImages = async (req, res) => {
  try {
    const { decorationId } = req.params

    const images = await DecorationImage.findAll({
      where: { decoration_id: decorationId }
    })

    res.json(images)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}


/* =============================
   ELIMINAR IMAGEN
============================= */
export const deleteDecorationImage = async (req, res) => {
  try {
    const { imageId } = req.params

    const image = await DecorationImage.findByPk(imageId)

    if (!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' })
    }

    await image.destroy()

    res.json({ message: 'Imagen eliminada correctamente' })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
