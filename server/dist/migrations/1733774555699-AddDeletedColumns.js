import { TableColumn } from "typeorm";
export class AddDeletedColumns1733774555699 {
    async up(queryRunner) {
        await queryRunner.addColumn("user", new TableColumn({
            name: "deleted",
            type: "boolean",
            default: false
        }));
        await queryRunner.addColumn("news_post", new TableColumn({
            name: "deleted",
            type: "boolean",
            default: false
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('user', 'deleted');
        await queryRunner.dropColumn('news_post', 'deleted');
    }
}
