import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutorService } from '.././services/autor.service';
import { CreateAutorDto } from '../dto/create-autor.dto';
import { UpdateAutorDto } from '../dto/update-autor.dto';
import { ValidationPipe } from 'src/utils/validation.pipe';

@Controller('/api/autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post('/create')
  create(@Body(new ValidationPipe()) createAutorDto: CreateAutorDto) { 
    return this.autorService.create(createAutorDto);
  }

  @Get('/find')
  findAll() {
    return this.autorService.findAll();
  }

  @Get('/show:id')
  findOne(@Param('id') id: string) {
    return this.autorService.findOne(+id);
  }

  @Patch('/update:id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateAutorDto: UpdateAutorDto) {
    return this.autorService.update(+id, updateAutorDto);
  }

  @Delete('/delete:id')
  remove(@Param('id') id: string) {
    return this.autorService.remove(+id);
  }
}
