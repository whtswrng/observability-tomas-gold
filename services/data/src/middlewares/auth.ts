import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { User } from 'src';
import { assertUserAuthorized } from 'src/utils/assert-user-authorized';

export interface AuthorizedRequest extends Request {
  user: User;
}

// this is copy/pasted
// in production, we we'd publish a common package with middlewares and other helpful tools and reuse it across org
export const authorized = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};
