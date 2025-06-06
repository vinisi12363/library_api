import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Autor } from '../autor/entities/autor.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Livro } from '../livros/entities/livro.entity';
import { Emprestimo } from '../emprestimos/entities/emprestimo.entity';
import * as bcrypt from 'bcrypt';

export default async function seed(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const categoriaRepo = dataSource.getRepository(Categoria);
  const autorRepo = dataSource.getRepository(Autor);
  const livroRepo = dataSource.getRepository(Livro);
  const emprestimoRepo = dataSource.getRepository(Emprestimo);

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = userRepo.create({
    name: 'Administrador',
    email: 'admin@admin.com',
    password: hashedPassword,
    status: 'ativo',
    telefone: '999999999',
  });
  await userRepo.save(admin);

  // Categorias
  const categorias = categoriaRepo.create([
    { nome: 'Ficção', descricao: 'Livros de ficção' },
    { nome: 'Tecnologia', descricao: 'Livros técnicos' },
    { nome: 'História', descricao: 'Livros históricos' },
  ]);
  await categoriaRepo.save(categorias);

  // Autores
  const autores = autorRepo.create([
    { nome: 'George Orwell', biografia: 'Autor de 1984' },
    { nome: 'Isaac Asimov', biografia: 'Autor de Fundação' },
    { nome: 'Yuval Noah Harari', biografia: 'Autor de Sapiens' },
  ]);
  await autorRepo.save(autores);

  // Livros
  const livros = livroRepo.create([
    {
      titulo: '1984',
      ano_publicacao: 1949,
      status: 'disponivel',
      categoria: categorias[0],
      autores: [autores[0]],
    },
    {
      titulo: 'Fundação',
      ano_publicacao: 1951,
      status: 'disponivel',
      categoria: categorias[0],
      autores: [autores[1]],
    },
    {
      titulo: 'Sapiens',
      ano_publicacao: 2011,
      status: 'disponivel',
      categoria: categorias[2],
      autores: [autores[2]],
    },
  ]);
  await livroRepo.save(livros);

  // Empréstimos
  const emprestimos = emprestimoRepo.create([
    {
      livro: livros[0],
      usuario: admin,
      data_emprestimo: new Date(),
      data_devolucao_prevista: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: 'ativo',
      dias_atraso: 0,
    },
    {
      livro: livros[1],
      usuario: admin,
      data_emprestimo: new Date(),
      data_devolucao_prevista: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      status: 'ativo',
      dias_atraso: 0,
    },
  ]);
  await emprestimoRepo.save(emprestimos);
}
