import { config } from 'dotenv';
config();
import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './db.js';
import newsRouter from './routes/news.routes.js';
import usersRouter from './routes/users.routes.js';
import authenticateToken from './middlewares/jwt.auth.js';
import UserRepository from './repository/UserRepository.js';
import { setupSwagger } from './swagger.config.js';
import { Server } from 'socket.io';
const app = express();
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
AppDataSource.initialize()
    .then(() => {
    console.log("Database initialized");
    app.use(cors());
    app.use(express.json());
    setupSwagger(app);
    app.use('/api/auth', usersRouter);
    app.use('/api/newsposts', newsRouter(io));
    app.get('/api/user', authenticateToken, async (req, res) => {
        try {
            const email = res.locals.user.email;
            const userRepo = new UserRepository();
            const user = await userRepo.getUserByEmail(email);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json({ email: user.email });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    });
})
    .catch((error) => {
    console.error('Error initializing database:', error);
});
