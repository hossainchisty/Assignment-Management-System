import express from 'express';
import { getTasks, updateTaskStatus, studentLogin } from '../controllers/studentController';
import authenticateMiddleware from '../middleware/authenticateMiddleware';

const router = express.Router();


// Login Student
router.post('/login', studentLogin);

// Get Tasks for Student
router.get('/tasks', authenticateMiddleware, getTasks);

// Update Task Status for Student
router.patch('/tasks/status-update', authenticateMiddleware, updateTaskStatus);

export default router;
