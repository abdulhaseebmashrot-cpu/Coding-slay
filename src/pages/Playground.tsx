import { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import { LANGUAGES } from '../constants';

export default function Playground({ isDarkMode }: { isDarkMode: boolean }) {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <h1 className="text-4xl font-display font-bold mb-8">Code Playground</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Language:</label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300'}`}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div className="h-[500px]">
        <CodeEditor language={selectedLanguage.toLowerCase()} />
      </div>
    </div>
  );
}
