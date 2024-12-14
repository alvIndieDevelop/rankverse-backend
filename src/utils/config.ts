export default {
  DATABASE: {
    MONGODB: {
      HOST: process.env.MONGODB_HOST,
      USER: process.env.MONGODB_USER,
      PASSWORD: process.env.MONGODB_PASSWORD,
      DATABASE: process.env.MONGODB_DATABASE,
    },
  },
  APP: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    SECRET_KEY: process.env.SECRET_KEY,
  },
};
