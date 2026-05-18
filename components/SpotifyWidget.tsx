import React from 'react';

const SpotifyWidget: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[300px] shadow-2xl shadow-black/50 rounded-xl overflow-hidden opacity-50 hover:opacity-100 transition-all duration-300 hidden md:block">
      <iframe
        style={{ borderRadius: '12px' }}
        src="https://open.spotify.com/embed/track/5Z3GHaZ6ec9bsiI5BenrbY?utm_source=generator&theme=0"
        width="100%"
        height="80"
        frameBorder="0"
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default SpotifyWidget;
