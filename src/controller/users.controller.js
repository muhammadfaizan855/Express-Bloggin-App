import User from "../models/users.models.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// Access JWT Token

const generateAccessToken = (user)=>{
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
        expiresIn: "6h",
    });
}

// Refresh JWT Token

const generateRefreshToken = (user)=>{
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, { expiresIn : "7d",
    });
}



// user register

const userRegister = async (req , res)=>{
   const { username , email , password} = req.body
   
   
   if(!username){
    res.status(400).json({
        message : "Username is Required"  
    })
   }

   if(!email){
    res.status(400).json({
        message : "Email is Required"  
    })
   }

   if(!password){
    res.status(400).json({
        message : "Password is Required"  
    })
   }


   const user = await User.findOne({email : email});
   if(user) return res.status(401).json({message : "User Already Exist"})

   const createUser = await User.create({
    email, 
    password,
    username
   })
   res.status(200).json({
    message : "User Registered Successfully",
    data : createUser, 
   })
}


const loginUser = async (req , res) => {
    const {email , password} = req.body;

    if(!email){
        res.status(404).json({message : "Email is Required"})
    };
    if(!password){
        res.status(404).json({message : "Password is Required"})
    };

    // email mujood ha bhi ye nhi 

    const user = await User.findOne({email : email});
    if(!user) return res.status(404).json({message : "User No Found"});

    // agar email mujood ha toh password compare karen ge bcrypt ke through 
    
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword) return res.status(400).json({message : "incorrect Password"});
    
    // JWT Token Generate 
    
    const accessToken =  generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)   
    
    // uske bad cookies mai refresh token save karwana ha 
    
    res.cookie("refreshToken" , refreshToken, { http: true , secure : false })


    res.status(200).json({
      message: "User logged in succesfully",
      accessToken,
      refreshToken,
      data : user,
    })
        

}


// logout User

const logoutUser = (req , res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({message: "User logout successfully"})
}



// Refresh Token


const refreshToken = async (req , res) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if(!refreshToken){
        return res.status(401).json({
            message : "No Refresh Token Found!"
        })
    }


    const decodedToken = jwt.verify(refreshToken , process.env.REFRESH_JWT_SECRET)
    
    const user = await User.find({email : decodedToken.email})

    if(!user){
        return res.status(404).json({
            message : "Invalid Token"
        })
    }

    const generateToken = generateAccessToken(user)
    return res.status(200).json({ message : "access token generate" , accessToken: generateToken })

    res.json({ decodedToken ,  })
}




// authenticate user middlewire

const authenticateUser = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(404).json({ message: "no token found" });

  jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "invalid token" });
    req.user = user;
    next();
  });
};



export { userRegister , loginUser , logoutUser , refreshToken , authenticateUser }


