const express = require('express');
const server = express();
const mysql = require('mysql2/promise');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const jobsRouter = require('./routes/Jobs');
const categoriesRouter = require('./routes/Categories');

const usersRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');


const port = 8081

server.use(cors({
    exposedHeaders:['X-Total-Count']
}));
server.use(express.json());
server.use(cookieParser());
server.use(session({
    secret: 'asap123@',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set to true if using HTTPS
}));

server.use('/jobs', jobsRouter);
server.use('/categories', categoriesRouter);
server.use('/users', usersRouter);
server.use('/auth', authRouter);
server.use('/cart', cartRouter);


main().catch(err => console.log(err));

async function main() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jobs360degree_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    console.log('Database connected');

    server.get('/', (req, res) => {
        res.json({ status: 'success' });
    });

    server.listen(port, () => {
        console.log(`server is running on ${port}`);
    });
}

