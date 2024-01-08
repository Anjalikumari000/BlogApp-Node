const express = require("express"); 
const app = express()


const mongoose = require("mongoose"); 

mongoose.connect("mongodb://127.0.0.1:27017/blog")     
const db = mongoose.connection 

db.on("error", (err) => {
    console.log(err) 
}) 

db.once("open", () => {
    console.log("Connection Established Successfully!");  
})


const Blog = require("./model"); 


app.use(express.json()) 

// ROUTES DEFINED HERE 

app.get("/", (req,res) => {
    res.send("Welcome TO Blog App!");  
})

app.get("/getblogs", async (req,res) => {
    try{
        const blogs = await Blog.find(); 
        res.status(200).json(blogs);    
    }catch(err){
        console.log(err); 
        res.status(500).send("Unexpected Error Occured!") 
    }
});   

app.post("/postblog", async (req,res) => {
    try{
        const blog = new Blog({title:req.body.title, content:req.body.content, author:req.body.author});  
        const newBlog = await blog.save(); 
        res.status(201).send("Blog Added Successfully!") 
    }catch(err){
        console.log(err); 
        res.status(500).send("Unexpected Error Occured!")  
    }
});  


const PORT = 5000; 
app.listen(PORT, () => {
    console.log(`[SERVER STARTED] : http://localhost:${PORT}`)   
})  