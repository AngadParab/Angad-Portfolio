import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
  showCursor?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  delay = 20, 
  className = '', 
  showCursor = true 
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className={className}>
      {currentText}
      {showCursor && currentIndex < text.length && (
        <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle" />
      )}
      {showCursor && currentIndex >= text.length && (
        <span className="inline-block w-2 h-4 bg-accent ml-1 animate-caret-blink align-middle" />
      )}
    </span>
  );
};

export default Typewriter;
