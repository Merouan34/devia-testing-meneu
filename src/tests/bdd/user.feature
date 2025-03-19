Feature: Gestion des utilisateurs
  En tant qu'utilisateur
  Je veux gérer la liste des utilisateurs
  Afin de pouvoir accéder, ajouter, mettre à jour et supprimer des informations.

  Scenario: Récupérer la liste des utilisateurs avec des données existantes
    Given la base de données contient des utilisateurs
    When j'envoie une requête GET à "/users"
    Then je reçois une réponse avec le code 200
    And la réponse contient une liste d'utilisateurs.

  Scenario: Récupérer la liste des utilisateurs lorsque la base est vide
    Given la base de données est vide
    When j'envoie une requête GET à "/users"
    Then je reçois une réponse avec le code 200
    And la réponse contient une liste vide.

  Scenario: Créer un nouvel utilisateur avec des données valides
    Given je dispose des informations suivantes : nom, email, mot de passe
    When j'envoie une requête POST à "/users" avec ces données
    Then je reçois une réponse avec le code 201
    And l'utilisateur est créé dans la base de données.

  Scenario: Échec de création d'utilisateur avec des données invalides
    Given les données de l'utilisateur sont invalides
    When j'envoie une requête POST à "/users"
    Then je reçois une réponse avec le code 400
    And un message d'erreur de validation est retourné.
