import models from '../db';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

//Interfaces

interface userSignUpProps {
  name: string;
  email: string;
  password: string;
}

interface userLogInProps {
  email: string;
  password: string;
}

interface User extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  token?: string;
}

//Interfaces

async function userSignUp(data: userSignUpProps) {
  try {
    const user: User | null = await models.UserModel.findOne({
      email: data.email,
    });

    if (!user) {
      const newUser = new models.UserModel(data);

      await newUser.save();
      return { ok: true };
    }
    throw new Error('Ya hay una cuenta asociada ');
  } catch (error) {
    throw error;
  }
}

async function userLogIn(data: userLogInProps) {
  try {
    const { email, password } = data;
    const user: User | null = await models.UserModel.findOne({ email });
    if (!user) {
      throw new Error('No hay una cuenta con ese correo');
    }

    if (user.password !== password) {
      throw new Error('La contraseña es incorrecta');
    }

    const secretKey: any | undefined = process.env.SECRET_KEY;

    const userData = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(userData, secretKey, { expiresIn: '1h' });

    user.token = token;
    user.save();

    return { ok: true, token };
  } catch (error) {
    throw error;
  }
}

export const UserService = { userSignUp, userLogIn };
