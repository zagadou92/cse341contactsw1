const express = require('express');
const mongodb = require('./data/database');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE //
app.use(bodyparser.json());

// Swagger //
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Routes //
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening. Node running on port ${port}`);
    });
  }
});
