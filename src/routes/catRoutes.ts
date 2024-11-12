import express from 'express';
import { createCatController } from '../controllers/catController';

const catRoutes = express.Router();
const controller = createCatController();

catRoutes.post('/cats', controller.createCat);
catRoutes.get('/cats', controller.getAllCats);
catRoutes.get('/cats/:id', controller.getCatById);
catRoutes.put('/cats/:id', controller.updateCat);
catRoutes.delete('/cats/:id', controller.deleteCat);

export default catRoutes;

// Create a cat
// POST /api/cats
// {
//   "name": "Whiskers",
//   "breed": "Persian",
//   "age": 3
// }

// // Get all cats
// GET /api/cats

// // Get one cat
// GET /api/cats/65ab12345678901234567890

// // Update a cat
// PUT /api/cats/65ab12345678901234567890
// {
//   "age": 4
// }

// // Delete a cat
// DELETE /api/cats/65ab12345678901234567890