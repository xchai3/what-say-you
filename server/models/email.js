const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let emailSchema=new Schema({
    emailAddress:{
        type:String,
        required:true
    }
})
const emailModel = mongoose.model('email', emailSchema);

module.exports=emailModel;
