import models from '../db';
import { getDistance, getCoordinates } from '../services/maps';

interface createRouteProps {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  pointA: string;
  pointB: string;
}

async function getRoutes(data: any) {
  try {
  } catch (error) {
    throw error;
  }
}

async function getRoute(data: any) {
  try {
  } catch (error) {
    throw error;
  }
}
async function createRoute(data: createRouteProps) {
  try {
    const user = await models.UserModel.findById(data.user._id);

    if (!user) {
      throw new Error('No se ha encontrado la credencial del usuario');
    }

    if (!data.pointA || !data.pointB) {
      throw new Error(
        'El punto de partida y llegada son necesarios,verifica los campos'
      );
    }
    const [originLocation, destinationLocation] = await Promise.all([
      getCoordinates('ChIJ68vJGdf3D5QRnIjueC_Y0nw'),
      getCoordinates('ChIJiQPXwtk0o5URj2cW455eew4'),
    ]);

    if (originLocation && destinationLocation) {
      const origin = `${originLocation.lat},${originLocation.lng}`;
      const destination = `${destinationLocation.lat},${destinationLocation.lng}`;
      const distance = await getDistance(origin, destination);

      if (distance !== null) {
        console.log(`La distancia entre las ubicaciones es ${distance}`);
      } else {
        console.error('Error al obtener la distancia');
      }
    } else {
      console.error('Error al obtener las coordenadas de origen y/o destino');
    }
  } catch (error: any) {
    throw error;
  }
}
async function updateRoute(data: any) {
  try {
  } catch (error) {
    throw error;
  }
}
async function deleteRoute(data: any) {
  try {
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
