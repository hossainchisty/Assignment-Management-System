import mongoose, { Document, Schema } from 'mongoose';

export interface StudentDocument extends Document {
  _id: string;
  name: string;
  email: string;
  department: string;
  password: string;
}

const studentSchema = new Schema<StudentDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  password: { type: String, required: true },
});

const Student = mongoose.model<StudentDocument>('Student', studentSchema);

export default Student;
