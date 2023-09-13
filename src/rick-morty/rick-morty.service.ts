// rick-and-morty.service.ts

import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Redis } from 'ioredis'; // Importa Redis
import mongoose from 'mongoose'; // Importa mongoose
import { CharacterModel } from './character.model'; // Importa el modelo de MongoDB

@Injectable()
export class RickAndMortyService {
  private readonly apiUrl = 'https://rickandmortyapi.com/api/character';
  private readonly logger = new Logger(RickAndMortyService.name);

  constructor(private readonly redisClient: Redis) { } // Inyecta el cliente Redis

  async fetchDataFromApi() {
    try {
      const response = await axios.get(this.apiUrl);
      const data = response.data;

      // Almacena los datos en MongoDB usando mongoose
      const mongoURL = 'mongodb://JACF:123@localhost:27017/BD_proyect';

      try {
        await mongoose.connect(mongoURL); // Conéctate a MongoDB
        console.log('Conexión exitosa a MongoDB');

        //lógica de almacenamiento en MongoDB ...
        // Verifica si los datos ya existen en Redis
        const redisKey = 'characters'; // Define una clave para Redis (puedes ajustarla según tu necesidad)
        const cachedData = await this.getFromRedis(redisKey);

        if (cachedData) {
          // Si los datos están en Redis, devuelve los datos desde la caché
          this.logger.log('Datos obtenidos desde la caché de Redis');
          return cachedData;
        }

        // Si los datos no están en Redis, guárdalos en MongoDB y luego en Redis
        const dataToStore = await this.storeInMongo(data.results);
        await this.storeInRedis(redisKey, dataToStore);

        return dataToStore;
      } catch (mongoError) {
        console.error('Error al conectar a MongoDB:', mongoError);
        throw new Error('Error al conectar a MongoDB');
      }
    } catch (error) {
      console.error('Error al obtener personajes de la API de Rick and Morty:', error);
      throw new Error('Error al obtener personajes de la API de Rick and Morty');
    }
  }

  //Consulta la API de Rick y Morty y compara los datos recién obtenidos con los datos existentes en la base de datos MongoDB
  //Si detecta nuevos personajes, los almacena en la base de datos MongoDB y actualiza la caché en Redis con los nuevos datos.
  private async updateDataIfChanged() {
    try {
      const response = await axios.get(this.apiUrl);
      const newData = response.data.results;

      // Obtener todos los personajes existentes en MongoDB
      const existingCharacters = await CharacterModel.find();

      // Mapear los _id de los personajes existentes
      const existingIds = existingCharacters.map((character) => character._id.toString());

      // Encontrar los _id de los personajes nuevos
      const newCharacterIds = newData
        .map((character: any) => character._id.toString())
        .filter((id: any) => !existingIds.includes(id));

      if (newCharacterIds.length > 0) {
        // Si hay personajes nuevos, actualizar la base de datos MongoDB
        const newCharacters = newData.filter((character) =>
          newCharacterIds.includes(character._id.toString())
        );
        await this.storeInMongo(newCharacters);

        // Actualizar la caché en Redis con los nuevos datos
        await this.storeInRedis('characters', newData);
      }
    } catch (error) {
      console.error('Error al actualizar datos desde la API de Rick and Morty:', error);
    }
  }



  // Método para almacenar datos en MongoDB
  private async storeInMongo(data: any[]) {
    try {
      // Itera sobre los datos y crea documentos en MongoDB
      for (const characterData of data) {
        const character = new CharacterModel({// Define las propiedades del modelo aquí según los datos de la API
          name: characterData.name,
          status: characterData.status,
          species: characterData.species,
          type: characterData.type,
          gender: characterData.gender,
          origin: characterData.origin,
          location: characterData.location,
          image: characterData.image,
          episode: characterData.episode,
          url: characterData.url,
          created: new Date(characterData.created),

        });

        // Guarda el documento en MongoDB
        await character.save();
      }

      // Después de guardar en MongoDB, elimina los datos de la caché de Redis
      const redisKey = 'characters';
      await this.redisClient.del(redisKey);

      console.log('Datos almacenados en MongoDB');
    } catch (error) {
      console.error('Error al almacenar datos en MongoDB:', error);
    }

    this.logger.log('Datos almacenados en MongoDB');
  }

  // Método para obtener datos de Redis
  private async getFromRedis(key: string): Promise<any> {
    return JSON.parse(await this.redisClient.get(key));
  }

  // Método para almacenar datos en Redis
  private async storeInRedis(key: string, data: any, expirationSeconds: number = 3600): Promise<void> {
    
    // Convierte los datos en JSON y almacénalos en Redis
    await this.redisClient.set(key, JSON.stringify(data));

    // Configura un tiempo de expiración para la clave en segundos
    await this.redisClient.expire(key, expirationSeconds);

    this.logger.log('Datos almacenados en Redis');
  }


  async getAllCharactersFromMongo() {
    try {
      // Consulta todos los personajes en la base de datos MongoDB
      const characters = await CharacterModel.find();

      return characters;
    } catch (error) {
      console.error('Error al obtener personajes desde MongoDB:', error);
      throw new Error('Error al obtener personajes desde MongoDB');
    }
  }

  async getCharacterByIdFromMongo(id: string) {
    try {
      // Consulta un personaje por su ID en la base de datos MongoDB
      const character = await CharacterModel.findOne({ _id: id });

      return character;
    } catch (error) {
      console.error(`Error al obtener el personaje ${id} desde MongoDB:`, error);
      throw new Error(`Error al obtener el personaje ${id} desde MongoDB`);
    }
  }




  async getAllCharacters() {
    try {
      // Consulta la caché de Redis o la base de datos MongoDB según corresponda
      const cachedData = await this.getFromRedis('characters');

      if (cachedData) {
        this.logger.log('Datos obtenidos desde la caché de Redis');
        return cachedData;
      }

      // Si los datos no están en caché, consulta la base de datos MongoDB
      const charactersFromMongo = await this.getAllCharactersFromMongo();

      // Actualiza la caché en Redis con los datos de MongoDB
      await this.storeInRedis('characters', charactersFromMongo);

      return charactersFromMongo;
    } catch (error) {
      console.error('Error al obtener personajes:', error);
      throw new Error('Error al obtener personajes');
    }
  }

  async getCharacterById(id: string) {
    try {
      // Consulta la caché de Redis o la base de datos MongoDB según corresponda
      const cachedData = await this.getFromRedis(`character:${id}`);

      if (cachedData) {
        this.logger.log(`Datos del personaje ${id} obtenidos desde la caché de Redis`);
        return cachedData;
      }

      // Si los datos no están en caché, consulta la base de datos MongoDB
      const characterFromMongo = await this.getCharacterByIdFromMongo(id);

      // Actualiza la caché en Redis con los datos del personaje
      await this.storeInRedis(`character:${id}`, characterFromMongo);

      return characterFromMongo;
    } catch (error) {
      console.error(`Error al obtener el personaje ${id}:`, error);
      throw new Error(`Error al obtener el personaje ${id}`);
    }
  }

}