// rick-and-morty.controller.ts

import { Controller, Get, Param, Post } from '@nestjs/common';
import { RickAndMortyService } from './rick-morty.service';

@Controller('rick-and-morty')
export class RickAndMortyController {
  constructor(private readonly rickAndMortyService: RickAndMortyService) {}

  // Endpoint para obtener la lista de todos los personajes
  @Get('characters')
  async getAllCharacters() {
    // Consulta la caché de Redis o la base de datos MongoDB según corresponda
    return this.rickAndMortyService.getAllCharacters();
  }

  // Endpoint para obtener un personaje por su ID
  @Get('character/:id')
  async getCharacterById(@Param('id') id: string) {
    // Consulta la caché de Redis o la base de datos MongoDB según corresponda
    return this.rickAndMortyService.getCharacterById(id);
  }

  // Endpoint para forzar la actualización de datos desde la API
  @Post('update-data')
  async updateDataFromApi() {
    try {
      await this.rickAndMortyService.fetchDataFromApi(); // Llama al método para actualizar desde la API
      return { message: 'Actualización exitosa desde la API de Rick and Morty' };
    } catch (error) {
      return { error: 'Error al actualizar datos desde la API' };
    }
  }
}