import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { existingUserLogin, registerUser, existingUserRegister } from '../db/queries/authQueries.js';

dotenv.config();

export const register = async (user) => {
    const { username, email, password } = user;

    //Check all the required fields are provided
    if (!username || !email || !password) {
        console.log({username, email, password});
        throw new Error("All fields are required");
    }

    // Check if the email already exists
    const userExist = await existingUserRegister(email);
    if (userExist) {
        throw new Error("Email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const { InserId, newUser } = await registerUser(username, email, hashedPassword);

    // Generate a JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT secret is not defined');
    }
    const token = jwt.sign({ userId: InserId }, secret, { expiresIn: '7d' });

    return { token, newUser };
}

export const logIn = async (user) => {

    //User data 
    const { email, password } = user;

    //Validate all the required fields are provided
    if (!email || !password) {
        throw new Error("All fields are required");
    }

    //Function tu get user data 
    const userData = await existingUserLogin(email);

    //Compare passwords are equals
    const passwordMatch = await bcrypt.compare(password, userData.password);

    //Validation for bad password
    if ( !passwordMatch ) {
        throw new Error("Invalid credentials");
    }

    // Generate a JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT secret is not defined");
    }

    //Excluir al contraseña de los datos del usuario
    const { password: _, ...userExist} = userData;

    //Crear y devolver el token junto con los datos del usuario
    const token = jwt.sign({ userId: userExist.id, userName: userExist.name }, secret, { expiresIn: '7d' });

    return { token, userExist };
}