var express =require('express');
const resultDAO = require("../DAOs/result");
const router = express.Router();
var HttpStatus=require('http-status-codes');
module.exports=router;

/************* retrieve all results ****************/
router.get('/', async (req,res)=>{
    // const todos=["ABC","DEF"];
    const result= await resultDAO.findAll();
    console.log("results",result);
    if(result.length!==0) {
        await res.json(result);
    }
});

/************* delete one record *****************/

router.delete('/:description', async (req,res)=>{
    // const todos=["ABC","DEF"];
    console.log("result delete");
    const {description}=req.body;
    console.log("description",description);
    //deal with the database
    const result=await resultDAO.deleteOne(description);
    console.log("delete",result);
    if(result>0)
        res.status(HttpStatus.OK).send();
    else
        res.status(HttpStatus.BAD_REQUEST).send();
});

