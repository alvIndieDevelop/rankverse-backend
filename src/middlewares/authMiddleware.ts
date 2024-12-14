import { Request, Response, NextFunction } from 'express';
import jwtToken from 'src/utils/jwt-token';

interface RequestWithUser extends Request {
  user: any;
}

export const authenticate = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  try {
    // verify if token expire
    if (!jwtToken.verifyToken(token)) {
      throw new Error('Token inválido o expirado');
    } else {
      const decoded = jwtToken.decodeToken(token);
      req.user = decoded.user;
      next();
    }
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
    });
  }
};

export const authorize = (roles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !roles.some((role) => user.role.includes(role))) {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado',
      });
    }
    next();
  };
};
