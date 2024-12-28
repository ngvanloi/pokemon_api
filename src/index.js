const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes/index');
const cors = require('cors');
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.json())
routes(app);

mongoose.connect(`${process.env.MONGO_DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connect Db success!');
})
.catch((err) => {
    console.log(err);
});

app.listen(port, () => {
    console.log('Server is running on port:', port);
});