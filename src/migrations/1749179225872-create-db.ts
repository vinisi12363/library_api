import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1749179225872 implements MigrationInterface {
    name = 'CreateDb1749179225872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "autor" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "biografia" varchar NOT NULL, CONSTRAINT "UQ_f89c2b0b39675e5b481bdfbbc7a" UNIQUE ("nome"))`);
        await queryRunner.query(`CREATE TABLE "categoria" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "descricao" varchar NOT NULL, CONSTRAINT "UQ_0a9942514087463668e9638bf90" UNIQUE ("nome"))`);
        await queryRunner.query(`CREATE TABLE "livro" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "titulo" varchar NOT NULL, "ano_publicacao" integer NOT NULL, "status" text NOT NULL DEFAULT ('disponivel'), "categoriaId" integer, CONSTRAINT "UQ_10a18be69434db6a8a04195a596" UNIQUE ("titulo"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "telefone" varchar NOT NULL, "status" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "emprestimo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "data_emprestimo" datetime NOT NULL DEFAULT (1749179228257), "data_devolucao_prevista" datetime NOT NULL, "data_devolucao_real" datetime NOT NULL, "status" text NOT NULL DEFAULT ('ativo'), "dias_atraso" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "livroId" integer, "usuarioId" integer, CONSTRAINT "REL_6a87b564046e0c3c735f5d21d9" UNIQUE ("livroId"), CONSTRAINT "REL_f9107b4941c5468328367938fc" UNIQUE ("usuarioId"))`);
        await queryRunner.query(`CREATE TABLE "livro_autores_autor" ("livroId" integer NOT NULL, "autorId" integer NOT NULL, PRIMARY KEY ("livroId", "autorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bc0da8e5c279d67848c25be903" ON "livro_autores_autor" ("livroId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5922e9fdf31fa5d7fe9ab9216e" ON "livro_autores_autor" ("autorId") `);
        await queryRunner.query(`CREATE TABLE "temporary_livro" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "titulo" varchar NOT NULL, "ano_publicacao" integer NOT NULL, "status" text NOT NULL DEFAULT ('disponivel'), "categoriaId" integer, CONSTRAINT "UQ_10a18be69434db6a8a04195a596" UNIQUE ("titulo"), CONSTRAINT "FK_71d8ca8f12af61304dee8ed22dc" FOREIGN KEY ("categoriaId") REFERENCES "categoria" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_livro"("id", "titulo", "ano_publicacao", "status", "categoriaId") SELECT "id", "titulo", "ano_publicacao", "status", "categoriaId" FROM "livro"`);
        await queryRunner.query(`DROP TABLE "livro"`);
        await queryRunner.query(`ALTER TABLE "temporary_livro" RENAME TO "livro"`);
        await queryRunner.query(`CREATE TABLE "temporary_emprestimo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "data_emprestimo" datetime NOT NULL DEFAULT (1749179228257), "data_devolucao_prevista" datetime NOT NULL, "data_devolucao_real" datetime NOT NULL, "status" text NOT NULL DEFAULT ('ativo'), "dias_atraso" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "livroId" integer, "usuarioId" integer, CONSTRAINT "REL_6a87b564046e0c3c735f5d21d9" UNIQUE ("livroId"), CONSTRAINT "REL_f9107b4941c5468328367938fc" UNIQUE ("usuarioId"), CONSTRAINT "FK_6a87b564046e0c3c735f5d21d98" FOREIGN KEY ("livroId") REFERENCES "livro" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_f9107b4941c5468328367938fc1" FOREIGN KEY ("usuarioId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_emprestimo"("id", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status", "dias_atraso", "createdAt", "updatedAt", "livroId", "usuarioId") SELECT "id", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status", "dias_atraso", "createdAt", "updatedAt", "livroId", "usuarioId" FROM "emprestimo"`);
        await queryRunner.query(`DROP TABLE "emprestimo"`);
        await queryRunner.query(`ALTER TABLE "temporary_emprestimo" RENAME TO "emprestimo"`);
        await queryRunner.query(`DROP INDEX "IDX_bc0da8e5c279d67848c25be903"`);
        await queryRunner.query(`DROP INDEX "IDX_5922e9fdf31fa5d7fe9ab9216e"`);
        await queryRunner.query(`CREATE TABLE "temporary_livro_autores_autor" ("livroId" integer NOT NULL, "autorId" integer NOT NULL, CONSTRAINT "FK_bc0da8e5c279d67848c25be903c" FOREIGN KEY ("livroId") REFERENCES "livro" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_5922e9fdf31fa5d7fe9ab9216e6" FOREIGN KEY ("autorId") REFERENCES "autor" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("livroId", "autorId"))`);
        await queryRunner.query(`INSERT INTO "temporary_livro_autores_autor"("livroId", "autorId") SELECT "livroId", "autorId" FROM "livro_autores_autor"`);
        await queryRunner.query(`DROP TABLE "livro_autores_autor"`);
        await queryRunner.query(`ALTER TABLE "temporary_livro_autores_autor" RENAME TO "livro_autores_autor"`);
        await queryRunner.query(`CREATE INDEX "IDX_bc0da8e5c279d67848c25be903" ON "livro_autores_autor" ("livroId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5922e9fdf31fa5d7fe9ab9216e" ON "livro_autores_autor" ("autorId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_5922e9fdf31fa5d7fe9ab9216e"`);
        await queryRunner.query(`DROP INDEX "IDX_bc0da8e5c279d67848c25be903"`);
        await queryRunner.query(`ALTER TABLE "livro_autores_autor" RENAME TO "temporary_livro_autores_autor"`);
        await queryRunner.query(`CREATE TABLE "livro_autores_autor" ("livroId" integer NOT NULL, "autorId" integer NOT NULL, PRIMARY KEY ("livroId", "autorId"))`);
        await queryRunner.query(`INSERT INTO "livro_autores_autor"("livroId", "autorId") SELECT "livroId", "autorId" FROM "temporary_livro_autores_autor"`);
        await queryRunner.query(`DROP TABLE "temporary_livro_autores_autor"`);
        await queryRunner.query(`CREATE INDEX "IDX_5922e9fdf31fa5d7fe9ab9216e" ON "livro_autores_autor" ("autorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc0da8e5c279d67848c25be903" ON "livro_autores_autor" ("livroId") `);
        await queryRunner.query(`ALTER TABLE "emprestimo" RENAME TO "temporary_emprestimo"`);
        await queryRunner.query(`CREATE TABLE "emprestimo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "data_emprestimo" datetime NOT NULL DEFAULT (1749179228257), "data_devolucao_prevista" datetime NOT NULL, "data_devolucao_real" datetime NOT NULL, "status" text NOT NULL DEFAULT ('ativo'), "dias_atraso" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "livroId" integer, "usuarioId" integer, CONSTRAINT "REL_6a87b564046e0c3c735f5d21d9" UNIQUE ("livroId"), CONSTRAINT "REL_f9107b4941c5468328367938fc" UNIQUE ("usuarioId"))`);
        await queryRunner.query(`INSERT INTO "emprestimo"("id", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status", "dias_atraso", "createdAt", "updatedAt", "livroId", "usuarioId") SELECT "id", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status", "dias_atraso", "createdAt", "updatedAt", "livroId", "usuarioId" FROM "temporary_emprestimo"`);
        await queryRunner.query(`DROP TABLE "temporary_emprestimo"`);
        await queryRunner.query(`ALTER TABLE "livro" RENAME TO "temporary_livro"`);
        await queryRunner.query(`CREATE TABLE "livro" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "titulo" varchar NOT NULL, "ano_publicacao" integer NOT NULL, "status" text NOT NULL DEFAULT ('disponivel'), "categoriaId" integer, CONSTRAINT "UQ_10a18be69434db6a8a04195a596" UNIQUE ("titulo"))`);
        await queryRunner.query(`INSERT INTO "livro"("id", "titulo", "ano_publicacao", "status", "categoriaId") SELECT "id", "titulo", "ano_publicacao", "status", "categoriaId" FROM "temporary_livro"`);
        await queryRunner.query(`DROP TABLE "temporary_livro"`);
        await queryRunner.query(`DROP INDEX "IDX_5922e9fdf31fa5d7fe9ab9216e"`);
        await queryRunner.query(`DROP INDEX "IDX_bc0da8e5c279d67848c25be903"`);
        await queryRunner.query(`DROP TABLE "livro_autores_autor"`);
        await queryRunner.query(`DROP TABLE "emprestimo"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "livro"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
        await queryRunner.query(`DROP TABLE "autor"`);
    }

}
