var express =require('express');
const emailDAO = require("../DAOs/email");
const router = express.Router();
var HttpStatus=require('http-status-codes');
module.exports=router;


const api_key = '54dbaf9a608d7d10eea5d612640825f7-ed4dc7c4-5691592c';
const domain = 'esnsa5.email';
const mailgun = require('mailgun-js')({ apiKey: api_key, domain });

//create a list
mailgun.post('/lists', {"address": `sportsID@${domain}`, "description": "What say you"}, function (error, body) {
    console.log("create list",body);
});

// var list = mailgun.lists(`sportsID@${domain}`);
// var tony = {
//     subscribed: true,
//     address: 'xipengc@andrew.cmu.edu',
//     // name: 'Bob Barr',
//     // vars: {age: 34}
// };
// list.members().create(tony, function (error, data) {
//     console.log("recipt",data);
// });


// const data = {
//     from: 'Team<sports@esn.community.org>',
//     to: `sportsID@${domain}`,
//     subject: 'What say you',
//     template: 'quiz'
// };
// //  mailgun.messages().send(data, (error, body) => {
// //     if (error) {
// //         console.log(error);
// //         // res.status(503);
// //         // res.send();
// //     } else {
// //         console.log("sent!");
// //         // res.status(201);
// //         // res.send();
// //     }
// // });

/************* retrieve all emailaddress ****************/
router.get('/', async (req,res)=>{
    // const todos=["ABC","DEF"];
    console.log("email");
    const result= await emailDAO.findAll();
    console.log("results",result);
    if(result.length!==0) {
        await  res.status(HttpStatus.OK).json(result);
    }
    else{
        res.send(HttpStatus.NOT_FOUND);
    }
});
/***************** add a new email into mail list *****************/
router.post('/',async(req,res)=>{
    var list = mailgun.lists(`sportsID@${domain}`);
    console.log("add Email server");
    console.log("req",req.body);
    const {emailAddress}=req.body;
    const newEmail={emailAddress};
    console.log(emailAddress);
    const result=await  emailDAO.insertOne(newEmail);
    console.log("added",result) ;
    if(result){
        res.status(HttpStatus.OK).send();
        var tony = {
            subscribed: true,
            address: emailAddress,
        };
        list.members().create(tony, function (error, data) {
            console.log("recipt",data);
        });

    }
    else
        res.status(HttpStatus.BAD_REQUEST).send();
})


/************* delete one email *****************/

router.delete('/:email', async (req,res)=>{
    // const todos=["ABC","DEF"];
    const {emailAddress}=req.body;
    console.log("email",emailAddress);
    //deal with the database
    const result=await resultDAO.deleteOne(description);
    console.log("delete",result);
    if(result>0)
        res.status(HttpStatus.OK).send();
    else
        res.status(HttpStatus.BAD_REQUEST).send();
});

/***************** send email to all users****************/
router.get('/sending', async (req,res)=>{
    console.log("send email");

    const data = {
        from: 'Team<sports@esn.community.org>',
        to: `sportsID@${domain}`,
        subject: 'What say you',
        template: 'quiz'
    };
 mailgun.messages().send(data, (error, body) => {
    if (error) {
        console.log(error);
        res.send(HttpStatus.BAD_REQUEST);
    } else {
        console.log("sent!");
        res.send(HttpStatus.OK)

    }
});
});


