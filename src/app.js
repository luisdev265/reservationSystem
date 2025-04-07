import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import user from './routes/usersRoutes.js'

dotenv.config();

const app = express();

const server = (PORT) => {
    app.use(cors());
    app.use(express.json());
    app.use('/users', user);
    
    app.get('/', async (req, res) => {
      try {
        res.send('Hello World'); 
      }catch (error) {
        console.log(error);
      }
    });

    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`); 
    })
}

export default server;