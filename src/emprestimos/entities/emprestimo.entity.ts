import { Livro } from "src/livros/entities/livro.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum StatusEnum {
  ativo = "ativo",
  concluido = "concluido",
}
@Entity()
export class Emprestimo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "datetime",
    default: Date.now(),
  })
  data_emprestimo: Date;

  @Column({
    type: "datetime",
  })
  data_devolucao_prevista: Date;

  @Column({
    type: "datetime",
  })
  data_devolucao_real?: Date;

  @Column({
    type: "text",
    default: StatusEnum.ativo,
  })
  status: string;

  @Column()
  dias_atraso: number;

  @OneToOne(() => Livro)
  @JoinColumn()
  livro: Livro;

  @OneToOne(() => User)
  @JoinColumn()
  usuario: User;

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}
