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

//fetch jobs by categories
exports.fetchCategories = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM categories');
    connection.release();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(400).json({ message: 'Error fetching categories' });
  }
};

//create category of jobs api
exports.createCategory = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const { title, industry_sector } = req.body;
    const [result, fields] = await connection.execute(
      'INSERT INTO categories (title, industry_sector) VALUES (?, ?)',
      [title, industry_sector]
    );
    connection.release();
    res.status(201).json({ id: result.insertId, title, industry_sector });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(400).json({ message: 'Error creating category' });
  }
};
