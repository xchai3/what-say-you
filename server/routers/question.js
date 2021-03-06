var express =require('express');
const questionDAO = require("../DAOs/question");
const router = express.Router();
var HttpStatus=require('http-status-codes');
module.exports=router;   //分开用router一定要 export


/***retrieve all questions  or a single one ****/
router.get('/', async (req,res)=>{
    // const todos=["ABC","DEF"];
    const { contain } = req.query;
    console.log("contain",contain);
    let questions;
    if(contain){
        questions= await questionDAO.findOptions(contain);
        console.log("this",questions);
        // console.log(typeof(questions));
        // console.log("single ",questions.answers);
    }
    else {
         questions = await questionDAO.findAll();
        // console.log("questions",questions);
        //json 发送Array 或者Object
        // console.log("questions", questions);
    }
    if(questions.length!==0) {
        await  res.status(HttpStatus.OK).json(questions);
        // res.status(HttpStatus.OK).send();
    }
    else{
        res.status(HttpStatus.NOT_FOUND).send();
    }
});


/**** Add new questions into database ***************/
router.post('/',async(req,res)=>{
    console.log("req",req.body);
    const {description,answers}=req.body.question;
    const newQuestion={description,answers};
    console.log(newQuestion);
    const result=await  questionDAO.insertOne(newQuestion);
    console.log("added",result) ;
    if(result){
        res.status(HttpStatus.OK).send();
    }
    else
        res.status(HttpStatus.BAD_REQUEST).send();
})

/*********Delete a question ******/
router.delete('/:description', async (req,res)=>{
    // const todos=["ABC","DEF"];
    const {description}=req.body;
    console.log("description",description);
    //deal with the database
    const result=await questionDAO.deleteOne(description);
    console.log("delete",result);
    if(result>0)
        res.status(HttpStatus.OK).send();
    else
        res.status(HttpStatus.BAD_REQUEST).send();
});

