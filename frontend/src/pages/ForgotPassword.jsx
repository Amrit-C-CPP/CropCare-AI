import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
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
        <Link to="/auth" className="flex items-center gap-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-sm font-medium mb-8 transition-colors">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Sign In
        </Link>

        <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-xl border border-stone-100 dark:border-stone-800">
          {!sent ? (
            <>
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-2xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lock_reset</span>
              </div>
              <h1 className="text-2xl font-headline font-bold text-stone-900 dark:text-white mb-2">Reset Password</h1>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">
                Enter the email address associated with your account. We'll send you a secure link to reset your password.
              </p>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm flex items-start gap-3 border border-red-200 dark:border-red-900/50">
                  <span className="material-symbols-outlined shrink-0 text-base">error</span>
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1.5">Email Address</label>
                  <input
                    id="reset-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-400 text-stone-900 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-green-600 dark:text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>mark_email_read</span>
              </div>
              <h2 className="text-2xl font-headline font-bold text-stone-900 dark:text-white mb-3">Check Your Email</h2>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-2">We sent a password reset link to:</p>
              <p className="font-bold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 py-2 px-4 rounded-xl inline-block text-sm mb-8">{email}</p>
              <p className="text-stone-400 text-xs mb-8">Didn't receive it? Check your spam folder or try again.</p>
              <Link to="/auth" className="text-primary font-semibold hover:underline text-sm">← Back to Sign In</Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
