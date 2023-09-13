import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from 'nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RickAndMortyService } from './rick-morty/rick-morty.service';
import { RickAndMortyModule } from './rick-morty/rick-morty.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://JACF:123@localhost:27017/BD_proyect'),
    RedisModule.register({}),
    RickAndMortyModule,
  ],
  controllers: [AppController],
  providers: [AppService, RickAndMortyService],
})
export class AppModule {}
