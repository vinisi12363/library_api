import { Autor } from "src/autor/entities/autor.entity";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum LivroEnum{
    emprestado= 'emprestado',
    disponivel= 'disponivel',
}
@Entity()
@Unique(['titulo'])
export class Livro {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column()
      titulo: string;

      @Column()
      ano_publicacao: number; 

      @Column({
        type: 'text',
        default: LivroEnum.disponivel
      })
      status: string

      @ManyToOne(()=>Categoria, cat=>cat.livros, {eager:true})
      categoria: Categoria;

      @ManyToMany(()=>Autor, autor=>autor.livros, {eager:true})
      @JoinTable()
      autores: Autor[];
}
