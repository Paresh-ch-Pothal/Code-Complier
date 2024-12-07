import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

  const runCode = () => {
    try {
      // Dynamically create a new function and run the code
      const fn = new Function(code);
      
      // Redirect console.log to capture output in the state
      const originalLog = console.log;
      console.log = (message) => {
        setOutput((prevOutput) => prevOutput + message + '\n');
        originalLog(message); // Keep logging to the console as well
      };

      // Execute the code
      fn();

      // Reset console.log after execution
      console.log = originalLog;
    } catch (error) {
      // If there's an error, set the error message
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
