import { Document, Schema, model, Types } from 'mongoose';

export interface RouterDocument extends Document {
  pointA: { type: Types.ObjectId; ref: 'Point' };
  pointB: { type: Types.ObjectId; ref: 'Point' };
  routeTo: String;
  kilometers: number;
  order: { type: Types.ObjectId; ref: 'Order' };
}
