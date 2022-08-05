import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    
    try {
      
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {
      this.manejoDerror(error);
    }

  }

  async findAll() {
    const pokemons = await this.pokemonModel.find();
    return pokemons;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if(!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({no: term});
    }

    if(!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if(!pokemon) {
      pokemon = await this.pokemonModel.findOne({name: term.toLowerCase().trim()});
    }

    if(!pokemon) {
      throw new NotFoundException(`:: No se encontró un pokemon con termino de búsqueda '${term}' ::`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    
    if(updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {

      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(), ...updatePokemonDto};

    } catch (error) {
      this.manejoDerror(error);
    }

  }

  async remove(id: string) {
    /* const pokemon = await this.findOne(id);
    await pokemon.deleteOne(); */
    
    //const resultado = await this.pokemonModel.findByIdAndDelete(id);
    
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});

    if(deletedCount===0) {
      throw new NotFoundException(`:: No se sencontró un registro con id '${id}' ::`);
      
    }

    return {id,deletedCount};
  }

  //! Método para manejo de error.
  private manejoDerror(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`:: El valor '${JSON.stringify(error.keyValue)}' ya existe en la BD ::`);
    }

    console.log(error);
    throw new InternalServerErrorException(":: Error al guardar en la BD [verificar log's] ::");
  }

}
