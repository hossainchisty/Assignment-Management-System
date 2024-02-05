import express from "express";
import { addStudent, assignTask, adminLogin} from '../controllers/adminController';
import authenticateMiddleware from '../middleware/authenticateMiddleware';

const router = express.Router();

// Login Admin 
router.post("/login", adminLogin);

// Admin Add Student
router.post('/students', authenticateMiddleware, addStudent);

// Admin Assign Task to Student
router.post('/assign-task', authenticateMiddleware, assignTask);

export default router;