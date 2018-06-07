const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
let db = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    // require('./app/routes')(app, database);

    // Make sure you add the database name and not the collection name
    db = database.db("movietime")
    require('./app/routes')(app, db);
    
    app.listen(port, () => {
      console.log('We are live on ' + port);
    });               
  })

// require('./app/routes')(app, {});
// app.listen(port, () => {
//     console.log('Server started!');
//     console.log('We are live on ' + port);
//   });


// app.route('/api/users').get((req, res) => {
// res.send({
//     users: [{ name: 'Jane' }, { name: 'lucy' }]
//     });
// });

// app.route('/api/users/:name').get((req, res) => {
//     const requestedUserName = req.params['name']
//     res.send({ name: requestedUserName });
// });

// app.route('/api/users').post((req, res) => {
//   res.send(201, req.body);
//     });

// app.route('/api/users/:name').put((req, res) => {
//     res.send(200, req.body);
//   });

// app.route('/api/users/:name').delete((req, res) => {
//     res.sendStatus(204);
// });

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))
