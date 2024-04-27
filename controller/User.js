const mysql = require('mysql2/promise');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jobs360degree_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


//user fetching api
exports.fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
    connection.release();
    res.status(200).json(results[0]);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(400).json({ message: 'Error fetching user by ID' });
  }
};


//updating user api
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [result, fields] = await connection.execute(
      'UPDATE users SET f_name=?, s_name=?, l_name=?, mobile=?, address=?, city=?, state=?, country=?, zip=?, gender=?, education_institute=?, education_degree=?, major=?, degree_duration=?, company_name=?, company_designation=?, company_location=?,start_date=?,end_date=?, salary=? WHERE id = ?', 
      [req.body.f_name, req.body.s_name, req.body.l_name, req.body.mobile, req.body.address, req.body.city, req.body.state, req.body.country, req.body.zip, req.body.gender, req.body.education_institute, req.body.education_degree, req.body.major, req.body.degree_duration, req.body.company_name, req.body.company_designation, req.body.company_location,req.body.start_date,req.body.end_date, req.body.salary, id]
    );
    connection.release();
    res.status(200).json({ id, ...req.body });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(400).json({ message: 'Error updating user' });
  }
};


//resume upload api
exports.uploadResume = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const connection = await pool.getConnection();
    const [result, fields] = await connection.execute(
      'UPDATE users SET resume_path = ? WHERE id = ?', 
      [req.file.path, id]
    );
    connection.release();
    res.status(200).json({ message: 'Resume uploaded successfully', file: req.file });
  } catch (err) {
    console.error('Error uploading resume:', err);
    res.status(400).json({ message: 'Error uploading resume' });
  }
};

exports.resumeUploader = upload.single('resume');