import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Code2, BookOpen, Trophy, Users, Sparkles, ChevronRight, Play, CheckCircle2, Globe, Zap, ArrowRight, Star, Shield, Cpu } from 'lucide-react';

export default function Home({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gradient-to-b from-blue-500/20 via-purple-500/10 to-transparent blur-[120px] -z-10" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-500 text-sm font-bold mb-10 shadow-lg shadow-blue-500/5"
            >
              <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
              Revolutionizing Code Learning
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tight mb-10 leading-[1.05]">
              Level Up Your <br />
              <span className="gradient-text">Coding Skills.</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl mb-14 leading-relaxed font-medium">
              Join the elite hub where developers master languages through interactive challenges, AI-powered lessons, and real-world projects.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                to="/lessons"
                className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg transition-all duration-500 shadow-2xl shadow-blue-600/30 hover:scale-105 hover:shadow-blue-600/40 flex items-center justify-center group"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/challenges"
                className={`w-full sm:w-auto px-10 py-5 border rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center hover:scale-105 ${
                  isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 shadow-lg'
                }`}
              >
                View Challenges
              </Link>
            </div>
            
            <div className="mt-16 flex items-center space-x-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-[#121212]" alt="" />
                ))}
              </div>
              <div className="text-sm font-bold text-gray-500">
                <span className="text-blue-500">10k+</span> Developers joined this week
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 blur-[100px] opacity-20 -z-10" />
            <div className="glass-card p-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              <div className="flex items-center space-x-2 mb-4 px-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <pre className="font-mono text-sm leading-relaxed p-6 bg-black/20 rounded-xl overflow-hidden">
                <code className="text-blue-400">function</code> <code className="text-purple-400">masterCode</code>() {'{'}{'\n'}
                {'  '}<code className="text-gray-400">// Level up your journey</code>{'\n'}
                {'  '}<code className="text-blue-400">const</code> skills = [<code className="text-teal-400">'React'</code>, <code className="text-teal-400">'Python'</code>, <code className="text-teal-400">'AI'</code>];{'\n'}
                {'  '}<code className="text-purple-400">return</code> skills.<code className="text-yellow-400">map</code>(skill ={'>'} {'\n'}
                {'    '}<code className="text-blue-400">`Mastering code...`</code>{'\n'}
                {'  '});{'\n'}
                {'}'}
              </pre>
              <div className="absolute bottom-4 right-4 animate-bounce">
                <div className="bg-blue-600 p-3 rounded-xl shadow-xl">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-32 transition-colors duration-300 ${isDarkMode ? 'bg-white/2' : 'bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
            >
              Why Choose <span className="gradient-text">CodeMaster?</span>
            </motion.h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              We provide the most advanced tools and curriculum to ensure you stay ahead in the rapidly evolving tech landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<Zap className="w-10 h-10 text-yellow-400" />}
              title="Instant Feedback"
              description="Our real-time code execution engine provides immediate results and helpful debugging hints."
              isDarkMode={isDarkMode}
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10 text-blue-400" />}
              title="Verified Curriculum"
              description="Lessons are crafted by industry experts to cover the most relevant skills for today's market."
              isDarkMode={isDarkMode}
            />
            <FeatureCard
              icon={<Users className="w-10 h-10 text-purple-400" />}
              title="Global Community"
              description="Connect with thousands of developers, share insights, and compete on the global leaderboard."
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* Gallery / Languages Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-display font-bold mb-6">Master Any <span className="text-blue-500">Language.</span></h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">From web development to systems programming, we've got you covered with deep-dive courses.</p>
            </div>
            <Link to="/lessons" className="flex items-center text-blue-500 font-bold hover:underline group">
              View all languages
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <LanguageCard name="JavaScript" color="from-yellow-400 to-orange-500" />
            <LanguageCard name="Python" color="from-blue-400 to-blue-600" />
            <LanguageCard name="React" color="from-cyan-400 to-blue-500" />
            <LanguageCard name="HTML5" color="from-orange-500 to-red-600" />
            <LanguageCard name="Node.js" color="from-green-400 to-green-600" />
            <LanguageCard name="C++" color="from-blue-600 to-indigo-700" />
          </div>
        </div>
      </section>

      {/* Contact / Newsletter Section */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600 rounded-[3rem] p-16 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(59,130,246,0.3)]"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="relative z-10">
              <h2 className="text-5xl font-display font-bold text-white mb-8">Ready to Start Your Journey?</h2>
              <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Join our newsletter to receive weekly coding tips, challenge updates, and exclusive AI-generated learning paths.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:bg-white/20 transition-all text-lg"
                />
                <button className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:scale-105 active:scale-95">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, isDarkMode }: { icon: React.ReactNode, title: string, description: string, isDarkMode: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -15, scale: 1.02 }}
      className={`p-10 rounded-[2.5rem] border transition-all duration-500 group ${
        isDarkMode 
          ? 'bg-[#1E1E2F] border-white/5 hover:border-blue-500/30' 
          : 'bg-white border-gray-200 hover:border-blue-500/30 shadow-xl'
      }`}
    >
      <div className={`mb-8 p-5 rounded-2xl w-fit transition-all duration-500 group-hover:rotate-6 ${
        isDarkMode ? 'bg-white/5 group-hover:bg-blue-500/10' : 'bg-gray-100 group-hover:bg-blue-50'
      }`}>
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold mb-5">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">{description}</p>
    </motion.div>
  );
}

function LanguageCard({ name, color }: { name: string, color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 2 }}
      className="flex flex-col items-center p-8 bg-white/5 dark:bg-white/2 rounded-[2rem] border border-white/10 hover:border-blue-500/30 transition-all duration-300 group cursor-pointer"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all`}>
        <Globe className="w-8 h-8 text-white" />
      </div>
      <span className="font-display font-bold text-gray-500 dark:text-gray-300 group-hover:text-blue-500 transition-colors">{name}</span>
    </motion.div>
  );
}
