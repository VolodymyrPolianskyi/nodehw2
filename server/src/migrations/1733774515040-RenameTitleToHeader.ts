import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTitleToHeader1733774515040 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('news_post','title', 'header')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("posts", "header", "title")
    }

}
