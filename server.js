const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const router = require('./routes/routes.js');

//dbconnection
const dbconnection = require('./utils/dbconn')



const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routing
app.use('/', router);


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


