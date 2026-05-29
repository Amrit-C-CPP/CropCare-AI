import React, { useState, useEffect } from 'react';

// In-memory cache to prevent re-fetching the same queries
// This persists until the user fully refreshes the page
const searchCache = {};

// Fallback data in case the DuckDuckGo API rate-limits us (returns empty array or errors)
const FALLBACK_DATA = [
  {
    title: "Organic Pest Control Methods: A Comprehensive Guide",
    href: "https://www.sare.org/resources/managing-cover-crops-profitably-3rd-edition/",
    body: "Discover natural and organic methods to control pests without relying on synthetic chemicals. Neem oil, companion planting, and introducing beneficial insects are effective strategies..."
  },
  {
    title: "Soil Health Management and Cover Cropping",
    href: "https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soils/soil-health",
    body: "Healthy soil is the foundation of a healthy harvest. Learn how cover cropping, crop rotation, and reducing tillage can significantly increase organic matter and water retention..."
  },
  {
    title: "Recognizing Early Signs of Crop Disease",
    href: "https://extension.psu.edu/plant-disease-diagnosis",
    body: "Early detection is critical to stopping the spread of fungal and bacterial infections. Look for yellowing halos, water-soaked spots, and irregular growth patterns on lower leaves..."
  },
  {
    title: "Precision Irrigation Systems for Arid Environments",
    href: "https://www.fao.org/land-water/water/water-management/irrigation/en/",
    body: "Drip irrigation and soil moisture sensors can reduce water usage by up to 40% while simultaneously increasing crop yields by delivering water directly to the root zone..."
  }
];

const Wiki = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Topics');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearched, setLastSearched] = useState({ query: '', tab: '' });

  const tabs = ['All Topics', 'Crop Guides', 'Pest Control', 'Soil Health'];

  const fetchWiki = async (searchQuery, category) => {
    const q = searchQuery.trim() || "organic farming tips";
    const cacheKey = `${q}_${category}`;

    // Return cached results if available
    if (searchCache[cacheKey]) {
      setResults(searchCache[cacheKey]);
      setLastSearched({ query: q, tab: category });
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/api/wiki/search?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}`);
      if (!res.ok) throw new Error("Failed to fetch wiki data. Rate limit or connection issue.");
      const data = await res.json();
      
      let fetchedResults = data.results || [];
      
      // If DuckDuckGo rate limits us, it returns an empty array.
      // We use our fallback data instead so the page never looks broken!
      if (fetchedResults.length === 0) {
        fetchedResults = FALLBACK_DATA;
      }
      
      searchCache[cacheKey] = fetchedResults; // Cache it
      setResults(fetchedResults);
      setLastSearched({ query: q, tab: category });
    } catch (err) {
      // Use fallback data on error too
      searchCache[cacheKey] = FALLBACK_DATA;
      setResults(FALLBACK_DATA);
      setLastSearched({ query: q, tab: category });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch on initial load or tab change, but avoid re-fetching the exact same query+tab too often
    if (lastSearched.tab !== activeTab) {
        fetchWiki(query, activeTab);
    }
  }, [activeTab]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWiki(query, activeTab);
    }
  };

  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto py-6 min-h-screen">
      {/* Header & Search */}
      <header className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Wiki</h1>
        <div className="relative w-full max-w-lg flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-on-surface-variant z-10">search</span>
          <input
            className="w-full h-11 pl-12 pr-24 rounded-full bg-surface-container border border-outline-variant/50 focus:ring-2 focus:ring-primary text-sm outline-none transition"
            placeholder="Search crops, diseases, treatments..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            onClick={() => fetchWiki(query, activeTab)}
            className="absolute right-1 px-4 h-9 bg-primary text-on-primary rounded-full text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Search
          </button>
        </div>
      </header>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-xs font-bold transition-colors ${
              activeTab === tab
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant border border-outline-variant/50 hover:bg-surface-variant'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Results */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-on-background mb-4">
          {query ? `Results for "${query}"` : 'Top Insights'} in {activeTab}
        </h2>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-on-surface-variant text-sm">Searching global agronomic database...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-error-container text-on-error-container rounded-lg border border-error/20">
            <p className="font-semibold mb-1">Could not fetch data</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
            <p>No articles found. Try different keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {results.map((result, idx) => (
              <a
                key={idx}
                href={result.href}
                target="_blank"
                rel="noreferrer"
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-outline-variant/30 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full"
              >
                <div>
                  <h3 className="font-bold text-base text-on-background mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {result.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm line-clamp-3 mb-4">
                    {result.body}
                  </p>
                </div>
                <div className="flex items-center text-xs font-semibold text-primary">
                  Read Article <span className="material-symbols-outlined text-[14px] ml-1">open_in_new</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Wiki;
