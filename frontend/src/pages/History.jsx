import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const History = () => {
  const { user } = useAuth();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('scan_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setScans(data || []);
      } catch (err) {
        console.error("Error fetching history:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  const totalScans = scans.length;
  const diseased = scans.filter(s => s.disease_name.toLowerCase() !== 'healthy').length;
  const healthy = scans.filter(s => s.disease_name.toLowerCase() === 'healthy').length;
  const lastScanTime = scans.length > 0 ? new Date(scans[0].created_at).toLocaleDateString() : 'N/A';

  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto py-6 space-y-10">
      <header className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary">Scan History</h1>
            <p className="text-base md:text-lg text-on-surface-variant mt-2">Review your recent crop diagnostics and field monitoring data.</p>
          </div>
        </div>
      </header>

      {/* Stats Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Scans', value: totalScans, sub: 'All time', subColor: 'text-primary', icon: 'data_usage', iconBg: 'bg-primary-container/30 text-primary' },
          { label: 'Diseases Found', value: diseased, sub: 'Requires attention', subColor: 'text-error', icon: 'bug_report', iconBg: 'bg-error-container/50 text-error' },
          { label: 'Healthy Crops', value: healthy, sub: 'Clear rate', subColor: 'text-primary', icon: 'eco', iconBg: 'bg-primary-container/30 text-primary' },
          { label: 'Last Scan', value: lastScanTime, sub: 'Recent activity', subColor: 'text-on-surface-variant', icon: 'schedule', iconBg: 'bg-secondary-container/50 text-secondary' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/70 backdrop-blur-md border border-outline-variant rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-semibold text-on-surface-variant">{stat.label}</span>
              <span className={`material-symbols-outlined ${stat.iconBg} p-2 rounded-full text-lg`}>{stat.icon}</span>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-on-background">{stat.value}</div>
              <div className={`text-xs font-semibold mt-1 flex items-center gap-1 ${stat.subColor}`}>{stat.sub}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Timeline Feed */}
      <section className="space-y-8">
        <div>
          <h2 className="text-base font-bold text-on-surface-variant mb-4 sticky top-16 bg-background/90 backdrop-blur-sm py-2 z-10">Your Scans</h2>
          {loading ? (
             <p className="text-on-surface-variant">Loading history...</p>
          ) : scans.length === 0 ? (
             <p className="text-on-surface-variant">No scans found. Start scanning to see your history!</p>
          ) : (
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-outline-variant before:via-outline-variant/50 before:to-transparent">
              {scans.map((scan) => {
                const isHealthy = scan.disease_name.toLowerCase() === 'healthy';
                const statusColor = isHealthy ? 'text-primary' : 'text-error';
                const bgIconColor = isHealthy ? 'bg-primary text-on-primary' : 'bg-error text-on-error';
                const borderHover = isHealthy ? 'group-hover:border-primary-container' : 'group-hover:border-error-container';
                const iconName = isHealthy ? 'check' : 'priority_high';
                
                return (
                  <div key={scan.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background ${bgIconColor} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10`}>
                      <span className="material-symbols-outlined text-sm">{iconName}</span>
                    </div>
                    <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white/70 backdrop-blur-md border border-outline-variant rounded-xl p-4 flex flex-col sm:flex-row gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer ${borderHover}`}>
                      {scan.image_url ? (
                        <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-surface-variant">
                          <img alt={scan.crop_name} className="w-full h-full object-cover" src={scan.image_url}/>
                        </div>
                      ) : (
                         <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-surface-variant flex items-center justify-center">
                           <span className="material-symbols-outlined text-outline-variant text-3xl">image</span>
                         </div>
                      )}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-base text-on-background">{scan.crop_name}</h3>
                            <span className="text-xs text-on-surface-variant">{new Date(scan.created_at).toLocaleString()}</span>
                          </div>
                          <p className={`text-sm ${statusColor} font-semibold`}>{scan.disease_name}</p>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1 text-on-surface-variant">
                            <span>Confidence</span><span>{scan.confidence}%</span>
                          </div>
                          <div className="w-full bg-surface-variant rounded-full h-1.5">
                            <div className={`${isHealthy ? 'bg-primary' : 'bg-error'} h-1.5 rounded-full`} style={{ width: `${scan.confidence}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default History;
