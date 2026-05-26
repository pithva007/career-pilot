import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './Card';

export default function Row({ title, items, type, onMoreInfo, onPlay }) {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll position to dynamically show/hide navigation arrows
  const checkScrollPosition = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 5);
      // scrollWidth - scrollLeft is close to clientWidth when at the end
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      
      // Also listen to window resize as it affects width calculations
      window.addEventListener('resize', checkScrollPosition);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [items]);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { clientWidth, scrollLeft } = rowRef.current;
      // Scroll by 75% of the client width for a standard Netflix carousel shift
      const scrollAmount = clientWidth * 0.75;
      const targetScroll = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;

      rowRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="relative mb-8 md:mb-12 group/row px-4 md:px-12">
      {/* Row Header Title */}
      <h2 className="text-white text-sm md:text-xl font-bold mb-3 md:mb-4 inline-block hover:text-emerald-400 transition-colors cursor-pointer tracking-wide uppercase">
        {title}
        <span className="text-[10px] text-zinc-500 ml-2 font-normal lowercase tracking-normal group-hover/row:text-emerald-400/80 transition-colors">
          Explore All &gt;
        </span>
      </h2>

      {/* Slide Container Wrapper */}
      <div className="relative">
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-0 bottom-0 w-10 md:w-12 bg-black/60 hover:bg-black/80 hover:scale-y-105 transition-all text-white flex items-center justify-center z-20 cursor-pointer opacity-0 group-hover/row:opacity-100 rounded-r border-r border-zinc-800"
            style={{ left: '-12px' }}
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 hover:scale-125 transition-transform" />
          </button>
        )}

        {/* Horizontal Card Row Container */}
        <div
          ref={rowRef}
          className="flex items-center gap-2 md:gap-4 overflow-x-auto scroll-smooth py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <Card
              key={item.id}
              item={item}
              type={type}
              onMoreInfo={onMoreInfo}
              onPlay={onPlay}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-0 bottom-0 w-10 md:w-12 bg-black/60 hover:bg-black/80 hover:scale-y-105 transition-all text-white flex items-center justify-center z-20 cursor-pointer opacity-0 group-hover/row:opacity-100 rounded-l border-l border-zinc-800"
            style={{ right: '-12px' }}
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 hover:scale-125 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
