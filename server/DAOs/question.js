let questionModel=require('../models/question');

class questionDAO{
    /*******add new Question and Answer **********/
    static async insertOne(newQue){
        const ques=new questionModel(newQue);
        try{
            await ques.save();
        }
        catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }
    /****find all questions *******************/
    static async findAll() {
        return questionModel.find({}, { description: 1,answers:1 }).collation({ locale: 'en_US' }).sort({ description: 1 });
    }

    /*********delete one ***************/
    static async deleteOne(description){
        const res=await questionModel.deleteMany({description: description});
        //1 means deleted one , 0 means not found
        return res.deletedCount;
    }
}

module.exports=questionDAO;
