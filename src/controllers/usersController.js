import dotenv from 'dotenv';
import { register, logIn } from '../models/users.js';

dotenv.config();

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { token, newUser } = await register(req.body);
        res.status(201).json({message:"User creates succssesfull", user: newUser, token: token });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const userLogIn = async (req, res) => {
    try {
        const { token, userExist } = await logIn(req.body);
        res.status(200).json({message: "Iniciando sesion", user: userExist, token: token})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}