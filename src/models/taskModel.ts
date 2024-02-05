import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  description: string;
  dueTime: Date;
  status: 'pending' | 'overdue' | 'completed';
  studentId: string; // Reference to the Student model
}

const TaskSchema: Schema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'overdue', 'completed'],
    default: 'pending',
  },
  dueTime: { type: Date, required: false },
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
