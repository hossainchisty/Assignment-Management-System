import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Task from '../models/taskModel';
import Student from '../models/studentModel';

import { StudentDocument } from '../models/studentModel';

export interface AuthenticatedRequest extends Request {
  user?: StudentDocument;
}

export const getTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // Ensure the user is authenticated and is a student
    const student: StudentDocument = req.user!;
    
    // Find tasks assigned to the authenticated student
    const tasks = await Task.find({ studentId: student._id });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const studentLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });

    if (!student || !bcrypt.compareSync(password, student.password)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
      algorithm: 'HS256'
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const updateTaskStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
      // Ensure the user is authenticated and is a student
      const student: StudentDocument = req.user!;
      const { status, taskId } =  req.body;
      const task = await Task.findOneAndUpdate(
          { _id: taskId, studentId: student._id },
          { status: status }, 
          { new: true }
      );

      if (!task) {
          res.status(404).json({ error: 'Task not found' });
          return;
      }

      res.json({ message: 'Task status updated successfully', task });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
