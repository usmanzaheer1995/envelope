require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const { format, isBefore } = require('date-fns');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')));

app.post('/login', (req, res) => {
    let errors = {};
    if (!req.body.username || req.body.username !== process.env.LOGIN) {
        errors.username = "Username is invalid";
    }
    if (!req.body.password || req.body.password !== process.env.PASSWORD) {
        errors.password = "Password is invalid";
    }
    if (isBefore(new Date(), format(new Date(process.env.DOB), 'MM/DD/YYYY'))) {
        errors.beforeDate = true;
    }

    if (Object.keys(errors).length) {
        return res.status(400).json(errors);
    } else {
        return res.status(200).json({ msg: "Success" });
    }
});

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(__dirname);
  console.log(`Server listening at port ${port}`);
});