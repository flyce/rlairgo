const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./database/mongodb');
const verifyToken = require('./middleware/verifyToken');

// set up express app
const app = express();

// print log
app.use(logger(':remote-addr :method :url :status :response-time ms - :res[content-length]'));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, ");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});


/***
 * static page
 */
app.use(express.static('public'));

// bodyParser
app.use(bodyParser.json());

// initialize routes
app.post('/test', verifyToken, function (req, res, next) {
    res.json({
        info: 'success!',
        token: req.token == null ? "feng" : req.token
    });
});

app.put('*', verifyToken);
app.delete('*', verifyToken);

app.use("/api", require('./routes/api'));
app.use("/video", require('./routes/video.api'));
app.use("/comment", require('./routes/comment.api'));
app.use("/user", require('./routes/user.api'));
app.use("/type", require('./routes/type.api'));

// error handing middleware
app.use(function (err, req, res, next) {
    // res.status(422).send({error: err._message});
    console.log(err + '\n');
    res.json({error: err._message});
});

// listen for request
app.listen(process.env.port || 5000, function () {
    console.log('now listening port 5000 for requests');
});


