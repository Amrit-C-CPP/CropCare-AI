import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DiseaseDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        className="relative w-full h-64 md:h-96 flex items-end pb-6"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBhXkTfryteKFb0WBxYlUHFtPdGBBOUluSPrHJvLU3wAYi22QKFxszgIdPZp1jkr8EaxuDHOQWmbK_ulIvR0dHhRU6-Aq0dv9Nz36Bb-nfuExS5kvnnA-Pe-UPAJgySmkHoRwcV30FnUCyn9FlRXGLI-5NkcWHPxEMcm-m9rsw6KvPThSXbxXQGfUjD4e3x22pXgW3NMdcPZt_ZFGsgARgt4jEPbD13cK-zQFmot1p8H8-8gs_BCpg2i9d0uiFLcAmk5S8yHvJBaYk')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-sm transition-colors flex items-center justify-center z-10"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="relative w-full px-4 md:px-8 text-white">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-error-container text-on-error-container text-xs font-bold rounded-full backdrop-blur-md mb-3">
            <span className="material-symbols-outlined text-sm">warning</span>
            High Risk – Fungal
          </span>
          <h1 className="text-2xl md:text-4xl font-bold mb-1">Tomato Late Blight</h1>
          <p className="text-white/80 text-sm italic">Phytophthora infestans</p>
        </div>
      </section>

      {/* Content */}
      <div className="px-4 md:px-8 max-w-4xl mx-auto w-full py-8 space-y-8">
        {/* Overview */}
        <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
          <h2 className="text-xl font-bold text-on-surface mb-3">Overview</h2>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Late blight is a devastating disease of tomatoes and potatoes caused by the oomycete pathogen{' '}
            <em>Phytophthora infestans</em>. Known historically for causing the Irish Potato Famine, it spreads
            rapidly under cool, wet conditions. The pathogen can destroy entire fields within days if left unchecked.
          </p>
        </section>

        {/* Symptoms */}
        <section>
          <h2 className="text-xl font-bold text-on-surface mb-4">Key Symptoms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: 'water_drop', color: 'bg-secondary-container text-on-secondary-container', title: 'Water-Soaked Spots', desc: 'Irregular, dark, water-soaked lesions on leaves, often starting near edges.' },
              { icon: 'spa', color: 'bg-surface-variant text-on-surface-variant', title: 'Fungal Growth', desc: 'White fuzzy mold on underside of infected leaves in humid conditions.' },
              { icon: 'psychiatry', color: 'bg-error-container text-on-error-container', title: 'Stem Cankers', desc: 'Dark brown necrotic patches on stems leading to plant collapse.' },
              { icon: 'nutrition', color: 'bg-tertiary-container text-on-tertiary-container', title: 'Fruit Rot', desc: 'Firm, brown irregular patches on tomatoes rendering fruit unmarketable.' },
            ].map((s) => (
              <div key={s.title} className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/20 flex items-start gap-4">
                <div className={`${s.color} p-2.5 rounded-full flex-shrink-0`}>
                  <span className="material-symbols-outlined text-base">{s.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface mb-1">{s.title}</h3>
                  <p className="text-xs md:text-sm text-on-surface-variant">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Treatment Plan */}
        <section>
          <h2 className="text-xl font-bold text-on-surface mb-4">Treatment Protocol</h2>
          <div className="space-y-3">
            {[
              { title: 'Removal & Disposal', desc: 'Immediately remove infected plants. Burn, bury deeply, or bag and dispose — do not compost.' },
              { title: 'Fungicide Application', desc: 'Apply Chlorothalonil or copper-based sprays. Use systemic fungicides if infection is present.' },
              { title: 'Environmental Control', desc: 'Space plants for airflow, use drip irrigation, monitor for cool/wet weather conditions.' },
            ].map((step, i) => (
              <div key={step.title} className="bg-white rounded-xl p-5 border border-outline-variant/30 flex gap-4 items-start hover:bg-surface-container-low transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-container text-on-primary-container font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface mb-1">{step.title}</h3>
                  <p className="text-xs md:text-sm text-on-surface-variant">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-4 pb-4">
          <button className="flex-1 bg-white border-2 border-primary text-primary text-sm font-bold py-3 rounded-full hover:bg-surface-container transition-colors">
            Save Report
          </button>
          <Link to="/diagnostic-hub" className="flex-1">
            <button className="w-full bg-primary text-on-primary text-sm font-bold py-3 rounded-full hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-base">qr_code_scanner</span>
              Scan Another Leaf
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetail;
