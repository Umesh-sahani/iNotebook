const connectToMongo = require('./db');
const express = require('express');

require('dotenv').config();

connectToMongo();//connect to mongo db
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})