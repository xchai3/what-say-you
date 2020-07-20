const mongoose =require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema=mongoose.Schema;
let resultSchema=new Schema({
    description:{
        type:String,
        required:true
    },
    op1:{
        type:Number,
        required: false,
        default:0,
    },
    op2:{
        type:Number,
        required:false,
        default:0,
    },
    op3:{
        type:Number,
        required:false,
        default:0,
    }
})
const resultModel=mongoose.model('result',resultSchema);

module.exports=resultModel;
