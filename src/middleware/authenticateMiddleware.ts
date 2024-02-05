import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Student, { StudentDocument } from '../models/studentModel';
import Admin, { AdminDocument } from '../models/adminModel';

dotenv.config();

interface AuthenticatedRequest extends Request {
  user: StudentDocument | AdminDocument;
}

const authenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Check if the user is a student
    const student = await Student.findById(decoded.studentId);
    if (student) {
      (req as AuthenticatedRequest).user = student;
      next();
      return;
    }

    // If not a student, check if the user is an admin
    const admin = await Admin.findOne({ _id: decoded.adminId });
    if (admin) {
      (req as AuthenticatedRequest).user = admin;
      next();
      return;
    }

    res.status(401).json({ error: 'Invalid token' });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authenticateMiddleware;
