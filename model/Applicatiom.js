// Define JavaScript model for table queries and data storage

const TableQueries = {
    // Table queries for job applications
    JobApplications: {
      createTable: `CREATE TABLE IF NOT EXISTS job_applications (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    job_id INT NOT NULL,
                    applicant_name VARCHAR(255) NOT NULL,
                    applicant_email VARCHAR(255) NOT NULL,
                    resume TEXT NOT NULL,
                    cover_letter TEXT,
                    status VARCHAR(50) DEFAULT 'pending',
                    FOREIGN KEY (job_id) REFERENCES jobs(id)
                  )`,
      insertJobApplication: `INSERT INTO job_applications (job_id, applicant_name, applicant_email, resume, cover_letter, status) VALUES (?, ?, ?, ?, ?, ?)`,
      selectJobApplicationsByJobId: `SELECT * FROM job_applications WHERE job_id = ?`,
      selectJobApplicationById: `SELECT * FROM job_applications WHERE id = ?`,
      updateJobApplicationStatus: `UPDATE job_applications SET status = ? WHERE id = ?`
    }
  };
  
  // JavaScript data storage type
  const DataStorage = {
    // Example storage using arrays
    ArrayStorage: {
      jobApplications: []
    },
  
    // Example storage using objects
    ObjectStorage: {
      jobApplications: {}
    }
  };
  
  // Example usage:
  // Accessing queries for JobApplications table
  const jobApplicationTableQueries = TableQueries.JobApplications;
  console.log(jobApplicationTableQueries.createTable);
  console.log(jobApplicationTableQueries.insertJobApplication);
  console.log(jobApplicationTableQueries.selectJobApplicationsByJobId);
  console.log(jobApplicationTableQueries.selectJobApplicationById);
  console.log(jobApplicationTableQueries.updateJobApplicationStatus);
  
  // Accessing array storage
  console.log(DataStorage.ArrayStorage.jobApplications);
  
  // Accessing object storage
  console.log(DataStorage.ObjectStorage.jobApplications);
  