import { Request, Response } from 'express';
import { routeService } from './routes.service';

async function getRoutes(req: Request, res: Response) {
  try {
    const response = await routeService.getRoutes({});
    if (response.ok) {
      res.status(200).json({ ok: true, routes: response.routes });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function getRoute(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const response = await routeService.getRoute(id);
    if (response.ok) {
      res.status(200).json({ ok: true, route: response.route });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function createRoute(req: Request, res: Response) {
  try {
    const { user }: any = req.headers;

    const { pointA, pointB } = req.body;

    const newRoute = await routeService.createRoute({ user, pointA, pointB });

    if (newRoute.ok) {
      res.status(200).json({
        ok: true,
        msg: 'Ruta creada con Exito',
        route: newRoute.route,
      });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function updateRoute(req: Request, res: Response) {
  try {
    const { user }: any = req.headers;

    const { id } = req.params;

    const { route } = req.body;

    const response = await routeService.updateRoute({ user, id, route });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function deleteRoute(req: Request, res: Response) {
  try {
    const { user }: any = req.headers;

    const { id } = req.params;

    const response: any = await routeService.deleteRoute({ user, id });

    if (response.ok) {
      res.status(200).json({ ok: true, msg: 'Se elimino la Ruta' });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

export { getRoute, getRoutes, createRoute, updateRoute, deleteRoute };
