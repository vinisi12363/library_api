import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum UserRole {
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER",
}
export enum UserStatus{
    ativo = 'ativo',
    inativo = 'inativo'
}

@Entity()
@Unique(['email'])
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;
	
    @Column()
	nome?: string;
	
  
    @Column()
   
	email: string;
	
    @Column()
	telefone?: string;
	
    @Column()
	password: string;

    @Column({
       type:'set',
       enum:UserRole,
       default:[UserRole.ADMIN]
    })
    roles: UserRole[]

    @Column({
        type:'set',
        enum: UserStatus,
        default: [UserStatus.ativo]
    })
    status: UserStatus
}
