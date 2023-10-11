import { Document, Schema, model } from 'mongoose';

export interface RouterDocumentProps extends Document {
  pointA: Schema.Types.ObjectId;
  pointB: Schema.Types.ObjectId;
  routeTo: string;
  kilometers: number;
}

const routerSchema = new Schema<RouterDocumentProps>({
  pointA: { type: Schema.Types.ObjectId, ref: 'Point' },
  pointB: { type: Schema.Types.ObjectId, ref: 'Point' },
  routeTo: String,
  kilometers: Number,
});

const RouteModel = model<RouterDocumentProps>('Route', routerSchema);

export default RouteModel;
