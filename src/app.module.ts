import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AutorModule } from './autor/autor.module';
import { CategoriaModule } from './categoria/categoria.module';
import { LivrosModule } from './livros/livros.module';
import { EmprestimosModule } from './emprestimos/emprestimos.module';
import { AuthController } from './auth/controllers/auth.controller';
import { AutorController } from "./autor/controllers/autor.controller";
import { UsersController } from "./users/controllers/users.controller";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "sqlite",
			database: "src/database/db.sqlite",
			entities: [__dirname + "/**/*.entity{.ts,.js}"],
			synchronize: true,
		}),
		UsersModule,
		AutorModule,
		CategoriaModule,
		LivrosModule,
		EmprestimosModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
