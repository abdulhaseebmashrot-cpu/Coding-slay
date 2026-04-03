import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Database, 
  Users, 
  BookOpen, 
  Trophy, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  ChevronRight, 
  Zap, 
  Eye, 
  Code,
  Search,
  LayoutDashboard,
  FileCode,
  AlertCircle,
  User,
  Sparkles
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy, limit } from 'firebase/firestore';
import { generateLesson } from '../lib/gemini';
import { LANGUAGES, DIFFICULTIES } from '../constants';

export default function Admin({ isDarkMode }: { isDarkMode: boolean }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'lessons' | 'challenges' | 'users' | 'code'>('dashboard');
  const [lessons, setLessons] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminName.trim() && password === '78786565') {
      setIsAuthenticated(true);
      setError('');
      fetchData();
    } else {
      setError('Invalid admin credentials');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const lessonsSnap = await getDocs(collection(db, 'lessons'));
      setLessons(lessonsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const challengesSnap = await getDocs(collection(db, 'challenges'));
      setChallenges(challengesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const usersSnap = await getDocs(query(collection(db, 'users'), orderBy('points', 'desc'), limit(50)));
      setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');

  const handleSeedBatch = async () => {
    setIsSeeding(true);
    const languages = LANGUAGES.filter(l => l !== 'All');
    const topics = [
      'Variables and Constants', 'Functions and Scope', 'Arrays and Objects', 
      'Loops and Iteration', 'Async/Await', 'DOM Manipulation',
      'Data Types', 'Control Flow', 'Classes and OOP', 'Error Handling',
      'Modules', 'Regular Expressions', 'Memory Management', 'Algorithms',
      'Data Structures', 'Networking', 'Security', 'Performance',
      'Recursion', 'Sorting Algorithms', 'Graph Theory', 'Dynamic Programming',
      'File I/O', 'Database Connectivity', 'API Integration', 'Unit Testing'
    ];

    const difficultyTopics: Record<string, string[]> = {
      'Beginner': ['Build a Calculator', 'Hello World', 'Simple Variables', 'Basic Loops', 'Basic Functions', 'Data Types', 'Control Flow'],
      'Intermediate': ['Build a To-Do List', 'API Integration', 'Data Structures', 'Error Handling', 'Modules', 'Regular Expressions'],
      'Advanced': ['Build a 2D Game', 'Complex Algorithms', 'System Design', 'Networking', 'Security', 'Performance', 'Recursion', 'Graph Theory', 'Dynamic Programming']
    };

    try {
      let count = 0;
      for (const lang of languages) {
        for (const difficulty of DIFFICULTIES) {
          const topics = difficultyTopics[difficulty] || difficultyTopics['Beginner'];
          for (let i = 0; i < 17; i++) { // Generate ~17 per difficulty to reach ~50 per language
            const topic = topics[Math.floor(Math.random() * topics.length)];
            const lesson = await generateLesson(lang, topic);
            await addDoc(collection(db, 'lessons'), {
              ...lesson,
              language: lang,
              difficulty: difficulty,
              order: lessons.length + count + 1,
              createdAt: new Date().toISOString()
            });
            count++;
          }
        }
      }
      fetchData();
      alert(`Successfully seeded ${count} lessons!`);
    } catch (err) {
      console.error("Seeding error:", err);
      alert('Seeding failed. Check console.');
    } finally {
      setIsSeeding(false);
    }
  };

  const viewFile = async (file: string) => {
    setSelectedFile(file);
    setFileContent('Loading code...');
    try {
      const response = await fetch(`/${file}`);
      if (response.ok) {
        const text = await response.text();
        setFileContent(text);
      } else {
        setFileContent('Error: Could not load file content.');
      }
    } catch (err) {
      setFileContent('Error: Failed to fetch file.');
    }
  };

  const handleDelete = async (coll: string, id: string) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      await deleteDoc(doc(db, coll, id));
      fetchData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 to-black">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full p-10 rounded-[2.5rem] bg-[#1E1E2F] border border-white/5 shadow-2xl"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-white">Admin Access</h1>
            <p className="text-gray-400 mt-2">Enter credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Admin Name</label>
              <input 
                type="text" 
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-blue-500 outline-none transition-all"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Authorize
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0F0F1A]">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/5 flex flex-col p-6 gap-2">
        <div className="flex items-center gap-3 px-4 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">Admin Panel</span>
        </div>

        {[
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'lessons', label: 'Lessons', icon: BookOpen },
          { id: 'challenges', label: 'Challenges', icon: Trophy },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'code', label: 'Website Code', icon: FileCode },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}

        <div className="mt-auto p-4 rounded-2xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <User className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-xs font-bold text-white truncate">{adminName}</div>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-display font-bold text-white capitalize">{activeTab}</h1>
              <p className="text-gray-500 mt-2">Manage your platform resources and users.</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={fetchData}
                className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/5"
              >
                <Zap className="w-5 h-5" />
              </button>
              {activeTab === 'lessons' && (
                <button 
                  onClick={handleSeedBatch}
                  disabled={isSeeding}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSeeding ? 'Seeding...' : 'Seed 30 Lessons'}
                  <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Lessons', value: lessons.length, icon: BookOpen, color: 'text-blue-500' },
                { label: 'Total Challenges', value: challenges.length, icon: Trophy, color: 'text-yellow-500' },
                { label: 'Active Users', value: users.length, icon: Users, color: 'text-green-500' },
              ].map((stat, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-[#1E1E2F] border border-white/5">
                  <div className={`p-4 rounded-2xl bg-white/5 inline-block mb-6 ${stat.color}`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl font-display font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'lessons' && (
            <div className="space-y-4">
              {lessons.map(lesson => (
                <div key={lesson.id} className="p-6 rounded-2xl bg-[#1E1E2F] border border-white/5 flex items-center justify-between group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{lesson.title}</h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{lesson.language}</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{lesson.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg"><Edit3 className="w-5 h-5" /></button>
                    <button onClick={() => handleDelete('lessons', lesson.id)} className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 p-8 rounded-[2rem] bg-[#1E1E2F] border border-white/5">
                <div className="flex items-center gap-4 mb-8">
                  <FileCode className="w-8 h-8 text-blue-500" />
                  <h2 className="text-2xl font-display font-bold text-white">Project Files</h2>
                </div>
                <div className="space-y-3">
                  {[
                    'src/App.tsx', 'src/main.tsx', 'src/lib/firebase.ts', 
                    'src/lib/gemini.ts', 'src/pages/Home.tsx', 'src/pages/Lessons.tsx',
                    'src/pages/Admin.tsx', 'src/pages/Profile.tsx', 'src/seed.ts',
                    'firestore.rules', 'package.json'
                  ].map(file => (
                    <button 
                      key={file} 
                      onClick={() => viewFile(file)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                        selectedFile === file ? 'bg-blue-600/10 border-blue-500/30 text-blue-500' : 'bg-white/2 hover:bg-white/5 border-white/5 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Code className="w-4 h-4" />
                        <span className="text-sm font-mono">{file}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 p-8 rounded-[2rem] bg-[#1E1E2F] border border-white/5 flex flex-col h-[700px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-display font-bold text-white">{selectedFile || 'Select a file'}</h3>
                  {selectedFile && <span className="text-xs font-mono text-gray-500">Read-only</span>}
                </div>
                <div className="flex-1 bg-black/30 rounded-2xl p-6 overflow-auto custom-scrollbar font-mono text-sm text-gray-400 whitespace-pre">
                  {fileContent}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="overflow-hidden rounded-[2rem] border border-white/5 bg-[#1E1E2F]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/2 border-b border-white/5">
                    <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">User</th>
                    <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Role</th>
                    <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Points</th>
                    <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/2 transition-all">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img src={user.photoURL} alt="" className="w-10 h-10 rounded-xl" referrerPolicy="no-referrer" />
                          <div>
                            <div className="text-white font-bold">{user.displayName}</div>
                            <div className="text-xs text-gray-500">{user.uid}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                          user.role === 'admin' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-6 font-display font-bold text-white">{user.points} XP</td>
                      <td className="p-6 text-right">
                        <button className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg"><Settings className="w-5 h-5" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
