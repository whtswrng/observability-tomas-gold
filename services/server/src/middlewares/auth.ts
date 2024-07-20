import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

// Middleware to check authorization
export const authorized = (req: Request, res: Response, next: NextFunction) => {
  // Extract the token from the cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach decoded token to the request object
    // @ts-ignore
    req.user = decoded;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};
