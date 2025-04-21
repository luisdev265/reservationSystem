import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import user from './routes/usersRoutes.js'
import reservation from './routes/reservasRoutes.js'
import courts from './routes/courtsRoutes.js'

dotenv.config();

const app = express();

const server = (PORT) => {
    app.use(cors());
    app.use(express.json());
    app.use('/users', user);
    app.use('/reservations', reservation);
    app.use('/courts', courts);
    
    app.get('/', async (req, res) => {
      try {
        res.send('Hello World'); 
      }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
      }
    });

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port http://192.168.1.67:${PORT}`); 
    })
}

export default server;