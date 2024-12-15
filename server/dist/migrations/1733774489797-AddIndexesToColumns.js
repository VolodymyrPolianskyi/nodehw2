import { TableIndex } from "typeorm";
export class AddIndexesToColumns1733774489797 {
    async up(queryRunner) {
        await queryRunner.createIndex('user', new TableIndex({
            name: "IDX_user_email",
            columnNames: ["email"],
            isUnique: true
        }));
        await queryRunner.createIndex('user', new TableIndex({
            name: "IDX_user_user_id",
            columnNames: ["user_id"],
            isUnique: true
        }));
        await queryRunner.createIndex('news_post', new TableIndex({
            name: "IDX_post_id",
            columnNames: ["id"],
            isUnique: true
        }));
        await queryRunner.createIndex('news_post', new TableIndex({
            name: "IDX_post_user_id",
            columnNames: ["user_id"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('user', 'IDX_user_email');
        await queryRunner.dropIndex('user', 'IDX_user_user_id');
        await queryRunner.dropIndex('news_post', 'IDX_post_id');
        await queryRunner.dropIndex('news_post', 'IDX_post_user_id');
    }
}
// npm run build
// npx typeorm migration:run -d ./dist/db.js
