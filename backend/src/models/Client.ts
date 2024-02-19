import mongoose, { Document, Schema } from 'mongoose';

interface IClipboard {
  data: string;
  createdAt: Date;
}

interface IClient extends Document {
  macAddress: string;
  isConnected: boolean;
  clipboards: IClipboard[];
  createdAt: Date;
}

const ClipboardSchema: Schema = new Schema({
  data: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ClientSchema: Schema = new Schema({
  macAddress: { type: String, required: true, unique: true },
  isConnected: { type: Boolean, required: true, default: false },
  clipboards: [ClipboardSchema], // Array of clipboard data
  createdAt: { type: Date, default: Date.now },
});

export const Client = mongoose.model<IClient>('Client', ClientSchema);
