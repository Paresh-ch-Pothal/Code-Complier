const mongoose=require("mongoose");
const User = require("./user");
const EditorSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    code:{
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
},{
    timestamps: true
})

const Editor=mongoose.model("Editor",EditorSchema);
module.exports=Editor;