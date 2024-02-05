import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from '../models/adminModel';
import Student from '../models/studentModel';
import Task from '../models/taskModel';

dotenv.config();

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
      algorithm: 'HS256'
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const assignTask = async (req: Request, res: Response): Promise<void> => {
  try {
      const { studentId, description, dueTime } = req.body;

      // Create a new task object with the provided data
      const task = new Task({ studentId, description, dueTime });

      // Save the task to the database
      await task.save();

      res.status(201).json({ message: "Task assigned successfully", task });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};


export const addStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, department, password } = req.body;
    // Hash the password before saving it
    const hashPassword = async (password: string) => {
      const saltRounds = 10;
      return bcrypt.hash(password, saltRounds);
    };

    // Hash the default admin password
    const hashedPassword = await hashPassword(password);
    const newStudent = new Student({ name, email, department, password:hashedPassword });
    await newStudent.save();

    res.json({ message: 'Student added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
