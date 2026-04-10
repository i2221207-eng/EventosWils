import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from '../src/models/User.js'; // Ajusta la ruta si tu modelo está en otra carpeta

// Carga las variables de entorno
dotenv.config();

// Configurar la conexión con la base de datos usando .env
const db = new Sequelize(
  process.env.DB_NAME,       // wils_db
  process.env.DB_USER,       // root
  process.env.DB_PASSWORD,   // vacío si no tienes contraseña
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false, // evita mucho log innecesario
  }
);

const createAdmin = async () => {
  try {
    // Probar la conexión
    await db.authenticate();
    console.log('✅ Conectado a la base de datos');

    const email = 'admin@wils.com';
    const password = 'admin123';

    // Crear contraseña encriptada
    const hashedPassword = await bcrypt.hash(password, 10);

    // Revisar si ya existe el admin
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      console.log('⚠️ El admin ya existe');
      process.exit(0);
    }

    // Crear el admin
    await User.create({
      name: 'Administrador',
      email,
      phone: '999999999', // requerido por tu modelo
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Admin creado correctamente');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message || error);
    process.exit(1);
  }
};

// Ejecutar la función
createAdmin();
