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
    async getAllUsersWithNotifications() {
        return this.repository.find({
            where: {
                sendNotification: true,
            },
        });
    }
    async getUserByEmail(email) {
        return this.repository.findOne({ where: { email } });
    }
    async toggleNotif(email) {
        try {
            let user = await this.repository.findOne({ where: { email } });
            await this.repository.update(user.user_id, { ...user, sendNotification: !user.sendNotification });
            return { message: 'ok' };
        }
        catch (error) {
            console.log(error);
            return { error: error.message };
        }
    }
    async toggleNotifChannel(email) {
        try {
            let user = await this.repository.findOne({ where: { email } });
            let channel;
            if (user.notificationChannel == 'log') {
                channel = 'alert';
            }
            else {
                channel = 'log';
            }
            await this.repository.update(user.user_id, { ...user, notificationChannel: channel });
            return { message: 'ok' };
        }
        catch (error) {
            console.log(error);
            return { error: error.message };
        }
    }
}
