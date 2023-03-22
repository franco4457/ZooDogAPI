const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;

const getAllDogs = async () => {
  const db = await Dog.findAll({
    include: [{ model: Temperament, through: { attributes: [] } }],
  });
  const res = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  return [...res.data, ...db];
};

const getDogById = async (id) => {
  if (isNaN(id)) {
    const db = await Dog.findByPk(id, {
      include: [{ model: Temperament, through: { attributes: [] } }],
    });
    if (!db) throw new Error(`Dog which id ${id} not found`);
    return db;
  }
  const res = await axios.get(
    `https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`
  );
  if (!Object.keys(res.data).length)
    throw new Error(`Dog which id ${id} not found`);
  return res.data;
};
const getDogByName = async (name) => {
  const db = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [{ model: Temperament, through: { attributes: [] } }],
  });
  const res = await axios.get(
    `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`
  );
  return [...res.data, ...db];
};

const postDog = async (name, image, life_span, height, weight, temps) => {
  const newDog = await Dog.create({ name, image, life_span, height, weight });
  await newDog.addTemperaments(temps.map((temp) => temp.id));

  return newDog;
};

const dogsDatabase = async () => {
  let dogs = await Dog.findAll({
    include: [{ model: Temperament, through: { attributes: [] } }],
  });
  dogs.forEach((dog) => {
    dog["temp"] = dog.Temperaments.map((temp) => temp.name);
  });
  return dogs;
};

const getAllTemps = async () => {
  const temps = await Temperament.findAll();
  return temps;
};

const deleteDog = async (id) => {
  const res = await Dog.findByPk(id);
  if(!res) throw new Error(`Dog id ${id} not found`)
  await res.destroy();
  return res;
};
const updateDog = async (
  modifyrace,
  temps,
  name,
  image,
  life_span,
  height,
  weight
) => {
  const race = await Dog.findByPk(modifyrace);
  if(!race) throw new Error(`Breed ${modifyrace} not found`)
  race.name = name;
  race.image = image;
  race.life_span = life_span;
  race.height = height;
  race.weight = weight;
  await race.save();
  await race.setTemperaments(temps.map((temp) => temp.id));
  return race;
};

module.exports = {
  getAllDogs,
  getDogById,
  getDogByName,
  postDog,
  dogsDatabase,
  getAllTemps,
  deleteDog,
  updateDog,
};
