import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { FileModel } from '../model/file.model';

@Injectable()
export class FileService {
  constructor(
    @Inject('FILE_MODEL')
    private fileModel: Model<FileModel>,
  ) {}

  async create(create: any): Promise<FileModel> {
    const created = new this.fileModel(create);
    return created.save();
  }
}
