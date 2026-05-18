import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { TerminalLine, Project, Experience } from '../types';
import { PROJECTS, EXPERIENCE, WELCOME_MSG } from '../constants';
import SnakeGame from './SnakeGame';
import Badge from './Badge';
import { Send, Terminal as TermIcon, X, Plus } from 'lucide-react';

// Helper to safely create HTML from strings
const FormattedText = ({ text }: { text: string }) => {
  return (
    <span dangerouslySetInnerHTML={{ __html: text }} />
  );
};

export interface TerminalRef {
  executeCommand: (cmd: string) => void;
}

const Terminal = forwardRef<TerminalRef, {}>((props, ref) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<TerminalLine[]>([
    { id: 'init', type: 'component', content: WELCOME_MSG }
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isGameActive, setIsGameActive] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [output, isGameActive]);

  // Focus input on click anywhere in terminal
  const handleTerminalClick = () => {
    // Don't focus if user is selecting text
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  };

  // Execute a command
  const processCommand = async (cmdRaw: string) => {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    // Add to history
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add User Input Line
    const inputLine: TerminalLine = {
      id: Date.now().toString() + '-input',
      type: 'input',
      content: cmd
    };

    setOutput(prev => [...prev, inputLine]);
    setInput('');

    // Command Logic
    const command = cmd.toLowerCase();
    let response: TerminalLine | null = null;

    const createResponse = (content: React.ReactNode): TerminalLine => ({
      id: Date.now().toString() + '-resp',
      type: 'output',
      content
    });

    // Map number shortcuts to full commands
    const normalizedCmd =
      command === '1' || command === '[1]' ? 'open aboutme' :
        command === '2' || command === '[2]' ? 'open experience' :
          command === '3' || command === '[3]' ? 'open work' :
            command === '4' || command === '[4]' ? 'cat skills.txt' :
              command === '5' || command === '[5]' ? 'run contactme' :
                command === '6' || command === '[6]' ? 'run snakegame' :
                  command;

    if (normalizedCmd.includes('open aboutme')) {
      response = createResponse(
        <div className="max-w-2xl space-y-2 animate-fade-in">
          <h3 className="text-mustard font-bold text-lg">User: Angad Parab</h3>
          <div className="space-y-4">
            <p className="text-xl text-white font-bold tracking-wide">
              I don't limit myself to a single tech stack or discipline.
            </p>
            <p className="text-gray-300 leading-relaxed">
              To me, technology is just a toolkit. Whether a project requires writing scalable backend code, soldering custom hardware, or designing an intuitive UI , I will figure out exactly what's needed to solve the problem.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I pride myself on being a <span className="text-neonGreen">Jack of all trades, master of some</span>. I bridge the gaps between different disciplines to build things that actually work.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm border-t border-dashed border-divider pt-4">
            <div>
              <span className="text-gray-500">Mindset:</span> <span className="text-neonGreen">Always Learning</span>
            </div>
            <div>
              <span className="text-gray-500">Status:</span> <span className="text-pixelPink animate-pulse">● Building something new</span>
            </div>
          </div>
        </div>
      );
    } else if (normalizedCmd.includes('cat skills.txt') || normalizedCmd.includes('open skills')) {
      response = createResponse(
        <div className="space-y-6 animate-fade-in font-mono max-w-3xl">
          <h3 className="text-mustard font-bold text-lg mb-4">Skill Matrix_</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Software Group */}
            <div className="space-y-3">
              <div className="text-neonGreen border-b border-neonGreen/30 pb-1 mb-3">Software & Code</div>
              <div className="flex justify-between items-center"><span className="text-gray-300">JavaScript/TypeScript</span> <span className="text-pixelPink">[██████████]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-300">React & Next.js</span> <span className="text-pixelPink">[████████░░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-300">Node.js & Python</span> <span className="text-pixelPink">[███████░░░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-300">C++ / Low-level</span> <span className="text-pixelPink">[█████░░░░░]</span></div>
            </div>

            {/* Hardware Group */}
            <div className="space-y-3">
              <div className="text-neonGreen border-b border-neonGreen/30 pb-1 mb-3">Hardware & Tools</div>
              <div className="flex justify-between items-center"><span className="text-gray-300">Arduino / ESP32</span> <span className="text-pixelPink">[████████░░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-300">Raspberry Pi</span> <span className="text-pixelPink">[███████░░░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-300">Circuit Design</span> <span className="text-pixelPink">[█████░░░░░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-300">Soldering</span> <span className="text-pixelPink">[█████████░]</span></div>
            </div>

            {/* Design Group */}
            <div className="space-y-3 md:col-span-2">
              <div className="text-neonGreen border-b border-neonGreen/30 pb-1 mb-3">Design & Media</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex justify-between items-center"><span className="text-gray-300">Figma / UI</span> <span className="text-pixelPink">[█████████░]</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-300">Photoshop</span> <span className="text-pixelPink">[███████░░░]</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-300">Premiere Pro</span> <span className="text-pixelPink">[██████░░░░]</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-300">3D Modeling</span> <span className="text-pixelPink">[████░░░░░░]</span></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (normalizedCmd.includes('open experience')) {
      response = createResponse(
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-mustard font-bold text-lg mb-4">Career History_</h3>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="border-l-2 border-termBorder pl-4 hover:border-mustard transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <span className="text-neonGreen font-bold text-lg">{exp.role}</span>
                <span className="text-gray-500 text-sm font-mono">{exp.period}</span>
              </div>
              <div className="text-pixelPink text-sm mb-2">{exp.company}</div>
              <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      );
    } else if (normalizedCmd.includes('open work')) {
      response = createResponse(
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-mustard font-bold text-lg mb-4">Project Repositories_</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((proj, i) => (
              <div key={i} className="group bg-pageBg/50 border border-divider hover:border-mint rounded overflow-hidden transition-all hover:shadow-term-glow hover:-translate-y-1">
                <div className="h-32 bg-gray-800 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-pageBg to-transparent z-10"></div>
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h4 className="text-neonGreen font-bold mb-1">{proj.title}</h4>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {proj.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-termBorder/30 text-gray-300 rounded">{tag}</span>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2">{proj.description}</p>
                  <a href={proj.link} className="text-mustard text-xs hover:underline cursor-pointer decoration-mustard underline-offset-2">
                    &gt; View Source
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (normalizedCmd.includes('run contactme')) {
      response = createResponse(
        <div className="max-w-lg animate-fade-in">
          <h3 className="text-mustard font-bold text-lg mb-2">Initialize Communication_</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            setOutput(prev => [...prev, {
              id: Date.now().toString(),
              type: 'output',
              content: <span className="text-mint">Message packet sent successfully. Awaiting handshake...</span>
            }]);
          }} className="space-y-3 border border-divider p-4 rounded bg-pageBg/30">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 uppercase">Identity</label>
              <input type="text" required className="bg-transparent border-b border-gray-600 focus:border-neonGreen outline-none text-white py-1 font-mono text-sm" placeholder="Enter your name" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 uppercase">Signal</label>
              <input type="email" required className="bg-transparent border-b border-gray-600 focus:border-neonGreen outline-none text-white py-1 font-mono text-sm" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 uppercase">Payload</label>
              <textarea required rows={3} className="bg-transparent border-b border-gray-600 focus:border-neonGreen outline-none text-white py-1 font-mono text-sm resize-none" placeholder="Type your message..."></textarea>
            </div>
            <button type="submit" className="mt-2 bg-termBorder hover:bg-pixelPink text-white text-xs px-4 py-2 rounded transition-colors flex items-center gap-2 w-fit">
              <Send size={12} /> TRANSMIT
            </button>
          </form>
        </div>
      );
    } else if (normalizedCmd.includes('run snakegame')) {
      setIsGameActive(true);
      response = createResponse(
        <SnakeGame onClose={() => {
          setIsGameActive(false);
          setOutput(prev => [...prev, { id: Date.now().toString(), type: 'output', content: <span className="text-yellow-500">Game session terminated.</span> }]);
        }} />
      );
    } else if (normalizedCmd === 'clear') {
      setOutput([]);
      return;
    } else if (normalizedCmd === 'help') {
      response = createResponse(
        <div className="text-gray-400 text-sm">
          <div>Available commands:</div>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><span className="text-mustard">open aboutMe</span> - Personal info</li>
            <li><span className="text-mustard">open experience</span> - Work history</li>
            <li><span className="text-mustard">open work</span> - Projects</li>
            <li><span className="text-mustard">run contactMe</span> - Email form</li>
            <li><span className="text-mustard">run snakeGame</span> - Play game</li>
            <li><span className="text-mustard">clear</span> - Clear terminal</li>
          </ul>
        </div>
      );
    } else {
      response = createResponse(
        <span className="text-red-400">Command not found: {cmd}. Type 'help' for a list of commands.</span>
      );
    }

    if (response) {
      // Simulate slight delay for "processing" feel? No, instant is snappier for web.
      setOutput(prev => [...prev, response!]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < history.length) {
          setHistoryIndex(newIndex);
          setInput(history[history.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Expose method to parent
  useImperativeHandle(ref, () => ({
    executeCommand: (cmd: string) => {
      // Only execute if game is not active to avoid confusion
      if (!isGameActive) {
        processCommand(cmd);
      }
    }
  }));

  return (
    <div
      className="relative w-full max-w-5xl mx-auto h-[80vh] md:h-[750px] flex flex-col rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-termBorder/50"
      onClick={handleTerminalClick}
    >
      {/* Terminal Title Bar */}
      <div className="bg-termHeader h-8 md:h-10 flex items-center px-4 flex-shrink-0 border-b border-termBorder relative">
        <div className="flex gap-2 items-center absolute left-4">
          <X size={14} className="text-white/70 cursor-pointer hover:text-white" />
          <Plus size={14} className="text-white/70 cursor-pointer hover:text-white" />
        </div>
        <div className="mx-auto text-xs md:text-sm font-mono text-white/90 flex items-center gap-2 select-none">
          <TermIcon size={12} />
          <span>angad@parab:~</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 bg-gradient-to-b from-termBgStart/80 to-termBgEnd/80 backdrop-blur-md p-6 md:p-8 lg:p-10 overflow-y-auto font-mono text-base md:text-lg relative" id="terminal-body">
        {/* Optional CRT Scanline Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>

        <div className="relative z-0 min-h-full pb-10">
          {/* Render Output */}
          {output.map((line) => (
            <div key={line.id} className="mb-3 break-words">
              {line.type === 'input' ? (
                <div className="flex flex-wrap gap-2 text-gray-400">
                  <span className="text-neonGreen">angad@parab:~$</span>
                  <span className="text-white">{line.content}</span>
                </div>
              ) : (
                <div className="text-neonGreen/90 leading-relaxed">
                  {line.content}
                </div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          {!isGameActive && (
            <div className="flex items-center gap-2 text-neonGreen mt-4">
              <span className="shrink-0">angad@parab:~$</span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-white font-mono caret-transparent"
                  autoComplete="off"
                  spellCheck="false"
                  autoFocus
                />
                {/* Custom Blinking Caret */}
                <div
                  className="absolute top-0 pointer-events-none bg-neonGreen w-2.5 h-5 animate-caret-blink"
                  style={{ left: `${input.length}ch` }}
                ></div>
              </div>
            </div>
          )}
          <div ref={endRef} className="h-4" />
        </div>
      </div>
    </div>
  );
});

export default Terminal;
