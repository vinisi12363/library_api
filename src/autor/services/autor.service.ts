import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAutorDto } from '../dto/create-autor.dto'; 
import { UpdateAutorDto } from '../dto/update-autor.dto'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Autor } from '../entities/autor.entity';
import { Repository } from 'typeorm';
import { STATUS_CODES } from 'http';

@Injectable()
export class AutorService {
  
  constructor(
    @InjectRepository(Autor)
    private autorRepository: Repository<Autor>,
  ) {}


  async create(createAutorDto: CreateAutorDto) {

    const autorFound = await this.autorRepository.findOne({
      where: {nome: createAutorDto.nome},
    })

   if (autorFound) {
    throw new ConflictException({
        message: 'Já existe autor com este nome',
        statusCode: 409,
      });
    }
    return await this.autorRepository.save(createAutorDto);
  }

  async findAll() {
   return await this.autorRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} autor`;
  }

  update(id: number, updateAutorDto: UpdateAutorDto) {
    return `This action updates a #${id} autor`;
  }

  remove(id: number) {
    return `This action removes a #${id} autor`;
  }
}
