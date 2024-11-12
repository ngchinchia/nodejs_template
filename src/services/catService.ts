
import { Cat } from '../types/cat.types';
import { createCatRepository } from '../repositories/catRepository';
import { AppError } from '../middleware/AppError'

export const createCatService = () => {
  const catRepository = createCatRepository();

  const createCat = async (data: Omit<Cat, '_id'>): Promise<Cat> => {
    try {
      return await catRepository.create(data);
    } catch (error) {
      throw AppError.internal('Failed to create cat');
    }
  };

  const getAllCats = async (): Promise<Cat[]> => {
    try {
      return await catRepository.findAll();
    } catch (error) {
      throw AppError.internal('Failed to fetch cats');
    }
  };

  const getCatById = async (id: string): Promise<Cat> => {
    const cat = await catRepository.findById(id);
    if (!cat) {
      throw AppError.notFound('Cat not found');
    }
    return cat;
  };

  const updateCat = async (id: string, data: Partial<Cat>): Promise<Cat> => {
    return await catRepository.update(id, data);
  };

  const deleteCat = async (id: string): Promise<void> => {
    const deleted = await catRepository.remove(id);
    if (!deleted) {
      throw AppError.notFound('Cat not found');
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