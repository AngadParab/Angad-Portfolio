import React, { useRef } from 'react';
import Terminal, { TerminalRef } from './components/Terminal';
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

  const handleNavClick = (cmd: string) => {
    terminalRef.current?.executeCommand(cmd);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#0B0F19] relative cursor-none">
      <CustomCursor />
      <BackgroundNetwork />
      <SystemHUD />
      <SpotifyWidget />
      <Badge />
      {/* Top Nav (Absolute on Desktop) */}
      <nav className="absolute top-0 right-0 p-6 z-50 hidden md:flex gap-8">
        {[
          { id: '1', label: 'About', cmd: 'open aboutMe' },
          { id: '2', label: 'Experience', cmd: 'open experience' },
          { id: '3', label: 'Work', cmd: 'open work' },
          { id: '4', label: 'Contact Me', cmd: 'run contactMe' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.cmd)}
            className="font-mono text-sm text-gray-400 hover:text-neonGreen group transition-colors relative"
          >
            <span className="text-mustard mr-1">[{item.id}]</span>
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-mint group-hover:w-full transition-all duration-300"></span>
          </button>
        ))}
      </nav>

      {/* Mobile Nav (Bottom Bar - Simplified) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-pageBg/90 backdrop-blur border-t border-divider z-50 flex justify-around p-4">
        {[
          { id: '1', label: 'Abt', cmd: 'open aboutMe' },
          { id: '2', label: 'Exp', cmd: 'open experience' },
          { id: '3', label: 'Wrk', cmd: 'open work' },
          { id: '4', label: 'Msg', cmd: 'run contactMe' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.cmd)}
            className="flex flex-col items-center text-[10px] font-mono text-gray-400 active:text-neonGreen"
          >
            <span className="text-mustard text-xs">[{item.id}]</span>
            {item.label}
          </button>
        ))}
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
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 relative z-10">
        <Terminal ref={terminalRef} />
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
