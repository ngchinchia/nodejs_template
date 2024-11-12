import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import catRoutes from './routes/catRoutes';
import { errorHandler } from './middleware/errorHandler';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './middleware/AppError';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api', catRoutes);

// 404 handler for undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
    next(AppError.notFound('Route not found'));
  });


// Error handling middleware (must be last)
app.use(errorHandler);




export default app;
