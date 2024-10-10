import express from 'express';

import { Pet } from '../models/petmodel.js';

const router = express.Router();



//Route for save a new book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.pet_id ||
      !request.body.name ||
      !request.body.age ||
      !request.body.species ||
      !request.body.breed ||
      !request.body.special_care_required
    ) {
      return response.status(400).send({
        message:
          "send all required fields:pet_id,name,age,species,breed,species",
      });
    }
    const newPet = {
      pet_id: request.body.pet_id,
      name: request.body.name,
      age: request.body.age,
      species: request.body.species,
      breed: request.body.breed,
      special_care_required: request.body.special_care_required,
    };
    const pet = await Pet.create(newPet);

    return response.status(201).send(pet);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const pet = await Pet.findById(id);

    return response.status(200).json({
      count: pet.length,
      data: pet,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.pet_id ||
      !request.body.name ||
      !request.body.age ||
      !request.body.species ||
      !request.body.breed ||
      !request.body.special_care_required
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: Pet_id,name,age,species,breed,special_care_required",
      });
    }

    const { id } = request.params;

    const result = await Pet.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Pet Not Found" });
    }
    return response.status(200).json({ message: "Pets updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Pet.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Pet Not Found" });
    }
    return response.status(200).json({ message: "Pets deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

