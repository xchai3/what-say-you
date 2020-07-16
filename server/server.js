var express =require('express');
const app=express();
var path=require('path');
const mongoose=require('mongoose');
var bodyParser = require('body-parser');
var cors=require('cors');
var http=require('http').Server(app);
var questionRouter=require('./routers/question');
var questionModel=require('../server/models/question')
var questionDAO=require('../server/DAOs/question');
const port =process.env.PORT||5000;




//initial
// solve parameter passing from client
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());

// solve cross domain issue
app.use(cors());

//connect to the database
const dbUrl = 'mongodb://localhost:27017/question';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
        console.log('database failed');
        return false;
    }
    console.log("Database created");
});

// console.log("hhhh");

//define routers
app.use('/questions',questionRouter);

// http.listen(port,()=>console.log(`server started on port ${port}`));
http.listen(port,function(){
    console.log(`listen on :${port}`);
})
