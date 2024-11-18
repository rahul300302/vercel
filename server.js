const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const app=express();
dotenv.config()
let PORT=process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))


mongoose.connect(process.env.MONGODB_URL?process.env.MONGODB_URL:`mongodb+srv://rahulraw2002:86QzgS73eXe61PQ2@cluster0.s5p1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>console.log('DB Connnect Successfully'))
.catch(err=>console.log(err))

app.use("/",async(req,res)=>{
    res.send("the server is connected in vercel live")
})

app.listen(PORT,(error)=>{
error?console.log(error):console.log(`the server connect in http://localhost:${PORT}`)
})