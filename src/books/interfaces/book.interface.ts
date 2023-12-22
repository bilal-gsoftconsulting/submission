import { Document } from 'mongoose';

export interface Book extends Document {

  readonly author: string;
  readonly price: number;
  readonly genre: string;
  readonly description: string;
  readonly createdBy: [string];
}
