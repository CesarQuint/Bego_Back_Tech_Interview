import { Document, Schema, model } from 'mongoose';

export interface PointDocumentProps extends Document {
  location: {
    name: string;
    placeId: string;
  };
}

const pointSchema = new Schema<PointDocumentProps>({
  location: {
    name: String,
    placeId: String,
  },
});

const PointModel = model<PointDocumentProps>('Point', pointSchema);

export default PointModel;
