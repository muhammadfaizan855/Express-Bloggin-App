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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    date :
    {
       type: Date,
       default: Date.now,
    }
}  
)



export default mongoose.model("UserBlogs" , blogsSchema)