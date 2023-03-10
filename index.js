const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydatabase',
    connectionLimit: 10
  });

  


app.get('/', (req, res) => {
    res.send('hello world!')
});

app.get('/hello', (req, res) => {
    db.query('SELECT * FROM mytable')
        .then((results) => {
            res.send(results[0])
            console.log(results);
        })
        .catch((error) => {
            console.error(error);
        });
});

const hostname = '127.0.0.1';
const port = 8888;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });