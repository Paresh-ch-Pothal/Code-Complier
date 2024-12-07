const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const {connectToMongoDB}=require("./connectToDb")

const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
connectToMongoDB();


const port=5000
app.listen(port,()=>{
    console.log(`Server is running on the port: ${port}`);
})