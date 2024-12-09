import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : [true , "Username is required"],
    }
    ,
    email: {
        type: String,
        required: [true , "Email is required"],
        unique: true,
    },
    password : {
        type : String,
        required: [true , "Password is Required"],
    },
    profilePic: {
        type: String, 
        default: '',  
    }    
}
,{
    timestamps: true
}
 
)


// middlewire in pre

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


export default mongoose.model("Users" , userSchema);