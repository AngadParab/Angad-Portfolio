import React, { useState, useEffect, useRef } from 'react';

interface Track {
  title: string;
  artist: string;
  duration: number; // in seconds
  spotifyId: string;
}

const TRACKS: Track[] = [
  {
    title: "Starboy.wav",
    artist: "The Weeknd",
    duration: 230,
    spotifyId: "5Z3GHaZ6ec9bsiI5BenrbY"
  },
  {
    title: "Blinding_Lights.wav",
    artist: "The Weeknd",
    duration: 200,
    spotifyId: "0VjIjW4GlUZAMYd2v2hPPb"
  },
  {
    title: "Nightcall.wav",
    artist: "Kavinsky",
    duration: 258,
    spotifyId: "0FE9tLHG7uLRLT08jSC48R"
  }
];

const SpotifyWidget: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [showEmbed, setShowEmbed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const track = TRACKS[currentTrackIndex];

  // Handle ticking progress
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= track.duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickRatio = Math.max(0, Math.min(1, clickX / width));
    setProgress(Math.floor(clickRatio * track.duration));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const cycleVolume = () => {
    setVolume((prev) => {
      if (prev === 75) return 100;
      if (prev === 100) return 0;
      if (prev === 0) return 25;
      if (prev === 25) return 50;
      return 75;
    });
  };

  if (isClosed) {
    // Hidden completely, but provide a floating tiny tray button in standard style so the user can summon it back if needed
    return (
      <button 
        onClick={() => setIsClosed(false)}
        className="fixed bottom-6 right-6 z-50 px-3 py-1.5 bg-[#c0c0c0] border-2 border-white border-r-zinc-700 border-b-zinc-700 font-mono text-xs text-black active:border-zinc-700 active:border-r-white active:border-b-white shadow-md flex items-center gap-1 cursor-pointer select-none"
      >
        📻 Media Player
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none hidden md:block win95-player-container shadow-[6px_6px_0px_rgba(0,0,0,0.3)]">
      {/* Scoped CSS Inject block to avoid style leakage */}
      <style dangerouslySetInnerHTML={{__html: `
        .win95-player-container .win95-card {
          --card-bg: #c0c0c0;
          --card-border-light: #ffffff;
          --card-border-dark: #808080;
          --card-border-darker: #404040;
          --card-titlebar: linear-gradient(90deg, #000080, #1084d0);
          --card-title-text: #ffffff;
          --card-text: #000000;
          --card-display-bg: #000000;
          --card-display-text: #00ff00;

          font-family: "Segoe UI", Tahoma, sans-serif;
          font-size: 1em;
          width: 19em;
          background: var(--card-bg);
          border: 0.0625em solid;
          border-color: var(--card-border-light) var(--card-border-darker)
            var(--card-border-darker) var(--card-border-light);
          box-shadow:
            inset 0.0625em 0.0625em 0 var(--card-border-light),
            inset -0.0625em -0.0625em 0 var(--card-border-dark);
        }

        .win95-player-container .card-titlebar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.25em 0.25em 0.25em 0.5em;
          background: var(--card-titlebar);
          color: var(--card-title-text);
        }

        .win95-player-container .card-title-text {
          font-size: 0.8125em;
          font-weight: 700;
          letter-spacing: 0.01em;
        }

        .win95-player-container .card-controls {
          display: flex;
          gap: 0.125em;
        }

        .win95-player-container .card-btn {
          width: 1.1em;
          height: 1.0em;
          background: var(--card-bg);
          border: 0.0625em solid;
          border-color: var(--card-border-light) var(--card-border-darker)
            var(--card-border-darker) var(--card-border-light);
          cursor: pointer;
          position: relative;
          padding: 0;
          outline: none;
        }

        .win95-player-container .card-btn:active {
          border-color: var(--card-border-darker) var(--card-border-light)
            var(--card-border-light) var(--card-border-darker);
        }

        .win95-player-container .card-btn-min::after {
          content: "";
          position: absolute;
          bottom: 0.125em;
          left: 50%;
          transform: translateX(-50%);
          width: 0.375em;
          height: 0.125em;
          background: var(--card-text);
        }

        .win95-player-container .card-btn-max::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0.4375em;
          height: 0.375em;
          border: 0.0625em solid var(--card-text);
          border-top-width: 0.125em;
          background: transparent;
        }

        .win95-player-container .card-btn-close::before,
        .win95-player-container .card-btn-close::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0.5em;
          height: 0.0625em;
          background: var(--card-text);
        }

        .win95-player-container .card-btn-close::before {
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .win95-player-container .card-btn-close::after {
          transform: translate(-50%, -50%) rotate(-45deg);
        }

        .win95-player-container .card-menubar {
          display: flex;
          gap: 0.125em;
          padding: 0.25em 0.375em;
          border-bottom: 0.0625em solid var(--card-border-dark);
          position: relative;
        }

        .win95-player-container .menu-item {
          font-size: 0.75em;
          padding: 0.125em 0.5em;
          color: var(--card-text);
          cursor: pointer;
        }

        .win95-player-container .menu-item:hover {
          background: #000080;
          color: #ffffff;
        }

        .win95-player-container .card-body {
          padding: 0.75em;
        }

        .win95-player-container .player-display {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5em;
          margin-bottom: 0.5em;
          background: var(--card-display-bg);
          border: 0.0625em solid;
          border-color: var(--card-border-dark) var(--card-border-light)
            var(--card-border-light) var(--card-border-dark);
          box-shadow: inset 0.0625em 0.0625em 0 var(--card-border-darker);
          height: 2.2em;
        }

        .win95-player-container .track-name {
          font-size: 0.75em;
          font-family: monospace;
          color: var(--card-display-text);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 11em;
        }

        .win95-player-container .track-time {
          font-size: 0.7em;
          font-family: monospace;
          color: var(--card-display-text);
        }

        .win95-player-container .player-progress {
          position: relative;
          height: 0.75em;
          margin-bottom: 0.625em;
          background: var(--card-bg);
          border: 0.0625em solid;
          border-color: var(--card-border-dark) var(--card-border-light)
            var(--card-border-light) var(--card-border-dark);
          box-shadow: inset 0.0625em 0.0625em 0 var(--card-border-darker);
          cursor: pointer;
        }

        .win95-player-container .progress-fill {
          height: 100%;
          background: #000080;
        }

        .win95-player-container .progress-thumb {
          position: absolute;
          top: -0.0625em;
          width: 0.5em;
          height: 0.875em;
          background: var(--card-bg);
          border: 0.0625em solid;
          border-color: var(--card-border-light) var(--card-border-darker)
            var(--card-border-darker) var(--card-border-light);
          transform: translateX(-50%);
        }

        .win95-player-container .player-controls {
          display: flex;
          justify-content: center;
          gap: 0.25em;
        }

        .win95-player-container .ctrl-btn {
          width: 2.2em;
          height: 1.6em;
          background: var(--card-bg);
          border: 0.0625em solid;
          border-color: var(--card-border-light) var(--card-border-darker)
            var(--card-border-darker) var(--card-border-light);
          box-shadow:
            inset 0.0625em 0.0625em 0 var(--card-border-light),
            inset -0.0625em -0.0625em 0 var(--card-border-dark);
          cursor: pointer;
          position: relative;
          outline: none;
        }

        .win95-player-container .ctrl-btn:hover {
          background: #d4d4d4;
        }

        .win95-player-container .ctrl-btn:active, 
        .win95-player-container .ctrl-btn.pressed {
          border-color: var(--card-border-darker) var(--card-border-light)
            var(--card-border-light) var(--card-border-darker);
          box-shadow:
            inset 0.0625em 0.0625em 0 var(--card-border-dark),
            inset -0.0625em -0.0625em 0 var(--card-border-light);
        }

        .win95-player-container .ctrl-prev::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 45%;
          border: 0.25em solid transparent;
          border-right: 0.3125em solid var(--card-text);
          transform: translate(-50%, -50%);
        }

        .win95-player-container .ctrl-prev::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 30%;
          width: 0.08em;
          height: 0.45em;
          background: var(--card-text);
          transform: translate(-50%, -50%);
        }

        .win95-player-container .ctrl-play::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 55%;
          border: 0.28em solid transparent;
          border-left: 0.35em solid var(--card-text);
          transform: translate(-50%, -50%);
        }

        .win95-player-container .ctrl-stop::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0.45em;
          height: 0.45em;
          background: var(--card-text);
          transform: translate(-50%, -50%);
        }

        .win95-player-container .ctrl-next::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 55%;
          border: 0.25em solid transparent;
          border-left: 0.3125em solid var(--card-text);
          transform: translate(-50%, -50%);
        }

        .win95-player-container .ctrl-next::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 70%;
          width: 0.08em;
          height: 0.45em;
          background: var(--card-text);
          transform: translate(-50%, -50%);
        }

        .win95-player-container .card-statusbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.2em 0.3em;
          background: var(--card-bg);
          border-top: 0.0625em solid var(--card-border-light);
          box-shadow: inset 0 0.0625em 0 var(--card-border-dark);
        }

        .win95-player-container .status-text {
          font-size: 0.6875em;
          color: var(--card-text);
          padding: 0.125em 0.25em;
          border: 0.0625em solid;
          border-color: var(--card-border-dark) var(--card-border-light)
            var(--card-border-light) var(--card-border-dark);
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .win95-player-container .status-vol {
          font-size: 0.625em;
          padding: 0.125em 0.375em;
          margin-left: 0.25em;
          background: var(--card-bg);
          border: 0.0625em solid;
          border-color: var(--card-border-dark) var(--card-border-light)
            var(--card-border-light) var(--card-border-dark);
          color: var(--card-text);
          cursor: pointer;
        }

        .win95-player-container .status-vol:hover {
          background: #d4d4d4;
        }

        .win95-player-container .win95-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0.5em;
          background: #c0c0c0;
          border: 1px solid;
          border-color: #ffffff #404040 #404040 #ffffff;
          box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
          z-index: 100;
          display: flex;
          flex-direction: column;
          min-width: 8em;
        }

        .win95-player-container .dropdown-item {
          font-size: 0.7em;
          padding: 0.3em 0.8em;
          color: #000000;
          cursor: pointer;
          text-align: left;
        }

        .win95-player-container .dropdown-item:hover {
          background: #000080;
          color: #ffffff;
        }
      `}} />

      {isMinimized ? (
        // Minimized Win95 bottom bar item representation
        <button 
          onClick={() => setIsMinimized(false)}
          className="px-3 py-1.5 bg-[#c0c0c0] border-2 border-white border-r-zinc-700 border-b-zinc-700 font-mono text-xs text-black active:border-zinc-700 active:border-r-white active:border-b-white flex items-center gap-1 cursor-pointer select-none"
        >
          <span>📻</span>
          <span className="font-sans font-bold">Media Player - Stopped</span>
        </button>
      ) : (
        // Full Win95 Styled Media Player Card
        <div className="win95-card">
          {/* Title Bar */}
          <div className="card-titlebar">
            <span className="card-title-text">📻 Media Player</span>
            <div className="card-controls">
              <button 
                onClick={() => setIsMinimized(true)}
                className="card-btn card-btn-min"
                title="Minimize"
              ></button>
              <button 
                onClick={() => setShowEmbed(!showEmbed)}
                className="card-btn card-btn-max"
                title="Toggle Spotify Iframe"
              ></button>
              <button 
                onClick={() => setIsClosed(true)}
                className="card-btn card-btn-close"
                title="Close"
              ></button>
            </div>
          </div>

          {/* Menu Bar */}
          <div className="card-menubar">
            <span onClick={() => setShowMenu(!showMenu)} className="menu-item">File</span>
            <span onClick={handlePlayPause} className="menu-item">{isPlaying ? "Pause" : "Play"}</span>
            <span onClick={() => setShowEmbed(!showEmbed)} className="menu-item">Options</span>

            {showMenu && (
              <div className="win95-dropdown-menu">
                <div onClick={handlePlayPause} className="dropdown-item">
                  {isPlaying ? "⏸️ Pause" : "▶️ Play"}
                </div>
                <div onClick={handleStop} className="dropdown-item">
                  ⏹️ Stop
                </div>
                <div onClick={handleNext} className="dropdown-item">
                  ⏭️ Next Track
                </div>
                <div onClick={handlePrev} className="dropdown-item">
                  ⏮️ Prev Track
                </div>
                <div className="border-t border-zinc-500 my-0.5"></div>
                <div onClick={() => setShowEmbed(!showEmbed)} className="dropdown-item">
                  ⚙️ Spotify Embed
                </div>
                <div onClick={() => setIsClosed(true)} className="dropdown-item">
                  ❌ Exit
                </div>
              </div>
            )}
          </div>

          {/* Card Body */}
          <div className="card-body">
            {/* Visual Screen Display */}
            <div className="player-display">
              <span className="track-name">
                {isPlaying ? `▶ ${track.title}` : `■ ${track.title}`}
              </span>
              <span className="track-time">
                {formatTime(progress)} / {formatTime(track.duration)}
              </span>
            </div>

            {/* Slider Progress Bar */}
            <div 
              ref={progressBarRef}
              onClick={handleProgressClick}
              className="player-progress"
            >
              <div 
                className="progress-fill" 
                style={{ width: `${(progress / track.duration) * 100}%` }}
              ></div>
              <div 
                className="progress-thumb"
                style={{ left: `${(progress / track.duration) * 100}%` }}
              ></div>
            </div>

            {/* Playback Controls */}
            <div className="player-controls">
              <button 
                onClick={handlePrev}
                className="ctrl-btn ctrl-prev"
                title="Previous Track"
              ></button>
              <button 
                onClick={handlePlayPause}
                className={`ctrl-btn ctrl-play ${isPlaying ? 'pressed' : ''}`}
                title={isPlaying ? "Pause" : "Play"}
              ></button>
              <button 
                onClick={handleStop}
                className="ctrl-btn ctrl-stop"
                title="Stop"
              ></button>
              <button 
                onClick={handleNext}
                className="ctrl-btn ctrl-next"
                title="Next Track"
              ></button>
            </div>

            {/* Dynamic Iframe Embed inside body if opened */}
            {showEmbed && (
              <div className="mt-3 pt-3 border-t border-zinc-500 animate-fade-in">
                <iframe
                  style={{ borderRadius: '4px', border: '1px solid #808080' }}
                  src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allowFullScreen={false}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div className="card-statusbar">
            <span className="status-text">
              {isPlaying ? `Playing Starboy coordinate...` : `Ready / Stopped`}
            </span>
            <span 
              onClick={cycleVolume}
              className="status-vol"
              title="Click to cycle volume levels"
            >
              Vol: {volume}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyWidget;
