import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({mode}) => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

  const runCode = () => {
    try {
      const fn = new Function(code);
      const originalLog = console.log;
      console.log = (message) => {
        setOutput((prevOutput) => prevOutput + message + '\n');
        originalLog(message);
      };
      fn();
      console.log = originalLog;
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={(value) => setCode(value || '')}
        theme={mode === "dark" ? "vs-dark" : "light"}
      />
      <button onClick={runCode} style={{ margin: '10px', padding: '10px', fontSize: '16px' }}>
        Run Code
      </button>
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
