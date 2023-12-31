const mongoose=require("mongoose");
const db=async(req,res)=>{
    try {
        await mongoose.connect("mongodb+srv://ry9048095:rakeshlist@list.cr0a6ty.mongodb.net/").then(()=>{
        console.log("DB connected");});
    } catch (error) {
        res.status(400).json({
            message:"Not connected",
        });
    }
}
module.exports=db;