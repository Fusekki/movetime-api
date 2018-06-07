var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {

    app.get('/users', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id)
        };
        db.collection('movietimes').find({}, (err, item) => { _.toArray()
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(item);
            }
        });

    });

    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id)
        };
        db.collection('movietimes').findOne(details, (err, item) => {
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
            name: req.body.name,
            email: req.body.email
        };
        db.collection('movietimes').insert(user, (err, result) => {
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
        db.collection('movietimes').remove(details, (err, item) => {
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
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const user = { name: req.body.name, email: req.body.email };
        db.collection('movietimes').update(details, user, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(user);
          } 
        });
      });


};