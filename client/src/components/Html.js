import React from 'react'
import Editor from '@monaco-editor/react';

const Html = ({htmlOptions,htmlCode,setHtmlCode,mode}) => {
    return (
        <div>
            <Editor
                language="html"
                value={htmlCode}
                options={htmlOptions}
                height="80vh"
                onChange={newValue => setHtmlCode(newValue)}
                theme="vs-dark"
            />
        </div>
    )
}

export default Html
