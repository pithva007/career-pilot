import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import data from '../../../../data/dummy_data.json';
import Hero from './Hero';
import Row from './Row';
import Footer from './Footer';
import InfoModal from './InfoModal';
import ContactModal from './ContactModal';

export default function NetflixBrowse({ data: dataProp }) {
  // Use data from props if available, otherwise fall back to the imported dummy_data
  const portfolioData = dataProp || data;
  const { personal, projects, skills, experience, testimonials, socials } = portfolioData || {};

  // Modal and active item states
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [activeModalType, setActiveModalType] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Navbar transition state on scroll
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Action Handlers
  const handleOpenInfoModal = (item, type) => {
    setActiveModalItem(item);
    setActiveModalType(type);
    setIsInfoModalOpen(true);
  };

  const handleOpenPlayModal = (item, type) => {
    // Both Play buttons (Hero & Card) will open the cinema-themed Contact Player
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white overflow-x-hidden font-sans scroll-smooth relative">
      
      {/* GLOWING AMBIENT BACKGROUND GRADIENT */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-red-900/10 via-[#141414]/5 to-transparent pointer-events-none z-0" />

      {/* STICKY NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-colors duration-500 py-3 md:py-4 px-4 md:px-12 flex items-center justify-between select-none ${
          isScrolled 
            ? 'bg-[#141414] border-b border-zinc-900 shadow-xl' 
            : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        {/* Left Side: Brand & Links */}
        <div className="flex items-center gap-6 md:gap-12">
          {/* Custom Styled Netflix Vibe Logo */}
          <a
            href="#hero"
            className="text-red-600 font-extrabold tracking-tighter text-2xl md:text-3xl hover:text-red-500 transition-colors cursor-pointer select-none"
          >
            DEVFLIX
          </a>

          {/* Nav Categories Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs md:text-sm text-zinc-300 font-medium">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
          </nav>
        </div>

        {/* Right Side: Account Controls */}
        <div className="flex items-center gap-4 md:gap-6 text-zinc-300">
          <Search className="w-5 h-5 cursor-pointer hover:text-white transition-colors hidden sm:block" />
          <span className="text-xs font-bold uppercase tracking-widest hidden lg:inline">Kids</span>
          <Bell className="w-5 h-5 cursor-pointer hover:text-white transition-colors relative">
            {/* Small unread red dot */}
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-600 rounded-full" />
          </Bell>
          
          {/* Profile User avatar drop menu */}
          <div 
            onClick={() => handleOpenPlayModal(personal, 'personal')}
            className="flex items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded overflow-hidden border border-zinc-700 group-hover:border-white transition-colors">
              <img
                src={personal?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100'}
                alt="Account profile"
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </header>

      {/* DYNAMIC SCROLL ANCHOR - HERO */}
      <div id="hero" className="relative z-10">
        <Hero
          personal={personal}
          onPlay={handleOpenPlayModal}
          onMoreInfo={handleOpenInfoModal}
        />
      </div>

      {/* CONTENT GRID - BROWSE LAYOUT */}
      <main className="relative z-20 -mt-10 sm:-mt-16 md:-mt-24 pb-12 flex flex-col gap-6 md:gap-8">
        
        {/* ROW 1: PROJECTS */}
        <div id="projects">
          <Row
            title="Trending Projects"
            items={projects}
            type="projects"
            onMoreInfo={handleOpenInfoModal}
            onPlay={handleOpenPlayModal}
          />
        </div>

        {/* ROW 2: SKILLS */}
        <div id="skills">
          <Row
            title="Core Skills"
            items={skills}
            type="skills"
            onMoreInfo={handleOpenInfoModal}
            onPlay={handleOpenPlayModal}
          />
        </div>

        {/* ROW 3: EXPERIENCE */}
        <div id="experience">
          <Row
            title="Career Episodes"
            items={experience}
            type="experience"
            onMoreInfo={handleOpenInfoModal}
            onPlay={handleOpenPlayModal}
          />
        </div>

        {/* ROW 4: TESTIMONIALS */}
        <div id="testimonials">
          <Row
            title="Critique & Reviews"
            items={testimonials}
            type="testimonials"
            onMoreInfo={handleOpenInfoModal}
            onPlay={handleOpenPlayModal}
          />
        </div>

      </main>

      {/* CINEMATIC FOOTER */}
      <Footer
        socials={socials}
        email={personal?.email}
      />

      {/* MODAL LAYER OVERLAYS */}
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        item={activeModalItem}
        type={activeModalType}
        onPlay={handleOpenPlayModal}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        personal={personal}
        socials={socials}
      />

    </div>
  );
}
