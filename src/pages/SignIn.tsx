import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail } from 'lucide-react';

export default function SignIn({ isDarkMode }: { isDarkMode: boolean }) {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/community');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className={`p-10 rounded-[3rem] border ${isDarkMode ? 'bg-[#1E1E2F] border-white/5' : 'bg-white border-gray-200 shadow-2xl'}`}>
        <h2 className="text-3xl font-display font-bold mb-8 text-center">Sign In</h2>
        <button 
          onClick={handleGoogleSignIn}
          className="w-full py-4 rounded-2xl bg-white text-gray-900 font-bold transition-all flex items-center justify-center gap-3 hover:bg-gray-100"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
