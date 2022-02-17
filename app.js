const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
require('dotenv').config()
const sequelize = require('./db.js');


const indexRouter = require('./routes/index');

(async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    }catch (e) {
        console.log(e)
    }
})()


const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);


server.listen(PORT, ()=> console.log('Started server: http://localhost:'+PORT))
