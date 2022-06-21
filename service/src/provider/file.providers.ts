import { Connection } from 'mongoose';
import { FileSchema } from '../schema/file.schema';

export const FileProviders = [
  {
    provide: 'FILE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('File', FileSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
