import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Plus, ThumbsUp, Calendar, Clock, BookOpen, Layers, Award } from 'lucide-react';

export default function InfoModal({ isOpen, onClose, item, type, onPlay }) {
  if (!isOpen || !item) return null;

  // Set visual aspects depending on the type
  const getImage = () => {
    switch (type) {
      case 'personal':
        return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=450';
      case 'projects':
        return item.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=450';
      case 'skills':
        return 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800&h=450';
      case 'experience':
        return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800&h=450';
      case 'testimonials':
        return 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800&h=450';
      default:
        return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=450';
    }
  };

  const bannerImg = getImage();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-10 select-none">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { duration: 0.35, ease: 'easeOut' }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.9, 
            y: 30,
            transition: { duration: 0.25, ease: 'easeIn' }
          }}
          className="relative w-full max-w-4xl bg-zinc-900 text-white rounded-xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.9)] border border-zinc-800 z-50 my-8 mx-auto"
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-black/70 border border-zinc-700 text-white flex items-center justify-center hover:bg-zinc-800 hover:border-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Widescreen Banner Backdrop with Play triggers */}
          <div className="relative aspect-video md:h-96 w-full overflow-hidden">
            <img
              src={bannerImg}
              alt="Details Widescreen"
              className="w-full h-full object-cover brightness-[0.7] saturate-[0.9]"
            />
            {/* Dark overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 md:left-12 right-6 md:right-12 flex flex-col justify-end">
              <h2 className="text-2xl md:text-5xl font-black mb-2 tracking-tight select-text drop-shadow-md">
                {type === 'personal' ? item.name : type === 'projects' ? item.title : type === 'skills' ? item.name : type === 'experience' ? item.role : item.name}
              </h2>
              {type !== 'personal' && (
                <p className="text-red-500 font-bold text-sm md:text-lg mb-4 select-text drop-shadow-sm">
                  {type === 'projects' ? item.techStack?.slice(0, 3).join(' • ') : type === 'skills' ? item.category : type === 'experience' ? item.company : `${item.designation} at ${item.company}`}
                </p>
              )}

              {/* Action buttons embedded in header */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onPlay(item, type);
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-white text-black font-extrabold text-sm md:text-base hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black" />
                  {type === 'personal' ? 'Play Biography' : type === 'projects' ? 'Explore Demo' : type === 'skills' ? 'Review Competency' : type === 'experience' ? 'Read Chronology' : 'Open Critique'}
                </button>
                <button
                  className="w-10 h-10 rounded-full border border-zinc-500 text-white flex items-center justify-center hover:border-white transition-colors bg-zinc-950/40 backdrop-blur-sm shadow-md"
                  title="My List"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  className="w-10 h-10 rounded-full border border-zinc-500 text-white flex items-center justify-center hover:border-white transition-colors bg-zinc-950/40 backdrop-blur-sm shadow-md"
                  title="Like"
                >
                  <ThumbsUp className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Widescreen Grid Content */}
          <div className="p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 select-text">
            {/* Left Col: Match rating, Title details, Core Description */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-xs md:text-sm font-semibold flex-wrap">
                <span className="text-emerald-500">
                  {type === 'projects' ? item.matchScore || 98 : type === 'skills' ? item.proficiency || 95 : 99}% Match
                </span>
                <span className="text-zinc-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {type === 'projects' ? item.releaseYear || 2025 : type === 'experience' ? item.duration : '2026 Edition'}
                </span>
                <span className="border border-zinc-600 px-1.5 py-0.25 text-[10px] rounded text-zinc-300 font-bold bg-zinc-800 tracking-wider">
                  {type === 'projects' ? item.maturityRating || 'PG-13' : 'EXPERT'}
                </span>
                <span className="border border-red-500 text-red-500 text-[9px] px-1 rounded font-black tracking-wider uppercase bg-red-950/20">
                  Ultra HD 4K
                </span>
              </div>

              {/* Main detailed text block */}
              <div className="text-zinc-200 text-sm md:text-base leading-relaxed font-medium">
                {type === 'personal' && (
                  <p className="select-text">{item.about || item.bio}</p>
                )}
                {type === 'projects' && (
                  <p className="select-text">{item.description}</p>
                )}
                {type === 'skills' && (
                  <div>
                    <p className="select-text mb-3 font-semibold text-zinc-300">Level: <span className="text-emerald-400">{item.level}</span></p>
                    <p className="select-text">{item.description}</p>
                  </div>
                )}
                {type === 'experience' && (
                  <div className="flex flex-col gap-3">
                    <p className="font-bold text-zinc-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-red-500" />
                      Duration: <span className="text-zinc-200">{item.duration}</span>
                    </p>
                    <p className="select-text leading-relaxed">{item.description}</p>
                  </div>
                )}
                {type === 'testimonials' && (
                  <div className="italic border-l-2 border-red-600 pl-4 py-1 text-zinc-300 text-base md:text-lg">
                    {item.text}
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Category, tags list, metadata fields */}
            <div className="flex flex-col gap-5 text-xs sm:text-sm border-t md:border-t-0 md:border-l border-zinc-800 pt-6 md:pt-0 md:pl-8">
              {type === 'projects' && (
                <>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">Duration:</span>
                    <span className="text-zinc-300">{item.duration}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">Maturity Rating:</span>
                    <span className="text-zinc-300">{item.maturityRating} - Recommended for professional teams.</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-zinc-500" /> Tech Stack:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {item.techStack?.map((tag) => (
                        <span key={tag} className="bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded text-zinc-300 font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {type === 'skills' && (
                <>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">Category:</span>
                    <span className="text-emerald-400 font-semibold">{item.category}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Proficiency Score:
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden border border-zinc-700">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${item.proficiency}%` }} />
                      </div>
                      <span className="text-emerald-500 font-bold">{item.proficiency}%</span>
                    </div>
                  </div>
                </>
              )}

              {type === 'experience' && (
                <>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">Company:</span>
                    <span className="text-red-500 font-bold">{item.company}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-zinc-500" /> Stack & Tools:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {item.techStack?.map((tag) => (
                        <span key={tag} className="bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded text-zinc-300 font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {type === 'testimonials' && (
                <>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">Critic:</span>
                    <span className="text-zinc-200 font-semibold">{item.name}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">Designation:</span>
                    <span className="text-red-500 font-bold">{item.designation}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">Company:</span>
                    <span className="text-zinc-300 font-semibold">{item.company}</span>
                  </div>
                </>
              )}

              {type === 'personal' && (
                <>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">Production Hub:</span>
                    <span className="text-zinc-300">Monaco / Remote</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">Key Genres:</span>
                    <span className="text-red-500 font-bold">Cloud Architect, Systems, Frontend Artistry</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">Contact Email:</span>
                    <a href={`mailto:${item.email}`} className="text-emerald-400 hover:underline select-text font-bold font-mono block mt-1">{item.email}</a>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
