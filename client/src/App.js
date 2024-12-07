
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import { useState } from 'react';
import CodeEditor from './components/CodeEditor';

function App() {
  const [mode,setmode]=useState("light");
  return (
    <>
      <Router>
        <Navbar mode={mode} setmode={setmode}/>
        <Routes>
          <Route exact path="/" element={<Home mode={mode}/>} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/codeeditor" element={<CodeEditor />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
