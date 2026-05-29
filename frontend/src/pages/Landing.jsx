import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="bg-background text-on-background font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* TopNavBar */}
      <header className="bg-white shadow-md fixed left-0 top-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">CropCare AI</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <Link className="text-gray-800 font-semibold hover:text-green-600 transition-colors px-3 py-2 rounded-lg" to="/diagnostic-hub">Scanner</Link>
          <Link className="text-gray-800 font-semibold hover:text-green-600 transition-colors px-3 py-2 rounded-lg" to="/history">History</Link>
          <Link className="text-gray-800 font-semibold hover:text-green-600 transition-colors px-3 py-2 rounded-lg" to="/wiki">Wiki</Link>
        </nav>
        <div className="flex items-center">
          <Link to="/auth" className="text-gray-800 hover:text-green-600 transition-colors p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-inverse-surface/60 via-inverse-surface/40 to-background z-10 mix-blend-multiply"></div>
          <img alt="Aerial view of crops" className="w-full h-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDObAo8PDePK5GhK--1nmr1UW67AUPmfp6Ezxm1vv9zX0sKh2ACzvVbBqqGpGQKSOPRQO2C6LevMpsHbyK8XUjAMYHL4rSP74Hys5iOS7VVHJs_DQR-5smQuExrx4lI5XJ0CA-zQ2p6gxB04Whb8WcpqYyr4NwAB3Q-8JkjS_78aggFu4dJt6YpFKqpHhNwIcN8IBhUQhT-3n-ZdEaujYJnVW0lnHMs5wY-58EsZ9WBBwZbUXbGWzvwZUGBVS1hLIhouQTPP526Lkw"/>
        </div>
        <div className="relative z-20 container mx-auto px-container-padding text-center max-w-4xl">
          <span className="inline-block py-1 px-4 mb-6 rounded-full bg-surface-container-lowest/20 backdrop-blur-md border border-outline-variant/30 text-surface-container-lowest font-label-sm text-label-sm tracking-widest uppercase">High-Tech Vitality</span>
          <h1 className="font-display-lg text-display-lg text-surface-container-lowest mb-6 drop-shadow-lg">
            AI-Powered Crop Doctor in Your Pocket
          </h1>
          <p className="font-body-lg text-body-lg text-surface-container-low mb-10 max-w-2xl mx-auto drop-shadow-md">
            Instantly diagnose pests, diseases, and nutrient deficiencies with precision AI vision. Elevate your harvest yields with data-driven agricultural intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/diagnostic-hub">
              <button className="bg-primary-container text-on-primary-container font-headline-md text-headline-md text-[18px] py-4 px-8 rounded-full shadow-[0_0_30px_rgba(132,204,22,0.3)] hover:shadow-[0_0_40px_rgba(132,204,22,0.5)] hover:scale-[1.02] transition-all duration-300 flex items-center gap-2">
                Get Started
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </Link>
            <button className="bg-surface-container-lowest/10 backdrop-blur-md border border-surface-container-lowest/30 text-surface-container-lowest font-headline-md text-headline-md text-[18px] py-4 px-8 rounded-full hover:bg-surface-container-lowest/20 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-section-gap px-container-padding relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">Precision Intelligence</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">Harness the power of machine learning to monitor, track, and optimize your organic assets seamlessly.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-8 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(65,105,0,0.08)] transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mb-6 group-hover:bg-primary-container/40 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl icon-fill">qr_code_scanner</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background mb-3">Instant Diagnosis</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Scan any leaf or fruit to instantly identify potential threats, diseases, or deficiencies with remarkable accuracy.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-8 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(65,105,0,0.08)] transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mb-6 group-hover:bg-primary-container/40 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl icon-fill">history</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background mb-3">Historical Tracking</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Log scans geographically to build a comprehensive health map of your fields over time, predicting seasonal trends.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-8 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(65,105,0,0.08)] transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mb-6 group-hover:bg-primary-container/40 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl icon-fill">book_2</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background mb-3">Extensive Wiki</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Access an expansive, curated database of agronomic knowledge, treatment protocols, and organic remedies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-outline-variant/20 pt-16 pb-8 px-container-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div class="flex items-center gap-2">
              <span className="font-headline-md text-headline-md font-bold text-primary">CropCare AI</span>
            </div>
            <div className="flex gap-6">
              <Link className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-variant" to="#">
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-variant" to="#">
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fillRule="evenodd"></path></svg>
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-variant" to="#">
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fillRule="evenodd"></path></svg>
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left border-t border-outline-variant/10 pt-8">
            <p className="font-body-md text-body-md text-on-surface-variant/70">
              © 2024 CropCare AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" to="#">Terms of Service</Link>
              <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" to="#">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
