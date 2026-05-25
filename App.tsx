import React, { useRef, useState } from 'react';
import Terminal, { TerminalRef } from './components/Terminal';
import StandardPortfolio from './components/StandardPortfolio';
import Badge from './components/Badge';
import BackgroundNetwork from './components/BackgroundNetwork';
import SystemHUD from './components/SystemHUD';
import SpotifyWidget from './components/SpotifyWidget';
import CustomCursor from './components/CustomCursor';
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
  const [viewMode, setViewMode] = useState<'terminal' | 'standard'>('terminal');

  const handleNavClick = (cmd: string, sectionId: string) => {
    if (viewMode === 'terminal') {
      terminalRef.current?.executeCommand(cmd);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`h-screen w-full flex flex-col md:flex-row bg-pageBg relative cursor-none ${viewMode === 'terminal' ? 'overflow-hidden' : 'overflow-x-hidden overflow-y-auto'}`}>
      <CustomCursor />
      <BackgroundNetwork />
      <SystemHUD />
      <SpotifyWidget />
      <Badge />
      {/* Top Nav (Fixed on Desktop) */}
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
            className="font-mono text-sm text-gray-400 hover:text-neonGreen group transition-colors relative"
          >
            <span className="text-mustard mr-1">[{item.id}]</span>
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-mint group-hover:w-full transition-all duration-300"></span>
          </button>
        ))}
        {/* Toggle Mode Button */}
        <button
          onClick={() => setViewMode(prev => prev === 'terminal' ? 'standard' : 'terminal')}
          className="ml-4 px-3 py-1 border border-termBorder text-xs text-gray-400 hover:text-white hover:border-white rounded font-mono transition-colors"
        >
          {viewMode === 'terminal' ? 'Standard View' : 'Terminal View'}
        </button>
      </nav>

      {/* Mobile Nav (Bottom Bar - Simplified) */}
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
            className="flex flex-col items-center text-[10px] font-mono text-gray-400 active:text-neonGreen"
          >
            <span className="text-mustard text-xs">[{item.id}]</span>
            {item.label}
          </button>
        ))}
        <button
          onClick={() => setViewMode(prev => prev === 'terminal' ? 'standard' : 'terminal')}
          className="flex flex-col items-center text-[10px] font-mono text-mint"
        >
          <span className="text-mustard text-xs">[T]</span>
          Toggle
        </button>
      </nav>

      {/* Left Sidebar: Socials */}
      <aside className="hidden md:flex w-20 flex-col items-center justify-center gap-6 border-r border-divider/10 relative z-20">
        <div className="flex flex-col items-center gap-6">
          {SOCIAL_LINKS.map((link) => {
            const Icon = IconMap[link.icon];
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-socialBg flex items-center justify-center text-white transition-all duration-300 hover:text-neonGreen hover:shadow-[0_0_10px_rgba(158,240,106,0.5)] group"
                aria-label={link.name}
              >
                <Icon size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            );
          })}
          <div className="w-[1px] h-24 bg-divider mt-4"></div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 relative z-10 w-full mt-12 md:mt-0 mb-16 md:mb-0">
        {viewMode === 'terminal' ? (
          <Terminal ref={terminalRef} onClose={() => setViewMode('standard')} />
        ) : (
          <StandardPortfolio />
        )}
      </main>

      {/* Right Sidebar: Email */}
      <aside className="hidden md:flex w-16 flex-col items-center justify-center border-l border-divider/10 relative z-20">
        <div className="h-full flex flex-col items-center justify-center gap-4">
          <div className="w-[1px] h-32 bg-divider"></div>
          <a
            href="mailto:Parabangad123@gmail.com"
            className="writing-mode-vertical rotate-180 text-xs font-mono text-neonGreen/80 tracking-widest hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all whitespace-nowrap"
            style={{ writingMode: 'vertical-rl' }}
          >
            Parabangad123@gmail.com
          </a>
          <div className="w-[1px] h-32 bg-divider"></div>
        </div>
      </aside>

      {/* Footer (Fixed relative to layout for desktop, adjusted for mobile) */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-[10px] md:text-xs text-gray-600 font-mono pointer-events-none hidden md:block">
        Created and Designed by Angad Parab &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
