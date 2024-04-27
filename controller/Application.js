const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jobs360degree_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Apply for a job
exports.applyForJob = async (req, res) => {
  const { jobId, applicantName, applicantEmail, resume, coverLetter,status } = req.body;
  try {
    const connection = await pool.getConnection();
    const [result, fields] = await connection.execute('INSERT INTO job_applications (job_id, applicant_name, applicant_email, resume, cover_letter,status) VALUES (?, ?, ?, ?, ?,?)', [jobId, applicantName, applicantEmail, resume, coverLetter,status]);
    connection.release();
    res.status(201).json({ id: result.insertId, jobId, applicantName, applicantEmail });
  } catch (err) {
    console.error('Error applying for job:', err);
    res.status(400).json({ message: 'Error applying for job' });
  }
};

// Fetch all job applications for a job
exports.fetchJobApplications = async (req, res) => {
  const { jobId } = req.params;
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM job_applications WHERE job_id = ?', [jobId]);
    connection.release();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching job applications:', err);
    res.status(400).json({ message: 'Error fetching job applications' });
  }
};

// Fetch job application by ID
exports.fetchJobApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM job_applications WHERE id = ?', [id]);
    connection.release();
    res.status(200).json(results[0]);
  } catch (err) {
    console.error('Error fetching job application by ID:', err);
    res.status(400).json({ message: 'Error fetching job application by ID' });
  }
};

// Update job application (e.g., mark as reviewed, update status)
exports.updateJobApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [result, fields] = await connection.execute('UPDATE job_applications SET status = ? WHERE id = ?', [req.body.status, id]);
    connection.release();
    res.status(200).json({ id, status: req.body.status });
  } catch (err) {
    console.error('Error updating job application:', err);
    res.status(400).json({ message: 'Error updating job application' });
  }
};
