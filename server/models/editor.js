const mongoose=require("mongoose");
const User = require("./user");
const EditorSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    codeHtml:{
        type: String,
    },
    codeCss:{
        type: String,
    },
    codeJs:{
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