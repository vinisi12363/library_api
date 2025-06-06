import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Autor } from "src/autor/entities/autor.entity";
import { Repository } from "typeorm";

@Injectable()
export class AutorRepository {
  constructor(
    @InjectRepository(Autor)
    private readonly repo: Repository<Autor>
  ) {}

  async findByNome(nome: string): Promise<Autor | null> {
    return this.repo.findOneBy({ nome });
  }

  async saveAutor(autor: Autor) {
    return this.repo.save(autor);
  }
}
