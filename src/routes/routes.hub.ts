import { Request, Response } from 'express';
import { routeService } from './routes.service';

async function getRoutes(req: Request, res: Response) {
  try {
  } catch (error) {}
}

async function getRoute(req: Request, res: Response) {
  try {
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function createRoute(req: Request, res: Response) {
  try {
    const { user }: any = req.headers;
    const { pointA, pointB } = req.body;
    const newRoute = await routeService.createRoute({ user, pointA, pointB });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function updateRoute(req: Request, res: Response) {
  try {
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function deleteRoute(req: Request, res: Response) {
  try {
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

export { getRoute, getRoutes, createRoute, updateRoute, deleteRoute };
