import { Document, Schema, model, Types } from 'mongoose';

export interface OrderDocumentProps extends Document {
  kind: { type: String; enum: ['express,standard,international'] };
  description: String;
  weight: number;
  route: {
    pickUp: Types.ObjectId;
    DropOff: Types.ObjectId;
  };
  status: {
    type: String;
    enum: ['pending', 'inProgress', 'complete', 'failed'];
  };
  truck: Types.ObjectId;
}

const orderSchema = new Schema<OrderDocumentProps>({
  kind: String,
  description: String,
  weight: Number,
  route: {
    pickUp: { ref: 'Point' },
    DropOff: { ref: 'Point' },
  },
  status: String,
  truck: { ref: 'Truck' },
});

const OrderModel = model<OrderDocumentProps>('Order', orderSchema);

export default OrderModel;
