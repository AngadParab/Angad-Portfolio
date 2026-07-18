import React, { useRef, useState, useEffect } from 'react';
import Terminal, { TerminalRef } from './components/Terminal';
import StandardPortfolio from './components/StandardPortfolio';
import Badge from './components/Badge';
import BackgroundNetwork from './components/BackgroundNetwork';
import SystemHUD from './components/SystemHUD';
import SpotifyWidget from './components/SpotifyWidget';
import { SOCIAL_LINKS } from './constants';
import { Github, Linkedin, Facebook, Instagram } from 'lucide-react';

const IconMap: Record<string, any> = {
  Github,
  Linkedin,
  Facebook,
  Instagram
};

const App: React.FC = () => {
  const terminalRef = useRef<TerminalRef>(null);
  const [viewMode, setViewMode] = useState<'terminal' | 'standard'>('standard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (viewMode === 'terminal') {
      document.body.classList.add('terminal-mode');
    } else {
      document.body.classList.remove('terminal-mode');
    }
  }, [viewMode]);

  const handleNavClick = (cmd: string, sectionId: string) => {
    if (viewMode === 'terminal') {
      terminalRef.current?.executeCommand(cmd);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`h-screen w-full flex flex-col md:flex-row bg-pageBg relative ${viewMode === 'terminal' ? 'overflow-hidden' : 'overflow-x-hidden overflow-y-auto'}`}>
      {viewMode === 'terminal' && <BackgroundNetwork />}
      {viewMode === 'terminal' && <SystemHUD />}
      <SpotifyWidget />
      {/* Top Nav (Fixed on Desktop) */}
      {viewMode === 'terminal' && (
        <nav className="fixed top-0 right-0 p-6 z-50 hidden md:flex gap-8 items-center bg-pageBg/80 backdrop-blur-sm rounded-bl-xl border-b border-l border-divider">
          {[
            { id: '1', label: 'About', cmd: 'whoami', sectionId: 'about' },
            { id: '2', label: 'Education', cmd: 'cd education', sectionId: 'education-workshops' },
            { id: '3', label: 'Work', cmd: 'ls projects', sectionId: 'work' },
            { id: '4', label: 'Contact Me', cmd: 'ping', sectionId: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.cmd, item.sectionId)}
              className="font-mono text-sm text-gray-400 hover:text-accent group transition-colors relative"
            >
              <span className="text-mustard mr-1">[{item.id}]</span>
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-mint group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </nav>
      )}

      {/* Mobile Nav (Bottom Bar - Simplified) */}
      {viewMode === 'terminal' && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-pageBg/90 backdrop-blur border-t border-divider z-50 flex justify-around p-4 items-center">
          {[
            { id: '1', label: 'Abt', cmd: 'whoami', sectionId: 'about' },
            { id: '2', label: 'Edu', cmd: 'cd education', sectionId: 'education-workshops' },
            { id: '3', label: 'Wrk', cmd: 'ls projects', sectionId: 'work' },
            { id: '4', label: 'Msg', cmd: 'ping', sectionId: 'contact' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.cmd, item.sectionId)}
              className="flex flex-col items-center text-[10px] font-mono text-gray-400 active:text-accent"
            >
              <span className="text-mustard text-xs">[{item.id}]</span>
              {item.label}
            </button>
          ))}
        </nav>
      )}

      {/* Left Sidebar: Socials */}
      {viewMode === 'terminal' && (
        <aside className="hidden lg:flex w-20 flex-col items-center justify-center gap-6 border-r border-divider/10 relative z-20">
          <div className="flex flex-col items-center gap-6">
            {SOCIAL_LINKS.map((link) => {
              const Icon = IconMap[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-socialBg flex items-center justify-center text-white transition-all duration-300 hover:text-accent hover:shadow-[0_0_10px_rgba(129,140,248,0.5)] group"
                  aria-label={link.name}
                >
                  <Icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
            <div className="w-[1px] h-24 bg-divider mt-4"></div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 relative z-10 w-full ${viewMode === 'terminal' ? 'mt-12 md:mt-0 mb-16 md:mb-0' : 'mt-0 mb-0'}`}>
        {viewMode === 'terminal' ? (
          <div className="flex flex-row items-center justify-center gap-12 w-full max-w-7xl mx-auto">
            <Badge />
            <Terminal ref={terminalRef} onClose={() => setViewMode('standard')} />
          </div>
        ) : (
          <StandardPortfolio onSwitchToTerminal={() => setViewMode('terminal')} />
        )}
      </main>

      {/* Right Sidebar: Email */}
      {viewMode === 'terminal' && (
        <aside className="hidden lg:flex w-16 flex-col items-center justify-center border-l border-divider/10 relative z-20">
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <div className="w-[1px] h-32 bg-divider"></div>
            <a
              href="mailto:Parabangad123@gmail.com"
              className="writing-mode-vertical rotate-180 text-xs font-mono text-accent/80 tracking-widest hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all whitespace-nowrap"
              style={{ writingMode: 'vertical-rl' }}
            >
              Parabangad123@gmail.com
            </a>
            <div className="w-[1px] h-32 bg-divider"></div>
          </div>
        </aside>
      )}

      {/* Footer (Fixed relative to layout for desktop, adjusted for mobile) */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-[10px] md:text-xs text-gray-600 font-mono pointer-events-none hidden md:block">
        Created and Designed by Angad Parab &copy; {new Date().getFullYear()}
      </footer>

      {/* Full Screen Retro Terminal Preloader Overlay */}
      <div 
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0d0d] transition-all duration-700 ease-in-out ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes blinkCursor {
            50% { border-right-color: transparent; }
          }
          @keyframes typeAndDelete {
            0%, 10% { width: 0; }
            45%, 55% { width: 6.2em; }
            90%, 100% { width: 0; }
          }
          .win95-loader-container .terminal-loader {
            border: 0.1em solid #333;
            background-color: #1a1a1a;
            color: #0f0;
            font-family: "Courier New", Courier, monospace;
            font-size: 1.1em;
            padding: 1.8em 1.2em 1.2em 1.2em;
            width: 14em;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
            border-radius: 4px;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
          }
          .win95-loader-container .terminal-header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1.6em;
            background-color: #333;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            padding: 0 0.5em;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .win95-loader-container .terminal-controls {
            display: flex;
            gap: 0.3em;
          }
          .win95-loader-container .control {
            width: 0.55em;
            height: 0.55em;
            border-radius: 50%;
            background-color: #777;
          }
          .win95-loader-container .control.close { background-color: #e33; }
          .win95-loader-container .control.minimize { background-color: #ee0; }
          .win95-loader-container .control.maximize { background-color: #0b0; }
          .win95-loader-container .terminal-title {
            font-size: 0.75em;
            color: #eee;
            font-weight: bold;
            font-family: sans-serif;
          }
          .win95-loader-container .text {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            border-right: 0.2em solid #0f0;
            animation:
              typeAndDelete 3s steps(11) infinite,
              blinkCursor 0.5s step-end infinite alternate;
            margin-top: 0.8em;
          }
        `}} />
        <div className="win95-loader-container">
          <div className="terminal-loader">
            <div className="terminal-header">
              <div className="terminal-title">Status</div>
              <div className="terminal-controls">
                <div className="control close"></div>
                <div className="control minimize"></div>
                <div className="control maximize"></div>
              </div>
            </div>
            <div className="text font-mono text-sm">Loading...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
