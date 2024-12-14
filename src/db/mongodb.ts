import { connect } from 'mongoose';
import config from 'src/utils/config';

const { DATABASE } = config;

export const connectDB = async () => {
  const user = DATABASE.MONGODB.USER;
  const password = DATABASE.MONGODB.PASSWORD;
  const url = DATABASE.MONGODB.HOST;
  const database = DATABASE.MONGODB.DATABASE;

  let mongoURI = `mongodb+srv://${user}:${password}@${url}/${database}`;

  return connect(mongoURI, {
    autoIndex: true,
    autoCreate: true,
  });
};
