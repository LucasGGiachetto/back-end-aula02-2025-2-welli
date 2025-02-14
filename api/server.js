const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const routes = require('./src/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(4000, () => {
    console.log('Servidor em http://localhost:4000');
});