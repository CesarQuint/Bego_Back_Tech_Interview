import { Request, Response } from 'express';
import { PointsService } from './points.service';

async function getPoints(req: Request, res: Response) {
  try {
    const { user }: any = req.headers;
    const response: any = await PointsService.getPoints({ user });
    if (response.ok) {
      return res.status(200).json({ points: response.points });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

export { getPoints };
