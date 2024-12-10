import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDeletedColumns1733774555699 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "user",
            new TableColumn({
                name:"deleted",
                type:"boolean",
                default:false
            })
        )

        await queryRunner.addColumn(
            "news_post",
            new TableColumn({
                name:"deleted",
                type: "boolean",
                default: false
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user','deleted')
        await queryRunner.dropColumn('news_post', 'deleted')
    }

}
