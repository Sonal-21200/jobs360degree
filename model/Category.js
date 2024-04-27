// Define JavaScript model for table queries and data storage

const TableQueries = {
    // Table queries for categories
    Categories: {
      createTable: `CREATE TABLE IF NOT EXISTS categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    industry_sector VARCHAR(255) NOT NULL
                  )`,
      insertCategory: `INSERT INTO categories (title, industry_sector) VALUES (?, ?)`,
      selectAllCategories: `SELECT * FROM categories`
    }
  };
  
  // JavaScript data storage type
  const DataStorage = {
    // Example storage using arrays
    ArrayStorage: {
      categories: []
    },
  
    // Example storage using objects
    ObjectStorage: {
      categories: {}
    }
  };
  
  // Example usage:
  // Accessing queries for Categories table
  const categoryTableQueries = TableQueries.Categories;
  console.log(categoryTableQueries.createTable);
  console.log(categoryTableQueries.insertCategory);
  console.log(categoryTableQueries.selectAllCategories);
  
  // Accessing array storage
  console.log(DataStorage.ArrayStorage.categories);
  
  // Accessing object storage
  console.log(DataStorage.ObjectStorage.categories);
  