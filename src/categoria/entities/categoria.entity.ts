import { Livro } from "src/livros/entities/livro.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['nome'])
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao?: string;

    @OneToMany(()=>Livro, livro=> livro.categoria)
    livros: Livro[];
}
