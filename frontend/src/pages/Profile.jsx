import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth', { replace: true });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 mt-16">
      <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 shadow-sm">
        <h1 className="text-3xl font-bold text-on-surface mb-6">Profile Settings</h1>
        
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-3xl border border-outline-variant/30">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-on-surface">{user?.user_metadata?.full_name || 'CropCare User'}</h2>
            <p className="text-on-surface-variant">{user?.email}</p>
          </div>
        </div>

        <div className="border-t border-outline-variant/30 pt-6">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-error hover:bg-error-container hover:text-on-error-container px-4 py-2 rounded-xl transition-colors font-semibold"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
