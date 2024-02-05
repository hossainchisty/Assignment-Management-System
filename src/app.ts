import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routers/adminRoutes';
import studentRoutes from './routers/studentRoutes';

const app = express();

app.use(bodyParser.json());
// Routes
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/student', studentRoutes);

export default app;
