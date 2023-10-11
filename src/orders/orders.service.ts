import models from '../db';

interface createOrderProps {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  kind: string;
  description: string;
  weight: number;
  route: string;
  truck: string;
}

async function getOrder(userId: string, orderId: string) {
  try {
    const user = await models.UserModel.findById(userId);

    if (!user) throw new Error('No se ha encontrado el Usuario');

    const order = await models.OrderModel.findById(orderId)
      .populate('truck')
      .populate('route.pickUp')
      .populate('route.DropOff');

    console.log(order?.userId.toString(), userId);

    if (order?.userId.toString() !== userId) {
      throw new Error('No tienes la autorizacion para esta orden');
    }

    return {
      ok: true,
      order,
    };
  } catch (error: any) {
    throw error;
  }
}

async function getOrders(userId: string) {
  try {
    const user = await models.UserModel.findById(userId);

    if (!user) throw new Error('No se ha encontrado el Usuario');

    const orders = await models.OrderModel.find({ userId: userId })
      .populate('truck')
      .populate('route.pickUp')
      .populate('route.DropOff');

    return {
      ok: true,
      orders,
    };
  } catch (error: any) {
    throw error;
  }
}

async function createOrder(data: createOrderProps) {
  try {
    const user = await models.UserModel.findById(data.user._id);

    if (!user) throw new Error('No se ha encontrado una cuenta asociada');

    const existTruck = await models.TruckModel.findById({ _id: data.truck });

    if (!existTruck) throw new Error('No se ha encontrado el Camion ');

    if (existTruck.transportWeight < data.weight)
      throw new Error(
        'El pedido excede el peso para ese camion ,Intenta con otro  '
      );

    const existRoute = await models.RouteModel.findById(data.route);

    if (!existRoute)
      throw new Error(
        'Ruta no encontrada por favor verifica las rutas actuales'
      );

    const order = new models.OrderModel({
      userId: user._id,
      kind: data.kind,
      description: data.description,
      weight: data.weight,
      truck: existTruck._id,
      route: { pickUp: existRoute.pointA, DropOff: existRoute.pointB },
      status: 'pending',
    });

    await order.save();

    const finalOrder = await getOrder(user._id.toString(), order._id);

    return {
      ok: true,
      order: finalOrder,
    };
  } catch (error: any) {
    throw error;
  }
}

async function updateOrder(data: any) {
  try {
  } catch (error: any) {
    throw error;
  }
}

async function deleteOrder(data: any) {
  try {
  } catch (error: any) {
    throw error;
  }
}

export const ordersService = {
  getOrder,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
