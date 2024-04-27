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

// Create job api
exports.createJob = async (req, res) => {
  const { title, category, job_nature, vacancy, salary, location, description, benefits, responsibility, qualifications, keywords, company_name, company_location, website, job_logo, deleted } = req.body;
  try {
    const connection = await pool.getConnection();
    const [result, fields] = await connection.execute('INSERT INTO jobs (title, category, job_nature, vacancy, salary, location, description, benefits, responsibility, qualifications, keywords, company_name, company_location, website, job_logo, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [title, category, job_nature, vacancy, salary, location, description, benefits, responsibility, qualifications, keywords, company_name, company_location, website, JSON.stringify(job_logo), deleted]);
    connection.release();
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(400).json({ message: err.message });
  }
};

// Fetching all jobs in the database
exports.getAllJobs = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM jobs');
    connection.release();
    if (results.length === 0) {
      // No jobs found
      return res.status(404).json({ message: 'No jobs found' });
    }
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching all jobs:', err);
    res.status(500).json({ message: err.message });
  }
};

// Fetching all jobs by category and page
exports.fetchAllJob = async (req, res) => {
  let query = 'SELECT * FROM jobs WHERE deleted != ?';
  let queryParams = [true];

  if (req.query.category) {
    query += ' AND category = ?';
    queryParams.push(req.query.category);
  }
  if (req.query._sort && req.query._job) {
    query += ` ORDER BY ${req.query._sort} ${req.query._job}`;
  }

  const totalJobsQuery = 'SELECT COUNT(*) AS total FROM jobs WHERE deleted != ?';
  const [totalJobsResult] = await pool.execute(totalJobsQuery, [true]);
  const totalDocs = totalJobsResult[0].total;

  if (req.query._page && req.query._limit) {
    const pageSize = parseInt(req.query._limit);
    const page = parseInt(req.query._page);
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(pageSize, (page - 1) * pageSize);
  }

  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute(query, queryParams);
    connection.release();
    res.set('X-Total-Count', totalDocs);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching all jobs:', err);
    res.status(400).json({ message: err.message });
  }
};

// Fetch job by id
exports.fetchJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM jobs WHERE id = ?', [id]);
    connection.release();
    res.status(200).json(results[0]);
  } catch (err) {
    console.error('Error fetching job by ID:', err);
    res.status(400).json({ message: err.message });
  }
};

// Update job api
exports.updateJob = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [result, fields] = await connection.execute('UPDATE jobs SET title = ?, description = ?, job_logo = ? WHERE id = ?', [req.body.title, req.body.description, req.body.job_logo, id]);
    connection.release();
    res.status(200).json({ id, ...req.body });
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(400).json({ message: err.message });
  }
};

//search job api
exports.searchJobs = async (req, res) => {
  try {
    const { keywords, location, } = req.body;
    
    const connection = await pool.getConnection();

    let sqlQuery = 'SELECT * FROM jobs WHERE ';
    const queryParams = [];

    
    if (keywords) {
        sqlQuery += 'keywords LIKE ? AND ';
        queryParams.push(`%${keywords}%`);
      }
    if (location) {
      sqlQuery += 'location LIKE ? AND ';
      queryParams.push(`%${location}%`);
    }
    if (salary !== undefined) {
      sqlQuery += 'salary >= ? AND ';
      queryParams.push(salary);
    }
    
    sqlQuery = sqlQuery.replace(/ AND $/, '');

    
    const [results, fields] = await connection.execute(sqlQuery, queryParams);
   
    connection.release();

    if (results.length === 0) {
      
      res.status(404).json({ message: 'No jobs found matching the search criteria' });
    } else {
      
      res.status(200).json({ results });
    }
  } catch (err) {
    console.error('Error searching jobs:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
