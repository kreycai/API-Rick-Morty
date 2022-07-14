import * as userService from "./users.service.js";
import * as authService from "../auth/auth.service.js";

const createUserController = async (req, res) => {
  const { name, username, email, password, photo } = req.body;
  if (!name || !username || !email || !password || !photo) {
    return res.status(400).send({ message: "alguns campos estão faltando." });
  }

  const foundUser = await userService.findByEmailUserService(email);

  if (foundUser) {
    return res.status(400).send({ message: "Usuario já existe!" });
  }

  const user = await userService
    .createUserService(req.body)
    .catch((err) => console.log(err.message));

  if (!user) {
    return res.status(400).send({
      message: "Erro ao criar usuario!",
    });
  }

  const token = authService.generateToken(user.id);

  res.status(201).send({
    user: {
      id: user.id,
      name,
      username,
      email,
      photo,
    },
    token,
  });
};

const findAllUserController = async (req, res) => {
  const users = await userService.findAllUserService();

  if (users.length === 0) {
    return res.status(400).send({
      message: "Não existem usuários cadastrados!",
    });
  }

  res.send(users);
};

export { createUserController, findAllUserController };
