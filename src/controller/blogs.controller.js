import mongoose from "mongoose";
import Blog from "../models/blogs.models.js";

// add Blog

const addblog = async (req , res) => {
   const { title, description } = req.body;

   if(!title || !description){
   res.status(400).json({
    message: "Title or description is required"
   })
   return
} 

const blog = await Blog.create({
    title,
    description,
})

res.status(201).json({
  message: "blog added successfully",
  data : blog
})

}




// get All Blog


const getAllBlog = async (req , res) => {
   const blogs = await Blog.find({})
   res.status(200).json({
      blog: blogs,
   })
}




// get Single Blog


const getSingleBlog = async (req , res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
   return res.status(400).json({ error: "Not valid Id" });
 }

 const blog = await Blog.findById(id)
 
 if(!blog){
   res.status(400).json({
      message: "No blog Found",
   })
   return
 }

 res.status(200).json(blog)
}


// Delete Blog

const deleteBlog = async (req , res) => {
   const { id } = req.params;
 
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Not valid Id" });
  }

  const blog = await Blog.findOneAndDelete({ _id: id })

  if(!blog){
   return res.status(404).json({
      error: "No Blog Found!"
   })
  }

  res.status(200).json({
   message: "Blog Deleted SuccessFully",
   data : blog,
  })
}




// Edit Blog



const editBlog = async (req ,res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
   return res.status(400).json({ error : "Not Valid id"})
  }
 
  const blog = await Blog.findOneAndUpdate(
   { _id: id},
   {
      ...req.body,
   }
  );

  if(!blog){
   return res.status(400).json({
      error:  "No Blog Found"
   })
  }

  res.status(blog)
}










 
export { addblog , getAllBlog , getSingleBlog , deleteBlog , editBlog}
