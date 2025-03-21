const User = require("../models/userModel");

// Récupérer tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
exports.createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Vérifier que tous les champs sont remplis
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
      }
  
      // Créer un nouvel utilisateur
      const newUser = await User.create({ name, email, password });
  
      res.status(201).json(newUser); // Retourner l'utilisateur créé
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }; 

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.destroy();
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
