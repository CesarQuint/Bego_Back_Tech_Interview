import { Request, Response } from 'express';
import { PointsService } from './points.service';

interface User {
  _id: string;
  email: string;
  name: string;
}

async function getPoints(req: Request, res: Response) {
  try {
    const { _id, email, name } = req.headers as unknown as User;

    const user: User = { _id, email, name };

    const response: any = await PointsService.getPoints({ user });

    if (response.ok) {
      return res.status(200).json({ points: response.points });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

export { getPoints };
