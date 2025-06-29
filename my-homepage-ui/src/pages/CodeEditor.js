import React, { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { githubDark } from '@uiw/codemirror-theme-github';
import './CodeEditor.css';

const languageExtensions = {
  javascript: javascript({ jsx: true }),
  python: python(),
  cpp: cpp(),
};

const initialCode = {
  javascript: `// Zcoder JavaScript Playground\nconsole.log("Hello, World!");`,
  python: `# Zcoder Python Playground\nprint("Hello, World!")`,
  cpp: `// Zcoder C++ Playground\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}`,
};

const CodeEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(initialCode[language]);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(initialCode[newLang]);
    setOutput('');
  };

  const onChange = useCallback((value) => {
    setCode(value);
  }, []);

  const handleRunCode = async () => {
    setOutput('');
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/execute', { // Assuming you kept the code runner server
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code }),
      });
      const result = await response.json();
      if (result.output) {
        setOutput(result.output);
      } else {
        setOutput('Execution finished with no output or an error occurred.');
      }
    } catch (error) {
      setOutput('Failed to connect to the execution server.');
    }
    setIsLoading(false);
  };

  return (
    <div className="page-container code-editor-page">
      <div className="editor-controls">
        <h1>Multi-Language Playground</h1>
        <div className='controls-right'>
          <select value={language} onChange={handleLanguageChange} className="language-selector">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          <button onClick={handleRunCode} className="run-button" disabled={isLoading}>
            {isLoading ? 'Executing...' : '▶ Run'}
          </button>
        </div>
      </div>
      <div className="editor-layout">
        <div className="editor-panel">
          <CodeMirror
            value={code}
            height="100%"
            theme={githubDark}
            extensions={[languageExtensions[language]]}
            onChange={onChange}
            className="codemirror-instance"
          />
        </div>
        <div className="output-panel">
          <div className="output-header">Output</div>
          <pre className="output-content">
            {isLoading ? 'Running...' : (output || <span className="no-output">Click "Run" to see the output.</span>)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;