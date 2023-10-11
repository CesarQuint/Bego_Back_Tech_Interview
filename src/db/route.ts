import { Document, Schema, model, Types } from 'mongoose';

export interface RouterDocumentProps extends Document {
  userId: Types.ObjectId;
  pointA: Types.ObjectId;
  pointB: Types.ObjectId;
  routeTo: string;
  kilometers: number;
}

const routerSchema = new Schema<RouterDocumentProps>({
  userId: { ref: 'User' },
  pointA: { ref: 'Point' },
  pointB: { ref: 'Point' },
  routeTo: String,
  kilometers: Number,
});

const RouteModel = model<RouterDocumentProps>('Route', routerSchema);

export default RouteModel;
