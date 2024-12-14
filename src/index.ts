import express, { Application } from 'express';
import { createServer, Server } from 'http';
import 'moment/locale/es';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import router from './app.module';

dotenv.config();

const app: Application = express();
const serve: Server = createServer(app);

const port = process.env.PORT || 5000;

// cors
const whiteList: string[] = ['*'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// midlewares
app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// routes
app.use(router);

serve.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
