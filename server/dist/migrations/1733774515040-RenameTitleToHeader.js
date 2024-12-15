export class RenameTitleToHeader1733774515040 {
    async up(queryRunner) {
        await queryRunner.renameColumn('news_post', 'title', 'header');
    }
    async down(queryRunner) {
        await queryRunner.renameColumn("posts", "header", "title");
    }
}
