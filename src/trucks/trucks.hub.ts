import { Request, Response } from 'express';
import { TrucksService } from './truck.service';
import { Document } from 'mongoose';

interface TruckDocumentProps extends Document {
  _id: string;
  model: string;
  make: string;
  year: number;
  color: string;
  transportWeight: number;
  created_at: number;
}

interface User {
  _id: string;
  email: string;
  name: string;
}

type GetTrucksResponse =
  | { ok: boolean; trucks?: TruckDocumentProps[] }
  | undefined;

async function getTrucks(req: Request, res: Response) {
  try {
    const { _id, email, name } = req.headers as unknown as User;

    const user: User = { _id, email, name };

    const response: GetTrucksResponse = await TrucksService.getTrucks({ user });

    if (response !== undefined && response.ok) {
      return res.status(200).json({ trucks: response.trucks });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

export { getTrucks };
