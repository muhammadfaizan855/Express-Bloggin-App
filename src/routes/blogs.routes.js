import express from "express"
import { addblog, deleteBlog, editBlog, getAllBlog, getSingleBlog } from "../controller/blogs.controller.js";

const blogRouter = express.Router();

//add blog
blogRouter.post("/addblog", addblog);
blogRouter.get("/getAllBlog" , getAllBlog);
blogRouter.get("/singleBlog/:id" , getSingleBlog);
blogRouter.delete("/deleteBlog/:id" , deleteBlog);
blogRouter.put("/editBlog/:id" , editBlog);

export default  blogRouter 