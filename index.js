const express = require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const app = express();
const auth = require('./routes/auth');
const post = require('./routes/post');

mongoose.connect(process.env.DB_CONNECT,{ useUnifiedTopology: true,useNewUrlParser: true },() => {
    console.log("Connected to DB");
});

app.use(bodyParser.json());

app.use('/api/user',auth);
app.use('/api/post',post);

app.listen(9600,() => console.log('Server running at port 9600'));