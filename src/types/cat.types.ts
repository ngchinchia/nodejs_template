import { ObjectId } from 'mongodb';
export interface Cat {
    _id?: ObjectId;
    name: string;
    breed: string;
    age: number;
  }
  