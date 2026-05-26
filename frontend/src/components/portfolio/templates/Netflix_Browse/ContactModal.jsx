import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, Maximize, FileText, Mail, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, personal, socials }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setProgress(0);
      setIsPlaying(true);

      // Simulate realistic cinematic buffer
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100;
          }
          // Increments at variable speeds mimicking buffering
          const increment = Math.floor(Math.random() * 15) + 5;
          return Math.min(prev + increment, 100);
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between select-none">
        
        {/* TOP STATUS BAR */}
        <div className="p-4 md:p-8 flex items-center justify-between text-white z-20">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer group"
          >
            <RotateCcw className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
            <span className="font-extrabold tracking-wider uppercase text-sm">Exit Player</span>
          </button>
          
          <div className="text-center hidden md:block">
            <span className="text-zinc-500 font-extrabold uppercase tracking-widest text-[10px] block">Now Streaming</span>
            <span className="text-white font-black text-sm tracking-wide">{personal?.name} — The Professional Portfolio</span>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-xs text-red-500 font-extrabold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-red-500/20" /> ULTRA HD 4K
          </div>
        </div>

        {/* CENTER PLAYER SCREEN */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative">
          {isLoading ? (
            /* buffering display */
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-zinc-800 border-t-red-600 animate-spin" />
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Buffering Stream {progress}%</p>
            </div>
          ) : (
            /* Stream Dashboard panel */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-10 backdrop-blur-md text-white text-center shadow-2xl flex flex-col items-center select-text"
            >
              <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-2">Select Your Streaming Channel</h2>
              <p className="text-zinc-400 text-xs md:text-sm mb-8 leading-relaxed max-w-md">
                You've successfully loaded the developer's resume and contact gateway. Select a channel below to initiate communication.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                {/* PDF stream button */}
                {personal?.resumeUrl && (
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={personal.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 border border-zinc-700 rounded-xl transition-all shadow-md group text-center cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-500 mb-3 group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="font-extrabold tracking-wide text-sm block">Stream Resume (PDF)</span>
                    <span className="text-[10px] text-zinc-500 mt-1 font-semibold">1080p HD • Instant Download</span>
                  </motion.a>
                )}

                {/* Email stream button */}
                {personal?.email && (
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={`mailto:${personal.email}`}
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 border border-zinc-700 rounded-xl transition-all shadow-md group text-center cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-500 mb-3 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <span className="font-extrabold tracking-wide text-sm block">Direct Broadcast (Email)</span>
                    <span className="text-[10px] text-zinc-500 mt-1 font-semibold">Uptimes • Direct Mailbox</span>
                  </motion.a>
                )}
              </div>

              {/* Extras & Social Handles */}
              {socials && (
                <div className="border-t border-zinc-800/80 pt-6 w-full flex flex-col items-center">
                  <span className="text-zinc-500 font-extrabold uppercase tracking-widest text-[9px] mb-3 block">Trailers & Extras</span>
                  <div className="flex items-center gap-3">
                    {socials.github && (
                      <a
                        href={socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-xs font-bold text-zinc-200 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Github className="w-4 h-4" /> GitHub
                      </a>
                    )}
                    {socials.linkedin && (
                      <a
                        href={socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-xs font-bold text-zinc-200 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </a>
                    )}
                    {socials.twitter && (
                      <a
                        href={socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-xs font-bold text-zinc-200 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Twitter className="w-4 h-4" /> Twitter
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* BOTTOM VIDEO PLAYER CONTROLLERS */}
        <div className="p-4 md:p-8 flex flex-col gap-4 text-white z-20">
          {/* Custom video timeline red-scrubber line */}
          <div className="relative w-full h-1 bg-zinc-700 rounded-full cursor-pointer overflow-visible group">
            <div
              className="absolute left-0 top-0 bottom-0 bg-red-600 rounded-full transition-all duration-300 relative"
              style={{ width: isLoading ? `${progress}%` : isPlaying ? '55%' : '55%' }}
            >
              {/* Scrub circle on hover */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-600 scale-0 group-hover:scale-100 transition-transform" />
            </div>
          </div>

          <div className="flex items-center justify-between text-zinc-300">
            {/* Play controls */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
                disabled={isLoading}
              >
                {isPlaying && !isLoading ? <Pause className="w-6 h-6 fill-zinc-300 hover:fill-white" /> : <Play className="w-6 h-6 fill-zinc-300 hover:fill-white" />}
              </button>
              <button className="hover:text-white transition-colors cursor-pointer" title="Rewind 10s">
                <RotateCcw className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-zinc-400" />
                <div className="w-16 h-1 bg-zinc-600 rounded-full">
                  <div className="w-3/4 h-full bg-white rounded-full" />
                </div>
              </div>
              
              {/* Elapsed time mapping to resume reading time */}
              <span className="text-xs font-semibold select-none font-mono">
                {isLoading ? '0:00' : isPlaying ? '1:24' : '1:24'} / 2:30
              </span>
            </div>

            {/* Title / Fullscreen */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-extrabold uppercase text-zinc-500 tracking-wider hidden sm:inline">English [CC]</span>
              <button className="hover:text-white transition-colors cursor-pointer" title="Fullscreen">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </AnimatePresence>
  );
}
