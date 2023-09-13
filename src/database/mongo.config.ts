//mongo.config.ts

import mongoose from 'mongoose';

export async function connectToMongoDB() {
  const mongoURL = 'mongodb://JACF:123@localhost:27017/BD_proyect'; // Cambia esto según tu configuración
  try {
    await mongoose.connect(mongoURL);
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}