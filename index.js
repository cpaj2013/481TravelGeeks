//fetch()

const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection(process.env.JAWSDB_URL)
/*
const db = mysql.createConnection({
    host: 'g84t6zfpijzwx08q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'h5qucyck1xhcc9kd',
    password: 'fe32wo0s8ve7qlwd',
    database: 'iqrftioocvga5jxs'
});*/

db.connect();
app.get('/users', (req, res) => {
    const sql ='SELECT * FROM users';

    db.query (sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/properties', (req, res) => {
    const sql = 'SELECT * From properties';

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/properties/add', (req, res) => {
    res.send("This is a post");
});

app.listen(5000, () => console.log('Server started'));

module.exports = app;