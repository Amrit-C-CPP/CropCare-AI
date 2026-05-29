import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import authBg from '../assets/auth_background.png';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/diagnostic-hub', { replace: true });
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/diagnostic-hub`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError('Failed to connect with Google. Please try again.');
      setLoading(false);
    }
  };

  const handleEmailAuth = (e) => {
      e.preventDefault();
      // Placeholder for email auth
      alert("Email authentication is under construction. Please use Google Login.");
  };

  return (
    <div className="bg-surface-container-lowest font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <main className="min-h-screen flex w-full">
        {/* Left Screen: Imagery & Brand */}
        <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface-variant">
          <img alt="Aerial view of precision agriculture fields" className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[20s] ease-out hover:scale-100" src={authBg}/>
          {/* Subtle Dark Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181d12]/80 via-[#181d12]/20 to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-between w-full h-full p-container-padding pb-section-gap">
            {/* Decorative top element */}
            <div className="w-12 h-1 bg-primary-container rounded-full mt-8"></div>
            <div className="max-w-xl mb-12">
              <blockquote className="font-display-lg text-display-lg text-surface-container-lowest mb-6" style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: "normal", letterSpacing: "normal" }}>
                  "Empowering growth through precision intelligence."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-primary-container"></div>
                <span className="font-label-sm text-label-sm text-surface-container-highest tracking-widest uppercase">The Future of Farming</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Right Screen: Authentication Form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative bg-surface-container-lowest">
          {/* Ambient Background Glow (Subtle) */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="w-full max-w-md relative z-10">
            {/* Header */}
            <header className="mb-12 text-center lg:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-primary mb-2 tracking-tight">
                CropCare AI
            </h1>
            <h2 className="text-lg md:text-2xl font-semibold text-on-surface mt-6 mb-1">
              {isLoginTab ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm text-on-surface-variant">
              {isLoginTab ? 'Enter your credentials to access your dashboard.' : 'Sign up to start scanning crops.'}
            </p>
            </header>

            {error && <div className="mb-4 text-error text-sm text-center">{error}</div>}

            {/* Auth Form */}
            <form className="space-y-6" onSubmit={handleEmailAuth}>
              {/* Floating Label Input: Email */}
              <div className="relative group">
                <input className="peer w-full h-14 px-6 pt-5 pb-2 bg-surface-container rounded-xl border border-transparent focus:border-transparent focus:ring-2 focus:ring-primary-container outline-none transition-all duration-300 font-body-md text-on-surface placeholder-transparent" id="email" placeholder="name@farm.com" required type="email"/>
                <label className="absolute left-6 top-4 text-on-surface-variant font-body-md text-body-md transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-placeholder-shown:text-on-surface-variant peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-primary peer-valid:top-1.5 peer-valid:text-[11px] peer-valid:text-on-surface-variant" htmlFor="email">
                    Email Address
                </label>
              </div>
              {/* Floating Label Input: Password */}
              <div className="relative group">
                <input className="peer w-full h-14 px-6 pt-5 pb-2 bg-surface-container rounded-xl border border-transparent focus:border-transparent focus:ring-2 focus:ring-primary-container outline-none transition-all duration-300 font-body-md text-on-surface placeholder-transparent" id="password" placeholder="Password" required type="password"/>
                <label className="absolute left-6 top-4 text-on-surface-variant font-body-md text-body-md transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-placeholder-shown:text-on-surface-variant peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-primary peer-valid:top-1.5 peer-valid:text-[11px] peer-valid:text-on-surface-variant" htmlFor="password">
                    Password
                </label>
                <button className="absolute right-4 top-4 text-on-surface-variant hover:text-primary transition-colors" type="button">
                  <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                </button>
              </div>
              {/* Options Row */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-outline-variant bg-surface-container-lowest transition-colors group-hover:border-primary" type="checkbox"/>
                  <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Remember me</span>
                </label>
                <a className="font-label-sm text-label-sm text-primary hover:text-primary-fixed-dim transition-colors" href="#">Forgot Password?</a>
              </div>
              {/* Submit Action */}
              <button className="w-full h-14 mt-4 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-xl shadow-sm shadow-primary-container/20 hover:scale-[1.02] hover:bg-[#95e01a] transition-all duration-300 flex items-center justify-center gap-2" type="submit">
                  {isLoginTab ? 'Sign In' : 'Sign Up'}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center py-8">
              <div className="flex-grow border-t border-outline-variant/30"></div>
              <span className="flex-shrink-0 mx-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-outline-variant/30"></div>
            </div>

            {/* Social Authentication */}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleGoogleLogin} disabled={loading} className="flex items-center justify-center h-14 bg-surface-container-lowest border border-outline-variant/50 rounded-xl hover:bg-surface-container-low hover:border-outline-variant transition-all duration-200 gap-3 font-label-sm text-label-sm text-on-surface">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                  Google
              </button>
              <button className="flex items-center justify-center h-14 bg-surface-container-lowest border border-outline-variant/50 rounded-xl hover:bg-surface-container-low hover:border-outline-variant transition-all duration-200 gap-3 font-label-sm text-label-sm text-on-surface">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.26.45 3.09.45.71 0 2.05-.55 3.44-.55 1.76 0 3.01.69 3.91 1.61-3.32 1.83-2.64 5.9.61 7.21-.73 1.67-1.87 3.23-3.05 4.25zM12.03 7.25C11.83 3.61 15.34 1.1 18.2 1c.28 3.84-4.04 6.32-6.17 6.25z"></path>
                </svg>
                  Apple
              </button>
            </div>

            {/* Registration Link */}
            <div className="mt-12 text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                  {isLoginTab ? "Don't have an account yet? " : "Already have an account? "}
                  <button onClick={() => setIsLoginTab(!isLoginTab)} className="text-primary font-bold hover:text-primary-container transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-container after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" type="button">
                      {isLoginTab ? 'Sign Up' : 'Sign In'}
                  </button>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Auth;
