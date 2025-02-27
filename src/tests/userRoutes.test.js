const request = require("supertest");
const app = require("../server");
const sequelize = require("../config/database");
const User = require("../models/userModel");

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Réinitialise la BDD avant chaque test
});

afterAll(async () => {
  await sequelize.close();
});

describe("Gestion des utilisateurs", () => {
  
  it("Devrait retourner une liste d'utilisateurs (GET /users)", async () => {
    // Ajouter des utilisateurs à la BDD pour le test
    await User.create({ name: "Alice", email: "alice@example.com", password: "123456" });
    await User.create({ name: "Bob", email: "bob@example.com", password: "abcdef" });

    const res = await request(app).get("/users");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Devrait retourner une liste vide si aucun utilisateur n'existe (GET /users)", async () => {
    await User.destroy({ where: {} }); // Supprime tous les utilisateurs

    const res = await request(app).get("/users");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]); // Liste vide attendue
  });

  it("Devrait créer un utilisateur (POST /users)", async () => {
    const userData = {
      name: "Charlie",
      email: "charlie@example.com",
      password: "securepass"
    };

    const res = await request(app).post("/users").send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(userData.name);
    expect(res.body.email).toBe(userData.email);
  });

  it("Ne doit pas créer un utilisateur avec des données invalides (POST /users)", async () => {
    const res = await request(app).post("/users").send({}); // Envoi de données vides

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

});
