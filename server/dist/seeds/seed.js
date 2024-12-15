import { AppDataSource } from "../db.js";
import { NewsPost } from "../entity/NewsPost.js";
import { User } from "../entity/User.js";
import { faker } from "@faker-js/faker";
async function runSeed() {
    await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(User);
    const postRepo = AppDataSource.getRepository(NewsPost);
    const user = userRepo.create({
        email: "user@test.com",
        password: "password"
    });
    await userRepo.save(user);
    const news = Array.from({ length: 20 }).map(() => postRepo.create({
        header: faker.lorem.sentence(),
        text: faker.lorem.paragraphs(2),
        author: user
    }));
    await postRepo.save(news);
    process.exit(0);
}
runSeed().catch((e) => {
    console.log(e);
});
// run after migrations
// npm run build -> node ./dist/seeds/seed.js
