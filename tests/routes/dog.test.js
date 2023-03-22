/* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require("chai");
// const session = require("supertest-session");
const request = require("supertest");
const app = require("../../src/app.js");
const { Dog, Temperament, conn } = require("../../src/db.js");

const dog = {
  name: "Pug",
  image: "alguna url",
  life_span: "16 - 18",
  height: "10 - 16",
  weight: "10 - 20",
};
const dog2 = {
  name: "Pluto",
  image: "otra url",
  life_span: "10 - 13",
  height: "20 - 36",
  weight: "40 - 45",
};
const temps = [{ id: 1 }, { id: 2 }];
const temps2 = [{ id: 3 }, { id: 4 }];
const temperaments = [
  { name: "Friendly" },
  { name: "Brave" },
  { name: "Submissive" },
  { name: "Keeper" },
];

describe("Dogs routes", () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    await Temperament.bulkCreate(temperaments);
  });
  // beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
  describe("GET /dogs", () => {
    test("should get 200", async () => {
      const res = await request(app).get("/dogs");
      expect(res.statusCode).toBe(200);
    });
  });
  describe("GET /dogs?name=", () => {
    test("should get 200 and an array with the names that contain what is specified in the query", async () => {
      const res = await request(app).get("/dogs?name=as");
      expect(res.statusCode).toBe(200);
      expect(res.body[0].name).toMatch(/as/);
    });
    test("should get 200 and an array with the names that contain what is specified in the query", async () => {
      const res = await request(app).get("/dogs?name=pit bull");
      expect(res.statusCode).toBe(200);
      expect(res.body[0].name).toMatch(/pit bull/i);
    });
  });
  describe("GET /dogs/:id", () => {
    test("should return a 404 if the ID was not found", async () => {
      const res = await request(app).get("/dogs/1000");
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Dog which id 1000 not found");
    });
    test("should get 200 and an array with the names that contain what is specified in the query", async () => {
      const res = await request(app).get("/dogs/10");
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(10);
    });
  });
  describe("POST /dogs", () => {
    test("should return a 400 if any field is missing", async () => {
      const res = await request(app)
        .post("/dogs")
        .send({ ...dog, name: undefined });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("All fields are required");
    });
    test("should get 400 if it does not have at least one temperament", async () => {
      const res = await request(app)
        .post("/dogs")
        .send({ ...dog, temps: [] });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe(
        "The breed must have at least one temperament"
      );
    });
    test("should get 201 if the breed was created correctly", async () => {
      const res = await request(app)
        .post("/dogs")
        .send({ ...dog, temps });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe(dog.name);
      expect(res.body.height.metric).toBe(dog.height);
    });
  });
  describe("DELETE /dogs/:id", () => {
    test("should return a 400 if id not found", async () => {
      const res = await request(app).delete(
        "/dogs/b7e5b660-c348-11ed-8db5-7f5e390c43c5"
      );
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe(
        "Dog id b7e5b660-c348-11ed-8db5-7f5e390c43c5 not found"
      );
    });
    test("should get 200 if the breed was successfully eliminated", async () => {
      const breedToDelete = await request(app)
        .post("/dogs")
        .send({ ...dog, temps });
      const res = await request(app).delete(`/dogs/${breedToDelete.body.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Breed has been deleted");
    });
  });
  describe("PUT /dogs/:id", () => {
    test("should return a 400 if id not found", async () => {
      const res = await request(app)
        .put("/dogs/b7e5b660-c348-11ed-8db5-7f5e390c43c5")
        .send({ ...dog2, temps: temps2 });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe(
        "Breed b7e5b660-c348-11ed-8db5-7f5e390c43c5 not found"
      );
    });
    test("should get 200 if the breed was successfully eliminated", async () => {
      const breedToUpdate = await request(app)
        .post("/dogs")
        .send({ ...dog, temps });
      const res = await request(app)
        .put(`/dogs/${breedToUpdate.body.id}`)
        .send({ ...dog2, temps: temps2 });
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("The breed was successfully updated");
    });
  });

  afterAll(async () => {
    await conn.sync({ force: true });
  });
});
