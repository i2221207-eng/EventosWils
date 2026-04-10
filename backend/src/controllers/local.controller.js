import { Local } from '../models/index.js'

export const createLocal = async (req, res) => {
  try {
    const local = await Local.create(req.body)
    res.status(201).json(local)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear local' })
  }
}

export const getLocals = async (req, res) => {
  try {
    const locals = await Local.findAll()
    res.json(locals)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener locales' })
  }
}

export const getLocalById = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id)
    if (!local) {
      return res.status(404).json({ message: 'Local no encontrado' })
    }
    res.json(local)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener local' })
  }
}

export const updateLocal = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id)
    if (!local) {
      return res.status(404).json({ message: 'Local no encontrado' })
    }
    await local.update(req.body)
    res.json(local)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar local' })
  }
}

export const deleteLocal = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id)
    if (!local) {
      return res.status(404).json({ message: 'Local no encontrado' })
    }
    await local.destroy()
    res.json({ message: 'Local eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar local' })
  }
}
