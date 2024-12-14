import jwt from 'jwt-simple';
import crypto from 'crypto';
import { IUser } from 'src/modules/user/user.model';
import moment from 'moment';
import config from './config';

// Generar clave secreta a partir de la configuración
const rawSecret: string = config.APP.SECRET_KEY as string;
const hashedSecret: string = crypto
  .createHmac('sha512', rawSecret)
  .update(rawSecret)
  .digest('hex');
const secretKey: string = crypto
  .createHash('sha512')
  .update(hashedSecret)
  .digest('hex');

const createToken = (user: IUser) => {
  const payload = {
    sub: user._id,
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      username: user.username,
    },
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix(), // Expira en 1 día
  };

  return jwt.encode(payload, secretKey);
};

const decodeToken = (token: string): any => {
  try {
    return jwt.decode(token, secretKey);
  } catch (error) {
    throw new Error('Token inválido o corrupto');
  }
};
const verifyToken = (token: string): boolean => {
  try {
    const decoded = decodeToken(token);
    return moment().unix() < decoded.exp; // Retorna true si no está expirado
  } catch {
    return false; // Retorna false si hay algún error en la decodificación
  }
};

export default {
  createToken,
  decodeToken,
  verifyToken,
};
