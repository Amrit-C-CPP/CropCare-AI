import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DiseaseDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="hidden md:flex fixed top-0 left-0 w-full z-50 justify-between items-center px-container-padding h-16 bg-white/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm">
        <div className="font-headline-md text-headline-md font-bold text-primary">CropCare AI</div>
        {/* Navigation Links (Centered) */}
        <ul className="flex items-center space-x-gutter">
          <li>
            <Link className="flex flex-col text-on-surface-variant hover:text-primary transition-colors py-2" to="/diagnostic-hub">
              <span className="font-body-md text-body-md">Scanner</span>
            </Link>
          </li>
          <li>
            <Link className="flex flex-col text-on-surface-variant hover:text-primary transition-colors py-2" to="/history">
              <span className="font-body-md text-body-md">History</span>
            </Link>
          </li>
          <li>
            <Link className="flex flex-col text-primary font-bold border-b-2 border-primary pb-1 py-2" to="/wiki">
              <span className="font-body-md text-body-md">Wiki</span>
            </Link>
          </li>
        </ul>
        {/* Trailing Actions */}
        <div className="flex items-center space-x-4">
          <Link to="/auth" className="text-primary hover:bg-primary-container/20 transition-all duration-300 p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>account_circle</span>
          </Link>
        </div>
      </nav>

      {/* BottomNavBar (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 pb-safe px-6 bg-white/80 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-lg">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-variant/50 w-16 h-full rounded-lg transition-colors" to="/diagnostic-hub">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 0" }}>qr_code_scanner</span>
          <span className="font-label-sm text-label-sm">Scanner</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-variant/50 w-16 h-full rounded-lg transition-colors" to="/history">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 0" }}>history</span>
          <span className="font-label-sm text-label-sm">History</span>
        </Link>
        <Link className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 hover:bg-surface-variant/50 transition-colors" to="/wiki">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>book_2</span>
          <span className="font-label-sm text-label-sm">Wiki</span>
        </Link>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow pt-0 md:pt-16 pb-24 md:pb-section-gap">
        {/* Hero Section with Diseased Crop Image */}
        <section className="relative w-full h-[409px] md:h-[512px] min-h-[300px] flex items-end pb-8" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBhXkTfryteKFb0WBxYlUHFtPdGBBOUluSPrHJvLU3wAYi22QKFxszgIdPZp1jkr8EaxuDHOQWmbK_ulIvR0dHhRU6-Aq0dv9Nz36Bb-nfuExS5kvnnA-Pe-UPAJgySmkHoRwcV30FnUCyn9FlRXGLI-5NkcWHPxEMcm-m9rsw6KvPThSXbxXQGfUjD4e3x22pXgW3NMdcPZt_ZFGsgARgt4jEPbD13cK-zQFmot1p8H8-8gs_BCpg2i9d0uiFLcAmk5S8yHvJBaYk')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Back button overlay */}
          <div className="absolute top-4 md:top-6 left-4 md:left-container-padding z-10 md:hidden">
             <button onClick={() => navigate(-1)} className="text-white bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors flex items-center justify-center">
                 <span className="material-symbols-outlined">arrow_back</span>
             </button>
          </div>

          <div className="relative w-full max-w-7xl mx-auto px-4 md:px-container-padding text-white">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-error-container text-on-error-container font-label-sm text-label-sm rounded-full backdrop-blur-md">
                <span className="material-symbols-outlined text-sm">warning</span>
                High Risk - Fungal
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg mb-2">Tomato Late Blight</h1>
            <p className="font-body-lg text-body-lg opacity-90 italic">Phytophthora infestans</p>
          </div>
        </section>

        {/* Content Container */}
        <div className="w-full max-w-4xl mx-auto px-4 md:px-container-padding mt-section-gap space-y-section-gap">
          {/* Overview */}
          <section className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/30 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Overview</h2>
              <button onClick={() => navigate(-1)} className="hidden md:flex text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Late blight is a devastating disease of tomatoes and potatoes caused by the oomycete pathogen <em>Phytophthora infestans</em>. Known historically for causing the Irish Potato Famine, it spreads rapidly under cool, wet conditions. The pathogen can destroy entire fields within days if left unchecked, making it one of the most significant threats to tomato yields globally.
            </p>
          </section>

          {/* Symptoms */}
          <section>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 px-4 md:px-0">Key Symptoms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Symptom Card 1 */}
              <div className="bg-surface-container-low rounded-DEFAULT p-6 border border-outline-variant/20 flex items-start gap-4">
                <div className="bg-secondary-container text-on-secondary-container p-3 rounded-full flex-shrink-0">
                  <span className="material-symbols-outlined">water_drop</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Water-Soaked Spots</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Irregular, dark, water-soaked lesions appear on leaves, often starting near the edges or tips.</p>
                </div>
              </div>
              {/* Symptom Card 2 */}
              <div className="bg-surface-container-low rounded-DEFAULT p-6 border border-outline-variant/20 flex items-start gap-4">
                <div className="bg-surface-variant text-on-surface-variant p-3 rounded-full flex-shrink-0">
                  <span className="material-symbols-outlined">spa</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Fungal Growth</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">In humid conditions, a characteristic white, fuzzy mold growth develops on the underside of infected leaves.</p>
                </div>
              </div>
              {/* Symptom Card 3 */}
              <div className="bg-surface-container-low rounded-DEFAULT p-6 border border-outline-variant/20 flex items-start gap-4">
                <div className="bg-error-container text-on-error-container p-3 rounded-full flex-shrink-0">
                  <span className="material-symbols-outlined">psychiatry</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Stem Cankers</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Dark brown to black necrotic patches form on stems and petioles, eventually leading to plant collapse.</p>
                </div>
              </div>
              {/* Symptom Card 4 */}
              <div className="bg-surface-container-low rounded-DEFAULT p-6 border border-outline-variant/20 flex items-start gap-4">
                <div className="bg-tertiary-container text-on-tertiary-container p-3 rounded-full flex-shrink-0">
                  <span className="material-symbols-outlined">nutrition</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Fruit Rot</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Tomatoes develop firm, large, irregular brown patches that quickly render the fruit unmarketable.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Treatment Plan */}
          <section>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 px-4 md:px-0">Treatment Protocol</h2>
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="group relative bg-white rounded-xl p-6 border border-outline-variant/30 flex flex-col md:flex-row gap-6 items-start hover:bg-surface-container-low transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-container text-on-primary-container font-headline-md flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Removal &amp; Disposal</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-3">
                    Immediately remove all infected plants, including roots, from the field. Do not compost infected material. Burn, bury deeply, or bag and dispose of the material to prevent spores from spreading.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="group relative bg-white rounded-xl p-6 border border-outline-variant/30 flex flex-col md:flex-row gap-6 items-start hover:bg-surface-container-low transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-container text-on-primary-container font-headline-md flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Fungicide Application</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-3">
                    Apply preventative fungicides (e.g., Chlorothalonil or copper-based sprays) immediately if conditions are favorable for disease development. If infection is present, use systemic targeted fungicides suitable for Late Blight.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="group relative bg-white rounded-xl p-6 border border-outline-variant/30 flex flex-col md:flex-row gap-6 items-start hover:bg-surface-container-low transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-container text-on-primary-container font-headline-md flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Environmental Control</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-3">
                    Ensure adequate spacing between plants to improve air circulation. Avoid overhead watering; use drip irrigation to keep foliage dry. Monitor weather forecasts for cool, wet conditions.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-24 md:bottom-8 right-6 z-40">
        <Link to="/diagnostic-hub">
            <button className="bg-primary hover:bg-primary-fixed-dim text-on-primary hover:text-on-primary-fixed font-label-sm text-label-sm px-6 py-4 rounded-full shadow-[0_4px_14px_rgba(65,105,0,0.3)] transition-all transform hover:scale-105 flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>qr_code_scanner</span>
                Scan a leaf for this disease
            </button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-highest border-t border-outline-variant/30 py-8 mt-auto md:mb-0 mb-20">
        <div className="w-full max-w-7xl mx-auto px-container-padding flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-headline-md text-headline-md font-bold text-primary opacity-80">CropCare AI</div>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-70 text-center md:text-right">
            © 2024 CropCare AI. Precision Agriculture.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DiseaseDetail;
