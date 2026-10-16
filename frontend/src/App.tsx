import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ResumeModalProvider, useResumeModal } from './context/ResumeModalContext';
import { ResumeViewerModal } from './components/ui/ResumeViewerModal';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { CustomCursor } from './components/animations/CustomCursor';
import { RoamingPikachu } from './components/animations/RoamingPikachu';

const ResumeModalConsumer: React.FC = () => {
  const { isOpen, closeResumeModal } = useResumeModal();
  return <ResumeViewerModal isOpen={isOpen} onClose={closeResumeModal} />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ResumeModalProvider>
        <div className="min-h-screen flex flex-col bg-[#060913] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative">
          {/* Top Scroll Progress Bar */}
          <ScrollProgressBar />

          {/* Interactive Custom Animated Cursor */}
          <CustomCursor />

          <a
            href="#projects"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan-500 focus:text-slate-950 focus:font-semibold"
          >
            Skip to main projects
          </a>

          <Navbar />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            </Routes>
          </div>

          <Footer />

          {/* Shimeji-Style Roaming Pikachu Mascot */}
          <RoamingPikachu />

          {/* In-Page Interactive Resume Viewer Modal */}
          <ResumeModalConsumer />
        </div>
      </ResumeModalProvider>
    </BrowserRouter>
  );
};

export default App;
