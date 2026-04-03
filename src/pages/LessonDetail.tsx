import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Play, CheckCircle2, Terminal, Sparkles, Zap, BookOpen } from 'lucide-react';

export default function LessonDetail({ isDarkMode }: { isDarkMode: boolean }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'challenge'>('content');
  const [challengeStatus, setChallengeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!id) return;
    const unsubscribe = onSnapshot(doc(db, 'lessons', id), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setLesson(data);
        setCode(data.codeExample || '');
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `lessons/${id}`);
    });
    return () => unsubscribe();
  }, [id]);

  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setOutput([]);
    setIsRunning(true);

    const lang = lesson.language?.toLowerCase();
    
    if (['javascript', 'html', 'css'].includes(lang)) {
      // Frontend execution
      if (lang === 'javascript') {
        const originalLog = console.log;
        const logs: string[] = [];
        console.log = (...args) => {
          logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
        };

        try {
          new Function(code)();
          setOutput(logs);
          checkChallenge(code, logs);
        } catch (err: any) {
          setOutput([`Error: ${err.message}`]);
        } finally {
          console.log = originalLog;
          setIsRunning(false);
        }
      } else {
        // HTML/CSS - we can't easily show output in a console, but we could show a preview
        // For now, just simulate success if it contains required tags
        setOutput(['Frontend code executed. See preview (coming soon).']);
        checkChallenge(code, []);
        setIsRunning(false);
      }
    } else {
      // Backend execution via Piston API
      try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: lang === 'cpp' ? 'cpp' : lang,
            version: '*',
            files: [{ content: code }]
          })
        });
        const result = await response.json();
        const out = result.run.stdout || result.run.stderr || 'No output';
        setOutput(out.split('\n'));
        checkChallenge(code, out.split('\n'));
      } catch (err: any) {
        setOutput([`Execution Error: ${err.message}`]);
      } finally {
        setIsRunning(false);
      }
    }
  };

  const checkChallenge = (userCode: string, logs: string[]) => {
    if (!lesson.challenge) return;
    
    const solution = lesson.challenge.solution?.toLowerCase() || '';
    const isSolved = userCode.toLowerCase().includes(solution) || 
                     logs.some(l => l.toLowerCase().includes(solution));

    if (isSolved) {
      setChallengeStatus('success');
      handleComplete();
    } else {
      setChallengeStatus('error');
      setTimeout(() => setChallengeStatus('idle'), 3000);
    }
  };

  const handleComplete = async () => {
    if (!auth.currentUser || isCompleted) return;
    setIsCompleted(true);
    const userRef = doc(db, 'users', auth.currentUser.uid);
    try {
      await updateDoc(userRef, {
        completedLessons: arrayUnion(id),
        points: increment(50)
      });
    } catch (error) {
      console.error("Error updating user points:", error);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );

  if (!lesson) return <div className="text-center py-20">Lesson not found</div>;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-12rem)]">
        {/* Sidebar / Content */}
        <div className={`lg:w-1/2 flex flex-col rounded-3xl border overflow-hidden ${
          isDarkMode ? 'bg-[#1E1E2F] border-white/5' : 'bg-white border-gray-200 shadow-xl'
        }`}>
          <div className={`p-6 border-b flex items-center justify-between ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/lessons')} className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-display font-bold text-xl">{lesson.title}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">{lesson.language}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{lesson.difficulty}</span>
                </div>
              </div>
            </div>
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'content' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-500' : 'text-gray-500'
                }`}
              >
                Learn
              </button>
              <button
                onClick={() => setActiveTab('challenge')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'challenge' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-500' : 'text-gray-500'
                }`}
              >
                Challenge
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'content' ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="prose prose-invert max-w-none dark:prose-p:text-gray-400 prose-headings:font-display prose-headings:font-bold prose-pre:bg-black/20 prose-pre:border prose-pre:border-white/5"
                >
                  <div className={`markdown-body ${isDarkMode ? 'dark' : ''}`}>
                    <ReactMarkdown>{lesson.content}</ReactMarkdown>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="challenge"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className={`p-8 rounded-3xl border relative overflow-hidden ${
                    isDarkMode ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-100'
                  }`}>
                    <div className="absolute -top-4 -right-4 p-8 opacity-5 rotate-12">
                      <Sparkles className="w-24 h-24 text-blue-500" />
                    </div>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mb-6">
                      <Zap className="w-6 h-6 mr-3" />
                      <h3 className="text-xl font-display font-bold">Mini Challenge</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg">
                      {lesson.challenge?.description || "Solve the coding task to earn points!"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-4 py-2 rounded-xl">
                        +{lesson.challenge?.points || 50} XP Reward
                      </span>
                    </div>
                  </div>
                  
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-8 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center space-x-6"
                    >
                      <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/20">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-display font-bold text-green-500">Challenge Completed!</h4>
                        <p className="text-green-500/70">Great job! You've earned 50 XP.</p>
                      </div>
                    </motion.div>
                  )}

                  {challengeStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center font-bold text-red-500"
                    >
                      Not quite. Check your code and try again!
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Editor Area */}
        <div className={`lg:w-1/2 flex flex-col rounded-3xl border overflow-hidden ${
          isDarkMode ? 'bg-[#1E1E2F] border-white/5' : 'bg-white border-gray-200 shadow-xl'
        }`}>
          <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs font-mono text-gray-500">main.js</span>
            </div>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="px-6 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-green-600/20 active:scale-95"
            >
              <Play className={`w-3 h-3 fill-current ${isRunning ? 'animate-pulse' : ''}`} />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>
          
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage={lesson.language?.toLowerCase() || 'javascript'}
              theme={isDarkMode ? "vs-dark" : "light"}
              value={code}
              onChange={(val) => setCode(val || '')}
              options={{
                fontSize: 14,
                fontFamily: 'Fira Code, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 20 },
                lineNumbers: 'on',
                roundedSelection: true,
              }}
            />
          </div>

          {/* Console Output */}
          <div className={`h-48 border-t flex flex-col ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
            <div className={`px-4 py-2 border-b flex items-center justify-between ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-gray-500" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Console Output</span>
              </div>
              <button onClick={() => setOutput([])} className="text-[10px] text-gray-500 hover:text-blue-500 uppercase font-bold transition-colors">Clear</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm custom-scrollbar bg-black/5 dark:bg-black/20">
              {output.length > 0 ? (
                output.map((log, i) => (
                  <div key={i} className={`mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{`> ${log}`}</div>
                ))
              ) : (
                <span className="text-gray-400 italic text-xs">No output yet. Run your code to see results.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
