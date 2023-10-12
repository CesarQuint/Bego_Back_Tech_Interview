import models from '../db';
import { getDistance, getCoordinates } from '../services/maps';
import mongoose from 'mongoose';

interface createRouteProps {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  pointA: string;
  pointB: string;
}

interface updateRuteProps {
  id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  route: {
    [key: string]: any; // Añade esta línea
    _id: string;
    pointA: string;
    pointB: string;
    route_to: string;
    kilometers: number;
  };
}

interface deleteOrderProps {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  id: string;
}

async function getRoutes(data: any) {
  try {
    const routes = await models.RouteModel.find();

    return { ok: true, routes };
  } catch (error) {
    throw error;
  }
}

async function getRoute(id: any) {
  try {
    const route = await models.RouteModel.findById(id);

    if (!route) throw new Error('No se ha encontrado una ruta asociada');

    return { ok: true, route };
  } catch (error) {
    throw error;
  }
}

async function createRoute(data: createRouteProps) {
  try {
    const user = await models.UserModel.findById(data.user._id);

    if (!user) throw new Error('No se ha encontrado la credencial del usuario');

    if (!data.pointA || !data.pointB)
      throw new Error(
        'El punto de partida y llegada son necesarios,verifica los campos'
      );

    const [pickUp, dropOff] = await Promise.all([
      await models.PointModel.findById(data.pointA),
      await models.PointModel.findById(data.pointB),
    ]);

    if (!pickUp)
      throw new Error('El punto de partida no se encuentra disponible');

    if (!dropOff)
      throw new Error('El punto de llegada no se encuentra disponible');

    const exitentRoute = await models.RouteModel.findOne({
      pointA: data.pointA,
      pointB: data.pointB,
    });

    if (exitentRoute)
      throw new Error(
        `Ya hay una ruta con el punto de salida: ${pickUp.location.name} a llegada: ${dropOff.location.name}`
      );

    const [originLocation, destinationLocation] = await Promise.all([
      getCoordinates(pickUp.location.placeId),
      getCoordinates(dropOff.location.placeId),
    ]);

    if (originLocation && destinationLocation) {
      const origin = `${originLocation.lat},${originLocation.lng}`;
      const destination = `${destinationLocation.lat},${destinationLocation.lng}`;
      const distance = await getDistance(origin, destination);

      if (distance !== null) {
        const newRoute = await new models.RouteModel({
          pointA: pickUp._id,
          pointB: dropOff._id,
          routeTo: `De ${pickUp.location.name} a ${dropOff.location.name}`,
          kilometers: distance,
        });

        await newRoute.save();

        return {
          ok: true,
          route: newRoute,
        };
      } else {
        throw new Error('Error al obtener la distancia entre las rutas');
      }
    } else {
      throw new Error('Error al obtener las coordenadas de origen y/o destino');
    }
  } catch (error: any) {
    throw error;
  }
}
async function updateRoute(data: updateRuteProps) {
  try {
    const user = await models.UserModel.findById(data.user._id);

    if (!user) throw new Error('No se ha encontrado el Usuario');

    const route: any = await models.RouteModel.findById(data.id);

    if (!route) {
      throw new Error('No se encontro la Ruta ');
    }

    const orders = await models.OrderModel.find({
      'route.pickUp': route?.pointA,
      'route.DropOff': route?.pointB,
    });

    if (orders.length > 0) {
      throw new Error('No se puede actualizar una ruta que tenga una Orden ');
    }

    const keys = Object.keys(route._doc);

    for (let key of keys) {
      if (key === 'pointA' || key === 'pointB') {
        if (route[key].toString() !== data.route[key].toString()) {
          const exitentRoute = await models.RouteModel.findOne({
            pointA: data.route.pointA,
            pointB: data.route.pointB,
          });

          if (exitentRoute) {
            throw new Error('Ya hay una ruta con esa informacion');
          }

          const [pickUp, dropOff] = await Promise.all([
            await models.PointModel.findById(data.route.pointA),
            await models.PointModel.findById(data.route.pointB),
          ]);

          if (!pickUp)
            throw new Error('El punto de partida no se encuentra disponible');

          if (!dropOff)
            throw new Error('El punto de llegada no se encuentra disponible');

          const [originLocation, destinationLocation] = await Promise.all([
            getCoordinates(pickUp.location.placeId),
            getCoordinates(dropOff.location.placeId),
          ]);

          if (originLocation && destinationLocation) {
            const origin = `${originLocation.lat},${originLocation.lng}`;
            const destination = `${destinationLocation.lat},${destinationLocation.lng}`;
            const distance = await getDistance(origin, destination);

            if (distance !== null) {
              const newRoute = await new models.RouteModel({
                pointA: pickUp._id,
                pointB: dropOff._id,
                routeTo: `De ${pickUp.location.name} a ${dropOff.location.name}`,
                kilometers: distance,
              });

              route.pointA = pickUp._id;
              route.pointB = dropOff._id;
              route.routeTo = `De ${pickUp.location.name} a ${dropOff.location.name}`;
              route.kilometers = distance;

              await route.save();

              return {
                ok: true,
                route,
              };
            } else {
              throw new Error('Error al obtener la distancia entre las rutas');
            }
          } else {
            throw new Error(
              'Error al obtener las coordenadas de origen y/o destino'
            );
          }
        }
      } else {
        route[key] = data.route[key];
      }
    }
  } catch (error) {
    throw error;
  }
}
async function deleteRoute(data: deleteOrderProps) {
  try {
    const user = await models.UserModel.findById(data.user._id);

    if (!user) throw new Error('No se ha encontrado la credencial del usuario');

    const route = await models.RouteModel.findById(data.id);

    const orders = await models.OrderModel.find({
      'route.pickUp': route?.pointA,
      'route.DropOff': route?.pointB,
    });

    if (orders.length > 0) {
      throw new Error('No se puede eliminar una ruta que tenga una Orden ');
    }

    if (orders.length == 0) await models.RouteModel.findByIdAndDelete(data.id);

    return {
      ok: true,
    };
  } catch (error) {
    throw error;
  }
}

export const routeService = {
  getRoute,
  getRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
};
