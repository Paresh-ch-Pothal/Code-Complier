const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Editor = require("../models/editor");
const router = express.Router();
const { exec } = require("child_process")

// create a file name
router.post('/create', fetchuser, async (req, res) => {
    try {
        const { name } = req.body
        const editor = new Editor({
            name: name,
            user: req.user._id
        })
        const saveEditor = await editor.save();
        return res.status(200).json({ success: true, saveEditor })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Some internal issue is there" })
    }
})


//update the code written
router.put("/updateCode/:id", async (req, res) => {
    try {
        const editorId = req.params.id
        const { codeHtml,codeCss,codeJs } = req.body;
        const editor = await Editor.findByIdAndUpdate(editorId, { codeHtml,codeCss,codeJs }, { new: true })
        if (!editor) {
            return res.status(404).json({ success: false, message: "Editor is not found" });
        }
        return res.status(200).json({ success: true, editor })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Some internal issue is there" })
    }
})

// delete a file
router.delete("/deletefile/:id", async (req, res) => {
    try {
        const editorId = req.params.id
        const editor = await Editor.findByIdAndDelete(editorId);
        if (!editor) {
            return res.status(404).json({ success: false, message: "Editor is not found" });
        }
        return res.status(200).json({ success: true, editor })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Some internal issue is there" })
    }
})

//execution of file
router.post("/execute/:id", async (req, res) => {
    const editorId = req.params.id
    try {
        const editor = await Editor.findById(editorId);
        if (!editor || !editor.code || !editor.language) {
            return res.status(500).json({ success: false, message: "Please provide the langauge and code to be executed" });
        }
        // save the code to a temporary file
        const fs = require("fs");
        const filePath = `./temp/${editor.name}.${editor.language}`;
        fs.writeFileSync(filePath, editor.code);
        const command = getExecutionCommand(editor.language, filePath);
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(stderr);
                return res.status(500).json({ success: false, error: stderr })
            }
            return res.status(200).json({ success: true, output: stdout })
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Some internal issue is there" })
    }
})

const getExecutionCommand = (language,filePath) => {
    // this is mainly used to execute a particular langauge
    const baseName = filePath.replace(/\.[^/.]+$/, ""); // Remove extension from filePath
    const commands = {
        js: `node ${filePath}`, // JavaScript
        py: `python3 ${filePath}`, // Python
        cpp: `"D:\\MinGW\\bin\\g++" ${filePath} -o ${baseName}.exe && ${baseName}.exe`, // C++
        java: `javac ${filePath} && java ${filePath.replace(".java", "")}`, // Java
    };
    return commands[language] || `echo "Unsupported language"`;
}

module.exports = router