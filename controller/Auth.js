const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jobs360degree_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 25,
  auth: {
    user: "your mail",
    pass: "your password"
  }
});

//create user api
exports.createUser = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [existingUser] = await connection.execute('SELECT id FROM users WHERE email = ?', [req.body.email]);
    connection.release();

    if (existingUser.length > 0) {
      // Email already exists
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
    const insertUserQuery = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    const [results] = await pool.execute(insertUserQuery, [req.body.email, hashedPassword, req.body.role]);

    // Generate JWT token
    const token = jwt.sign({ id: results.insertId, role: req.body.role }, 'q#P6v@6nTw9u%4Z@2yG!S$e&8Lp3F@Rb');

    // Set token in cookie
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ id: results.insertId, role: req.body.role,email:req.body.email });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// login user api
exports.loginUser = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM users WHERE email = ? ', [req.body.email]);
    connection.release();

    if (results.length === 0) {
      res.status(401).json({ message: 'No user found with this email' });
      return;
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password); // Compare hashed password
    if (isPasswordValid) {
      // Generate JWT token
      const token = jwt.sign({ id: user.id, role: user.role }, '123@js5ef');
      
      // Set token in cookie
      res.cookie('token', token, { httpOnly: true });
      
      res.status(200).json({ id: user.id, role: user.role,email:user.email , token: token});
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(400).json({ message: 'Error logging in user' });
  }
};

//logout user api
exports.logoutUser = async (req, res) => {
  try {
    // Clear the authentication token from the client's cookies
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Error logging out user:', err);
    res.status(500).json({ message: 'Error logging out user' });
  }
};

//forgot password api
exports.forgotPassword = async (req, res) => {
  console.log(req.body);
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM users WHERE email = ?', [req.body.email]);
    connection.release();

    if (results.length === 0) {
      res.status(404).json({ message: 'No user found with this email' });
      return;
    }

    const user = results[0];

    const tempPassword = Math.random().toString(36).slice(-8);

    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);
    await connection.execute('UPDATE users SET password = ? WHERE id = ?', [hashedTempPassword, user.id]);

    const mailOptions = {
      from: 'holisticeducation052021@gmail.com', 
      to: req.body.email,
      subject: 'Password Reset',
      text: `Your temporary password is: ${tempPassword}. Please use this to login and reset your password.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Reset password email sent:', info.response);
        res.status(200).json({ message: 'Reset password email sent' });
      }
    });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(400).json({ message: 'Error resetting password' });
  }
};

passport.use(new GoogleStrategy({
  clientID: 'your client id',
  clientSecret: 'your client id secret',
  callbackURL: "http://localhost:8081/auth/google/callback"
},
async function(accessToken, refreshToken, profile, done) {

  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [profile.id]);
    connection.release();

    if (results.length === 0) {
      
      const [insertResult, insertFields] = await connection.execute('INSERT INTO users (id, email) VALUES (?, ?)', [profile.id, profile.emails[0].value]);
      
      return done(null, insertResult.insertId);
      
    } else {
     
      return done(null, results[0].id);
    }
  } catch (err) {
    console.error('Error with Google OAuth:', err);
    return done(err, null);
  }
}
));


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
};
