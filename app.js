const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const path = require('path');

const auth = require('./middleware/auth');

const userCtrl = require('./controllers/user');


const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api', postsRoutes);
app.use('/api', userRoutes);

//+ Déplacé vers / routes / user
// app.get('/api/users/:id', auth, userCtrl.getOneUser);
// app.get('/api/users', auth, userCtrl.getAllUsers);
// app.delete('/api/users/:id', auth, userCtrl.deleteUserAccount);


module.exports = app;