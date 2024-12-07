import { User } from "../entity/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppDataSource } from "../db.js";
export default class UserRepository {
    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    async registerUser(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.repository.create({ email, password: hashedPassword });
        await this.repository.save(user);
        const token = jwt.sign({ email }, "SomeSecretKey", { expiresIn: "1h" });
        return token;
    }
    async loginUser(email, password) {
        const user = await this.repository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return { error: "Incorrect credentials" };
        }
        return jwt.sign({ email }, "SomeSecretKey", { expiresIn: "1h" });
    }
    async getUserByEmail(email) {
        return this.repository.findOne({ where: { email } });
    }
}
