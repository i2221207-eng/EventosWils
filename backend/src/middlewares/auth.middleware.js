import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token requerido' })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] } // 🔐 seguridad
    })

    if (!user) {
      return res.status(401).json({ message: 'Usuario no válido' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Auth error:', error.message)
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso solo para administradores' })
  }
  next()
}
