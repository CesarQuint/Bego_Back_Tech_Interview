import { Request, Response } from 'express';
import { TrucksService } from './truck.service';

async function getTrucks(req: Request, res: Response) {
  try {
    const { user }: any = req.headers;
    const response: any = await TrucksService.getTrucks({ user });
    if (response.ok) {
      return res.status(200).json({ trucks: response.trucks });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

export { getTrucks };
