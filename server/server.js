var express =require('express');
const app=express();
var path=require('path');
const mongoose=require('mongoose');
var bodyParser = require('body-parser');
var cors=require('cors');
var http=require('http').Server(app);
var questionRouter=require('./routers/question');
var resultRouter=require('./routers/result');
var emailRouter=require('./routers/email');
var questionModel=require('../server/models/question')
var questionDAO=require('../server/DAOs/question');
const port =process.env.PORT||5000;




//initial
// solve parameter passing from client
const clientPath=path.join(__dirname,'../client/build');
app.use(express.static(clientPath));
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());

// solve cross domain issue
app.use(cors());

//connect to the database
const dbUrl = 'mongodb://localhost:27017/question';
mongoose.connect(process.env.MONGODB_URI||dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
        console.log('database failed');
        return false;
    }
    console.log("Database created");
});

// console.log("hhhh");

//define routers

app.use('/questions',questionRouter);
app.use('/results',resultRouter);
app.use('/emails',emailRouter);
// http.listen(port,()=>console.log(`server started on port ${port}`));
http.listen(port,function(){
    console.log(`listen on :${port}`);
})
