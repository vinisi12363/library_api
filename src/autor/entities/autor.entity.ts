import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Autor {
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    nome: String;
    
    @Column()
    biografia: string;
}
