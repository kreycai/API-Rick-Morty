import dotenv from 'dotenv/config';
import jwt from 'jsonwebtoken';
import { findByIdUserService } from '../users/users.service.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: 'O token não foi informado!' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).send({ message: 'Token inválido!' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: 'Token mal formatado!' });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'invalid token' });
    }

    const user = await findByIdUserService(decoded.id);

    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }

    req.userId = user.id;

    return next();
  });
};
