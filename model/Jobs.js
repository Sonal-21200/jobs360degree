// Define JavaScript model for table queries and data storage

const TableQueries = {
    // Table queries for jobs
    Jobs: {
      createTable: `CREATE TABLE IF NOT EXISTS jobs (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    category VARCHAR(255) NOT NULL,
                    job_nature VARCHAR(255) NOT NULL,
                    vacancy INT NOT NULL,
                    salary DECIMAL(10, 2) NOT NULL,
                    location VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    benefits TEXT,
                    responsibility TEXT,
                    qualifications TEXT,
                    keywords TEXT,
                    company_name VARCHAR(255) NOT NULL,
                    company_location VARCHAR(255) NOT NULL,
                    website VARCHAR(255),
                    job_logo JSON,
                    deleted BOOLEAN DEFAULT false
                  )`,
      insertJob: `INSERT INTO jobs (title, category, job_nature, vacancy, salary, location, description, benefits, responsibility, qualifications, keywords, company_name, company_location, website, job_logo, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      selectAllJobs: `SELECT * FROM jobs`,
      selectJobsByCategory: `SELECT * FROM jobs WHERE category = ?`,
      selectJobsById: `SELECT * FROM jobs WHERE id = ?`,
      updateJob: `UPDATE jobs SET title = ?, description = ?, job_logo = ? WHERE id = ?`,
      searchJobs: `SELECT * FROM jobs WHERE keywords LIKE ? AND location LIKE ?`
    }
  };
  
  // JavaScript data storage type
  const DataStorage = {
    // Example storage using arrays
    ArrayStorage: {
      jobs: []
    },
  
    // Example storage using objects
    ObjectStorage: {
      jobs: {}
    }
  };
  
  // Example usage:
  // Accessing queries for Jobs table
  const jobTableQueries = TableQueries.Jobs;
  console.log(jobTableQueries.createTable);
  console.log(jobTableQueries.insertJob);
  console.log(jobTableQueries.selectAllJobs);
  console.log(jobTableQueries.selectJobsByCategory);
  console.log(jobTableQueries.selectJobsById);
  console.log(jobTableQueries.updateJob);
  console.log(jobTableQueries.searchJobs);
  
  // Accessing array storage
  console.log(DataStorage.ArrayStorage.jobs);
  
  // Accessing object storage
  console.log(DataStorage.ObjectStorage.jobs);
  