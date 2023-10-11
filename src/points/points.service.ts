import models from '../db';

interface getPointsProps {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

async function getPoints(data: getPointsProps) {
  try {
    const points = await models.PointModel.find();
    if (points.length > 0) {
      return { ok: true, points };
    }
    if (points.length == 0) {
      throw new Error('No hay datos registrados aun');
    }
  } catch (error) {
    throw new Error(
      'Error al conectar con la base de datos ,por favor intente mas tarde'
    );
  }
}

export const PointsService = {
  getPoints,
};
