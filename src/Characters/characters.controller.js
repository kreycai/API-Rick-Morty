import * as charService from './characters.service.js';
import mongoose from 'mongoose';

const createCharController = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    if (!name || !imageUrl) {
      return res.status(400).send({ message: 'alguns campos estão faltando.' });
    }

    const { id } = await charService.createCharacterService(
      name,
      imageUrl,
      req.userId,
    );

    res.status(201).send({
      message: 'Personagem criado com sucesso !',
      character: { id, name, imageUrl },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const FindAllCharController = async (req, res) => {
  try {
    const chars = await charService.findAllCharService();

    if (!chars) {
      return res.status(400).send({
        message: 'Lista nao encontrada',
      });
    }

    return res.status(201).send({
      results: chars.map((chars) => ({
        id: chars._id,
        user: chars.user,
        name: chars.name,
        imageUrl: chars.imageUrl,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findByIdCharController = async (req, res) => {
  const idParam = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    return res.status(400).send({ message: 'ID invalido!' });
  }
  const char = await charService.findByIdCharService(idParam);

  if (!char) {
    return res.status(404).send({ message: 'Tarefa não encontrada!' });
  }

  return res.status(201).send(char);
};

const updateCharController = async (req, res) => {
  const idParam = req.params.id;
  const editChar = req.body;

  const foundCharName = await charService.findByNameCharService(editChar.name);
  if (foundCharName) {
    return res.status(400).send({ message: 'Nome de personagem já existe!' });
  }

  const updatedChar = await charService.updateCharService(idParam, editChar);
  res.send(updatedChar);
};

const deleteCharController = async (req, res) => {
  const idParam = req.params.id;
  await charService.deleteCharService(idParam);
  res.send({ message: 'Tarefa deletada com sucesso!' });
};

const searchCharController = async (req, res) => {
  try {
    const query = req.query.name;

    console.log(query);

    if (!query) {
      return res.status(400).send({ message: 'bad request' });
    }

    const chosenCharacters = await charService.searchCharService(query);

    console.log(chosenCharacters);

    if (!chosenCharacters) {
      return res.status(404).send({ message: 'not found' });
    }

    res.send({
      characters: chosenCharacters.map((character) => ({
        id: character._id,
        name: character.name,
        imageUrl: character.imageUrl,
        user: character.user,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export {
  createCharController,
  FindAllCharController,
  findByIdCharController,
  updateCharController,
  deleteCharController,
  searchCharController,
};
