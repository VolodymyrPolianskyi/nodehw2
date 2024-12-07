import { config } from 'dotenv'
config()
import "reflect-metadata";
import express, {Request, Response} from'express'
import path from'path'
import cors from'cors'
import { AppDataSource } from './db.js'
import newsRouter from './routes/news.routes.js'
import usersRouter from './routes/users.routes.js'
import authenticateToken from './middlewares/jwt.auth.js'
import UserRepository from './repository/UserRepository.js'

const app = express();
const PORT = process.env.PORT || 8000;

AppDataSource.initialize().then(()=>{
  console.log("initialized");
  app.use(cors())
  app.use(express.json())
  app.use('/api/auth', usersRouter)
  app.use('/api/newsposts', newsRouter)
  
  app.get('/api/user', authenticateToken, async (req:Request, res:Response) => {
    try {
      const email = res.locals.user.email;
      const userRepo = new UserRepository();
      const user = await userRepo.getUserByEmail(email);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return
      }
      res.json({ email: user.email });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`http://${process.env.HOST}:${PORT}`);
  });
})
.catch(e=>{console.log(e);
})
