import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Search, ChevronRight, Plus, Zap } from 'lucide-react';
import { LANGUAGES, DIFFICULTIES } from '../constants';
import { lessons } from '../data/lessons';

export default function Lessons({ isDarkMode }: { isDarkMode: boolean }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiDifficulty, setAiDifficulty] = useState('beginner');

  const handleGenerateAI = async () => {
    if (!aiTopic) return;
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      alert(`Mock AI generated lesson on: ${aiTopic} (${aiDifficulty})`);
      setIsGenerating(false);
      setAiTopic('');
    }, 1500);
  };

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'All' || lesson.language.toLowerCase() === selectedLanguage.toLowerCase();
    const matchesDifficulty = selectedDifficulty === 'All' || lesson.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesLanguage && matchesDifficulty;
  });

  const languages = ['All', ...LANGUAGES];
  const difficulties = ['All', ...DIFFICULTIES];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h1 className="text-5xl font-display font-bold mb-4">Curriculum</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Master the fundamentals and advanced concepts with our structured paths.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-12 pr-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all w-full ${
                isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900 shadow-sm'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {languages.map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                selectedLanguage === lang 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {difficulties.map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedDifficulty === diff 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                  : isDarkMode ? 'bg-white/5 text-gray-500 hover:bg-white/10' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* AI Generation Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-8 rounded-3xl mb-20 flex flex-col lg:flex-row items-center gap-6 border ${
          isDarkMode ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/20' : 'bg-blue-50 border-blue-100 shadow-xl shadow-blue-500/5'
        }`}
      >
        <div className="flex items-center space-x-4 text-blue-600 dark:text-blue-400 flex-shrink-0">
          <div className="p-3 bg-blue-500/10 rounded-2xl">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <div className="font-display font-bold text-xl">AI Lesson Generator</div>
            <div className="text-sm opacity-70">Create custom lessons on the fly</div>
          </div>
        </div>
        <div className="flex-1 w-full relative flex gap-4">
          <input
            type="text"
            placeholder="What do you want to learn today? (e.g., Advanced React Patterns)"
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            className={`flex-1 rounded-2xl px-6 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              isDarkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-blue-200 text-gray-900'
            }`}
          />
          <select
            value={aiDifficulty}
            onChange={(e) => setAiDifficulty(e.target.value)}
            className={`rounded-2xl px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              isDarkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-blue-200 text-gray-900'
            }`}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <button
          onClick={handleGenerateAI}
          disabled={isGenerating || !aiTopic}
          className="w-full lg:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20"
        >
          {isGenerating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          Generate Lesson
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredLessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={`/lessons/${lesson.id}`}
              className={`group block p-10 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden h-full flex flex-col ${
                isDarkMode 
                  ? 'bg-[#1E1E2F] border-white/5 hover:border-blue-500/30' 
                  : 'bg-white border-gray-200 hover:border-blue-500/30 shadow-xl'
              }`}
            >
              <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                <BookOpen className="w-32 h-32" />
              </div>
              
              <div className="flex items-center justify-between mb-8">
                <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest ${
                  lesson.language === 'javascript' ? 'bg-yellow-400/10 text-yellow-500' :
                  lesson.language === 'python' ? 'bg-blue-400/10 text-blue-500' :
                  'bg-purple-400/10 text-purple-500'
                }`}>
                  {lesson.language}
                </span>
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <Zap className={`w-4 h-4 ${
                    lesson.difficulty === 'beginner' ? 'text-green-500' :
                    lesson.difficulty === 'intermediate' ? 'text-yellow-500' : 'text-red-500'
                  }`} />
                </div>
              </div>
              
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-blue-500 transition-colors leading-tight">{lesson.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-10 line-clamp-3 leading-relaxed">
                {lesson.content}
              </p>
              
              <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {lesson.difficulty}
                </span>
                <div className="flex items-center text-blue-500 font-bold text-sm group-hover:translate-x-2 transition-transform">
                  Start Learning
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
