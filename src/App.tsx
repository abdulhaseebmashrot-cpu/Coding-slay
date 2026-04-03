import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, BookOpen, Trophy, User, LogIn, LogOut, Menu, X, Search, Sparkles, ChevronRight, Github, Twitter, Linkedin, Sun, Moon } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Community from './pages/Community';
import Playground from './pages/Playground';
import LessonDetail from './pages/LessonDetail';
import SignIn from './pages/SignIn';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] text-gray-100' : 'bg-gray-50 text-gray-900'} font-sans selection:bg-blue-500/30`}>
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isDarkMode ? 'bg-[#121212]/80 border-white/5' : 'bg-white/80 border-gray-200'} backdrop-blur-md`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-blue-500/20">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-display font-bold tracking-tight">
                  Dev<span className="text-blue-500">Nexus</span>
                </span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-10">
                <NavLink to="/lessons" icon={<BookOpen className="w-4 h-4" />} label="Lessons" isDarkMode={isDarkMode} />
                <NavLink to="/challenges" icon={<Trophy className="w-4 h-4" />} label="Challenges" isDarkMode={isDarkMode} />
                <NavLink to="/playground" icon={<Code2 className="w-4 h-4" />} label="Playground" isDarkMode={isDarkMode} />
                <NavLink to="/leaderboard" icon={<Search className="w-4 h-4" />} label="Leaderboard" isDarkMode={isDarkMode} />
                <NavLink to="/community" icon={<User className="w-4 h-4" />} label="Community" isDarkMode={isDarkMode} />
                
                <div className="h-6 w-px bg-gray-300 dark:bg-white/10 mx-2" />

                {user ? (
                  <div className="flex items-center gap-4">
                    <Link to="/profile" className="flex items-center gap-2">
                      <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
                      <span className="text-sm font-bold">{user.displayName}</span>
                    </Link>
                    <button onClick={signOut} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-red-400">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Link to="/signin" className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm">
                    Sign In
                  </Link>
                )}

                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-blue-600'}`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-lg ${isDarkMode ? 'text-yellow-400' : 'text-blue-600'}`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-gray-100'}`}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`md:hidden border-b overflow-hidden ${isDarkMode ? 'bg-[#1E1E2F] border-white/5' : 'bg-white border-gray-200'}`}
              >
                <div className="px-4 pt-4 pb-8 space-y-3">
                  <MobileNavLink to="/lessons" label="Lessons" isDarkMode={isDarkMode} onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/challenges" label="Challenges" isDarkMode={isDarkMode} onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/leaderboard" label="Leaderboard" isDarkMode={isDarkMode} onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/community" label="Community" isDarkMode={isDarkMode} onClick={() => setIsMenuOpen(false)} />
                  {user ? (
                    <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-4 rounded-2xl text-lg font-bold text-red-400">
                      Sign Out
                    </button>
                  ) : (
                    <MobileNavLink to="/signin" label="Sign In" isDarkMode={isDarkMode} onClick={() => setIsMenuOpen(false)} />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content */}
        <main className="pt-20 min-h-screen">
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/lessons" element={<Lessons isDarkMode={isDarkMode} />} />
            <Route path="/lessons/:id" element={<LessonDetail isDarkMode={isDarkMode} />} />
            <Route path="/challenges" element={<Challenges isDarkMode={isDarkMode} />} />
            <Route path="/playground" element={<Playground isDarkMode={isDarkMode} />} />
            <Route path="/profile" element={<Profile isDarkMode={isDarkMode} />} />
            <Route path="/leaderboard" element={<Leaderboard isDarkMode={isDarkMode} />} />
            <Route path="/community" element={<Community isDarkMode={isDarkMode} />} />
            <Route path="/signin" element={<SignIn isDarkMode={isDarkMode} />} />
          </Routes>
        </main>


        {/* Footer */}
        <footer className={`border-t py-20 transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-display font-bold">DevNexus</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 max-w-md leading-relaxed text-lg">
                  Empowering the next generation of developers with interactive learning, AI-driven insights, and a global community.
                </p>
                <div className="flex space-x-5 mt-10">
                  <SocialLink icon={<Twitter className="w-5 h-5" />} isDarkMode={isDarkMode} />
                  <SocialLink icon={<Github className="w-5 h-5" />} isDarkMode={isDarkMode} />
                  <SocialLink icon={<Linkedin className="w-5 h-5" />} isDarkMode={isDarkMode} />
                </div>
              </div>
              <div>
                <h4 className="font-display font-bold text-lg mb-8">Platform</h4>
                <ul className="space-y-5 text-gray-500 dark:text-gray-400">
                  <li><Link to="/lessons" className="hover:text-blue-500 transition-colors">Curriculum</Link></li>
                  <li><Link to="/challenges" className="hover:text-blue-500 transition-colors">Challenges</Link></li>
                  <li><Link to="/leaderboard" className="hover:text-blue-500 transition-colors">Leaderboard</Link></li>
                  <li><Link to="/community" className="hover:text-blue-500 transition-colors">Community</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-display font-bold text-lg mb-8">Resources</h4>
                <ul className="space-y-5 text-gray-500 dark:text-gray-400">
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Community</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">AI Generator</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Support</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
              <p>© 2026 DevNexus. Built with passion for developers.</p>
              <div className="flex space-x-8">
                <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function NavLink({ to, icon, label, isDarkMode }: { to: string, icon: React.ReactNode, label: string, isDarkMode: boolean }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 text-sm font-bold transition-all duration-300 relative py-2 group ${
        isActive 
          ? 'text-blue-500' 
          : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
      }`}
    >
      <span className={`transition-transform duration-300 group-hover:-translate-y-0.5`}>{icon}</span>
      <span>{label}</span>
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        />
      )}
    </Link>
  );
}

function MobileNavLink({ to, label, isDarkMode, onClick }: { to: string, label: string, isDarkMode: boolean, onClick: () => void }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-4 rounded-2xl text-lg font-bold transition-all ${
        isActive 
          ? 'bg-blue-500/10 text-blue-500 shadow-inner' 
          : isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black'
      }`}
    >
      {label}
    </Link>
  );
}

function SocialLink({ icon, isDarkMode }: { icon: React.ReactNode, isDarkMode: boolean }) {
  return (
    <a 
      href="#" 
      className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${
        isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-blue-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-600'
      }`}
    >
      {icon}
    </a>
  );
}
