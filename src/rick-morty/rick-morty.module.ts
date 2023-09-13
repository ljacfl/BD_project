//rick-morty.module.ts:

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from 'nestjs-redis';
import { RickAndMortyService } from './rick-morty.service'; // Importa el servicio
import { RickAndMortyController } from './rick-morty.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://JACF:123@localhost:27017/BD_proyect'), // Configura la conexión a MongoDB
    RedisModule.register({}), // Configura la conexión a Redis
  ],
  controllers: [RickAndMortyController],
  providers: [RickAndMortyService], // Agrega el servicio al módulo
})
export class RickAndMortyModule {}