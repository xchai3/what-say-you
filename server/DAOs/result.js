let resultModel =require('../models/result');

class resultDAO{
    //check if this question has already exist
   static  async existOne(description){
       const res= await resultModel.findOne({description});
       if(res)
           return true;
       return false;
   }

   //insert a new record
    static async insertOne(description){
       const res=new resultModel({description});
        try {
            await res.save();
        } catch (err) {
            return false;
        }
        return true;
    }

    //retrieve all result
    static async findAll() {
        return resultModel.find({}, { description: 1,op1:1,op2:1,op3:1, }).collation({ locale: 'en_US' }).sort({ description: 1 });
    }

    //delete one result
    static async deleteOne(description){
        const res=await resultModel.deleteMany({description: description});
        //1 means deleted one , 0 means not found
        return res.deletedCount;
    }


}
module.exports=resultDAO;
