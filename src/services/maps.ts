import axios from 'axios';

async function getCoordinates(placeId: string) {
  try {
    const key: string | any = process.env.MAPS_KEY;

    if (key?.length > 1) {
      const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${key}`;
      const geocodingResponse = await axios.get(geocodingUrl);
      if (geocodingResponse.data.status === 'OK') {
        const location = geocodingResponse.data.results[0].geometry.location;

        return location;
      }
      throw new Error('Error al hacer la peticion');
    }
  } catch (error: any) {
    throw error;
  }
}

async function getDistance(origin: string, destination: string) {
  try {
    const key: string | undefined = process.env.MAPS_KEY;
    if (key) {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${key}`;
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
        let distance = response.data.rows[0].elements[0].distance.text;
        distance = distance.split(' ')[0].split(',');
        distance = distance.reduce((a: any, b: any) => `${a}` + `${b}`);

        return Number(distance);
      } else {
        throw new Error('Error al hacer la peticion');
      }
    }
  } catch (error) {
    throw error;
  }
}

export { getCoordinates, getDistance };
