const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let questionSchema=new Schema({
    description:{
        type:String,
        required:true
    },
    answers:{
        type:[String],
        required:true
    }
})
const questionModel = mongoose.model('question', questionSchema);

module.exports=questionModel;
