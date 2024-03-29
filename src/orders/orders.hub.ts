import { Request, Response } from 'express';
import { ordersService } from './orders.service';

interface User {
  _id: string;
  email: string;
  name: string;
}

async function getOrder(req: Request, res: Response) {
  try {
    const { _id, email, name } = req.headers as unknown as User;

    const user: User = { _id, email, name };

    const { id } = req.params;

    const response: any = await ordersService.getOrder(user._id, id);
    if (response.ok) {
      res.status(200).json({ ok: true, order: response.order });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function getOrders(req: Request, res: Response) {
  try {
    const { _id, email, name } = req.headers as unknown as User;

    const user: User = { _id, email, name };

    const response: any = await ordersService.getOrders(user._id);

    if (response.ok) {
      res.status(200).json({ ok: true, orders: response.orders });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function createOrder(req: Request, res: Response) {
  try {
    const { _id, email, name } = req.headers as unknown as User;

    const user: User = { _id, email, name };

    const { kind, description, weight, route, truck } = req.body;

    const response: any = await ordersService.createOrder({
      user,
      kind,
      description,
      weight,
      route,
      truck,
    });

    if (response.ok) {
      res.status(200).json({
        ok: true,
        msg: 'Orden creada con exito',
        order: response.order,
      });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function updateOrder(req: Request, res: Response) {
  try {
    const { _id, email, name } = req.headers as unknown as User;

    const user: User = { _id, email, name };

    const { id } = req.params;
    const { order } = req.body;

    const response: any = await ordersService.updateOrder({ user, id, order });

    if (response.ok) {
      res.status(200).json({
        ok: true,
        msg: 'Orden actualizada con exito',
        route: response.order,
      });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function deleteOrder(req: Request, res: Response) {
  try {
    const { _id, email, name } = req.headers as unknown as User;

    const user: User = { _id, email, name };

    const { id } = req.params;

    const response: any = await ordersService.deleteOrder({ user, id });

    if (response.ok) {
      res.status(200).json({
        ok: true,
        msg: 'Orden eliminada',
      });
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

export { getOrder, getOrders, createOrder, updateOrder, deleteOrder };
