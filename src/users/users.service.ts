import models from '../db';

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

//Interfaces

async function userSignUp(data: userSignUpProps) {
  try {
    const user = await models.UserModel.findOne({ email: data.email });

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
    const user: any = await models.UserModel.findOne({ email });
    if (!user) {
      throw new Error('No hay una cuenta con ese correo');
    }
    console.log(user.password, password);

    if (user.password !== password) {
      throw new Error('La contraseña es incorrecta');
    }

    return { ok: true };
  } catch (error) {
    throw error;
  }
}

export const Service = { userSignUp, userLogIn };
