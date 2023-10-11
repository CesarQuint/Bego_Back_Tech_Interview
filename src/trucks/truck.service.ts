import models from '../db';

interface getTrucksProps {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

async function getTrucks(data: getTrucksProps) {
  try {
    const trucks = await models.TruckModel.find();
    if (trucks.length > 0) {
      return { ok: true, trucks };
    }
    if (trucks.length == 0) {
      throw new Error('No hay datos registrados aun');
    }
  } catch (error) {
    throw new Error(
      'Error al conectar con la base de datos ,por favor intente mas tarde'
    );
  }
}

export const TrucksService = {
  getTrucks,
};
