import { Document, Schema, model, Types } from 'mongoose';

export interface PointDocumentProps extends Document {
  location: {
    name: string;
    placeId: Types.ObjectId;
  };
}

const pointSchema = new Schema<PointDocumentProps>({
  location: {
    name: String,
    placeId: Types.ObjectId,
  },
});

const PointModel = model<PointDocumentProps>('Point', pointSchema);

export default PointModel;
