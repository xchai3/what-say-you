var express =require('express');
const questionDAO = require("../DAOs/question");
const router = express.Router();
var HttpStatus=require('http-status-codes');
module.exports=router;   //分开用router一定要 export


/***retrieve all questions ****/
router.get('/', async (req,res)=>{
    // const todos=["ABC","DEF"];
    const questions= await questionDAO.findAll();
    // console.log("questions",questions);
    //json 发送Array 或者Object
    res.json(questions);
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
