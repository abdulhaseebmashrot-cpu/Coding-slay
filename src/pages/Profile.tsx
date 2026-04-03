import { motion } from 'motion/react';
import { BookOpen, Trophy, Star, Clock, Settings, Shield, Award, CheckCircle2, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';

export default function Profile({ isDarkMode }: { isDarkMode: boolean }) {
  const { user } = useAuth();
  
  // Mock user data if not logged in (for demo purposes)
  const currentUser = (user as any) || {
    displayName: 'Guest User',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
    level: 1,
    projects: [
      { id: 1, title: 'My First Website', image: 'https://picsum.photos/seed/code-1/400/300' },
      { id: 2, title: 'Algorithm Visualizer', image: 'https://picsum.photos/seed/code-2/400/300' },
    ] as { id: number; title: string; image: string }[],
  };

  const userData = {
    role: 'Student',
    points: 1250,
    completedLessons: ['js-basics', 'css-flexbox', 'react-hooks'],
    completedChallenges: ['hello-world', 'sum-array'],
  };

  const chartData = [
    { language: 'JavaScript', count: 5 },
    { language: 'Python', count: 3 },
    { language: 'CSS', count: 2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-10 rounded-[3rem] border text-center relative overflow-hidden ${
              isDarkMode ? 'bg-[#1E1E2F] border-white/5' : 'bg-white border-gray-200 shadow-2xl'
            }`}
          >
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600 to-purple-600 opacity-10" />
            
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-[2rem] overflow-hidden mx-auto border-4 border-white dark:border-[#1E1E2F] shadow-2xl relative z-10">
                <img 
                  src={currentUser.photoURL} 
                  alt="" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 p-3 bg-blue-600 rounded-2xl text-white shadow-lg z-20">
                <Zap className="w-5 h-5 fill-current" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 mb-8">
              <h2 className="text-3xl font-display font-bold leading-tight">{currentUser.displayName}</h2>
              <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">
                Level {currentUser.level}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className={`p-6 rounded-3xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="text-2xl font-display font-bold text-blue-500">{userData.points}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total XP</div>
              </div>
              <div className={`p-6 rounded-3xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="text-2xl font-display font-bold text-purple-500">{userData.completedLessons.length}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Lessons</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats & Activity */}
        <div className="lg:col-span-2 space-y-12">
          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-10 rounded-[3rem] border ${
              isDarkMode ? 'bg-[#1E1E2F] border-white/5' : 'bg-white border-gray-200 shadow-2xl'
            }`}
          >
            <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              My Projects
            </h3>
            
            {currentUser.projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentUser.projects.map(project => (
                  <div key={project.id} className={`rounded-3xl overflow-hidden border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <img src={project.image} alt={project.title} className="w-full h-32 object-cover" referrerPolicy="no-referrer" />
                    <div className="p-4">
                      <h4 className="font-bold">{project.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No projects uploaded yet.</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
