import { Db, Collection, ObjectId } from 'mongodb';
import { connectToDatabase } from '../config/database';
import { Cat } from '../types/cat.types';
import { AppError } from '../middleware/AppError'

export const createCatRepository = () => {
  const getCollection = async (): Promise<Collection<Cat>> => {
    const db: Db = await connectToDatabase();
    return db.collection<Cat>('cats');
  };

  const create = async (cat: Omit<Cat, '_id'>): Promise<Cat> => {
    const collection = await getCollection();
    const result = await collection.insertOne(cat);
    return { ...cat, _id: result.insertedId };
  };

  const findAll = async (): Promise<Cat[]> => {
    const collection = await getCollection();
    return collection.find().toArray();
  };

  const findById = async (id: string): Promise<Cat | null> => {
    if (!ObjectId.isValid(id)) {
      throw AppError.badRequest('Invalid ID format');
    }
    const collection = await getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  };

  const update = async (id: string, cat: Partial<Cat>): Promise<Cat> => {
    if (!ObjectId.isValid(id)) {
      throw AppError.badRequest('Invalid ID format');
    }

    const collection = await getCollection();
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: cat },
      { returnDocument: 'after' }
    );

    if (!result) {
      throw AppError.notFound('Cat not found');
    }

    return result;
  };

  const remove = async (id: string): Promise<boolean> => {
    if (!ObjectId.isValid(id)) {
      throw AppError.badRequest('Invalid ID format');
    }

    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  };

  return {
    create,
    findAll,
    findById,
    update,
    remove
  };
};