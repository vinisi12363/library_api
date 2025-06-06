import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	name: string;
	@Column()
	email: string;
	@Column()
	telefone: string;
	@Column()
	status: string;
	@Column()
	password: string;
}
