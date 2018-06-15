var ObjectID = require('mongodb').ObjectID;
// var User = require('../models/user.js');

module.exports = function (app, db) {

    app.get('/users', (req, res) => {
        db.collection('users').find().toArray((err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(result);
            }
        });

    });

    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id)
        };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(item);
            }
        });

    });

    app.post('/users', (req, res) => {
        // console.log(req.body);
        // res.send('Hello')
        const user = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        db.collection('users').insert(user, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id)
        };
        db.collection('users').remove(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send('User ' + id + ' deleted!');
            }
        });
    });

    app.put('/users/:id', (req, res) => {
        console.log('put request.');
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        let theaters = req.body.theaters;
        if (theaters !== undefined) {
            theaters = req.body.theaters.split();
        }
        const user = { email: req.body.email,
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            zipcode: req.body.zipcode, 
            theaters: theaters };
        console.log(user);
        console.log(req.body);
        console.log(req.params);
        db.collection('users').update(details, user, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(user);
          } 
        });
      });


};