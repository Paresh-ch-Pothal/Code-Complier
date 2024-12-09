import React, { useRef, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { VscRunAll } from "react-icons/vsc";
import { Link, useLocation } from 'react-router-dom';
import Html from './Html';
import Css from './Css';
import JavaS from './JavaS';

const Home = (props) => {

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


    const runCode = () => {
        const outputContainer = document.querySelector('.output-container'); // The correct container for output

        // Clean up previous iframe if exists
        const existingIframe = outputContainer.querySelector('iframe');
        if (existingIframe) existingIframe.remove();

        // Create a new iframe for output
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';  // Adjust width as needed
        iframe.style.height = '400px';
        iframe.style.border = 'none';
        outputContainer.appendChild(iframe);  // Append to the right-side output container

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
                ${cssCode}
            </style>
        </head>
        <body>
            ${htmlCode}
            <script>
                ${jsCode}
            </script>
        </body>
        </html>
    `);
        doc.close();
    };


    const [htmlTrue, setHtmlTrue] = useState(true);
    const [cssTrue, setCssTrue] = useState(false);
    const [jsTrue, setJSTrue] = useState(false);
    const outputRef = useRef(null); // Ref for the output container

    const CssRender = () => {
        setHtmlTrue(false);
        setCssTrue(true);
        setJSTrue(false);
    }
    const HtmlRender = () => {
        setHtmlTrue(true);
        setCssTrue(false);
        setJSTrue(false);
    }
    const JsRender = () => {
        setHtmlTrue(false);
        setCssTrue(false);
        setJSTrue(true);
    }
    return (
        <>
            <div>
                <div className='homePage'>
                    <div className='left'>
                        <div className='middletop'>
                            <h5>Code</h5>
                            <VscRunAll className='runCode' onClick={runCode} size={25} />
                        </div>
                        <div className='line' style={{ backgroundColor: props.mode === "dark" ? "white" : "black" }}></div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item" >
                                <a style={{ cursor: "pointer",color: "white" }} onClick={HtmlRender} className="nav-link" aria-current="page">HTML</a>
                            </li>
                            <li className="nav-item" >
                                <a style={{ cursor: "pointer",color: "white" }} onClick={CssRender} className="nav-link">CSS</a>
                            </li>
                            <li className="nav-item" >
                                <a style={{ cursor: "pointer",color: "white" }} onClick={JsRender} className="nav-link">JAVASCRIPT</a>
                            </li>
                        </ul>
                        <div style={{ height: "30vh" }}>
                            {htmlTrue ? <Html htmlOptions={htmlOptions} htmlCode={htmlCode} setHtmlCode={setHtmlCode} /> : cssTrue ? <Css cssOptions={cssOptions} cssCode={cssCode} setCssCode={setCssCode} /> : <JavaS jsOptions={jsOptions} jsCode={jsCode} setJsCode={setJsCode} />}
                        </div>
                    </div>
                    <div className='right'>
                        <h5 style={{ padding: "10px 10px", textAlign: "center" }}>Output</h5>
                        <div className='line' style={{ backgroundColor: props.mode === "dark" ? "white" : "black" }}></div>
                        <div ref={outputRef} className='output-container'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
