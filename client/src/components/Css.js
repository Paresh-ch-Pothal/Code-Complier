import React from 'react'
import Editor from '@monaco-editor/react';

const Css = ({cssCode,cssOptions,setCssCode}) => {
  return (
    <div>
      <Editor
          language="css"
          value={cssCode}
          options={cssOptions}
          height="80vh"
          onChange={newValue => setCssCode(newValue)}
          theme='vs-dark'
        />
    </div>
  )
}

export default Css
