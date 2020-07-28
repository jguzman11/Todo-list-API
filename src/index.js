// Api file

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// connection to mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'todo' //dont have this yet
   });

//    make sure connection works..
   try {
    connection.connect();
   } catch (e) {
    console.log('Oops.. Connection to MySQL failed...');
    console.log(e);
   }

const api = express();
// dirname is global 
api.use(express.static(__dirname + '/public'));

// parse the data you get and adds it to the request body parameter..
api.use(bodyParser.json());

api.listen(3000, () => {
    console.log('my api is running!!!');
});

// routes you to the list of all task 
api.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks ORDER BY created DESC', (error, results) => {
       if (error) return res.json ({ error: error });
 
       res.json (results);
    });
 });
 
 // post route api
api.post('/tasks/add', (req, res) => {
    connection.query('INSERT INTO tasks (description) VALUES (?)', [req.body.item], (error, results) => {
     if (error) return res.json({ error: error });
 
   connection.query('SELECT LAST_INSERT_ID() FROM tasks', (error, results) => {
      if (error) return res.json({ error: error });
 
       res.json({
        id: results[0]['LAST_INSERT_ID()'],
        description: req.body.item
       });
     });
    });
   });
 
   api.post('/tasks/:id/update', (req,res) => {
    connection.query('UPDATE tasks SET completed = ? WHERE id = ?', [req.body.completed, req.params.id], (error, results) => {
       if (error) return res.json({ error: error });
 
       res.json({});
    });
   });
 
 api.post('/tasks/:id/remove', (req,res) => {
    connection.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (error, results) => {
       if (error) return res.json({ error: error });
 
       res.json({});
    });
 });

// routes are your the specific pages/URL's for your server..
// because we are local we win run local 3000

// send back the object to the browser
// Identify item with ID  
