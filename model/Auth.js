// Define JavaScript model for table queries and data storage

const TableQueries = {
    // User table queries
    User: {
      createTable: `CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(50) NOT NULL
                  )`,
      insertUser: `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
      getUserByEmail: `SELECT * FROM users WHERE email = ?`,
      updateUserPassword: `UPDATE users SET password = ? WHERE id = ?`
    },
  };
  
  // Example usage:
  // Accessing queries for User table
  const userTableQueries = TableQueries.User;
  console.log(userTableQueries.createTable);
  console.log(userTableQueries.insertUser);
  console.log(userTableQueries.getUserByEmail);
  console.log(userTableQueries.updateUserPassword);
  
  // JavaScript data storage types
  const DataStorage = {
    // Example storage using arrays
    ArrayStorage: {
      users: [],
      tokens: []
    },
  
    // Example storage using objects
    ObjectStorage: {
      users: {},
      tokens: {}
    }
  };
  
  // Example usage:
  // Accessing array storage
  console.log(DataStorage.ArrayStorage.users);
  console.log(DataStorage.ArrayStorage.tokens);
  
  // Accessing object storage
  console.log(DataStorage.ObjectStorage.users);
  console.log(DataStorage.ObjectStorage.tokens);
  