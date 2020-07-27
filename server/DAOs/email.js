let emailModel =require('../models/email');

class emailDAO{
    //check if this question has already exist
    // static  async existOne(description){
    //     const res= await resultModel.findOne({description});
    //     if(res)
    //         return true;
    //     return false;
    // }

    //insert a new record
    static async insertOne(emailAddress){
        const res=new emailModel(emailAddress);
        try {
            await res.save();
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    //retrieve all email address
    static async findAll() {
        return emailModel.find({}, { emailAddress: 1 }).collation({ locale: 'en_US' }).sort({ emailAddress: 1 });
    }

    //delete one emailaddress
    static async deleteOne(emailAddress){
        const res=await emailModel.deleteMany({emailAddress: emailAddress});
        //1 means deleted one , 0 means not found
        return res.deletedCount;
    }

}
module.exports=emailDAO;

