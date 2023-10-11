import { Request, Response } from 'express';
import { Service } from './users.service';

async function userLogIn(req: Request, res: Response) {
  try {
    const { password, email } = req.body;
    if (!email || !password) {
      throw new Error('Todos los campos son necesarios');
    }

    const response: any = await Service.userLogIn({ email, password });
    if (response.ok) {
      res.status(200).json({ msg: 'Logeado con exito' });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}
async function userSignUp(req: Request, res: Response) {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      throw new Error('Todos los campos son necesarios');
    }

    const response: any = await Service.userSignUp({ email, name, password });

    if (response.ok) {
      return res.status(200).json({ msg: 'Usuario registrado con exito' });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

export { userLogIn, userSignUp };
