import mongoose, { Document, Schema } from 'mongoose';

export interface AdminDocument extends Document {
  email: string;
  password: string;
}

const adminSchema = new Schema<AdminDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model<AdminDocument>('Admin', adminSchema);

export default Admin;
