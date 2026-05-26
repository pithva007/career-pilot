import React from 'react';
import { Play, Info, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ personal, onPlay, onMoreInfo }) {
  const [isMuted, setIsMuted] = React.useState(true);

  if (!personal) return null;

  return (
    <div className="relative w-full h-[65vh] md:h-[85vh] lg:h-[95vh] bg-black overflow-hidden select-none">
      {/* Background Cinematic Visual with rich overlay gradients */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1920&h=1080"
          alt="Cinematic Code Backdrop"
          className="w-full h-full object-cover object-center scale-105 brightness-[0.45] saturate-[0.8] contrast-[1.1] transition-transform duration-1000"
        />
        {/* Widescreen Vignette & Linear Fade to Dark Background */}
        <div className="absolute inset-0 bg-radial-gradient" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent z-10" />
      </div>

      {/* Main Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-12 lg:p-16 z-20 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Top Widescreen Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-red-600 text-white font-extrabold text-[10px] md:text-xs px-2 py-0.5 rounded shadow tracking-widest uppercase">
              Devflix Original
            </span>
            <span className="text-zinc-400 text-xs font-semibold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500 fill-red-500/20" /> Shipped & Secure
            </span>
          </div>

          {/* Widescreen Dynamic Large Title */}
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-lg select-text leading-tight">
            {personal.name}
          </h1>

          {/* Title Genre / Subtitle */}
          <p className="text-red-500 text-sm sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wide mt-2 md:mt-3 drop-shadow-md select-text">
            {personal.title}
          </p>

          {/* Meta Statistics Pills */}
          <div className="flex items-center gap-3 mt-3 mb-4 md:mb-6 text-xs text-zinc-300 font-semibold flex-wrap">
            <span className="text-emerald-500 font-bold">99% Match</span>
            <span className="border border-zinc-500 px-1.5 py-0.25 text-[10px] rounded text-zinc-300 font-bold bg-zinc-900 tracking-wider">
              PG-13
            </span>
            <span>2026 Edition</span>
            <span className="border border-zinc-500 px-1 rounded text-[9px] text-zinc-400 scale-95 font-bold uppercase tracking-wider bg-zinc-900">
              Ultra HD 4K
            </span>
            <span className="text-zinc-400">Dolby Atmos</span>
          </div>

          {/* Synopsis Paragraph */}
          <p className="text-zinc-300 text-xs sm:text-sm md:text-base lg:text-lg select-text leading-relaxed font-medium drop-shadow-md mb-6 md:mb-8 line-clamp-3 md:line-clamp-none">
            {personal.bio}
          </p>

          {/* Core Action Call-To-Buttons */}
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPlay(personal, 'personal')}
              className="flex items-center justify-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded bg-white text-black font-extrabold text-sm sm:text-base hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer"
            >
              <Play className="w-5 h-5 fill-black" />
              Play Resume
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onMoreInfo(personal, 'personal')}
              className="flex items-center justify-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded bg-zinc-500/30 hover:bg-zinc-500/40 text-white border border-zinc-500/20 font-extrabold text-sm sm:text-base transition-colors shadow-lg cursor-pointer backdrop-blur-sm"
            >
              <Info className="w-5 h-5 text-white" />
              More Info
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Audio Toggle and Age Badge on bottom right */}
      <div className="absolute right-0 bottom-[20%] flex items-center gap-4 z-20">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 rounded-full border border-zinc-600 text-zinc-300 flex items-center justify-center bg-zinc-950/45 hover:text-white hover:border-white transition-colors cursor-pointer mr-0 backdrop-blur-sm"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <span className="bg-zinc-800/80 text-zinc-300 border-l-[3px] border-zinc-500 pl-3 pr-8 py-1.5 text-xs font-bold tracking-wider backdrop-blur-sm shadow-md">
          TV-MA
        </span>
      </div>
    </div>
  );
}
