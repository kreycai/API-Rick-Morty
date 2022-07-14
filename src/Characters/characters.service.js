import { Characters } from './Character.js';

const createCharacterService = (name, imageUrl, userId) =>
  Characters.create({ name, imageUrl, user: userId });
const findByNameCharService = (name) => Characters.findOne({ name: name });
const findAllCharService = () =>
  Characters.find().sort({ _id: -1 }).populate('user');
const findByIdCharService = (idUser) => Characters.findById(idUser);
const updateCharService = (idParam, editTarefa) =>
  Characters.findByIdAndUpdate(idParam, editTarefa);
const deleteCharService = (idParam) => Characters.findByIdAndDelete(idParam);
const searchCharService = (query) => Characters.find({ name: { $regex: `${query || ''}`, $options: 'i' } });

export {
  createCharacterService,
  findByNameCharService,
  findAllCharService,
  findByIdCharService,
  updateCharService,
  deleteCharService,
  searchCharService,
};
