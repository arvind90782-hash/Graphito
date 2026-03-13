import React, { useState, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from '../firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  type ConfirmationResult
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowLeft, UserPlus, Phone } from 'lucide-react';
declare global {
  interface Window {
    __graphitoRecaptcha?: RecaptchaVerifier;
  }
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const passwordAutoComplete = isLogin ? 'current-password' : 'new-password';
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneHelp, setPhoneHelp] = useState<string | null>(null);

  const handleFieldChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
    if (error) {
      setError(null);
    }
  };

  const resetRecaptcha = () => {
    if (typeof window !== 'undefined' && window.__graphitoRecaptcha) {
      window.__graphitoRecaptcha.clear();
      window.__graphitoRecaptcha = undefined;
    }
  };

  const ensureRecaptcha = () => {
    if (typeof window === 'undefined') {
      return null;
    }
    if (!window.__graphitoRecaptcha) {
      window.__graphitoRecaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
      window.__graphitoRecaptcha.render().catch(() => null);
    }
    return window.__graphitoRecaptcha;
  };

  const clearPhoneFlow = () => {
    setPhoneCode('');
    setPhoneNumber('');
    setConfirmationResult(null);
    setPhoneError(null);
    setPhoneHelp(null);
    resetRecaptcha();
  };

  const handleSendOtp = async () => {
    if (!phoneNumber?.trim()) {
      setPhoneError('Enter a valid phone number (with country code).');
      return;
    }
    try {
      setSendingOtp(true);
      setPhoneError(null);
      const verifier = ensureRecaptcha();
      if (!verifier) {
        throw new Error('Recaptcha is not ready yet.');
      }
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber.trim(), verifier);
      setConfirmationResult(confirmation);
      setPhoneHelp('Verification code sent. Enter it below to continue.');
      setMessage('One-time code sent to your phone.');
    } catch (err: any) {
      setPhoneError(err?.message || 'Unable to send verification code.');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
      setPhoneError('Request a code first.');
      return;
    }
    if (!phoneCode?.trim()) {
      setPhoneError('Enter the code you received.');
      return;
    }
    try {
      setVerifyingOtp(true);
      setPhoneError(null);
      await confirmationResult.confirm(phoneCode.trim());
      setPhoneHelp('Phone verified. Redirecting…');
      clearPhoneFlow();
      navigate('/dashboard');
    } catch (err: any) {
      setPhoneError(err?.message || 'Code verification failed.');
    } finally {
      setVerifyingOtp(false);
    }
  };
  
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (!userDoc.exists()) {
        const newUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role: (firebaseUser.email === 'arvind90782@gmail.com' || firebaseUser.email === 'contact@graphitoagency.com') ? 'admin' : 'client',
          createdAt: new Date().toISOString(),
        };
        await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      }
      
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleManualAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = result.user;
        
        const newUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: displayName || 'Client',
          role: (firebaseUser.email === 'arvind90782@gmail.com' || firebaseUser.email === 'contact@graphitoagency.com') ? 'admin' : 'client',
          createdAt: new Date().toISOString(),
        };
        await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      setMessage('Password reset email sent!');
      setShowForgotModal(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-black relative overflow-hidden px-4 sm:px-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px]" />
      
      <Link 
        to="/" 
        className="absolute top-28 left-4 sm:left-8 flex items-center space-x-2 text-white/50 hover:text-brand-accent transition-colors z-20"
      >
        <ArrowLeft size={20} />
        <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-6 sm:p-10 rounded-[36px] glass relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl bg-brand-accent/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-brand-accent" size={40} />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">
            {isLogin ? 'Client Login' : 'Create Account'}
          </h1>
          <p className="text-white/50">
            {isLogin ? 'Access your projects and track progress.' : 'Join Graphito and start your creative journey.'}
          </p>
        </div>

        {error && (
          <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="p-4 mb-6 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleManualAuth} className="space-y-4 mb-8">
          {!isLogin && (
            <div className="relative">
              <LogIn className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input 
                type="text" 
                placeholder="Full Name"
                required
                value={displayName}
                onChange={handleFieldChange(setDisplayName)}
                autoComplete="name"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input 
              type="email" 
              placeholder="Email Address"
              required
              value={email}
              onChange={handleFieldChange(setEmail)}
              autoComplete="email"
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password"
              required
              value={password}
              onChange={handleFieldChange(setPassword)}
              autoComplete={passwordAutoComplete}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 focus:outline-none focus:border-brand-accent transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {isLogin && (
            <div className="text-right">
              <button 
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs text-white/30 hover:text-brand-accent transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-brand-accent text-black font-bold flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              </>
            )}
          </button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-4 text-white/30">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-4 rounded-full bg-white text-black font-bold flex items-center justify-center space-x-3 hover:bg-brand-accent transition-all disabled:opacity-50"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          <span>Google</span>
        </button>

        <div className="mt-6 p-5 rounded-3xl border border-white/10 bg-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm uppercase tracking-[0.4em]">Phone OTP</p>
              <p className="text-white/40 text-xs">Send a code, enter it, and jump into your dashboard.</p>
            </div>
            <button
              type="button"
              onClick={clearPhoneFlow}
              className="text-xs text-white/30 hover:text-white transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="space-y-3">
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (phoneError) setPhoneError(null);
                }}
                placeholder="+91 77050 90700"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-accent transition-colors"
                type="tel"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={sendingOtp}
                className="flex-1 py-3 rounded-full bg-brand-accent text-black font-bold text-sm uppercase tracking-[0.3em] disabled:opacity-50"
              >
                {sendingOtp ? 'Sending…' : confirmationResult ? 'Resend Code' : 'Send Code'}
              </button>
              {confirmationResult && (
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp}
                  className="flex-1 py-3 rounded-full glass font-bold text-sm uppercase tracking-[0.3em] disabled:opacity-50"
                >
                  {verifyingOtp ? 'Verifying…' : 'Verify Code'}
                </button>
              )}
            </div>
            {confirmationResult && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  placeholder="Enter verification code"
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
            )}
            {phoneHelp && (
              <p className="text-xs text-brand-accent/80">{phoneHelp}</p>
            )}
            {phoneError && (
              <p className="text-xs text-red-400">{phoneError}</p>
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-white/50">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-brand-accent font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>

        <p className="mt-8 text-center text-xs text-white/30 leading-relaxed">
          By continuing, you agree to Graphito's Terms of Service and Privacy Policy. Secure authentication powered by Firebase.
        </p>
        <div id="recaptcha-container" className="sr-only" />
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-secondary w-full max-w-md rounded-[40px] p-10 border border-white/10"
            >
              <h2 className="text-3xl font-display font-bold mb-4">Reset Password</h2>
              <p className="text-white/50 mb-8">Enter your email address and we'll send you a link to reset your password.</p>
              
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  required
                  value={forgotEmail}
                  onChange={handleFieldChange(setForgotEmail)}
                  autoComplete="email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-accent transition-colors"
                />
                </div>
                <div className="flex space-x-4">
                  <button 
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-grow py-4 rounded-full glass font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-grow py-4 rounded-full bg-brand-accent text-black font-bold"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
