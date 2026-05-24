import React from 'react';
import { Link } from 'react-router-dom';

const Wiki = () => {
  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen pt-20 pb-28 md:pb-12">
      {/* Top Navigation (Desktop) */}
      <nav className="hidden md:flex bg-white/70 backdrop-blur-xl docked full-width top-0 border-b border-outline-variant/30 shadow-sm fixed left-0 w-full z-50 justify-between items-center px-container-padding h-16">
        <div className="flex items-center gap-8">
          <span className="font-headline-md text-headline-md font-bold text-primary">CropCare AI</span>
          <div className="flex gap-6">
            <Link className="text-on-surface-variant hover:text-primary transition-colors hover:bg-primary-container/20 transition-all duration-300 px-3 py-1 rounded-md flex items-center gap-2" to="/diagnostic-hub">Scanner</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors hover:bg-primary-container/20 transition-all duration-300 px-3 py-1 rounded-md flex items-center gap-2" to="/history">History</Link>
            <Link className="text-primary font-bold border-b-2 border-primary pb-1 hover:bg-primary-container/20 transition-all duration-300 px-3 py-1 flex items-center gap-2" to="/wiki">Wiki</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input className="h-10 pl-10 pr-4 rounded-full bg-surface-container-highest border-none focus:ring-2 focus:ring-primary w-64 text-sm outline-none" placeholder="Search the Wiki..." type="text"/>
          </div>
          <Link to="/auth" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-container-padding">
        {/* Header & Search (Mobile) */}
        <header className="md:hidden flex flex-col gap-4 mb-8">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">Wiki</h1>
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input className="w-full h-12 pl-12 pr-4 rounded-full bg-surface-container-highest border-none focus:ring-2 focus:ring-primary text-body-md outline-none" placeholder="Search crops, diseases..." type="text"/>
          </div>
        </header>

        <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          <button className="px-4 py-2 rounded-full bg-primary text-on-primary whitespace-nowrap text-sm font-semibold">All Topics</button>
          <button className="px-4 py-2 rounded-full bg-surface-container-highest text-on-surface-variant whitespace-nowrap text-sm">Crop Guides</button>
          <button className="px-4 py-2 rounded-full bg-surface-container-highest text-on-surface-variant whitespace-nowrap text-sm">Pest Control</button>
          <button className="px-4 py-2 rounded-full bg-surface-container-highest text-on-surface-variant whitespace-nowrap text-sm">Soil Health</button>
        </div>

        {/* Featured Article Bento Grid */}
        <section className="mb-section-gap">
          <h2 className="font-headline-md text-headline-md text-on-background mb-6">Featured Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Feature */}
            <article className="md:col-span-2 relative rounded-lg overflow-hidden group cursor-pointer h-80 ambient-shadow">
              <Link to="/disease-detail">
                <img alt="Corn field at sunset" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw9xU9BYC8H6T5ge7tA82JL280rkaCQrHxz-H_-uhLFrGWWSChFWXq1JQ1X2UZjube450NPHm7rEtJhIK4UbntLO_tOd7vzqZvN2XjufAn_alxArLl8YQeJc1l_n-aYh2voq0NY2cDvbBHyYvam5RRA1PX7RLBMho0hTUplIz-AM3Ietggs4MlxjNTXLhA1p5k0AfTboJeI2PsaxSc_JeJJ_kEtd7EFrzDN9_-x8ycqLyERJzRCWSEwU85UcwGwVUv4mT8buhrCJ4"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold mb-3">Disease Prevention</span>
                  <h3 className="font-headline-lg text-headline-lg text-white mb-2 group-hover:text-primary-fixed-dim transition-colors">Early Detection of Corn Smut using AI</h3>
                  <p className="text-white/80 font-body-md line-clamp-2 max-w-2xl">Learn how advanced visual recognition models are identifying Ustilago maydis infections weeks before visual symptoms appear to the human eye, saving entire yields.</p>
                </div>
              </Link>
            </article>

            {/* Side Features */}
            <div className="flex flex-col gap-6">
              <article className="flex-1 bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/30 ambient-shadow hover:glass-panel transition-all duration-300 cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 rounded-full bg-surface-variant text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined">water_drop</span>
                  </span>
                  <span className="text-xs text-on-surface-variant">5 min read</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-background mb-2">Optimizing Drip Irrigation</h4>
                <p className="text-on-surface-variant font-body-md text-sm line-clamp-2">A comprehensive guide to sensor-based watering schedules for arid climates.</p>
              </article>
              
              <article className="flex-1 bg-primary text-on-primary rounded-lg p-6 ambient-shadow hover:-translate-y-1 transition-transform duration-300 cursor-pointer relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
                  <span className="material-symbols-outlined text-[120px]">psychiatry</span>
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-md">Expert Tip</span>
                <h4 className="font-headline-md text-headline-md mb-2">Nitrogen Fixing Tactics</h4>
                <p className="text-white/80 font-body-md text-sm line-clamp-2">Rotate with specific legumes to naturally restore nitrogen levels without synthetic inputs.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-section-gap">
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-headline-md text-headline-md text-on-background">Browse Database</h2>
            <Link className="text-primary font-semibold hover:underline hidden md:block" to="/wiki">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Category Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col items-center justify-center text-center ambient-shadow hover:glass-panel hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-primary text-3xl">grass</span>
              </div>
              <h3 className="font-body-lg text-body-lg font-semibold text-on-background">Crops &amp; Yields</h3>
              <p className="text-sm text-on-surface-variant mt-1">420 Articles</p>
            </div>
            
            {/* Category Card */}
            <Link to="/disease-detail" className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col items-center justify-center text-center ambient-shadow hover:glass-panel hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-primary text-3xl">bug_report</span>
              </div>
              <h3 className="font-body-lg text-body-lg font-semibold text-on-background">Pest Control</h3>
              <p className="text-sm text-on-surface-variant mt-1">156 Articles</p>
            </Link>
            
            {/* Category Card */}
            <Link to="/disease-detail" className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col items-center justify-center text-center ambient-shadow hover:glass-panel hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-primary text-3xl">coronavirus</span>
              </div>
              <h3 className="font-body-lg text-body-lg font-semibold text-on-background">Diseases</h3>
              <p className="text-sm text-on-surface-variant mt-1">89 Articles</p>
            </Link>
            
            {/* Category Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col items-center justify-center text-center ambient-shadow hover:glass-panel hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-primary text-3xl">cloud</span>
              </div>
              <h3 className="font-body-lg text-body-lg font-semibold text-on-background">Climate Prep</h3>
              <p className="text-sm text-on-surface-variant mt-1">204 Articles</p>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden bg-white/80 backdrop-blur-xl docked full-width bottom-0 rounded-t-lg border-t border-outline-variant/20 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] fixed left-0 w-full z-50 flex justify-around items-center h-20 pb-safe px-6">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-variant/50 w-16 h-16 rounded-xl transition-colors" to="/diagnostic-hub">
          <span className="material-symbols-outlined mb-1">qr_code_scanner</span>
          <span className="font-label-sm text-label-sm">Scanner</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-variant/50 w-16 h-16 rounded-xl transition-colors" to="/history">
          <span className="material-symbols-outlined mb-1">history</span>
          <span className="font-label-sm text-label-sm">History</span>
        </Link>
        <Link className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 hover:scale-110 transition-transform duration-200 w-16 h-16" to="/wiki">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>book_2</span>
          <span className="font-label-sm text-label-sm">Wiki</span>
        </Link>
      </nav>
    </div>
  );
};

export default Wiki;
