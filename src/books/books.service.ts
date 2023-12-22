import { Injectable ,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './interfaces/book.interface';
import { UpdateBookDto } from './dto/update-book.dto';


@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>,
  
  ) {}

  async create(createBookDto: CreateBookDto, user: any): Promise<Book> {
    const createdBook = new this.bookModel({
      ...createBookDto,
      createdBy: [user.userId], 
    });
  
    return createdBook.save();
  }



  async findOne(id: string): Promise<Book> {
    return await this.bookModel.findById(id).exec();
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.bookModel.findByIdAndDelete(id).exec();
  }

  async findAll(user: any): Promise<Book[]> {

    if (user.role == 'superuser' || user.role == 'user') {
      return this.bookModel.find().exec();
    } else if (user.role == 'admin') {
      return this.bookModel.find({ createdBy: user.userId }).exec();
    }
  }

  async assignBookToAdmin(bookId: string, adminId: Types.ObjectId): Promise<Book> {
    const book = await this.bookModel.findById(bookId).exec();
  
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const adminIdStr = adminId.toString();
    const updatedCreatedBy = new Set(book.get('createdBy').map(id => id.toString()));
    updatedCreatedBy.add(adminIdStr);
  
    return this.bookModel.findByIdAndUpdate(
      bookId,
      { 
        assignedTo: adminId, 
        createdBy: Array.from(updatedCreatedBy) 
      },
      { new: true }
    ).exec();
  }
  

}
