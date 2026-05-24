import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase sets up the session from the URL hash when the page loads
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true);
      }
    });
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setDone(true);
      setTimeout(() => navigate('/auth', { replace: true }), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 font-body flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-xl border border-stone-100 dark:border-stone-800">
          {!done ? (
            <>
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-2xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              </div>
              <h1 className="text-2xl font-headline font-bold text-stone-900 dark:text-white mb-2">Set New Password</h1>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">
                Choose a strong password for your account.
              </p>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm flex items-start gap-3 border border-red-200 dark:border-red-900/50">
                  <span className="material-symbols-outlined shrink-0 text-base">error</span>
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label htmlFor="new-password" className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1.5">New Password</label>
                  <input
                    id="new-password"
                    type="password"
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-400 text-stone-900 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1.5">Confirm Password</label>
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-400 text-stone-900 dark:text-white"
                  />
                </div>

                {/* Password strength indicator */}
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                        password.length >= i * 3
                          ? password.length >= 12 ? 'bg-green-500' : password.length >= 8 ? 'bg-yellow-500' : 'bg-red-400'
                          : 'bg-stone-200 dark:bg-stone-700'
                      }`}></div>
                    ))}
                  </div>
                  <p className="text-xs text-stone-400">
                    {password.length === 0 ? 'Enter a password' : password.length < 6 ? 'Too short' : password.length < 8 ? 'Weak' : password.length < 12 ? 'Good' : 'Strong'}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !sessionReady}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                >
                  {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                  {loading ? 'Updating Password...' : 'Update Password'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-green-600 dark:text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <h2 className="text-2xl font-headline font-bold text-stone-900 dark:text-white mb-3">Password Updated!</h2>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Your password has been updated successfully. Redirecting you to sign in...</p>
              <Link to="/auth" className="text-primary font-semibold hover:underline text-sm">Go to Sign In →</Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
