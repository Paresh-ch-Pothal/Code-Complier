
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Html from './components/Html';
import Css from './components/Css';
import JavaS from './components/JavaS';

function App() {
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
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home  output={output} htmlCode={htmlCode}
            cssCode={cssCode}
            jsCode={jsCode} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/codeeditor" element={<CodeEditor  />} />
          <Route exact path="/signin" element={<Signin  />} />
          <Route exact path="/signup" element={<Signup  />} />
          <Route exact path="/htmlpage" element={<Html  htmlOptions={htmlOptions} htmlCode={htmlCode} setHtmlCode={setHtmlCode} />} />
          <Route exact path="/csspage" element={<Css  cssOptions={cssOptions} cssCode={cssCode} setCssCode={setCssCode} />} />
          <Route exact path="/jspage" element={<JavaS  jsOptions={jsOptions} jsCode={jsCode} setJsCode={setJsCode} />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
