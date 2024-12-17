const request = require("supertest");
const express = require("express");
const userRoutes = require("../routes/userRoutes");

const app = express();
app.use("/users", userRoutes);

test("GET /users - récupère la liste des utilisateurs", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Liste des utilisateurs" });
});
