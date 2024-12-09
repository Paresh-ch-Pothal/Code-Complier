
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
   
    const defaultHtmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Runner</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome to Code Runner</h1>
    <p>This is a simple boilerplate HTML code.</p>
    <button onclick="changeContent()">Click Me</button>
    <script src="script.js"></script>
</body>
</html>
`;

    const defaultCssCode = `
/* Basic CSS Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: lightgray;
    text-align: center;
    padding: 20px;
}
`;

    const defaultJsCode = `
// A simple JavaScript function
function changeContent() {
    document.querySelector('h1').innerText = "Code Executed!";
    document.querySelector('p').innerText = "You changed the content using JavaScript!";
}
`;

    const [htmlCode, setHtmlCode] = useState(defaultHtmlCode);
    const [cssCode, setCssCode] = useState(defaultCssCode);
    const [jsCode, setJsCode] = useState(defaultJsCode);
    const [output, setOutput] = useState('');

    // Monaco Editor options
    const htmlOptions = { selectOnLineNumbers: true };
    const cssOptions = { selectOnLineNumbers: true };
    const jsOptions = { selectOnLineNumbers: true };

    // Function to run the code
    const runCode = () => {
        // Create a new HTML document to run the user's code
        const iframe = document.createElement('iframe');
        iframe.style.width = '33%';
        iframe.style.height = '400px';
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Code Output</title>
                <style>
                    ${cssCode}  // Inject the user's CSS
                </style>
            </head>
            <body>
                ${htmlCode}  // Inject the user's HTML
                <script>
                    ${jsCode}  // Inject the user's JS
                </script>
            </body>
            </html>
        `);
        doc.close();
    };

    return (
        <div>
            <h1>Code Editor</h1>

            <div style={{ marginBottom: '20px' }}>
                <h2>HTML Code</h2>
                <Editor
                    language="html"
                    value={htmlCode}
                    options={htmlOptions}
                    height={400}
                    onChange={newValue => setHtmlCode(newValue)}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>CSS Code</h2>
                <Editor
                    language="css"
                    value={cssCode}
                    options={cssOptions}
                    height={400}
                    onChange={newValue => setCssCode(newValue)}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>JavaScript Code</h2>
                <Editor
                    language="javascript"
                    value={jsCode}
                    options={jsOptions}
                    height={400}
                    onChange={newValue => setJsCode(newValue)}
                />
            </div>

            <button onClick={runCode}>Run Code</button>

            <h2>Output:</h2>
            <div>{output}</div>
        </div>
    );
};

export default CodeEditor;

