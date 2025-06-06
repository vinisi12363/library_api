import { Livro } from "src/livros/entities/livro.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['nome'])
export class Autor {
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    nome: String;
    
    @Column()
    biografia: string;
    
    @ManyToMany(() => Livro, livro => livro.autores)
    livros: Livro[];
}
