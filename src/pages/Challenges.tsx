import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Zap, ChevronRight, CheckCircle2, Lock, X, Play } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { challenges } from '../data/challenges';

export default function Challenges({ isDarkMode }: { isDarkMode: boolean }) {
  const [userCompleted] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [activeChallenge, setActiveChallenge] = useState<any | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleRun = () => {
    if (!activeChallenge) return;
    
    try {
      // Simple JS execution for demo (only works for JS challenges)
      const output = eval(code);
      setResult(String(output));
      
      // Basic validation
      if (String(output).toLowerCase().includes(activeChallenge.solution.toLowerCase())) {
        handleComplete();
      }
    } catch (err) {
      setResult(String(err));
    }
  };

  const handleComplete = () => {
    alert('Challenge Completed! Points awarded (mock).');
    setActiveChallenge(null);
  };

  const categories = ['All', 'JavaScript', 'Python', 'CSS', 'HTML', 'C++', 'Java'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const filteredChallenges = challenges.filter(c => 
    (selectedCategory === 'All' || c.category === selectedCategory) &&
    (selectedDifficulty === 'All' || c.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h1 className="text-5xl font-display font-bold mb-4">Coding Challenges</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Test your skills with real-world coding tasks and earn XP.</p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-3xl bg-blue-500/5 border border-blue-500/10">
          <div className="p-3 bg-blue-500/10 rounded-2xl">
            <Trophy className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Completed</div>
            <div className="text-xl font-display font-bold text-blue-500">{userCompleted.length} / {challenges.length}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {cat}
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

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredChallenges.map((challenge, index) => {
            const isDone = userCompleted.includes(challenge.id);
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={`group p-8 border rounded-[2rem] transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden ${
                  isDone 
                    ? 'border-green-500/20 bg-green-500/5' 
                    : isDarkMode 
                      ? 'bg-[#1E1E2F] border-white/5 hover:border-blue-500/30' 
                      : 'bg-white border-gray-200 hover:border-blue-500/30 shadow-xl'
                }`}
              >
                <div className="flex items-center space-x-8 flex-1">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-500 ${
                    isDone ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-8 h-8" /> : <Zap className="w-8 h-8" />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-2xl font-display font-bold leading-tight">{challenge.title}</h3>
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                        challenge.difficulty === 'beginner' ? 'bg-green-500/10 text-green-500' :
                        challenge.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-500">
                        {challenge.category || 'General'}
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-2xl">
                      {challenge.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-10 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 dark:border-white/5 pt-6 md:pt-0 md:pl-10">
                  <div className="text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-end text-blue-500 font-display font-bold text-2xl mb-1">
                      <Star className="w-5 h-5 mr-2 fill-current" />
                      {challenge.points}
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Points</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setActiveChallenge(challenge);
                      setCode(challenge.initialCode || '');
                      setResult(null);
                    }}
                    className={`flex-1 md:flex-none px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center space-x-3 min-w-[180px] ${
                      isDone 
                        ? 'bg-green-500/10 text-green-500 cursor-default' 
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 active:scale-95'
                    }`}
                  >
                    <span>{isDone ? 'Completed' : 'Start Challenge'}</span>
                    {!isDone && <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {filteredChallenges.length === 0 && (
          <div className={`text-center py-32 rounded-[3rem] border border-dashed ${
            isDarkMode ? 'bg-white/2 border-white/10' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="p-6 bg-gray-100 dark:bg-white/5 rounded-3xl inline-block mb-6">
              <Lock className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-display font-bold text-gray-400 mb-2">More challenges coming soon!</h3>
            <p className="text-gray-500">We're crafting new tasks for you to solve.</p>
          </div>
        )}
      </div>

      {/* Challenge Modal */}
      <AnimatePresence>
        {activeChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#1E1E2F] w-full max-w-4xl rounded-[2rem] p-8 border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-display font-bold text-white">{activeChallenge.title}</h2>
                <button onClick={() => setActiveChallenge(null)} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-gray-400 mb-8">{activeChallenge.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-black/30 rounded-2xl p-4 font-mono text-sm border border-white/5">
                  <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
                    padding={20}
                    className="min-h-[300px]"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  />
                </div>
                
                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleRun}
                    className="w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" /> Run Code
                  </button>
                  
                  <div className="flex-1 bg-black/30 rounded-2xl p-6 border border-white/5">
                    <h4 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">Output</h4>
                    <pre className="text-white font-mono text-sm">{result || 'Run your code to see results...'}</pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
