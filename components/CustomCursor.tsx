import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        target.closest('a, button, [class*="cursor-pointer"]') !== null ||
        target.tagName.toLowerCase() === 'iframe' // To highlight when hovering over Spotify
      );
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-neonGreen rounded-full pointer-events-none z-[100] transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      />
      {/* Outer Hexagon */}
      <div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99] transition-transform duration-300 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.4 : 1})`,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full animate-spin [animation-duration:8s]"
        >
          <polygon
            points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
            fill={isPointer ? 'rgba(0, 240, 255, 0.15)' : 'none'}
            stroke="#00F0FF"
            strokeWidth="4"
            strokeOpacity="0.6"
            className="transition-all duration-300"
          />
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;
