//redis.config.ts

import Redis from 'ioredis'; // Nota la importación directa de 'ioredis'

export function connectToRedis() {
  const redisClient = new Redis({
    host: 'localhost', // No es necesario cambiar esto si Redis está en el mismo host
    port: 6379, // No es necesario cambiar esto si Redis está en el mismo host
  });

  redisClient.on('connect', () => {
    console.log('Conexión exitosa a Redis');
  });

  redisClient.on('error', (error: Error) => {
    console.error('Error al conectar a Redis:', error);
  });

  return redisClient;
}