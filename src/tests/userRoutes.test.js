const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../server");
const User = require("../models/userModel");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User API", () => {
  it("Devrait récupérer tous les utilisateurs", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Devrait créer un utilisateur", async () => {
    const res = await request(app).post("/users").send({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });
});
