import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Trophy, Medal, Star, Crown } from 'lucide-react';

export default function Leaderboard({ isDarkMode }: { isDarkMode: boolean }) {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('points', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLeaders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'users');
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex p-4 bg-yellow-500/10 rounded-3xl mb-8"
        >
          <Crown className="w-12 h-12 text-yellow-500 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]" />
        </motion.div>
        <h1 className="text-5xl font-display font-bold mb-4">Leaderboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">The top developers in the CodeSlay community. Keep coding to climb up!</p>
      </div>

      <div className={`rounded-[2.5rem] border overflow-hidden ${
        isDarkMode ? 'bg-[#1E1E2F] border-white/5' : 'bg-white border-gray-200 shadow-2xl'
      }`}>
        <div className={`grid grid-cols-12 gap-4 px-8 py-4 border-b text-[10px] font-bold uppercase tracking-widest ${
          isDarkMode ? 'bg-white/5 border-white/5 text-gray-500' : 'bg-gray-50 border-gray-100 text-gray-400'
        }`}>
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-7">Developer</div>
          <div className="col-span-2 text-center">Lessons</div>
          <div className="col-span-2 text-right">Points</div>
        </div>

        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`h-16 rounded-2xl animate-pulse ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-white/5">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`grid grid-cols-12 gap-4 px-8 py-6 items-center transition-colors ${
                  isDarkMode ? 'hover:bg-white/2' : 'hover:bg-gray-50'
                }`}
              >
                <div className="col-span-1 flex justify-center">
                  {index === 0 ? <Trophy className="w-8 h-8 text-yellow-500" /> :
                   index === 1 ? <Medal className="w-8 h-8 text-gray-400" /> :
                   index === 2 ? <Medal className="w-8 h-8 text-orange-400" /> :
                   <span className="text-lg font-display font-bold text-gray-400">#{index + 1}</span>}
                </div>
                
                <div className="col-span-7 flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl overflow-hidden border-2 ${
                    index === 0 ? 'border-yellow-500' : 'border-transparent'
                  }`}>
                    <img 
                      src={leader.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${leader.displayName}`} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg group-hover:text-blue-500 transition-colors leading-tight">
                      {leader.displayName}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                      {leader.role || 'Student'}
                    </div>
                  </div>
                </div>

                <div className="col-span-2 text-center font-display font-bold text-gray-400">
                  {leader.completedLessons?.length || 0}
                </div>

                <div className="col-span-2 text-right">
                  <div className="flex items-center justify-end text-blue-500 font-display font-bold text-xl">
                    <Star className="w-5 h-5 mr-2 fill-current" />
                    {leader.points}
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total XP</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          Updated in real-time. Join challenges to earn more points!
        </p>
      </div>
    </div>
  );
}
