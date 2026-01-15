import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const generateToken = (payload: any): string => {
  const secret = process.env.JWT_SECRET || 'default_secret_key';
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET || 'default_secret_key';
  return jwt.verify(token, secret);
};