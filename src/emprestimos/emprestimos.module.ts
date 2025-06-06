import { Module } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { EmprestimosController } from './emprestimos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emprestimo } from './entities/emprestimo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emprestimo])],
  controllers: [EmprestimosController],
  providers: [EmprestimosService],
})
export class EmprestimosModule {}
