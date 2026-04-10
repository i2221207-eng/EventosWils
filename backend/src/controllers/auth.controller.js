import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body

    const exists = await User.findOne({ where: { email } })
    if (exists) {
      return res.status(400).json({ message: 'El email ya existe' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'cliente'
    })

    res.status(201).json({
      message: 'Usuario registrado',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' })
  }
  
}
