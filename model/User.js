// Define JavaScript model for table queries and data storage

const TableQueries = {
    // Table queries for users
    Users: {
      updateUser: `UPDATE users SET f_name=?, s_name=?, l_name=?, mobile=?, address=?, city=?, state=?, country=?, zip=?, gender=?, education_institute=?, education_degree=?, major=?, degree_duration=?, company_name=?, company_designation=?, company_location=?,start_date=?,end_date=?, salary=? WHERE id = ?`,
      uploadResume: `UPDATE users SET resume_path = ? WHERE id = ?`,
      selectUserById: `SELECT * FROM users WHERE id = ?`
    }
  };
  
  // JavaScript data storage type
  const DataStorage = {
    // Example storage using arrays
    ArrayStorage: {
      users: []
    },
  
    // Example storage using objects
    ObjectStorage: {
      users: {}
    }
  };
  
  // Example usage:
  // Accessing queries for Users table
  const userTableQueries = TableQueries.Users;
  console.log(userTableQueries.updateUser);
  console.log(userTableQueries.uploadResume);
  console.log(userTableQueries.selectUserById);
  
  // Accessing array storage
  console.log(DataStorage.ArrayStorage.users);
  
  // Accessing object storage
  console.log(DataStorage.ObjectStorage.users);
  