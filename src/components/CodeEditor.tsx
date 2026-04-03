import React, { useState, useRef, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { Play } from 'lucide-react';

interface CodeEditorProps {
  language: string;
  initialCode?: string;
  onChange?: (value: string | undefined) => void;
}

const LANGUAGE_COMMANDS: Record<string, { label: string, description: string, insertText: string }[]> = {
  javascript: [
    { label: 'console.log', description: 'Print to console', insertText: 'console.log()' },
    { label: 'function', description: 'Define a function', insertText: 'function name() {\n\t\n}' },
    { label: 'const', description: 'Declare constant', insertText: 'const ' },
  ],
  python: [
    { label: 'print', description: 'Print to console', insertText: 'print()' },
    { label: 'def', description: 'Define a function', insertText: 'def name():\n\t' },
    { label: 'import', description: 'Import module', insertText: 'import ' },
  ],
  html: [
    { label: 'h1', description: 'Heading 1', insertText: '<h1></h1>' },
    { label: 'p', description: 'Paragraph', insertText: '<p></p>' },
  ],
  default: [
    { label: 'print', description: 'Print to console', insertText: 'print()' },
    { label: 'function', description: 'Define a function', insertText: 'function name() {\n\t\n}' },
  ]
};

export default function CodeEditor({ language, initialCode = '', onChange }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [iframeSrcDoc, setIframeSrcDoc] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const commands = LANGUAGE_COMMANDS[language] || LANGUAGE_COMMANDS.default;

  useEffect(() => {
    setOutput([]);
    setIframeSrcDoc('');
  }, [language]);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
    if (onChange) {
      onChange(value);
    }
  };

  const handleRun = () => {
    if (['html', 'javascript', 'css'].includes(language)) {
      const srcDoc = `
        <html>
          <body>${language === 'html' ? code : ''}</body>
          <script>${language === 'javascript' ? code : ''}</script>
          <style>${language === 'css' ? code : ''}</style>
        </html>
      `;
      setIframeSrcDoc(srcDoc);
    } else {
      setOutput(prev => [...prev, `> Running ${language} code...`, `Result: [Simulated output for ${code.substring(0, 20)}...]`]);
    }
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    monaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: () => {
        const suggestions = commands.map(cmd => ({
          label: cmd.label,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: cmd.insertText,
          documentation: cmd.description,
        }));
        return { suggestions };
      },
    });
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-300">Editor</h3>
        <button onClick={handleRun} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
          <Play className="w-4 h-4" /> Run Code
        </button>
      </div>
      <div className="flex-1 border border-slate-700 rounded-lg overflow-hidden">
        <Editor
          height="300px"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            suggestOnTriggerCharacters: true,
          }}
        />
      </div>
      
      <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 h-48 overflow-y-auto font-mono text-xs text-slate-300">
        <h4 className="text-slate-500 mb-2">Output:</h4>
        {['html', 'javascript', 'css'].includes(language) ? (
          <iframe ref={iframeRef} srcDoc={iframeSrcDoc} title="output" className="w-full h-full bg-white" />
        ) : (
          output.map((line, i) => <div key={i}>{line}</div>)
        )}
      </div>

      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">Available Commands (Type to autocomplete):</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {commands.map((cmd) => (
            <div key={cmd.label} className="bg-slate-900 p-2 rounded border border-slate-700">
              <span className="text-blue-400 font-mono">{cmd.label}</span>
              <span className="text-slate-500 ml-2">- {cmd.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
