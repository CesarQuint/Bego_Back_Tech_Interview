import { Document, Schema, model } from 'mongoose';

interface TruckDocument extends Document {
  model: string;
  make: string;
  year: number;
  color: string;
  transportWeight: number;
  created_at: number;
}

const truckSchema = new Schema<TruckDocument>({
  model: String,
  make: String,
  year: Number,
  color: String,
  transportWeight: Number,
  created_at: Number,
});

const TruckModel = model<TruckDocument>('Truck', truckSchema);

export default TruckModel;
