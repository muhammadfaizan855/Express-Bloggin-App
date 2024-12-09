import express from "express"
import { loginUser, logoutUser, refreshToken, userRegister } from "../controller/users.controller.js"

const router = express.Router();


// authentication
router.post("/register" , userRegister);
router.post("/login" , loginUser);
router.post("/logout" , logoutUser);
router.post("/refreshtoken" , refreshToken);





export default router