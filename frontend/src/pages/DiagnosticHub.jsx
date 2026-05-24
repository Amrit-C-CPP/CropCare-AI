import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function DiagnosticHub() {
  /* camera state */
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [facingMode, setFacingMode] = useState(isMobile ? 'environment' : 'user');
  const [scanning, setScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [flipSupported, setFlipSupported] = useState(false);

  /* ── start / restart camera ─────────────────────────────── */
  const startCamera = useCallback(async (facing) => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    setCameraError(null);
    setCapturedImage(null);
    setResult(null);
    try {
      const constraints = {
        video: {
          facingMode: isMobile ? { ideal: facing } : { exact: 'user' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videos = devices.filter(d => d.kind === 'videoinput');
      setFlipSupported(videos.length > 1);
    } catch (err) {
      console.error(err);
      setCameraError('Camera access denied or unavailable.');
      setCameraOn(false);
    }
  }, [isMobile]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  /* ── flip camera ────────────────────────────────────────── */
  const flipCamera = () => {
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    startCamera(next);
  };

  /* ── capture frame → canvas → base64 ────────────────────── */
  const captureFrame = () => {
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return null;

      const w = video.videoWidth || video.clientWidth || 640;
      const h = video.videoHeight || video.clientHeight || 480;
      if (w === 0 || h === 0) return null;

      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');

      if (facingMode === 'user') {
        ctx.translate(w, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(video, 0, 0, w, h);
      return canvas.toDataURL('image/jpeg', 0.9);
    } catch (err) {
      console.error("Capture error:", err);
      return null;
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const analyzeImage = async (base64Img) => {
    setScanning(true);
    setResult(null);
    try {
      const blob = dataURItoBlob(base64Img);
      const formData = new FormData();
      formData.append('file', blob, 'capture.jpg');

      const response = await fetch('http://localhost:8000/api/diagnose', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Analysis failed:", err);
      setResult({ error: err.message || 'Analysis failed' });
    } finally {
      setScanning(false);
    }
  };

  const handleScanAction = () => {
    if (cameraError && !capturedImage) {
       alert("Camera is not available. Please upload an image instead.");
       return;
    }
    if (!capturedImage && cameraOn) {
      const img = captureFrame();
      if (img) {
        setCapturedImage(img);
        stopCamera();
        analyzeImage(img);
      }
    } else if (capturedImage && result) {
      setCapturedImage(null);
      setResult(null);
      startCamera(facingMode);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      stopCamera();
      const base64 = ev.target.result;
      setCapturedImage(base64);
      analyzeImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  useEffect(() => {
    startCamera(facingMode);
  }, [startCamera, facingMode]);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Top Navigation (Web) */}
      <header className="hidden md:flex fixed top-0 left-0 w-full z-50 justify-between items-center px-container-padding h-16 bg-white/70 dark:bg-surface-container/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm transition-all duration-300">
        <div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">CropCare AI</div>
        <nav className="flex gap-8">
          <Link className="text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1 font-body-md text-body-md hover:bg-primary-container/20 transition-all duration-300 px-2 rounded-t-sm" to="/diagnostic-hub">Scanner</Link>
          <Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md hover:bg-primary-container/20 duration-300 px-2 rounded-sm py-1" to="/history">History</Link>
          <Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md hover:bg-primary-container/20 duration-300 px-2 rounded-sm py-1" to="/wiki">Wiki</Link>
        </nav>
        <div className="flex items-center">
          <Link to="/auth" className="p-2 hover:bg-primary-container/20 rounded-full transition-all duration-300 text-primary dark:text-primary-fixed-dim flex items-center justify-center">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </header>
    
      {/* Main Content */}
      <main className="pt-20 md:pt-24 pb-32 md:pb-12 px-gutter md:px-container-padding max-w-7xl mx-auto flex flex-col md:flex-row gap-section-gap min-h-screen">
        {/* Left Column: Scanner View */}
        <div className="flex-1 flex flex-col items-center justify-center relative w-full">
          <div className="text-center mb-8 w-full">
            <h1 className="font-display-lg text-display-lg text-primary mb-2 hidden md:block">CROP SCANNER</h1>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2 md:hidden">CROP SCANNER</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Point at a leaf · Initiate scan</p>
          </div>
          
          {/* Viewfinder */}
          <div className="relative w-full max-w-lg aspect-[3/4] md:aspect-square bg-surface-container rounded-xl overflow-hidden border border-outline-variant/30 shadow-[0_8px_32px_rgba(65,105,0,0.1)] group">
            
            {capturedImage ? (
              <img alt="Captured" className="absolute inset-0 w-full h-full object-cover" src={capturedImage}/>
            ) : (
              <video ref={videoRef} autoPlay playsInline muted className={`absolute inset-0 w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} />
            )}
            <canvas ref={canvasRef} className="hidden" />
    
            {/* Grid Overlay */}
            <div className="absolute inset-0 grid-overlay opacity-50 pointer-events-none"></div>
            
            {/* Scanning Laser */}
            {scanning && (
              <div className="absolute left-0 w-full h-[2px] bg-primary-container shadow-[0_0_15px_rgba(132,204,22,0.8)] scanner-line z-10 pointer-events-none"></div>
            )}
    
            {/* Corner Reticles */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary-container rounded-tl-lg pointer-events-none"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary-container rounded-tr-lg pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary-container rounded-bl-lg pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary-container rounded-br-lg pointer-events-none"></div>
            
            {/* Analyzing Overlay */}
            {scanning && (
              <div className="absolute inset-0 bg-surface-container/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                <span className="material-symbols-outlined text-primary-container text-6xl animate-pulse mb-4">memory</span>
                <p className="font-body-lg text-body-lg text-on-surface font-semibold bg-white/80 px-6 py-2 rounded-full shadow-sm">Analyzing leaf texture...</p>
              </div>
            )}
            
            {cameraError && !capturedImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white z-30 p-4 text-center">
                {cameraError}
              </div>
            )}
          </div>
    
          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8 w-full max-w-lg">
            <button onClick={triggerUpload} className="flex flex-col items-center justify-center w-14 h-14 bg-surface-container rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors border border-outline-variant/50">
              <span className="material-symbols-outlined">image</span>
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
    
            <button onClick={handleScanAction} disabled={scanning} className="relative group flex items-center justify-center w-20 h-20 bg-primary-container text-on-primary-container rounded-full shadow-lg hover:scale-[1.02] hover:bg-[#7bc214] transition-all duration-200 z-30 cursor-pointer">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 scale-110"></div>
              {capturedImage && result ? (
                <span className="material-symbols-outlined text-3xl">refresh</span>
              ) : (
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>camera</span>
              )}
            </button>
    
            {flipSupported && !capturedImage ? (
              <button onClick={flipCamera} className="flex flex-col items-center justify-center w-14 h-14 bg-surface-container rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors border border-outline-variant/50">
                <span className="material-symbols-outlined">flip_camera_ios</span>
              </button>
            ) : (
              <div className="w-14 h-14"></div>
            )}
          </div>
        </div>
    
        {/* Right Column: Results Panel */}
        {result && (
          <div className="w-full md:w-[400px] flex-shrink-0">
            <div className="bg-white/80 dark:bg-surface-container-high/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-gutter shadow-[0_12px_40px_rgba(65,105,0,0.08)] sticky top-24">
              {!result.error ? (
                <>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1 block">Scan Result</span>
                      <h2 className="font-headline-md text-headline-md text-primary">{result.predicted_disease_name?.replace(/_/g, ' ')}</h2>
                    </div>
                    <button onClick={() => setResult(null)} className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
    
                  {/* Confidence */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-body-md text-body-md text-on-surface-variant">Confidence Match</span>
                      <span className="font-body-md text-body-md font-semibold text-primary">{result.confidence_score?.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-surface-variant rounded-full h-2">
                      <div className="bg-primary-container h-2 rounded-full" style={{ width: `${result.confidence_score?.toFixed(1)}%` }}></div>
                    </div>
                  </div>
    
                  {/* Chips */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#fef08a]/40 text-[#854d0e] font-label-sm text-label-sm border border-[#fef08a]">
                      <span className="material-symbols-outlined text-[14px] mr-1">warning</span> Moderate
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#bae6fd]/40 text-[#0369a1] font-label-sm text-label-sm border border-[#bae6fd]">
                      <span className="material-symbols-outlined text-[14px] mr-1">science</span> Fungal
                    </span>
                  </div>
    
                  {/* Protocol */}
                  <div className="bg-surface-container-low rounded-lg p-6 border border-outline-variant/20">
                    <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-4 flex items-center">
                      <span className="material-symbols-outlined mr-2 text-primary">prescriptions</span>
                      Treatment Protocol
                    </h3>
                    <ol className="space-y-4 font-body-md text-body-md text-on-surface-variant relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30">
                      {result.recommended_action?.map((action, i) => (
                        <li key={i} className="relative pl-8">
                          <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-sm text-label-sm shadow-sm z-10">{i + 1}</span>
                          <p>{action}</p>
                        </li>
                      )) || (
                        <>
                          <li className="relative pl-8">
                            <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-sm text-label-sm shadow-sm z-10">1</span>
                            <p>Apply copper-based fungicide immediately.</p>
                          </li>
                          <li className="relative pl-8">
                            <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-sm text-label-sm shadow-sm z-10">2</span>
                            <p>Remove and destroy infected plant material.</p>
                          </li>
                          <li className="relative pl-8">
                            <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-sm text-label-sm shadow-sm z-10">3</span>
                            <p>Ensure adequate spacing for air circulation.</p>
                          </li>
                        </>
                      )}
                    </ol>
                  </div>
    
                  <div className="mt-8 flex gap-4">
                    <button className="flex-1 bg-white border-2 border-primary text-primary font-body-md text-body-md font-semibold py-3 rounded-full hover:bg-surface transition-colors text-center">Save Report</button>
                    <button className="flex-1 bg-primary text-on-primary font-body-md text-body-md font-semibold py-3 rounded-full hover:scale-[1.02] transition-transform shadow-md text-center">Buy Treatment</button>
                  </div>
                </>
              ) : (
                 <div className="p-4 text-red-600 bg-red-50 rounded-lg border border-red-200">
                   {result.error}
                 </div>
              )}
            </div>
          </div>
        )}
      </main>
    
      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 pb-safe px-6 bg-white/80 dark:bg-surface-container-high/80 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-lg">
        <Link className="flex flex-col items-center justify-center bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary rounded-full px-4 py-1 scale-110 transition-transform duration-200" to="/diagnostic-hub">
          <span className="material-symbols-outlined mb-1">qr_code_scanner</span>
          <span className="font-label-sm text-label-sm">Scanner</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant/50 rounded-lg p-2 transition-colors" to="/history">
          <span className="material-symbols-outlined mb-1">history</span>
          <span className="font-label-sm text-label-sm">History</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant/50 rounded-lg p-2 transition-colors" to="/wiki">
          <span className="material-symbols-outlined mb-1">book_2</span>
          <span className="font-label-sm text-label-sm">Wiki</span>
        </Link>
      </nav>
    </div>
  );
}
