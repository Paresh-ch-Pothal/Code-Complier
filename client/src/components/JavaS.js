import React from 'react'
import Editor from '@monaco-editor/react';

const JavaS = ({jsCode,jsOptions,setJsCode}) => {
  return (
    <div>
      <Editor
          language="javascript"
          value={jsCode}
          options={jsOptions}
          height="80vh"
          onChange={newValue => setJsCode(newValue)}
          theme='vs-dark'
        />
    </div>
  )
}

export default JavaS
