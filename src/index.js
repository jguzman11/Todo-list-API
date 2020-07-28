// Api file

const express = require('express');
const bodyParser = require('body-parser');

const api = express();

// dirname is global 
api.use(express.static(__dirname + '/public'));

// parse the data you get and adds it to the request body parameter..
api.use(bodyParser.json());

api.listen(3000, () => {
    console.log('my api is running!!!');
});

// routes are your the specific pages/URL's for your server..
// because we are local we win run local 3000

api.post('/add', (req, res) => {
    console.log(req.body); 
    res.send('it works!!!');
});