class UserService {
    static async getAllUsers() {
      // Simuler une base de données
      return [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Doe", email: "jane@example.com" },
      ];
    }
  }
  
  module.exports = UserService;
  