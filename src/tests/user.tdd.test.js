const request = require("supertest");
const app = require("../server"); // L'application Express
const sequelize = require("../config/database");

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Réinitialiser la base de données avant les tests
});

afterAll(async () => {
  await sequelize.close(); // Fermer la connexion après les tests
});

describe("TDD - Création d'un utilisateur", () => {

  it("Ne doit pas créer un utilisateur sans données valides (POST /users)", async () => {
    const res = await request(app).post("/users").send({}); // On envoie un objet vide
    expect(res.statusCode).toBe(400); // On s'attend à une erreur 400 (Bad Request)
    expect(res.body).toHaveProperty("message"); // Vérifie qu'un message d'erreur est retourné
  });

  it("Devrait créer un utilisateur avec des données valides (POST /users)", async () => {
    const userData = { name: "John Doe", email: "john@example.com", password: "securepass" };
    const res = await request(app).post("/users").send(userData);

    expect(res.statusCode).toBe(201); // On s'attend à un succès 201 (Création)
    expect(res.body).toHaveProperty("id"); // L'utilisateur créé doit avoir un ID
    expect(res.body.name).toBe(userData.name); // Vérifier que le nom correspond
    expect(res.body.email).toBe(userData.email); // Vérifier que l'email correspond
  });

});
