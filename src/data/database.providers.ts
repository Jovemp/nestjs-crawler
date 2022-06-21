import * as mongoose from 'mongoose';
import configuration from 'src/config/configuration';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(configuration().database.host),
  },
];
