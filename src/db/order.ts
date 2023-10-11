import { Document, Schema, model } from 'mongoose';

export interface OrderDocumentProps extends Document {
  userId: Schema.Types.ObjectId;
  kind: { type: String; enum: ['express', 'standard', 'scheduled'] };
  description: String;
  weight: number;
  route: {
    pickUp: Schema.Types.ObjectId;
    DropOff: Schema.Types.ObjectId;
  };
  status: {
    type: String;
    enum: ['pending', 'inProgress', 'complete', 'failed'];
  };
  truck: Schema.Types.ObjectId;
}

const orderSchema = new Schema<OrderDocumentProps>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  kind: { type: String, enum: ['express', 'standard', 'international'] },
  description: String,
  weight: Number,
  route: {
    pickUp: { type: Schema.Types.ObjectId, ref: 'Point' },
    DropOff: { type: Schema.Types.ObjectId, ref: 'Point' },
  },
  status: {
    type: String,
    enum: ['pending', 'inProgress', 'complete', 'failed'],
  },
  truck: { type: Schema.Types.ObjectId, ref: 'Truck' },
});

const OrderModel = model<OrderDocumentProps>('Order', orderSchema);

export default OrderModel;
