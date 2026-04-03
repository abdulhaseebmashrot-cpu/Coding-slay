import { motion } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import { BookOpen, Trophy, Star, Clock, Settings, Edit3, Shield, Award, CheckCircle2, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Profile({ user, userData, isDarkMode }: { user: FirebaseUser | null, userData: any, isDarkMode: boolean }) {
  const [lessons, setLessons] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'lessons'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lessonsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLessons(lessonsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'lessons');
    });
    return () => unsubscribe();
  }, []);

  const completedLessonsData = lessons.filter(lesson => userData?.completedLessons?.includes(lesson.id));
  const lessonsByLanguage = completedLessonsData.reduce((acc, lesson) => {
    acc[lesson.language] = (acc[lesson.language] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(lessonsByLanguage).map(([language, count]) => ({
    language,
    count
  }));

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className={`p-12 rounded-[3rem] border border-dashed ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <h2 className="text-3xl font-display font-bold mb-4">Please sign in</h2>
          <p className="text-gray-500 mb-8">You need to be signed in to view your profile and track progress.</p>
        </div>
      </div>
    );
  }

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
                  src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName}`} 
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
              <h2 className="text-3xl font-display font-bold leading-tight">{user.displayName}</h2>
              {userData?.role === 'admin' && (
                <span className="inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20 uppercase tracking-widest">
                  <Shield className="w-3 h-3 mr-1.5" />
                  ADMIN
                </span>
              )}
              <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">
                {userData?.role || 'Student'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className={`p-6 rounded-3xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="text-2xl font-display font-bold text-blue-500">{userData?.points || 0}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total XP</div>
              </div>
              <div className={`p-6 rounded-3xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="text-2xl font-display font-bold text-purple-500">{userData?.completedLessons?.length || 0}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Lessons</div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className={`flex-1 py-4 rounded-2xl font-bold transition-all border ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}>
                Settings
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats & Activity */}
        <div className="lg:col-span-2 space-y-12">
          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-10 rounded-[3rem] border ${
              isDarkMode ? 'bg-[#1E1E2F] border-white/5' : 'bg-white border-gray-200 shadow-2xl'
            }`}
          >
            <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 text-blue-500" />
              Learning Progress
            </h3>
            
            <div className="h-64 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="language" stroke={isDarkMode ? '#94a3b8' : '#64748b'} />
                  <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: isDarkMode ? '#1E1E2F' : '#fff', borderColor: isDarkMode ? '#334155' : '#e2e8f0' }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#8b5cf6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Mastery Level</span>
                  <span className="text-sm font-bold text-blue-500">Level {Math.floor((userData?.points || 0) / 1000) + 1}</span>
                </div>
                <div className="h-4 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((userData?.points || 0) % 1000) / 10}%` }}
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-blue-600/20"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  {1000 - ((userData?.points || 0) % 1000)} XP until next level
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/2 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-2xl">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="font-bold">Completed Lessons</span>
                  </div>
                  <div className="text-3xl font-display font-bold">{userData?.completedLessons?.length || 0}</div>
                </div>
                <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/2 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-2xl">
                      <Trophy className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="font-bold">Challenges Solved</span>
                  </div>
                  <div className="text-3xl font-display font-bold">{userData?.completedChallenges?.length || 0}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-10 rounded-[3rem] border ${
              isDarkMode ? 'bg-[#1E1E2F] border-white/5' : 'bg-white border-gray-200 shadow-2xl'
            }`}
          >
            <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-500" />
              Recent Activity
            </h3>
            
            <div className="space-y-6">
              {userData?.completedLessons?.length > 0 ? (
                userData.completedLessons.slice(0, 5).map((lessonId: string, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/2 border border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">Completed Lesson</div>
                        <div className="text-xs text-gray-400">ID: {lessonId}</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-blue-500">+50 XP</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500 italic">
                  No activity yet. Start a lesson to see your progress!
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
