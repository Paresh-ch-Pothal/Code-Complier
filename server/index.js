const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const {connectToMongoDB}=require("./connectToDb")
const userRoutes=require('./routes/user');
const editorRoutes=require('./routes/editor');

const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
connectToMongoDB();

app.use("/user",userRoutes);
app.use("/editor",editorRoutes)


const port=5000
app.listen(port,()=>{
    console.log(`Server is running on the port: ${port}`);
})