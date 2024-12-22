import mongoose from "mongoose";


const blogsSchema = new mongoose.Schema({
    title:{
      type : String,
      required : true
    },
    description: {
        type : String, 
        required : [true , "Description is required"]
    },
    userName : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true , "Blog username is required"]
    }
},
{
    timestamps : true
}
)



export default mongoose.model("Blogs" , blogsSchema)