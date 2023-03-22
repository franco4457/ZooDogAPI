const { Dog, conn, Temperament } = require("../../src/db.js");

const dog = {
  name: "Pug",
  image: "alguna url",
  life_span: "16 - 18",
  height: "10 - 16",
  weight: "10 - 20",
};

const temps = [{ name: "Friendly" }, { name: "Brave" }, { name: "Submissive" }];

describe("Models", () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  });
  describe("Dog", () => {
    test("The model must be defined", () => {
      const Dog = conn.models.Dog;
      expect(Dog).toBeDefined();
    });
    describe("Validators", () => {
      describe("name", () => {
        test("should throw an error if name is null", async () => {
          try {
            await Dog.create({ ...dog, name: null });
          } catch (error) {
            expect(error.message).toBe(
              "notNull Violation: Dog.name cannot be null"
            );
          }
        });
        test("should return an error if the name is invalid", async () => {
          try {
            await Dog.create({ ...dog, name: "pug" });
          } catch (error) {
            expect(error.message).toBe(
              "Validation error: Race name must begin with a capital letter"
            );
          }
        });
        test("should work when its a valid name", async () => {
          try {
            await Dog.create({ ...dog });
            expect(true).toBe(true);
          } catch (error) {
            expect(error).toBeUndefined();
          }
        });
      });
      describe("image", () => {
        test("should throw an error if image is null", async () => {
          try {
            await Dog.create({ ...dog, image: null });
          } catch (error) {
            expect(error.message).toBe(
              "notNull Violation: Dog.image cannot be null"
            );
          }
        });
        test("should work when its a valid image", async () => {
          try {
            await Dog.create({ ...dog });
            expect(true).toBe(true);
          } catch (error) {
            expect(error).toBeUndefined();
          }
        });
      });
      describe("height", () => {
        test("should throw an error if height is null", async () => {
          try {
            await Dog.create({ ...dog, height: null });
          } catch (error) {
            expect(error.message).toBe(
              "notNull Violation: Dog.height cannot be null"
            );
          }
        });
        test("should return an error if the height is invalid", async () => {
          try {
            await Dog.create({ ...dog, height: "10-20" });
            expect(true).toBe(false);
          } catch (error) {
            expect(error.message).toBe(
              "Validation error: Height must be divided by ' - '"
            );
          }
        });
        test("should return an error if the height is negative or 0", async () => {
          try {
            await Dog.create({ ...dog, height: "0 - 20" });
            expect(true).toBe(false);
          } catch (error) {
            expect(error.message).toBe(
              "Validation error: Height must be positive"
            );
          }
        });
        test("should return an error if the height min is greater than max", async () => {
          try {
            await Dog.create({ ...dog, height: "22 - 20" });
            expect(true).toBe(false);
          } catch (error) {
            expect(error.message).toBe(
              "Validation error: The min height cannot be greater than the max height"
            );
          }
        });
        test("should work when its a valid height", async () => {
          try {
            await Dog.create({ ...dog });
            expect(true).toBe(true);
          } catch (error) {
            expect(error).toBeUndefined();
          }
        });
      });
      describe("weight", () => {
        test("should throw an error if weight is null", async () => {
          try {
            await Dog.create({ ...dog, weight: null });
          } catch (error) {
            expect(error.message).toBe(
              "notNull Violation: Dog.weight cannot be null"
            );
          }
        });
        test("should return an error if the weight is invalid", async () => {
          try {
            await Dog.create({ ...dog, weight: "10-20" });
            expect(true).toBe(false);
          } catch (error) {
            expect(error.message).toBe(
              "Validation error: Weight must be divided by ' - '"
            );
          }
        });
        test("should return an error if the weight is negative or 0", async () => {
          try {
            await Dog.create({ ...dog, weight: "0 - 20" });
            expect(true).toBe(false);
          } catch (error) {
            expect(error.message).toBe(
              "Validation error: Weight must be positive"
            );
          }
        });
        test("should return an error if the weight min is greater than max", async () => {
          try {
            await Dog.create({ ...dog, weight: "22 - 20" });
            expect(true).toBe(false);
          } catch (error) {
            expect(error.message).toBe(
              "Validation error: The min Weight cannot be greater than the max weight"
            );
          }
        });
        test("should work when its a valid weight", async () => {
          try {
            await Dog.create({ ...dog });
            expect(true).toBe(true);
          } catch (error) {
            expect(error).toBeUndefined();
          }
        });
      });
      describe("life_span", () => {
        test("should throw an error if life_span is null", async () => {
          try {
            await Dog.create({ ...dog, life_span: null });
          } catch (error) {
            expect(error.message).toBe(
              "notNull Violation: Dog.life_span cannot be null"
            );
          }
        });
        test("should return an error if the life_span is invalid", async () => {
          try {
            await Dog.create({ ...dog, life_span: "10-20" });
            expect(true).toBe(false);
          } catch (error) {
            expect(error.message).toBe(
              "Validation error: Life span must be divided by ' - '"
            );
          }
        });
        test("should return an error if the life_span is negative or 0", async () => {
          try {
            await Dog.create({ ...dog, life_span: "0 - 20" });
            expect(true).toBe(false);
          } catch (error) {
            expect(error.message).toBe(
              "Validation error: Life span must be positive"
            );
          }
        });
        test("should return an error if the life_span min is greater than max", async () => {
          try {
            await Dog.create({ ...dog, life_span: "22 - 20" });
            expect(true).toBe(false);
          } catch (error) {
            expect(error.message).toBe(
              "Validation error: The min Life span cannot be greater than the max life span"
            );
          }
        });
        test("should work when its a valid life_span", async () => {
          try {
            await Dog.create({ ...dog });
            expect(true).toBe(true);
          } catch (error) {
            expect(error).toBeUndefined();
          }
        });
      });
    });
  });
  describe("Temperament", () => {
    test("The model must be defined", () => {
      const Temperament = conn.models.Temperament;
      expect(Temperament).toBeDefined();
    });
    test("should throw an error if name is null", async () => {
      try {
        await Temperament.create({ name: null });
      } catch (error) {
        expect(error.message).toBe(
          "notNull Violation: Temperament.name cannot be null"
        );
      }
    });
    test("should work when its a valid name", async () => {
      try {
        const Temp = await Temperament.create({ name: "Partner" });
        expect(Temp.name).toBe("Partner");
        expect(Temp.id).toBe(1);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
    test("should be able to create many", async () => {
      try {
        const Temp = await Temperament.bulkCreate(temps);
        expect(Temp[0].name).toBe(temps[0].name);
        expect(Temp[0].id).toBe(2);
        expect(Temp[1].name).toBe(temps[1].name);
        expect(Temp[1].id).toBe(3);
        expect(Temp[2].name).toBe(temps[2].name);
        expect(Temp[2].id).toBe(4);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  });
});
