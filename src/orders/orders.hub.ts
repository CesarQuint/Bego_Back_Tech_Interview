import { Request, Response } from 'express';
import { ordersService } from './orders.service';

async function getOrder(req: Request, res: Response) {
  try {
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function getOrders(req: Request, res: Response) {
  try {
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function createOrder(req: Request, res: Response) {
  try {
    const { user }: any = req.headers;
    const { kind, description, weight, route, truck } = req.body;

    const response = await ordersService.createOrder({
      user,
      kind,
      description,
      weight,
      route,
      truck,
    });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function updateOrder(req: Request, res: Response) {
  try {
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

async function deleteOrder(req: Request, res: Response) {
  try {
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}

export { getOrder, getOrders, createOrder, updateOrder, deleteOrder };
