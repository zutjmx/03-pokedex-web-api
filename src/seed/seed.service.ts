import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
  ) {}

  async executeSeed() {

    let contador: number = 0;

    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    //! Una forma
    /* const insertPromisesArray = [];
    data.results.forEach(({name, url}) => {

      const segmentos = url.split('/')
      const no = +segmentos[segmentos.length-2];

      insertPromisesArray.push(
        this.pokemonModel.create({name,no})
      );
    
    });
    await Promise.all(insertPromisesArray); */

    //! Otra forma
    const pokemonToInsert: {name: string, no: number}[] = [];
    data.results.forEach(({name, url}) => {

      const segmentos = url.split('/')
      const no = +segmentos[segmentos.length-2];

      pokemonToInsert.push({name,no});

      contador++;
    
    });
    await this.pokemonModel.insertMany(pokemonToInsert);


    return `:: Se ejecutó el método executeSeed(), se insertaron ${contador} registros ::`;
  }

}
