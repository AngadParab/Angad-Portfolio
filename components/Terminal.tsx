import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { TerminalLine, Project, Experience, Workshop } from '../types';
import { PROJECTS, EXPERIENCE, WORKSHOPS, WELCOME_MSG } from '../constants';
import Badge from './Badge';
import { Send, Terminal as TermIcon, X, Plus, Check } from 'lucide-react';

// Helper to safely create HTML from strings
const FormattedText = ({ text }: { text: string }) => {
  return (
    <span dangerouslySetInnerHTML={{ __html: text }} />
  );
};

const MatrixRain = () => {
  const [text, setText] = useState('');
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';
    const interval = setInterval(() => {
      let s = '';
      for (let i = 0; i < 2000; i++) {
        s += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setText(s);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="absolute inset-0 bg-black/95 text-neonGreen font-mono text-xs sm:text-sm break-all overflow-hidden z-[100] p-4 leading-none">
      {text}
    </div>
  );
};

const TerminalPrompt = ({ context = 'main' }: { context?: 'main' | 'whoami' | 'education' }) => (
  <span className="shrink-0 flex items-center gap-0 tracking-tight select-none">
    <span className="text-neonGreen font-bold">angad@linux</span>
    <span className="text-white">:</span>
    <span className="text-[#3b8eea] font-bold">~{context === 'main' ? '' : `/${context}`}</span>
    <span className="text-white mr-2">$</span>
  </span>
);

export const TransmitterWindow = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [step, setStep] = useState<'form' | 'transmitting' | 'success'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [signature, setSignature] = useState('');

  useEffect(() => {
    if (step !== 'transmitting') return;
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 100));
    }, 80);
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (step === 'transmitting' && progress === 100) {
      setSignature(`TX-${Math.random().toString(36).substring(2, 11).toUpperCase()}-SEC`);
      const timer = setTimeout(() => {
        setStep('success');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('transmitting');
  };

  if (!isOpen) {
    return (
      <div className="text-gray-500 font-mono text-xs my-2 border border-divider/30 p-2 rounded bg-black/20 animate-fade-in">
        [System] SECURE_TRANSMITTER.EXE session terminated.
      </div>
    );
  }

  const getProgressBar = () => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((progress / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  };

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className={`my-4 border border-termBorder rounded-lg overflow-hidden bg-[#0a0a0a] shadow-2xl transition-all duration-300 animate-fade-in font-mono ${
        isMaximized ? 'fixed inset-4 md:inset-8 z-50 flex flex-col' : 'w-full max-w-3xl flex flex-col'
      }`}
    >
      {/* Title Bar */}
      <div className="bg-[#141414] border-b border-termBorder px-4 py-2 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button 
              onClick={() => setIsOpen(false)}
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center text-[9px] text-black font-bold focus:outline-none"
              title="Terminate Transmitter"
            >
              ×
            </button>
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]/50"></div>
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center text-[7px] text-black font-bold focus:outline-none"
            >
              {isMaximized ? '⧉' : '⛶'}
            </button>
          </div>
          <span className="text-xs font-bold text-gray-400 ml-2">SECURE_TRANSMITTER.EXE</span>
        </div>
        <div className="text-[10px] text-neonGreen font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-neonGreen animate-pulse"></span>
          LINK ACTIVE
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-6 text-sm text-gray-300">
        
        {/* Left Side: Diagnostics and Telemetry (cols 2) */}
        <div className="md:col-span-2 space-y-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-termBorder/50 pb-4 md:pb-0 md:pr-6">
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-mustard border-b border-mustard/20 pb-1">
              SYSTEM_TELEMETRY
            </div>
            <div className="space-y-1.5 text-xs text-gray-400">
              <div>HOST: <span className="text-white font-semibold">angadparab.tech</span></div>
              <div>PORT: <span className="text-white font-semibold">443 (TLS/SSL)</span></div>
              <div>PROTOCOL: <span className="text-white font-semibold">AES-256-GCM</span></div>
              <div>ENVELOPE: <span className="text-white font-semibold">Encrypted Signal Packet</span></div>
              <div>NODE_ID: <span className="text-neonGreen">192.168.1.104</span></div>
            </div>
          </div>

          {/* Animated Signal Oscilloscope */}
          <div className="h-28 bg-black/60 border border-termBorder/40 rounded p-2 flex flex-col justify-between relative overflow-hidden">
            <div className="text-[9px] text-gray-500 uppercase tracking-widest absolute top-2 left-2 z-10">
              SIGNAL_FREQUENCY_HZ
            </div>
            
            {/* Visual wave grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
            
            {/* SVG Wave */}
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-full h-12 stroke-neonGreen stroke-2 fill-none overflow-visible" viewBox="0 0 200 40">
                <path d="M 0 20 Q 25 5, 50 20 T 100 20 T 150 20 T 200 20" className="animate-[pulse_1.5s_infinite_ease-in-out]">
                  <animate 
                    attributeName="d" 
                    values="M 0 20 Q 25 5, 50 20 T 100 20 T 150 20 T 200 20;
                            M 0 20 Q 25 35, 50 20 T 100 20 T 150 20 T 200 20;
                            M 0 20 Q 25 5, 50 20 T 100 20 T 150 20 T 200 20" 
                    dur="2s" 
                    repeatCount="indefinite" 
                  />
                </path>
              </svg>
            </div>

            <div className="flex justify-between items-center text-[9px] text-gray-500 z-10">
              <span>SCANNING...</span>
              <span className="text-neonGreen animate-pulse">94.2 MHz</span>
            </div>
          </div>

          <div className="text-[10px] text-gray-500 leading-normal">
            [SYS] Secure socket layer establishes a single-use peer key handshake for direct visitor dispatch.
          </div>
        </div>

        {/* Right Side: Action Box (cols 3) */}
        <div className="md:col-span-3 flex flex-col justify-center">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-neonGreen font-bold tracking-wider uppercase flex items-center gap-1.5 pb-2 border-b border-termBorder/50">
                <TermIcon size={14} /> TRANSMISSION_SPECIFICATION
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider">Identity (Name)</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="bg-black/40 border border-termBorder/60 focus:border-neonGreen outline-none text-white px-2 py-1.5 rounded font-mono text-sm transition-colors" 
                    placeholder="Enter Identifier / Name" 
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider">Signal Address (Email)</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="bg-black/40 border border-termBorder/60 focus:border-neonGreen outline-none text-white px-2 py-1.5 rounded font-mono text-sm transition-colors" 
                    placeholder="Enter Signal Target Email" 
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider">Payload (Message)</label>
                  <textarea 
                    required 
                    rows={4} 
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="bg-black/40 border border-termBorder/60 focus:border-neonGreen outline-none text-white px-2 py-1.5 rounded font-mono text-sm resize-none transition-colors" 
                    placeholder="Enter Payload Content..."
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-neonGreen/10 border border-neonGreen/30 hover:border-neonGreen hover:bg-neonGreen/20 text-neonGreen hover:text-white py-2 rounded text-xs transition-all duration-200 flex items-center justify-center gap-2 font-bold cursor-pointer"
              >
                <Send size={12} /> TRANSMIT SIGNAL ENCRYPTED
              </button>
            </form>
          )}

          {step === 'transmitting' && (
            <div className="space-y-4 py-8 text-center md:text-left">
              <div className="text-mustard font-bold flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-mustard animate-ping"></span>
                UPLOADING PACKET TO PORT: 443...
              </div>
              
              <div className="bg-black border border-termBorder/60 rounded p-3 text-neonGreen font-mono text-xs tracking-widest text-center select-none">
                {getProgressBar()} <span className="ml-2 font-bold text-white">{progress}%</span>
              </div>
              
              <div className="space-y-1 text-[10px] text-gray-500 text-left font-mono">
                <div>&gt; ENCRYPTING HEADER INFO WITH SEED...</div>
                <div>&gt; AUTHENTICATING HANDSHAKE CERTIFICATES...</div>
                {progress > 40 && <div>&gt; INITIATING PEER TUNNEL CONNECTION...</div>}
                {progress > 80 && <div>&gt; SENDING PAYLOAD COMPILATION BUFFER...</div>}
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-mint font-bold flex items-center gap-2 text-sm uppercase">
                <Check size={16} className="text-mint animate-bounce" />
                TRANSMISSION COMPLETE
              </div>
              <div className="space-y-2 text-gray-300 font-mono text-xs border border-mint/20 bg-mint/5 p-3 rounded leading-relaxed">
                <div><span className="text-gray-500 font-bold">SIGNATURE:</span> <span className="text-white">{signature}</span></div>
                <div><span className="text-gray-500 font-bold">TIMESTAMP:</span> {new Date().toISOString()}</div>
                <div><span className="text-gray-500 font-bold">STATUS:</span> <span className="text-mint font-bold">[DELIVERED - SECURE]</span></div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                The payload handshake succeeded. The secure packets have been routed to Angad's mail dispatcher server.
              </p>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full border border-termBorder hover:border-white text-white py-2 rounded text-xs transition-colors font-bold cursor-pointer"
              >
                CLOSE SESSION
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export const getWhoamiContent = () => (
  <div className="max-w-2xl space-y-2 animate-fade-in mt-2 mb-4">
    <pre className="text-neonGreen font-mono text-[10px] sm:text-xs leading-[1.1] mb-6">
      {`    _    _   _  ____    _    ____  
   / \\  | \\ | |/ ___|  / \\  |  _ \\ 
  / _ \\ |  \\| | |  _  / _ \\ | | | |
 / ___ \\| |\\  | |_| |/ ___ \\| |_| |
/_/   \\_\\_| \\_|\\____/_/   \\_\\____/ `}
    </pre>
    <h3 className="text-mustard font-bold text-lg">User: Angad Parab</h3>
    <div className="space-y-4">
      <p className="text-xl text-white font-bold tracking-wide leading-relaxed">
        I learn like a scientist:<br />
        <span className="text-neonGreen">observe, experiment, break, rebuild, improve.</span>
      </p>
      <p className="text-gray-300 leading-relaxed">
        I'm a naturally curious mind who loves understanding how things work—whether it’s technology, design, human behavior, or the hidden mechanics behind everyday systems. My goal isn’t to master one field, but to connect ideas across many of them and create something meaningful.
      </p>
      <p className="text-gray-300 leading-relaxed">
        Early exposure to real-world projects and corporate environments helped me sharpen my problem-solving, analytical, and communication skills. I enjoy diving deep into a topic, asking questions, and figuring out how things can be improved or redesigned. For me, learning is not a phase… it’s a habit.
      </p>

      <div className="my-4 border-l-2 border-neonGreen/50 pl-4 py-2 bg-neonGreen/5 rounded-r">
        <h4 className="text-mustard font-bold text-sm mb-2 uppercase tracking-wider">Some areas I experiment with:</h4>
        <ul className="space-y-1.5 text-sm text-gray-300">
          <li className="flex items-start gap-2"><span className="text-mint shrink-0 mt-0.5">▹</span> <span>Software, AI concepts & automation</span></li>
          <li className="flex items-start gap-2"><span className="text-mint shrink-0 mt-0.5">▹</span> <span>XR, robotics, and interactive technologies</span></li>
          <li className="flex items-start gap-2"><span className="text-mint shrink-0 mt-0.5">▹</span> <span>UI/UX, design thinking & 3D modeling</span></li>
          <li className="flex items-start gap-2"><span className="text-mint shrink-0 mt-0.5">▹</span> <span>Personal development, observation & creativity</span></li>
          <li className="flex items-start gap-2"><span className="text-mint shrink-0 mt-0.5">▹</span> <span>Anything new that pushes my curiosity further</span></li>
        </ul>
      </div>

      <p className="text-gray-300 leading-relaxed">
        I believe that innovation comes from connecting ideas across different worlds—tech, design, science, creativity, and human behavior. My long-term aim is to stay curious, think boldly, experiment fearlessly, and contribute to ideas that push the world forward.
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

    <div className="mt-6 flex">
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 border border-termBorder hover:border-mustard hover:text-mustard px-4 py-2 rounded text-sm transition-colors text-white font-mono bg-termBgStart/50"
      >
        <span className="text-mint">↓</span> Download Resume
      </a>
    </div>

    <div className="mt-8 pt-4 border-t border-divider text-sm">
      <div className="mb-2">
        <span className="text-mustard">&gt;</span> <span className="text-gray-400">Type</span> <span className="text-mint">'ls'</span> <span className="text-gray-400">to view personal details.</span>
      </div>
      <div>
        <span className="text-mustard">&gt;</span> <span className="text-gray-400">Type</span> <span className="text-mint">'back'</span> <span className="text-gray-400">or</span> <span className="text-mint">'exit'</span> <span className="text-gray-400">to return to the main menu.</span>
      </div>
    </div>
  </div>
);

export const getCollegesContent = () => (
  <div className="space-y-6 animate-fade-in font-mono max-w-3xl mt-2 mb-4">
    <h3 className="text-mustard font-bold text-lg mb-4">Colleges & Universities_</h3>

    <div className="border-l-2 border-termBorder pl-4 hover:border-mustard transition-colors">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <span className="text-neonGreen font-bold text-lg">B.Sc. in Computer Science</span>
        <span className="text-gray-500 text-sm font-mono">Present</span>
      </div>
      <div className="text-white font-semibold text-base mb-2">Government  College of Arts , Science & Commerce ,Quepem, Goa</div>
      <p className="text-gray-400 text-sm leading-relaxed">Pursuing undergraduate degree with a focus on computer science, Mathematics .</p>
    </div>

    <div className="border-l-2 border-termBorder pl-4 hover:border-mustard transition-colors mt-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <span className="text-neonGreen font-bold text-lg">Higher Secondary School (HSSC)</span>
        <span className="text-gray-500 text-sm font-mono">Completed</span>
      </div>
      <div className="text-white font-semibold text-base mb-2">Multipurpose Higher Secondary, Borda Margao</div>
      <p className="text-gray-400 text-sm leading-relaxed">Science Stream: Physics, Chemistry, Biology, and Mathematics.</p>
    </div>

    <div className="border-l-2 border-termBorder pl-4 hover:border-mustard transition-colors mt-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <span className="text-neonGreen font-bold text-lg">Secondary School  (SSC)</span>
        <span className="text-gray-500 text-sm font-mono">Completed</span>
      </div>
      <div className="text-white font-semibold text-base mb-2">Popular High School Margao </div>
      <p className="text-gray-400 text-sm leading-relaxed">Foundational high school education.</p>
    </div>
  </div>
);

export const getWorkshopsContent = () => (
  <div className="space-y-6 animate-fade-in font-mono max-w-3xl mt-2 mb-4">
    <h3 className="text-mustard font-bold text-lg mb-4">Workshops Attended_</h3>
    {WORKSHOPS.map((workshop, i) => (
      <div key={i} className="border-l-2 border-termBorder pl-4 hover:border-mustard transition-colors mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <span className="text-neonGreen font-bold text-base md:text-lg">{workshop.title}</span>
          <span className="text-gray-500 text-sm font-mono">{workshop.period}</span>
        </div>
        <div className="text-pixelPink text-sm mb-1">{workshop.organizer}</div>
        {workshop.role && (
          <div className="text-xs text-mustard mb-1">Role: {workshop.role}</div>
        )}
        {workshop.grade && (
          <div className="text-xs text-mint mb-1">Grade: {workshop.grade}</div>
        )}
        <p className="text-gray-400 text-sm leading-relaxed mb-3 mt-1">{workshop.description}</p>
        
        {workshop.certificate && (
          <div className="mt-4 relative max-w-[280px] group cursor-pointer border border-termBorder p-1 bg-black overflow-hidden" title="Click to view full certificate">
            {/* CRT overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] opacity-80 group-hover:opacity-30 transition-opacity mix-blend-overlay"></div>
            <div className="absolute inset-0 pointer-events-none bg-neonGreen/20 mix-blend-color z-10 group-hover:bg-transparent transition-colors"></div>
            
            <a href={workshop.certificate} target="_blank" rel="noreferrer">
              <img 
                src={workshop.certificate} 
                alt={`${workshop.title} Certificate`}
                className="w-full h-auto filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 relative z-0" 
              />
            </a>
            
            <div className="absolute top-2 right-2 bg-black/80 text-neonGreen text-[10px] px-1 font-mono z-20 pointer-events-none border border-neonGreen/30 shadow-term-glow">
              ENCRYPTED_DOC
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);

export const getExperienceContent = () => (
  <div className="space-y-6 animate-fade-in font-mono max-w-3xl mt-2 mb-4">
    <h3 className="text-mustard font-bold text-lg mb-4">Internships & Experience_</h3>
    {EXPERIENCE.map((exp, i) => (
      <div key={i} className="border-l-2 border-termBorder pl-4 hover:border-mustard transition-colors">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <span className="text-neonGreen font-bold text-lg">{exp.role}</span>
          <span className="text-gray-500 text-sm font-mono">{exp.period}</span>
        </div>
        <div className="text-pixelPink text-sm mb-2">{exp.company}</div>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">{exp.description}</p>
        
        {exp.certificate && (
          <div className="mt-4 relative max-w-[280px] group cursor-pointer border border-termBorder p-1 bg-black overflow-hidden" title="Click to view full certificate">
            {/* CRT overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] opacity-80 group-hover:opacity-30 transition-opacity mix-blend-overlay"></div>
            <div className="absolute inset-0 pointer-events-none bg-neonGreen/20 mix-blend-color z-10 group-hover:bg-transparent transition-colors"></div>
            
            <a href={exp.certificate} target="_blank" rel="noreferrer">
              <img 
                src={exp.certificate} 
                alt={`${exp.company} Certificate`}
                className="w-full h-auto filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 relative z-0" 
              />
            </a>
            
            <div className="absolute top-2 right-2 bg-black/80 text-neonGreen text-[10px] px-1 font-mono z-20 pointer-events-none border border-neonGreen/30 shadow-term-glow">
              ENCRYPTED_DOC
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);

export const getSkillsContent = () => (
  <div className="space-y-6 animate-fade-in font-mono max-w-3xl mt-2 mb-4">
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

export const getEducationMenu = () => (
  <div className="space-y-2 animate-fade-in font-mono mt-2 mb-4">
    <div className="text-neonGreen border-b border-neonGreen/30 pb-2 mb-4 uppercase tracking-widest font-bold">
      [ EDUCATION & SKILLS MODULE ]
    </div>
    <div className="flex flex-col space-y-2 text-gray-300">
      <div><span className="text-mustard">[1]</span> View Colleges & Universities</div>
      <div><span className="text-mustard">[2]</span> View Workshops Attended</div>
      <div><span className="text-mustard">[3]</span> View Internships & Experience</div>
      <div><span className="text-mustard">[4]</span> View Skill Matrix</div>
    </div>
    <div className="mt-6 pt-4 border-t border-divider text-sm">
      <div className="mb-2">
        <span className="text-mustard">&gt;</span> <span className="text-gray-400">Type a number</span> <span className="text-mint">'1-4'</span> <span className="text-gray-400">to view details.</span>
      </div>
      <div>
        <span className="text-mustard">&gt;</span> <span className="text-gray-400">Type</span> <span className="text-mint">'back'</span> <span className="text-gray-400">or</span> <span className="text-mint">'exit'</span> <span className="text-gray-400">to return to the main menu.</span>
      </div>
    </div>
  </div>
);

export const IframeWindow = ({ url, title }: { url: string; title: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);

  if (!isOpen) {
    return (
      <div className="text-gray-500 font-mono text-xs my-2 border border-divider/30 p-2 rounded bg-black/20 animate-fade-in">
        [System] Connection to {title} preview closed.
      </div>
    );
  }

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className={`my-4 border border-termBorder rounded-lg overflow-hidden bg-[#0d0d0d] shadow-2xl transition-all duration-300 animate-fade-in ${
        isMaximized ? 'fixed inset-4 md:inset-8 z-50 flex flex-col' : 'w-full max-w-4xl flex flex-col'
      }`}
    >
      {/* Window Title Bar */}
      <div className="bg-[#161616] border-b border-termBorder px-4 py-2 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          {/* Windows/Mac style dots */}
          <div className="flex gap-1.5">
            <button 
              onClick={() => setIsOpen(false)}
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center text-[9px] text-black font-bold focus:outline-none"
              title="Close Connection"
            >
              ×
            </button>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/50" title="Minimize (N/A)"></div>
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center text-[7px] text-black font-bold focus:outline-none"
              title={isMaximized ? "Restore Window" : "Maximize Window"}
            >
              {isMaximized ? '⧉' : '⛶'}
            </button>
          </div>
          <span className="text-xs font-mono font-bold text-gray-400 ml-2">{title} - Secure Stream</span>
        </div>
        <div className="text-[10px] font-mono text-neonGreen/80 animate-pulse flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-neonGreen"></span>
          LIVE_STREAM
        </div>
      </div>
      
      {/* Address Bar */}
      <div className="bg-[#111111] border-b border-[#222222] px-3 py-1.5 flex items-center gap-2">
        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider font-mono">ADDR:</span>
        <div className="flex-1 bg-black/50 border border-termBorder/50 rounded px-2 py-0.5 text-xs text-mint font-mono flex items-center gap-1.5 truncate">
          <span className="text-gray-600 select-none">https://</span>
          <span>{url.replace('https://', '')}</span>
        </div>
      </div>

      {/* Frame Container */}
      <div className={`relative bg-white ${isMaximized ? 'flex-1 min-h-[400px]' : 'h-[500px] md:h-[600px] w-full'}`}>
        <iframe 
          src={url} 
          title={title} 
          className="w-full h-full border-none bg-white" 
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
    </div>
  );
};

export const getProjectsListContent = () => (
  <div className="space-y-4 animate-fade-in font-mono max-w-3xl mt-2 mb-4">
    <div className="text-neonGreen border-b border-neonGreen/30 pb-2 mb-4 uppercase tracking-widest font-bold">
      [ SYSTEM PORTFOLIO DATABANK ]
    </div>
    <div className="text-gray-300">
      <div className="grid grid-cols-[60px_1fr_120px] border-b border-divider pb-2 mb-2 font-bold text-mustard">
        <span>ID</span>
        <span>PROJECT TITLE</span>
        <span className="text-right">STATUS</span>
      </div>
      {PROJECTS.map((proj, i) => (
        <div key={i} className="grid grid-cols-[60px_1fr_120px] py-1.5 hover:bg-neonGreen/5 transition-colors cursor-pointer border-b border-divider/10">
          <span className="text-pixelPink font-bold">{(i + 1).toString().padStart(2, '0')}</span>
          <span className="text-white">{proj.title}</span>
          <span className="text-right text-mint">[ACTIVE]</span>
        </div>
      ))}
    </div>
    <div className="mt-6 pt-4 border-t border-divider text-sm">
      <div className="mb-2">
        <span className="text-mustard">&gt;</span> <span className="text-gray-400">Type</span> <span className="text-mint">'01'</span> <span className="text-gray-400">to</span> <span className="text-mint">'04'</span> <span className="text-gray-400">to inspect a database record.</span>
      </div>
      <div>
        <span className="text-mustard">&gt;</span> <span className="text-gray-400">Type</span> <span className="text-mint">'launch &lt;id&gt;'</span> <span className="text-gray-400">to launch the live preview window (e.g. 'launch 01' - web only).</span>
      </div>
    </div>
  </div>
);

export const getProjectDetailsContent = (index: number, onLaunch?: () => void) => {
  const proj = PROJECTS[index];
  if (!proj) return <span className="text-red-400">Database Record Not Found.</span>;

  return (
    <div className="space-y-6 animate-fade-in font-mono max-w-3xl mt-2 mb-4 border border-termBorder p-4 bg-black/40">
      <div className="flex justify-between items-center border-b border-termBorder pb-2">
        <h3 className="text-neonGreen font-bold text-lg uppercase tracking-wider">{proj.title}_</h3>
        <span className="text-xs bg-neonGreen/10 text-neonGreen px-2 py-0.5 border border-neonGreen/30 animate-pulse">RECORD_LOADED</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        {/* Encrypted preview image */}
        <div className="relative w-full h-40 md:h-48 border border-termBorder bg-black overflow-hidden group">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] opacity-80 group-hover:opacity-30 transition-opacity mix-blend-overlay"></div>
          <div className="absolute inset-0 pointer-events-none bg-neonGreen/20 mix-blend-color z-10 group-hover:bg-transparent transition-colors"></div>
          <img 
            src={proj.image} 
            alt={proj.title}
            className="w-full h-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          />
        </div>

        {/* Details metadata */}
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-[100px_1fr] gap-1">
            <span className="text-gray-500 font-bold">REGISTRY:</span>
            <span className="text-white font-mono">{(index + 1).toString().padStart(2, '0')}</span>
          </div>
          
          <div className="grid grid-cols-[100px_1fr] gap-1">
            <span className="text-gray-500 font-bold">STATUS:</span>
            <span className="text-mint font-bold">[ONLINE]</span>
          </div>

          <div className="grid grid-cols-[100px_1fr] gap-1">
            <span className="text-gray-500 font-bold">STACK:</span>
            <div className="flex flex-wrap gap-1.5">
              {proj.tags.map(tag => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-termBorder/40 border border-termBorder text-gray-300 rounded font-mono">{tag}</span>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-gray-500 font-bold block">DESCRIPTION:</span>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{proj.description}</p>
          </div>

          <div className="pt-2 border-t border-divider flex flex-wrap gap-4">
            {proj.previewable ? (
              onLaunch && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onLaunch();
                  }}
                  className="text-mustard hover:text-white hover:underline text-xs font-bold bg-transparent border-none cursor-pointer p-0 font-mono text-left"
                >
                  &gt; LAUNCH INLINE PREVIEW (or type 'launch {(index + 1).toString().padStart(2, '0')}')
                </button>
              )
            ) : (
              <span className="text-gray-500 text-xs font-mono select-none">
                [INLINE PREVIEW UNAVAILABLE FOR NATIVE MOBILE APPS]
              </span>
            )}
            {!proj.previewable && proj.link && (
              <a 
                href={proj.link} 
                target="_blank" 
                rel="noreferrer" 
                className="text-mustard hover:text-white hover:underline decoration-mustard text-xs font-bold"
              >
                &gt; VISIT PROJECT HOMEPAGE
              </a>
            )}
            {proj.github && (
              <a 
                href={proj.github} 
                target="_blank" 
                rel="noreferrer" 
                className="text-neonGreen hover:text-white hover:underline decoration-neonGreen text-xs font-bold"
              >
                &gt; SOURCE CODE (GITHUB)
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export interface TerminalRef {
  executeCommand: (cmd: string) => void;
}

export interface TerminalProps {
  onClose?: () => void;
}

const Terminal = forwardRef<TerminalRef, TerminalProps>(({ onClose }, ref) => {
  const [context, setContext] = useState<'main' | 'whoami' | 'education'>('main');
  const [isHacking, setIsHacking] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<TerminalLine[]>([
    { id: 'init', type: 'component', content: WELCOME_MSG, context: 'main' }
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [output]);

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
      content: cmd,
      context // capture current context for history rendering
    };

    setOutput(prev => [...prev, inputLine]);
    setInput('');

    // Command Logic
    const command = cmd.toLowerCase();
    let response: TerminalLine | null = null;

    const createResponse = (content: React.ReactNode): TerminalLine => ({
      id: Date.now().toString() + '-resp',
      type: 'output',
      content,
      context
    });

    if (command === 'hack') {
      setIsHacking(true);
      setTimeout(() => {
        setIsHacking(false);
        setOutput(prev => [...prev, createResponse(<span className="text-mint animate-fade-in">&gt; Security bypass complete. Temporary elevation granted.</span>)]);
      }, 3000);
      return;
    } else if (command.startsWith('sudo')) {
      response = createResponse(
        <div className="text-[#ff5f56] font-bold animate-pulse">
          [FATAL] Angad is not in the sudoers file. This incident will be reported to the cyber division.
        </div>
      );
      setOutput(prev => [...prev, response!]);
      return;
    }

    if (context === 'whoami') {
      if (command === 'back' || command === 'exit' || command === 'cd ..' || command === 'menu') {
        setContext('main');
        setOutput([{ id: Date.now().toString() + '-init', type: 'component', content: WELCOME_MSG, context: 'main' }]);
        return;
      } else if (command === 'clear') {
        setOutput([{ id: Date.now().toString() + '-init', type: 'component', content: getWhoamiContent(), context: 'whoami' }]);
        return;
      } else if (command === 'ls') {
        response = createResponse(
          <div className="space-y-3 animate-fade-in text-sm font-mono mt-2 mb-4">
            <h4 className="text-mustard font-bold mb-4">Personal Details_</h4>
            <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2">
              <span className="text-gray-500">Email</span>
              <span className="text-white hover:text-neonGreen transition-colors cursor-pointer"><a href="mailto:Parabangad123@gmail.com">Parabangad123@gmail.com</a></span>
            </div>
            <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2">
              <span className="text-gray-500">Gender</span>
              <span className="text-white">Male</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2">
              <span className="text-gray-500">Religion</span>
              <span className="text-white">Hindu</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2">
              <span className="text-gray-500">Nationality</span>
              <span className="text-white">Indian</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2 mt-4 pt-2 border-t border-divider/50">
              <span className="text-gray-500">Location</span>
              <span className="text-white">Goa, India</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2">
              <span className="text-gray-500">Current Focus</span>
              <span className="text-neonGreen">Building own OS</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2">
              <span className="text-gray-500">Side Quests</span>
              <span className="text-pixelPink">Playing online games</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2">
              <span className="text-gray-500">Languages</span>
              <span className="text-white leading-relaxed">
                Konkani <span className="text-gray-500 text-xs">(Mother Tongue)</span>, Hindi, English, Marathi, <span className="text-gray-500 text-xs">Basic</span> Sanskrit
              </span>
            </div>
          </div>
        );
      } else {
        response = createResponse(
          <span className="text-red-400">Command ignored. Type 'back' or 'exit' to return to the main menu.</span>
        );
      }
    } else if (context === 'education') {
      if (command === 'back' || command === 'exit' || command === 'cd ..' || command === 'menu') {
        setContext('main');
        setOutput([{ id: Date.now().toString() + '-init', type: 'component', content: WELCOME_MSG, context: 'main' }]);
        return;
      } else if (command === 'clear') {
        setOutput([{ id: Date.now().toString() + '-init', type: 'component', content: getEducationMenu(), context: 'education' }]);
        return;
      } else if (command === '1' || command === '[1]') {
        response = createResponse(getCollegesContent());
      } else if (command === '2' || command === '[2]') {
        response = createResponse(getWorkshopsContent());
      } else if (command === '3' || command === '[3]') {
        response = createResponse(getExperienceContent());
      } else if (command === '4' || command === '[4]') {
        response = createResponse(getSkillsContent());
      } else {
        response = createResponse(
          <span className="text-red-400">Invalid selection. Type a number 1-4, or 'back' to return to main menu.</span>
        );
      }
    } else {
      // Map number shortcuts to full commands
      const normalizedCmd =
        command === '1' || command === '[1]' || command === 'whoami' ? 'whoami' :
          command === '2' || command === '[2]' || command === 'cd education' ? 'cd education' :
            command === '3' || command === '[3]' || command === 'ls projects' ? 'ls projects' :
              command === '4' || command === '[4]' || command === 'ping' ? 'ping' :
                command === '5' || command === '[5]' || command === 'get resume' ? 'get resume' :
                  command;

      if (normalizedCmd === 'whoami') {
        setContext('whoami');
        setOutput([
          {
            id: Date.now().toString() + '-whoami',
            type: 'output',
            context: 'whoami',
            content: getWhoamiContent()
          }
        ]);
        return;
      } else if (normalizedCmd === 'cd education') {
        setContext('education');
        setOutput([
          {
            id: Date.now().toString() + '-education',
            type: 'output',
            context: 'education',
            content: getEducationMenu()
          }
        ]);
        return;
      } else if (normalizedCmd === 'ls projects') {
        response = createResponse(getProjectsListContent());
      } else if (
        normalizedCmd === '01' ||
        normalizedCmd === 'show 01' ||
        normalizedCmd === 'project 01' ||
        command.trim() === '01' ||
        command.trim() === 'show 01'
      ) {
        response = createResponse(getProjectDetailsContent(0, () => processCommand('launch 01')));
      } else if (
        normalizedCmd === '02' ||
        normalizedCmd === 'show 02' ||
        normalizedCmd === 'project 02' ||
        command.trim() === '02' ||
        command.trim() === 'show 02' ||
        normalizedCmd === 'playmeet' ||
        command.trim().toLowerCase() === 'playmeet'
      ) {
        response = createResponse(getProjectDetailsContent(1, () => processCommand('launch 02')));
      } else if (
        normalizedCmd === '03' ||
        normalizedCmd === 'show 03' ||
        normalizedCmd === 'project 03' ||
        command.trim() === '03' ||
        command.trim() === 'show 03' ||
        normalizedCmd === 'snapsort' ||
        command.trim().toLowerCase() === 'snapsort'
      ) {
        response = createResponse(getProjectDetailsContent(2));
      } else if (
        normalizedCmd === '04' ||
        normalizedCmd === 'show 04' ||
        normalizedCmd === 'project 04' ||
        command.trim() === '04' ||
        command.trim() === 'show 04' ||
        normalizedCmd === 'kiosk' ||
        command.trim().toLowerCase() === 'kiosk' ||
        normalizedCmd === 'college navigation kiosk' ||
        command.trim().toLowerCase() === 'college navigation kiosk'
      ) {
        response = createResponse(getProjectDetailsContent(3));
      } else if (
        normalizedCmd === 'launch 01' ||
        normalizedCmd === 'launch cyber ranger' ||
        command.trim() === 'launch 01' ||
        command.trim().toLowerCase() === 'launch cyber ranger'
      ) {
        response = createResponse(<IframeWindow url={PROJECTS[0].link} title={PROJECTS[0].title} />);
      } else if (
        normalizedCmd === 'launch 02' ||
        normalizedCmd === 'launch playmeet' ||
        command.trim() === 'launch 02' ||
        command.trim().toLowerCase() === 'launch playmeet'
      ) {
        response = createResponse(<IframeWindow url={PROJECTS[1].link} title={PROJECTS[1].title} />);
      } else if (
        normalizedCmd === 'launch 03' ||
        normalizedCmd === 'launch snapsort' ||
        command.trim() === 'launch 03' ||
        command.trim().toLowerCase() === 'launch snapsort'
      ) {
        response = createResponse(
          <div className="text-pixelPink font-mono text-sm leading-relaxed max-w-xl">
            [ERROR] Inline sandbox rendering is not supported for native Android (.apk) targets.<br />
            Please execute the <a href={PROJECTS[2].github} target="_blank" rel="noreferrer" className="text-neonGreen underline decoration-neonGreen">SOURCE CODE (GITHUB)</a> command to review compilation structures.
          </div>
        );
      } else if (
        normalizedCmd === 'launch 04' ||
        normalizedCmd === 'launch kiosk' ||
        command.trim() === 'launch 04' ||
        command.trim().toLowerCase() === 'launch kiosk'
      ) {
        response = createResponse(
          <div className="text-pixelPink font-mono text-sm leading-relaxed max-w-xl">
            [ERROR] Inline preview rendering is not supported for physical IoT systems & Local hardware kiosk servers.<br />
            Please execute the <a href={PROJECTS[3].github} target="_blank" rel="noreferrer" className="text-neonGreen underline decoration-neonGreen">SOURCE CODE (GITHUB)</a> command to view local python/bridge compilation guidelines.
          </div>
        );
      } else if (normalizedCmd === 'ping' || normalizedCmd === '4' || command.trim() === '4') {
        response = createResponse(<TransmitterWindow />);
      } else if (normalizedCmd === 'get resume') {
        window.open('/resume.pdf', '_blank');
        response = createResponse(
          <div className="text-neonGreen">
            &gt; Initiating download sequence for resume.pdf... <span className="text-mint ml-2">Success!</span>
          </div>
        );
      } else if (normalizedCmd === 'exit') {
        if (onClose) onClose();
        return;
      } else if (normalizedCmd === 'clear') {
        setOutput([{ id: Date.now().toString() + '-init', type: 'component', content: WELCOME_MSG, context: 'main' }]);
        return;
      } else if (normalizedCmd === 'help') {
        response = createResponse(
          <div className="text-gray-400 text-sm">
            <div>Available commands:</div>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><span className="text-mustard">whoami</span> (or 1) - Personal info</li>
              <li><span className="text-mustard">cd education</span> (or 2) - Education & Skills</li>
              <li><span className="text-mustard">ls projects</span> (or 3) - Projects</li>
              <li><span className="text-mustard">launch &lt;id&gt;</span> - Preview a project inline (e.g. <span className="text-mint">launch 01</span>)</li>
              <li><span className="text-mustard">ping</span> (or 4) - Contact me</li>
              <li><span className="text-mustard">get resume</span> (or 5) - Download Resume</li>
              <li><span className="text-mustard">clear</span> - Clear terminal</li>
            </ul>
          </div>
        );
      } else {
        response = createResponse(
          <span className="text-red-400">Command not found: {cmd}. Type 'help' for a list of commands.</span>
        );
      }
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
      processCommand(cmd);
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
          <div onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 cursor-pointer shadow-sm transition-colors" title="Close Terminal"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 cursor-pointer shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 cursor-pointer shadow-sm"></div>
        </div>
        <div className="mx-auto text-xs md:text-sm font-mono text-gray-400 flex items-center gap-2 select-none">
          <TermIcon size={14} className="text-gray-500" />
          <span>angad@linux-desktop:~</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 bg-gradient-to-b from-termBgStart/80 to-termBgEnd/80 backdrop-blur-md p-6 md:p-8 lg:p-10 overflow-y-auto font-mono text-base md:text-lg relative" id="terminal-body">
        {isHacking && <MatrixRain />}

        {/* Optional CRT Scanline Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>

        <div className="relative z-0 min-h-full pb-10">
          {/* Render Output */}
          {output.map((line) => (
            <div key={line.id} className="mb-3 break-words">
              {line.type === 'input' ? (
                <div className="flex flex-wrap items-center gap-0 text-gray-400">
                  <TerminalPrompt context={line.context} />
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
          <div className="flex items-center gap-0 mt-4">
            <TerminalPrompt context={context} />
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
          <div ref={endRef} className="h-4" />
        </div>
      </div>
    </div>
  );
});

export default Terminal;
