import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, MessageSquare, Plus, Upload, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Community({ isDarkMode }: { isDarkMode: boolean }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'qa'>('projects');

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Lock className="w-20 h-20 mx-auto text-blue-500 mb-8" />
        <h1 className="text-4xl font-display font-bold mb-4">Community Access Required</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Please sign in to access the community hub.</p>
        <Link to="/signin" className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold">
          Sign In
        </Link>
      </div>
    );
  }

  const projects = [
    { id: 1, title: 'Personal Portfolio', author: 'Abdul Haseeb', image: 'https://picsum.photos/seed/coding-1/400/300' },
    { id: 2, title: 'Task Manager App', author: 'Jane Doe', image: 'https://picsum.photos/seed/programming-2/400/300' },
  ];

  const questions = [
    { id: 1, title: 'How to learn React efficiently?', author: 'John Smith' },
    { id: 2, title: 'Best practices for CSS Grid?', author: 'Alice' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display font-bold mb-4">Community Hub</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Share your projects and get help from fellow developers.</p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-8 py-3 rounded-2xl font-bold transition-all ${
            activeTab === 'projects' ? 'bg-blue-600 text-white' : isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-white border border-gray-200 text-gray-600'
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab('qa')}
          className={`px-8 py-3 rounded-2xl font-bold transition-all ${
            activeTab === 'qa' ? 'bg-purple-600 text-white' : isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-white border border-gray-200 text-gray-600'
          }`}
        >
          Q&A
        </button>
      </div>

      {activeTab === 'projects' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <button className={`p-8 rounded-3xl border border-dashed flex flex-col items-center justify-center gap-4 h-80 ${isDarkMode ? 'border-white/10 hover:border-blue-500/30' : 'border-gray-300 hover:border-blue-500/30'}`}>
            <Upload className="w-12 h-12 text-gray-400" />
            <span className="font-bold">Upload New Project</span>
          </button>
          {projects.map(project => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl overflow-hidden border ${isDarkMode ? 'bg-[#1E1E2F] border-white/5' : 'bg-white border-gray-200'}`}>
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                <p className="text-sm text-gray-500">By {project.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <button className={`w-full p-6 rounded-2xl border flex items-center gap-4 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-200'}`}>
            <Plus className="w-6 h-6 text-purple-500" />
            <span className="font-bold">Ask a new question</span>
          </button>
          {questions.map(q => (
            <div key={q.id} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#1E1E2F] border-white/5' : 'bg-white border-gray-200'}`}>
              <h3 className="font-bold text-lg mb-2">{q.title}</h3>
              <p className="text-sm text-gray-500">Asked by {q.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
