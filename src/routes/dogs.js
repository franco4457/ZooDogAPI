const { Router } = require("express");
const {
  getAllDogs,
  getDogById,
  getDogByName,
  postDog,
  dogsDatabase,
  getAllTemps,
  deleteDog,
  updateDog,
} = require("../controllers/dogsControls");
const validate = require("../helpers/validatePost");
const dogs = Router();

dogs.get("/db", async (req, res) => {
  try {
    const dogs = await dogsDatabase();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

dogs.get("/temps", async (req, res) => {
  try {

    const temps = await getAllTemps();
   return res.status(200).json(temps);
  } catch (error) {
   return  res.status(404).json({ error: error.message });
  }
});

dogs.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    let dogs;
    name ? (dogs = await getDogByName(name)) : (dogs = await getAllDogs());
    return res.status(200).json(dogs);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

dogs.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dog = await getDogById(id);
    res.json(dog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

dogs.post("/", validate, async (req, res) => {
  const { name, image, life_span, height, weight, temps } = req.body;
  try {
    const newDog = await postDog(name, image, life_span, height, weight, temps);
    res.status(201).json(newDog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

dogs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDog = await deleteDog(id);
    res
      .status(200)
      .json({ deleted: deletedDog, message: "Breed has been deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

dogs.put("/:modifyrace",validate, async (req, res) => {
  const { name, image, life_span, height, weight, temps } = req.body;
  const { modifyrace } = req.params;
  try {
    const update = await updateDog(
      modifyrace,
      temps,
      name,
      image,
      life_span,
      height,
      weight
    );
    res
      .status(201)
      .json({ updateRace: update, message: "The breed was successfully updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = dogs;
