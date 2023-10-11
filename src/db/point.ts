import { Document, Schema, model, Types } from 'mongoose';

export interface PointDocument extends Document {
  location: {
    name: string;
    placeId: Types.ObjectId;
  };
}

const pointSchema = new Schema<PointDocument>({
  location: {
    name: String,
    placeId: Types.ObjectId,
  },
});

const PointModel = model<PointDocument>('Point', pointSchema);

export default PointModel;
