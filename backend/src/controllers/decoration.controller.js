import { Decoration, DecorationImage } from '../models/index.js'

export const createDecoration = async (req, res) => {
  try {

    const decoration = await Decoration.create(req.body)

    res.status(201).json(decoration)

  } catch (error) {

    console.error(error)
    res.status(500).json({ message: 'Error al crear decoración' })

  }
}


export const getDecorations = async (req, res) => {

  try {

    const decorations = await Decoration.findAll({
      include: [
        {
          model: DecorationImage,
          as: 'images',
          where: { is_main: true },
          required: false
        }
      ]
    })

    res.json(decorations)

  } catch (error) {

    console.error(error)
    res.status(500).json({ message: error.message })

  }

}


export const getDecorationById = async (req, res) => {

  try {

    const decoration = await Decoration.findByPk(req.params.id, {
      include: [
        {
          model: DecorationImage,
          as: 'images',
          required: false
        }
      ]
    })

    if (!decoration) {
      return res.status(404).json({ message: 'Decoración no encontrada' })
    }

    res.json(decoration)

  } catch (error) {

    console.error(error)
    res.status(500).json({ message: 'Error al obtener decoración' })

  }

}


export const updateDecoration = async (req, res) => {

  try {

    const decoration = await Decoration.findByPk(req.params.id)

    if (!decoration) {
      return res.status(404).json({ message: 'Decoración no encontrada' })
    }

    await decoration.update(req.body)

    res.json(decoration)

  } catch (error) {

    console.error(error)
    res.status(500).json({ message: 'Error al actualizar decoración' })

  }

}


export const deleteDecoration = async (req, res) => {

  try {

    const decoration = await Decoration.findByPk(req.params.id)

    if (!decoration) {
      return res.status(404).json({ message: 'Decoración no encontrada' })
    }

    await decoration.destroy()

    res.json({ message: 'Decoración eliminada' })

  } catch (error) {

    console.error(error)
    res.status(500).json({ message: 'Error al eliminar decoración' })

  }

}