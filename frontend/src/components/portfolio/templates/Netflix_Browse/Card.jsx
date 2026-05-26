import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, ThumbsUp, ChevronDown, Github, ExternalLink, Star } from 'lucide-react';

export default function Card({ item, type, onMoreInfo, onPlay }) {
  const [isHovered, setIsHovered] = useState(false);

  // Custom styling details depending on the item type
  const getCardDetails = () => {
    switch (type) {
      case 'projects':
        return {
          title: item.title,
          subtitle: item.techStack ? item.techStack.slice(0, 3).join(' • ') : '',
          rating: item.maturityRating || 'PG-13',
          match: item.matchScore || 98,
          duration: item.duration || 'N/A',
          metaLabel: 'Tech Stack',
          metaValue: item.techStack ? item.techStack.join(', ') : '',
          image: item.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300&h=170',
          links: (
            <div className="flex gap-2 mt-2">
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                  title="View Source"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                  title="Live Demo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )
        };
      case 'skills':
        return {
          title: item.name,
          subtitle: item.category || 'Core Skill',
          rating: 'EXPERT',
          match: item.proficiency || 95,
          duration: item.level || 'Advanced',
          metaLabel: 'Key Applications',
          metaValue: item.description || '',
          image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=300&h=170',
          links: null
        };
      case 'experience':
        return {
          title: item.role,
          subtitle: item.company || 'Enterprise',
          rating: 'EPISODE',
          match: 99,
          duration: item.duration || 'Active',
          metaLabel: 'Tech Shipped',
          metaValue: item.techStack ? item.techStack.join(', ') : item.description ? item.description.slice(0, 80) + '...' : '',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300&h=170',
          links: null
        };
      case 'testimonials':
        return {
          title: item.name,
          subtitle: `${item.designation} at ${item.company}`,
          rating: 'CRITIQUE',
          match: item.rating ? item.rating * 20 : 100,
          duration: '★★★★★',
          metaLabel: 'Review Synopsis',
          metaValue: item.text ? `"${item.text.slice(0, 110)}..."` : '',
          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=300&h=170',
          links: (
            <div className="flex items-center gap-1 mt-1 text-amber-500">
              {[...Array(item.rating || 5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-500" />
              ))}
            </div>
          )
        };
      default:
        return {};
    }
  };

  const details = getCardDetails();

  return (
    <div
      className="relative flex-none w-48 sm:w-60 md:w-72 aspect-video rounded-md overflow-visible cursor-pointer select-none bg-zinc-900 border border-zinc-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onMoreInfo(item, type)}
    >
      {/* Static Base Card (Always visible beneath) */}
      <div className="w-full h-full rounded-md overflow-hidden relative">
        <img
          src={details.image}
          alt={details.title}
          className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-300"
          loading="lazy"
        />
        {/* Subtle Bottom Title Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3">
          <p className="text-white text-xs sm:text-sm font-bold truncate tracking-wide">{details.title}</p>
          <p className="text-red-500 text-[10px] font-semibold truncate tracking-wider mt-0.5">{details.subtitle}</p>
        </div>
      </div>

      {/* Dynamic Hover Card overlay (Expanded on hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 0 }}
            animate={{
              scale: 1.15,
              opacity: 1,
              y: -30,
              transition: { duration: 0.25, ease: 'easeOut' }
            }}
            exit={{
              scale: 0.95,
              opacity: 0,
              y: 0,
              transition: { duration: 0.2, ease: 'easeIn' }
            }}
            className="absolute top-0 left-0 w-full bg-zinc-900 rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-zinc-700 overflow-hidden z-30 flex flex-col pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              onMoreInfo(item, type);
            }}
          >
            {/* Hover Header Image */}
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={details.image}
                alt={details.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex flex-col">
                <p className="text-white text-sm font-black truncate drop-shadow">{details.title}</p>
                <p className="text-red-500 text-[10px] font-bold truncate tracking-wider">{details.subtitle}</p>
              </div>
            </div>

            {/* Hover Body Content */}
            <div className="p-4 flex flex-col bg-zinc-900 text-white">
              {/* Play / Action Buttons */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlay(item, type);
                    }}
                    className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-md"
                    title="Play / Action"
                  >
                    <Play className="w-4.5 h-4.5 fill-black ml-0.5" />
                  </button>
                  <button
                    className="w-8 h-8 rounded-full border border-zinc-500 text-white flex items-center justify-center hover:border-white transition-colors"
                    title="Save to My List"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    className="w-8 h-8 rounded-full border border-zinc-500 text-white flex items-center justify-center hover:border-white transition-colors"
                    title="Rate"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoreInfo(item, type);
                  }}
                  className="w-8 h-8 rounded-full border border-zinc-500 text-white flex items-center justify-center hover:border-white transition-colors ml-auto"
                  title="More Info"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Match info and statistics */}
              <div className="flex items-center gap-2 text-xs font-semibold mb-2 flex-wrap">
                <span className="text-emerald-500">{details.match}% Match</span>
                <span className="border border-zinc-600 px-1.5 py-0.25 text-[10px] rounded text-zinc-300 font-bold bg-zinc-800 tracking-wider">
                  {details.rating}
                </span>
                <span className="text-zinc-400 font-medium">{details.duration}</span>
                <span className="border border-red-500 text-red-500 text-[9px] px-1 rounded scale-90 origin-left font-black tracking-wider uppercase bg-red-950/20">
                  4K
                </span>
              </div>

              {/* Snippet / Expanded Details */}
              <div className="text-[11px] text-zinc-300 leading-relaxed line-clamp-3">
                <span className="text-zinc-500 font-bold mr-1">{details.metaLabel}:</span>
                {details.metaValue}
              </div>

              {/* Social / External Action links */}
              {details.links}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
