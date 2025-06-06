import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Livro } from './src/livros/entities/livro.entity';
import { Autor } from './src/autor/entities/autor.entity';
import { Categoria } from './src/categoria/entities/categoria.entity';
import { Emprestimo } from './src/emprestimos/entities/emprestimo.entity';
import { User } from './src/users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/database/db.sqlite',
  synchronize: false,
  entities: [Livro, Autor, Categoria, Emprestimo, User],
  migrations: ['src/migrations/*.ts'],
  logging: true,
});
