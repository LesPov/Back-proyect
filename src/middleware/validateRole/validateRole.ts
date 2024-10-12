import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorMessages } from '../erros/errorMessages';

const extractToken = (req: Request): string | null => {
  const authHeader = req.headers['authorization'];
  return authHeader ? authHeader.split(' ')[1] : null;
};

const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.SECRET_KEY || 'pepito123');
};

const isRoleValid = (userRole: string, requiredRole: string): boolean => {
  return userRole === requiredRole;
};

const validateRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = extractToken(req);
    if (!token) {
      res.status(401).json({
        msg: errorMessages.tokenNotProvided,
      });
      return;
    }
    try {
      const decodedToken = verifyToken(token);
      const userRole = decodedToken.rol;
      if (isRoleValid(userRole, requiredRole)) {
        next();
      } else {
        res.status(403).json({
          msg: errorMessages.accessDenied,
        });
      }
    } catch (error) {
      res.status(401).json({
        msg: errorMessages.invalidToken,
      });
    }
  };
};

export default validateRole;