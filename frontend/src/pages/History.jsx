import React from 'react';
import { Link } from 'react-router-dom';

const History = () => {
  return (
    <div className="antialiased min-h-screen pb-32 md:pb-0 pt-20 md:pt-24 px-4 md:px-container-padding max-w-7xl mx-auto bg-background text-on-background font-body-md">
      {/* TopNavBar (Web) */}
      <nav className="hidden md:flex fixed top-0 left-0 w-full z-50 justify-between items-center px-container-padding h-16 bg-white/70 dark:bg-surface-container/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm font-body-md text-body-md text-primary dark:text-primary-fixed-dim">
        <div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
          CropCare AI
        </div>
        <div className="flex gap-8 items-center h-full">
          <Link className="h-full flex items-center text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors hover:bg-primary-container/20 duration-300 px-4" to="/diagnostic-hub">
            Scanner
          </Link>
          <Link className="h-full flex items-center text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1 hover:bg-primary-container/20 transition-all duration-300 px-4" to="/history">
            History
          </Link>
          <Link className="h-full flex items-center text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors hover:bg-primary-container/20 duration-300 px-4" to="/wiki">
            Wiki
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth" className="p-2 rounded-full hover:bg-primary-container/20 transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </nav>

      {/* BottomNavBar (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 pb-safe px-6 bg-white/80 dark:bg-surface-container-high/80 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-lg font-label-sm text-label-sm text-primary dark:text-primary-fixed-dim">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant/50 w-full h-full rounded-lg transition-colors" to="/diagnostic-hub">
          <span className="material-symbols-outlined mb-1">qr_code_scanner</span>
          <span>Scanner</span>
        </Link>
        <Link className="flex flex-col items-center justify-center bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary rounded-full px-4 py-1 hover:scale-110 transition-transform duration-200 hover:bg-surface-variant/50 w-full h-full" to="/history">
          <span className="material-symbols-outlined mb-1">history</span>
          <span>History</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant/50 w-full h-full rounded-lg transition-colors" to="/wiki">
          <span className="material-symbols-outlined mb-1">book_2</span>
          <span>Wiki</span>
        </Link>
      </nav>

      <main className="space-y-section-gap">
        {/* Header & Filters */}
        <header className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display-lg text-display-lg text-primary">Scan History</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Review your recent crop diagnostics and field monitoring data.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm border border-primary-container hover:scale-105 transition-transform shadow-sm">All</button>
              <button className="px-4 py-2 rounded-full bg-surface text-on-surface-variant font-label-sm text-label-sm border border-outline-variant hover:bg-surface-variant transition-colors">Diseased</button>
              <button className="px-4 py-2 rounded-full bg-surface text-on-surface-variant font-label-sm text-label-sm border border-outline-variant hover:bg-surface-variant transition-colors">Healthy</button>
              <div className="relative ml-auto md:ml-4">
                <select className="appearance-none bg-surface border border-outline-variant text-on-surface-variant py-2 pl-4 pr-10 rounded-full font-label-sm text-label-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Oldest</option>
                  <option>Sort by: Severity</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-sm">expand_more</span>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter">
          {/* Total Scans */}
          <div className="bg-white/70 backdrop-blur-md border border-outline-variant rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Total Scans</span>
              <span className="material-symbols-outlined text-primary bg-primary-container/30 p-2 rounded-full">data_usage</span>
            </div>
            <div>
              <div className="font-display-lg text-display-lg text-on-background">1,248</div>
              <div className="font-body-md text-body-md text-primary mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                +12% this week
              </div>
            </div>
          </div>
          {/* Diseases Found */}
          <div className="bg-white/70 backdrop-blur-md border border-outline-variant rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Diseases Found</span>
              <span className="material-symbols-outlined text-error bg-error-container/50 p-2 rounded-full">bug_report</span>
            </div>
            <div>
              <div className="font-display-lg text-display-lg text-on-background">84</div>
              <div className="font-body-md text-body-md text-error mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">warning</span>
                Requires attention
              </div>
            </div>
          </div>
          {/* Healthy Crops */}
          <div className="bg-white/70 backdrop-blur-md border border-outline-variant rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Healthy Crops</span>
              <span className="material-symbols-outlined text-primary bg-primary-container/30 p-2 rounded-full">eco</span>
            </div>
            <div>
              <div className="font-display-lg text-display-lg text-on-background">1,164</div>
              <div className="font-body-md text-body-md text-primary mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                93% clear rate
              </div>
            </div>
          </div>
          {/* Last Scan */}
          <div className="bg-white/70 backdrop-blur-md border border-outline-variant rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Last Scan</span>
              <span className="material-symbols-outlined text-secondary bg-secondary-container/50 p-2 rounded-full">schedule</span>
            </div>
            <div>
              <div className="font-headline-md text-headline-md text-on-background">2m ago</div>
              <div className="font-body-md text-body-md text-on-surface-variant mt-1">
                Sector 4B - Tomato
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Feed */}
        <section className="space-y-8">
          {/* Today Group */}
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface-variant mb-4 sticky top-16 md:top-24 bg-background/90 backdrop-blur-sm py-2 z-10">Today</h2>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-outline-variant before:via-outline-variant/50 before:to-transparent">
              
              {/* Scan Item 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Timeline Dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-error shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                  <span className="material-symbols-outlined text-on-error text-sm">priority_high</span>
                </div>
                {/* Card Content */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white/70 backdrop-blur-md border border-outline-variant rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group-hover:border-error-container">
                  <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden shrink-0 bg-surface-variant">
                    <img alt="Tomato leaf showing signs of late blight" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTojl9ymvDlbZRODiNnPd8Fx6djuN_2O0GKq7Nvw9Kaiw59P45rOnSrfYBXUsXNTVNIGOlE5n6d24suhd44p5PdbWuLwA_1is1x7WJizywTFdwGX2lrwiZFuX3BuwrLB3zee1CUmzCkMlqyD8LesNGoLfUtpkU552_jqmRcck6jRpRtRmgXXfPQw6_H__SQfUWOoHIO7UevBCI2kYccnB1ixEx7xPho3mDlhhvNKvJdDPP7WfKbALscM0qJWu0RxAkgJfJwJKGlY8"/>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-headline-md text-headline-md text-on-background">Tomato (Roma)</h3>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">10:42 AM</span>
                      </div>
                      <p className="font-body-md text-body-md text-error font-semibold">Late Blight Detected</p>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface-variant">
                        <span>Confidence</span>
                        <span>94%</span>
                      </div>
                      <div className="w-full bg-surface-variant rounded-full h-1.5">
                        <div className="bg-error h-1.5 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scan Item 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                {/* Timeline Dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                  <span className="material-symbols-outlined text-on-primary text-sm">check</span>
                </div>
                {/* Card Content */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white/70 backdrop-blur-md border border-outline-variant rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group-hover:border-primary-container">
                  <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden shrink-0 bg-surface-variant">
                    <img alt="Healthy corn plant leaf" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW5IswYgClo0FHRiYoGk9WjBKyxc575S4Tpko0Oobrs47mB-MW9lgzco1t0ddGHLVtVm-ljjna9o2dbcQw6N7CcT08nq_h-ZtcIhTy11YN2HOShERE4ODOJniQ_hIT-kauzHmsQGpv9t1SpsDVLUFiI3uIkdPneaKz-k2qkbDmTiAb0WrL8riXlHOuT0XXFA0o6ceRXg2E9iGNyCV1AkDjUY7R4d0DXIMR6sQn9h8Y6O-7fy4nEv9zLcUQ8_zYDHD-Y_9rOzdLwgE"/>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-headline-md text-headline-md text-on-background">Sweet Corn</h3>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">08:15 AM</span>
                      </div>
                      <p className="font-body-md text-body-md text-primary font-semibold">Healthy</p>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface-variant">
                        <span>Confidence</span>
                        <span>99%</span>
                      </div>
                      <div className="w-full bg-surface-variant rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '99%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Yesterday Group */}
          <div className="pt-8">
            <h2 className="font-headline-md text-headline-md text-on-surface-variant mb-4 sticky top-16 md:top-24 bg-background/90 backdrop-blur-sm py-2 z-10">Yesterday</h2>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-outline-variant/50 before:to-transparent">
              
              {/* Scan Item 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                {/* Timeline Dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-secondary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                  <span className="material-symbols-outlined text-on-secondary text-sm">info</span>
                </div>
                {/* Card Content */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white/70 backdrop-blur-md border border-outline-variant rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group-hover:border-secondary-container">
                  <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden shrink-0 bg-surface-variant">
                    <img alt="Wheat plant showing slight nutrient deficiency" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAAML3nUFcbbtUwnRV1FshP0Faab64KsodTAE8xnbVt1fihze4U2WbwWdCwpUbzZXSX7_gDDPqik3UnR7Rgf8ZA25etTxJcq4OJADEtakVOJuLs-hSVKXegIf8qshZR1HNqM8hdhPGTOEzfCFJ51dd5LnWvNNWGk2Jd5qHHaAQp9G9uqdgoCmE7mh_l8I13iNGyTlQ_pujSdp3GoINj52kabE--UJI_1XYn78ibsW58xosExa19D1XGldvQ21HXChUxT820uKi6I4"/>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-headline-md text-headline-md text-on-background">Winter Wheat</h3>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">04:30 PM</span>
                      </div>
                      <p className="font-body-md text-body-md text-secondary font-semibold">Nutrient Deficiency (N)</p>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface-variant">
                        <span>Confidence</span>
                        <span>82%</span>
                      </div>
                      <div className="w-full bg-surface-variant rounded-full h-1.5">
                        <div className="bg-secondary h-1.5 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default History;
