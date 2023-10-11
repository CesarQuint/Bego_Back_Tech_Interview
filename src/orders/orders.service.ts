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

interface updateOrderProps {
  id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  order: {
    [key: string]: any; // Añade esta línea
    _id: string;
    userId: string;
    kind: string;
    description: string;
    weight: number;
    route: { pickUp: string; DropOff: string } | string;
    truck: string;
  };
}

interface deleteOrderProps {
  id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

async function getOrder(userId: string, orderId: string) {
  try {
    const user = await models.UserModel.findById(userId);

    if (!user) throw new Error('No se ha encontrado el Usuario');

    const order = await models.OrderModel.findById(orderId)
      .populate('truck')
      .populate('route.pickUp')
      .populate('route.DropOff');

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

async function updateOrder(data: updateOrderProps) {
  try {
    const user = await models.UserModel.findById(data.user._id);

    if (!user) throw new Error('No se ha encontrado el Usuario');

    const order: any = await models.OrderModel.findById(data.id)
      .populate('truck')
      .populate('route.pickUp')
      .populate('route.DropOff')
      .select('-__v');

    if (order?.userId.toString() !== data.user._id) {
      throw new Error('No tienes la autorizacion para esta orden');
    }

    const keys = Object.keys(order._doc);

    if (order.status == 'inProgress')
      throw new Error('No puedes modificar una orden en Progreso');

    if (order.status == 'pending') {
      for (const key of keys) {
        order[key] = data.order[key];
      }
      await order.save();
    }

    const updatedOrder = await getOrder(user._id.toString(), order._id);

    return {
      ok: true,
      order: updatedOrder,
    };
  } catch (error: any) {
    throw error;
  }
}

async function deleteOrder(data: deleteOrderProps) {
  try {
    const user = await models.UserModel.findById(data.user._id);

    if (!user) throw new Error('No se ha encontrado el Usuario');

    const order: any = await models.OrderModel.findById(data.id);

    if (order?.userId.toString() !== data.user._id) {
      throw new Error('No tienes la autorizacion para esta orden');
    }

    if (order.status == 'inProcess')
      throw new Error('No puedes cancelar una orden en proceso');

    await models.OrderModel.findByIdAndDelete(order._id);

    return { ok: true };
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
