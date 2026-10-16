import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, Eye, Menu, Sparkles, X } from 'lucide-react';
import { navItems, profileIdentity } from '../../data/portfolioData';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useResumeModal } from '../../context/ResumeModalContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const activeSection = useActiveSection(navItems.map((item) => item.id));

  const { openResumeModal } = useResumeModal();

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#060913]/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Monogram & Identity */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 group focus:outline-none"
          aria-label="ujjwal.ai Home"
        >
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-violet-600/20 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-sm text-cyan-300 group-hover:border-cyan-400 transition-colors shadow-glow">
            {profileIdentity.monogram}
          </span>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              ujjwal<span className="text-cyan-400">.ai</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-80" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              AI/ML &amp; Python Backend
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary Navigation">
          {navItems.map((item) => {
            const isActive = isHomePage && activeSection === item.id;
            const href = isHomePage ? item.href : `/${item.href}`;
            return (
              <a
                key={item.id}
                href={href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Prominent Resume CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={openResumeModal}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-glow transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>Preview Resume</span>
          </button>

          <a
            href={profileIdentity.resumePath}
            download="Ujjwal_Pradip_Patil_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download Resume PDF"
            aria-label="Download Resume PDF"
            className="p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 transition-colors"
          >
            <Download className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-cyan-500/40"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-menu"
          aria-label="Mobile Navigation"
          className="lg:hidden border-b border-slate-800 bg-[#080d1a]/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-1.5"
        >
          {navItems.map((item) => {
            const isActive = isHomePage && activeSection === item.id;
            const href = isHomePage ? item.href : `/${item.href}`;
            return (
              <a
                key={item.id}
                href={href}
                onClick={handleNavClick}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-3 mt-3 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openResumeModal();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-glow"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Resume</span>
              </button>
              <a
                href={profileIdentity.resumePath}
                download="Ujjwal_Pradip_Patil_Resume.pdf"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400"
                aria-label="Download Resume"
                title="Download Resume"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-400">
              <span>{profileIdentity.location}</span>
              <a
                href={`mailto:${profileIdentity.email}`}
                className="text-cyan-300 hover:underline"
              >
                {profileIdentity.email}
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
