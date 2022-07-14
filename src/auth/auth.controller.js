import dotenv from 'dotenv/config';
import * as authService from './auth.service.js';
import bcrypt from 'bcryptjs';

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.longinService(email);

  if (!user) {
    return res.status(400).send({ message: 'Usuário não encontrado!' });
  }

  const isPassowrdValid = await bcrypt.compare(password, user.password);

  if (!isPassowrdValid) {
    return res.status(400).send({ message: 'Senha invalida!' });
  }
  const token = authService.generateToken(user.id);
  res.send({ token });
};

export { loginController };
