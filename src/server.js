require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// Connexion à la base de données SQLite
sequelize.sync()
  .then(() => console.log("✅ Base de données SQLite connectée !"))
  .catch(err => console.error("❌ Erreur de connexion SQLite :", err));

// Routes
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

// Démarrage du serveur SEULEMENT si ce fichier est exécuté directement
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
}

// Exporter `app` pour les tests
module.exports = app;