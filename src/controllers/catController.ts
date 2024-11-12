import { Request, Response, NextFunction } from 'express';
import { createCatService } from '../services/catService';

export const createCatController = () => {
  const catService = createCatService();

  const createCat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cat = await catService.createCat(req.body);
      res.status(201).json({ data: cat });
    } catch (error) {
      next(error);
    }
  };

  const getAllCats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cats = await catService.getAllCats();
      res.json({ data: cats });
    } catch (error) {
      next(error);
    }
  };

  const getCatById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cat = await catService.getCatById(req.params.id);
      res.json({ data: cat });
    } catch (error) {
      next(error);
    }
  };

  const updateCat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cat = await catService.updateCat(req.params.id, req.body);
      res.json({ data: cat });
    } catch (error) {
      next(error);
    }
  };

  const deleteCat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await catService.deleteCat(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  return {
    createCat,
    getAllCats,
    getCatById,
    updateCat,
    deleteCat
  };
};