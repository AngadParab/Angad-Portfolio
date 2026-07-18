import React, { useState, useEffect } from 'react';
import { PROJECTS, EXPERIENCE, WORKSHOPS } from '../constants';
import { 
  Check, 
  ArrowLeft,
  Award,
  ExternalLink,
  Github,
  ChevronRight,
  Send,
  Terminal as TermIcon
} from 'lucide-react';

interface StandardPortfolioProps {
  onSwitchToTerminal: () => void;
}

// Flat retro Win95 Yellow Folder SVG
const RetroFolderIcon: React.FC = () => (
  <svg className="w-12 h-12 filter drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10C4 8.89543 4.89543 8 6 8H18L24 14H42C43.1046 14 44 14.8954 44 16V40C44 41.1046 43.1046 42 42 42H6C4.89543 42 4 41.1046 4 40V10Z" fill="#ffca28" stroke="#000" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M4 18H44" stroke="#000" strokeWidth="2.5" />
  </svg>
);

// Flat profile dark app shortcut for whoami (About Me)
const RetroWhoamiIcon: React.FC = () => (
  <div className="w-12 h-12 bg-[#222] border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] flex items-center justify-center text-white font-bold font-mono text-xl select-none">
    a
  </div>
);

// Retro console system terminal shortcut icon
const RetroTerminalIcon: React.FC = () => (
  <div className="w-12 h-12 bg-[#1a1a1a] border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] flex items-center justify-center text-[#00ff41] font-bold font-mono text-base select-none">
    &gt;_
  </div>
);


const StandardPortfolio: React.FC<StandardPortfolioProps> = ({ onSwitchToTerminal }) => {
  // Navigation: Track active window
  const [activeWindow, setActiveWindow] = useState<'whoami' | 'projects' | 'education' | 'ping' | 'hack' | null>(null);

  // Projects window active selection sub-state
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  // Education window subdirectory path sub-state (File Explorer)
  const [educationPath, setEducationPath] = useState<'root' | 'colleges' | 'workshops' | 'experience' | 'skills'>('root');

  // Contact Form Transmitter State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [contactProgress, setContactProgress] = useState(0);
  const [contactLog, setContactLog] = useState<string[]>([]);

  const handleIconClick = (id: 'whoami' | 'projects' | 'education' | 'ping' | 'resume' | 'hack' | 'terminal') => {
    if (id === 'resume') {
      window.open('/resume.pdf', '_blank');
      return;
    }
    if (id === 'terminal') {
      onSwitchToTerminal();
      return;
    }
    setActiveWindow(id);
    setSelectedProjectIndex(null);
    setEducationPath('root');
    setContactStatus('idle');
  };

  const handleCloseWindow = () => {
    setActiveWindow(null);
  };

  // Secure transmitter dispatch sequence
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');
    setContactProgress(0);
    setContactLog(['[SYS] Dialing gateway server...']);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setContactProgress(progress);
      
      if (progress === 30) {
        setContactLog(prev => [...prev, '[SYS] Compiling forms data packet...']);
      } else if (progress === 60) {
        setContactLog(prev => [...prev, '[SYS] Handshaking secure REST channels...']);
      } else if (progress === 90) {
        setContactLog(prev => [...prev, '[SYS] Transmitting payload headers...']);
      } else if (progress === 100) {
        clearInterval(interval);
        setContactLog(prev => [...prev, '[SYS] Package dispatched successfully!']);
        setTimeout(() => {
          setContactStatus('success');
        }, 400);
      }
    }, 150);
  };

  // WINDOW CONTENTS RENDERERS

  // Window 1: C:\ANGAD\whoami (About / whoami)
  const renderWhoamiWindow = () => (
    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-start font-sans">
      {/* Left Column: Avatar Circular Cutout & Status Badges */}
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="w-36 h-36 rounded-full border-[3px] border-black bg-white overflow-hidden shadow-[4px_4px_0px_#000] flex-shrink-0 relative">
          <img src="/photo.jpg" alt="Angad Parab" className="w-full h-full object-cover" />
        </div>
        
        {/* Mindset & Status Box */}
        <div className="w-full border-2 border-black bg-[#586242]/5 rounded-xl p-3 space-y-2 text-xs font-mono border-dashed shadow-[2px_2px_0px_rgba(0,0,0,0.1)] text-left">
          <div>
            <span className="text-gray-500 font-bold block text-[10px]">MINDSET:</span>
            <span className="text-[#586242] font-bold">Always Learning</span>
          </div>
          <div className="border-t border-black/10 pt-1.5">
            <span className="text-gray-500 font-bold block text-[10px]">STATUS:</span>
            <span className="text-[#c85a17] font-bold flex items-center gap-1.5 animate-pulse">
              ● Building new ideas
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Profile details */}
      <div className="space-y-4 text-left select-text animate-fade-in flex-1">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-[#c85a17] leading-none uppercase select-all">
            ANGAD PARAB
          </h2>
          <div className="font-mono text-xs uppercase tracking-widest text-[#586242] font-bold mt-1">
            JACK OF ALL TRADES, MASTER OF SOME
          </div>
        </div>

        <p className="text-gray-700 italic text-sm border-l-2 border-[#586242] pl-3 py-1 mt-1 leading-relaxed">
          "I learn like a scientist: observe, experiment, break, rebuild, and improve."
        </p>

        <div className="space-y-2.5 text-gray-600 text-xs leading-relaxed font-sans">
          <p className="select-all">
            I am a naturally curious mind who loves understanding how things work—whether it’s technology, design, human behavior, or the hidden mechanics behind everyday systems. My goal isn’t to master one field, but to connect ideas across many of them and create something meaningful.
          </p>
          <p className="select-all">
            Early exposure to real-world projects and corporate environments helped me sharpen my problem-solving, analytical, and communication skills. I enjoy diving deep into a topic, asking questions, and figuring out how things can be improved or redesigned. For me, learning is not a phase… it’s a habit.
          </p>
        </div>

        {/* Experiment Areas */}
        <div className="border-2 border-black bg-white rounded-xl p-4 shadow-[3px_3px_0px_rgba(0,0,0,0.15)] space-y-2 select-text">
          <h4 className="text-[#586242] font-mono font-bold text-[10px] uppercase tracking-wider">
            Some areas I experiment with:
          </h4>
          <ul className="space-y-1.5 text-xs text-gray-600 font-sans">
            <li className="flex items-start gap-2">
              <span className="text-[#c85a17] font-mono font-bold">▹</span>
              <span>Software, AI concepts & automation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c85a17] font-mono font-bold">▹</span>
              <span>XR, robotics, and interactive technologies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c85a17] font-mono font-bold">▹</span>
              <span>UI/UX, design thinking & 3D modeling</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c85a17] font-mono font-bold">▹</span>
              <span>Personal development, observation & creativity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c85a17] font-mono font-bold">▹</span>
              <span>Anything new that pushes my curiosity further</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Window 2: C:\ANGAD\projects (Projects Showcase - loaded with rich terminal projects!)
  const renderProjectsWindow = () => {
    if (selectedProjectIndex !== null) {
      const proj = PROJECTS[selectedProjectIndex];
      return (
        <div className="space-y-5 font-sans animate-fade-in">
          {/* Back Button */}
          <button 
            onClick={() => setSelectedProjectIndex(null)}
            className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase border-2 border-black bg-white text-[#586242] px-3 py-1.5 rounded shadow-[2px_2px_0px_#000] hover:bg-gray-100 cursor-pointer active:translate-y-[0.5px] active:shadow-[1px_1px_0px_#000] focus:outline-none"
          >
            <ArrowLeft size={12} /> Back to Projects List
          </button>

          <div className="border-2 border-black bg-white rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start select-text">
              <div className="w-full sm:w-36 h-24 border-2 border-black rounded-lg overflow-hidden bg-black flex-shrink-0">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-extrabold text-gray-900 leading-none">{proj.title}</h3>
                <span className="inline-block text-[9px] text-[#586242] font-mono font-bold bg-[#586242]/10 border border-[#586242]/20 px-2 py-0.5 rounded-md">
                  STATUS: ACTIVE / FULL DEPLOY
                </span>
                <p className="text-gray-600 text-xs leading-relaxed mt-1.5">{proj.description}</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-black/10 pt-3 select-text">
              <div className="text-[10px] text-gray-500 font-bold font-mono uppercase">Developer Stack:</div>
              <div className="flex flex-wrap gap-1.5">
                {proj.tags.map(t => (
                  <span key={t} className="text-[9px] font-mono font-bold px-2 py-0.5 bg-gray-100 border border-black/10 text-gray-700 rounded">{t}</span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-black/10 flex flex-wrap gap-3">
              {proj.link && (
                <a 
                  href={proj.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase border-2 border-black bg-white hover:bg-yellow-100 text-black px-4 py-2 rounded-lg shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] active:translate-y-[0.5px] active:shadow-[1px_1px_0px_#000] cursor-pointer"
                >
                  <ExternalLink size={12} /> Visit Application
                </a>
              )}
              {proj.github && (
                <a 
                  href={proj.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase border-2 border-black bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-lg shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] active:translate-y-[0.5px] active:shadow-[1px_1px_0px_#000] cursor-pointer"
                >
                  <Github size={12} /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 font-sans animate-fade-in">
        <div className="text-center font-bold tracking-widest text-[#586242] text-xs font-mono uppercase mb-4">
          --- PROJECT RECORDS ---
        </div>

        <div className="border-2 border-black bg-white rounded-xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.15)]">
          {PROJECTS.map((proj, idx) => (
            <button 
              key={idx}
              onClick={() => setSelectedProjectIndex(idx)}
              className="w-full text-left flex justify-between items-center px-4 py-3.5 hover:bg-gray-50 border-b border-black/10 last:border-b-0 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#c85a17] font-bold">{(idx + 1).toString().padStart(2, '0')}</span>
                <div>
                  <span className="font-bold text-gray-900 group-hover:text-[#c85a17] transition-colors">{proj.title}</span>
                  <div className="flex gap-1.5 mt-0.5">
                    {proj.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[8px] font-mono px-1 py-0.2 bg-gray-100 border border-black/5 text-gray-500 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Window 3: C:\ANGAD\education (Retro File Explorer with nested subdirectories colleges, workshops, experience, skills!)
  const renderEducationWindow = () => {
    // subfolder explorer layout
    if (educationPath === 'root') {
      return (
        <div className="space-y-6 font-sans animate-fade-in">
          <div className="text-center font-bold tracking-widest text-[#586242] text-xs font-mono uppercase mb-4">
            --- EDUCATION EXPLORER ---
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center py-4">
            {/* colleges sub-folder */}
            <button
              onClick={() => setEducationPath('colleges')}
              className="flex flex-col items-center justify-center p-3.5 w-24 h-24 border-2 border-black/10 hover:border-black bg-white/30 hover:bg-white/60 rounded-xl transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.05)] hover:shadow-[3.5px_3.5px_0px_#000] active:scale-95 group"
            >
              <RetroFolderIcon />
              <span className="mt-2 text-[9px] font-mono font-bold text-gray-800 uppercase tracking-wide truncate max-w-full">
                colleges
              </span>
            </button>

            {/* workshops sub-folder */}
            <button
              onClick={() => setEducationPath('workshops')}
              className="flex flex-col items-center justify-center p-3.5 w-24 h-24 border-2 border-black/10 hover:border-black bg-white/30 hover:bg-white/60 rounded-xl transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.05)] hover:shadow-[3.5px_3.5px_0px_#000] active:scale-95 group"
            >
              <RetroFolderIcon />
              <span className="mt-2 text-[9px] font-mono font-bold text-gray-800 uppercase tracking-wide truncate max-w-full">
                workshops
              </span>
            </button>

            {/* experience sub-folder */}
            <button
              onClick={() => setEducationPath('experience')}
              className="flex flex-col items-center justify-center p-3.5 w-24 h-24 border-2 border-black/10 hover:border-black bg-white/30 hover:bg-white/60 rounded-xl transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.05)] hover:shadow-[3.5px_3.5px_0px_#000] active:scale-95 group"
            >
              <RetroFolderIcon />
              <span className="mt-2 text-[9px] font-mono font-bold text-gray-800 uppercase tracking-wide truncate max-w-full">
                experience
              </span>
            </button>

            {/* skills sub-folder */}
            <button
              onClick={() => setEducationPath('skills')}
              className="flex flex-col items-center justify-center p-3.5 w-24 h-24 border-2 border-black/10 hover:border-black bg-white/30 hover:bg-white/60 rounded-xl transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.05)] hover:shadow-[3.5px_3.5px_0px_#000] active:scale-95 group"
            >
              <RetroFolderIcon />
              <span className="mt-2 text-[9px] font-mono font-bold text-gray-800 uppercase tracking-wide truncate max-w-full">
                skills
              </span>
            </button>
          </div>
        </div>
      );
    }

    if (educationPath === 'colleges') {
      return (
        <div className="space-y-4 font-sans animate-fade-in select-text">
          <button 
            onClick={() => setEducationPath('root')}
            className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase border-2 border-black bg-white text-[#586242] px-3 py-1.5 rounded shadow-[2px_2px_0px_#000] hover:bg-gray-100 cursor-pointer active:translate-y-[0.5px] active:shadow-[1px_1px_0px_#000]"
          >
            <ArrowLeft size={12} /> Up one level
          </button>

          <div className="space-y-4 max-h-[290px] overflow-y-auto pr-1">
            {/* GCASQC */}
            <div className="border-2 border-black bg-white rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] space-y-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#586242]/5 border border-[#586242]/20 text-[9px] text-[#586242] font-mono font-bold uppercase">
                Undergraduate
              </span>
              <h3 className="text-base font-extrabold text-gray-900 leading-tight">B.Sc. in Computer Science</h3>
              <p className="text-xs text-[#c85a17] font-mono font-bold">&gt; Govt. College of Arts, Science & Commerce, Quepem, Goa (Present)</p>
              <p className="text-gray-600 text-xs leading-relaxed pt-1.5 border-t border-black/5">
                Focusing on core computer science foundations, structural algorithm theories, computational mathematics, and database architecture models.
              </p>
            </div>

            {/* HSSC */}
            <div className="border-2 border-black bg-white rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] space-y-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-550/5 border border-black/10 text-[9px] text-gray-500 font-mono font-bold uppercase">
                Higher Secondary
              </span>
              <h3 className="text-base font-extrabold text-gray-900 leading-tight">Higher Secondary School (HSSC)</h3>
              <p className="text-xs text-gray-500 font-mono font-bold">&gt; Multipurpose Higher Secondary, Borda Margao (Completed)</p>
              <p className="text-gray-600 text-xs leading-relaxed pt-1">
                Science Stream: Physics, Chemistry, Biology, and Mathematics.
              </p>
            </div>

            {/* SSC */}
            <div className="border-2 border-black bg-white rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] space-y-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-550/5 border border-black/10 text-[9px] text-gray-500 font-mono font-bold uppercase">
                Secondary School
              </span>
              <h3 className="text-base font-extrabold text-gray-900 leading-tight">Secondary School (SSC)</h3>
              <p className="text-xs text-gray-500 font-mono font-bold">&gt; Popular High School Margao (Completed)</p>
              <p className="text-gray-600 text-xs leading-relaxed pt-1">
                Foundational high school education.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (educationPath === 'workshops') {
      return (
        <div className="space-y-4 font-sans animate-fade-in select-text">
          <button 
            onClick={() => setEducationPath('root')}
            className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase border-2 border-black bg-white text-[#586242] px-3 py-1.5 rounded shadow-[2px_2px_0px_#000] hover:bg-gray-100 cursor-pointer active:translate-y-[0.5px] active:shadow-[1px_1px_0px_#000]"
          >
            <ArrowLeft size={12} /> Up one level
          </button>

          <div className="space-y-4 max-h-[290px] overflow-y-auto pr-1">
            {WORKSHOPS.map((workshop, i) => (
              <div key={i} className="border-2 border-black bg-white rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] space-y-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#586242]/5 border border-[#586242]/20 text-[9px] text-[#586242] font-mono font-bold uppercase">
                  SPECIALIZED REGISTRY
                </span>
                <h3 className="text-base font-extrabold text-gray-900 leading-tight">{workshop.title}</h3>
                <p className="text-xs text-gray-550 font-mono font-bold">&gt; {workshop.organizer} — {workshop.period}</p>
                
                <div className="flex gap-2 text-[8px] font-mono font-bold">
                  {workshop.role && (
                    <span className="bg-yellow-100 border border-yellow-300 text-yellow-700 px-2 py-0.2 rounded">
                      Role: {workshop.role}
                    </span>
                  )}
                  {workshop.grade && (
                    <span className="bg-green-100 border border-green-300 text-green-700 px-2 py-0.2 rounded">
                      Grade: {workshop.grade}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-xs leading-relaxed">{workshop.description}</p>
                
                {workshop.certificate && (
                  <a 
                    href={workshop.certificate} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase border border-black bg-white hover:bg-gray-50 text-black px-3 py-1.5 rounded shadow-[1.5px_1.5px_0px_#000] cursor-pointer mt-1"
                  >
                    <Award size={11} className="text-[#586242]" /> View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (educationPath === 'experience') {
      return (
        <div className="space-y-4 font-sans animate-fade-in select-text">
          <button 
            onClick={() => setEducationPath('root')}
            className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase border-2 border-black bg-white text-[#586242] px-3 py-1.5 rounded shadow-[2px_2px_0px_#000] hover:bg-gray-100 cursor-pointer active:translate-y-[0.5px] active:shadow-[1px_1px_0px_#000]"
          >
            <ArrowLeft size={12} /> Up one level
          </button>

          <div className="space-y-4 max-h-[290px] overflow-y-auto pr-1">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="border-2 border-black bg-white rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] space-y-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#c85a17]/5 border border-[#c85a17]/20 text-[9px] text-[#c85a17] font-mono font-bold uppercase">
                  LEAP INTERNSHIP
                </span>
                <h3 className="text-base font-extrabold text-gray-900 leading-tight">{exp.role}</h3>
                <p className="text-xs text-gray-550 font-mono font-bold">&gt; {exp.company} — {exp.period}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{exp.description}</p>
                {exp.certificate && (
                  <a 
                    href={exp.certificate} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase border border-black bg-white hover:bg-gray-50 text-black px-3 py-1.5 rounded shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
                  >
                    <Award size={11} className="text-[#c85a17]" /> View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (educationPath === 'skills') {
      return (
        <div className="space-y-4 font-sans animate-fade-in select-text">
          <button 
            onClick={() => setEducationPath('root')}
            className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase border-2 border-black bg-white text-[#586242] px-3 py-1.5 rounded shadow-[2px_2px_0px_#000] hover:bg-gray-100 cursor-pointer active:translate-y-[0.5px] active:shadow-[1px_1px_0px_#000]"
          >
            <ArrowLeft size={12} /> Up one level
          </button>

          <div className="border-2 border-black bg-white rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] space-y-4 max-h-[290px] overflow-y-auto font-mono text-[10px] sm:text-xs">
            
            {/* Software Group */}
            <div className="space-y-2">
              <div className="text-[#c85a17] font-bold border-b border-[#c85a17]/20 pb-0.5 mb-2 uppercase tracking-wider">Software & Code</div>
              <div className="flex justify-between items-center"><span className="text-gray-600 font-bold">JavaScript/TypeScript</span> <span className="text-[#586242] font-bold">[██████████]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600 font-bold">React & Next.js</span> <span className="text-[#586242] font-bold">[████████░░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600 font-bold">Node.js & Python</span> <span className="text-[#586242] font-bold">[███████░░░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600 font-bold">C++ / Low-level</span> <span className="text-[#586242] font-bold">[█████░░░░░]</span></div>
            </div>

            {/* Hardware Group */}
            <div className="space-y-2 pt-2 border-t border-black/5">
              <div className="text-[#c85a17] font-bold border-b border-[#c85a17]/20 pb-0.5 mb-2 uppercase tracking-wider">Hardware & Tools</div>
              <div className="flex justify-between items-center"><span className="text-gray-600 font-bold">Arduino / ESP32</span> <span className="text-[#586242] font-bold">[████████░░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600 font-bold">Raspberry Pi</span> <span className="text-[#586242] font-bold">[███████░░░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600 font-bold">Circuit Design</span> <span className="text-[#586242] font-bold">[█████░░░░░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600 font-bold">Soldering</span> <span className="text-[#586242] font-bold">[█████████░]</span></div>
            </div>

            {/* Design Group */}
            <div className="space-y-2 pt-2 border-t border-black/5">
              <div className="text-[#c85a17] font-bold border-b border-[#c85a17]/20 pb-0.5 mb-2 uppercase tracking-wider">Design & Media</div>
              <div className="flex justify-between items-center"><span className="text-gray-600 font-bold">Figma / UI</span> <span className="text-[#586242] font-bold">[█████████░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600 font-bold">Photoshop</span> <span className="text-[#586242] font-bold">[███████░░░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600 font-bold">Premiere Pro</span> <span className="text-[#586242] font-bold">[██████░░░░]</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-600 font-bold">3D Modeling</span> <span className="text-[#586242] font-bold">[████░░░░░░]</span></div>
            </div>

          </div>
        </div>
      );
    }

    return null;
  };

  // Window 4: C:\ANGAD\ping (Transmitter Form)
  const renderPingWindow = () => {
    if (contactStatus === 'sending') {
      return (
        <div className="space-y-4 font-mono text-xs sm:text-sm p-4 text-[#586242]">
          <div className="font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#586242] animate-ping"></span>
            DISPATCHING SECURE DATA PACKET ON PORT 443...
          </div>
          
          <div className="w-full bg-white border border-black rounded-md overflow-hidden p-1 shadow-[1px_1px_0px_#000]">
            <div className="h-4 bg-[#c85a17] transition-all duration-300" style={{ width: `${contactProgress}%` }}></div>
          </div>

          <div className="bg-white/40 border border-black/10 rounded-lg p-3 space-y-1 text-gray-500 font-mono text-[10px] sm:text-xs">
            {contactLog.map((log, i) => (
              <div key={i}>&gt; {log}</div>
            ))}
          </div>
        </div>
      );
    }

    if (contactStatus === 'success') {
      return (
        <div className="space-y-4 text-center md:text-left font-sans p-2">
          <div className="w-12 h-12 rounded-full bg-[#586242]/10 border border-[#586242]/30 flex items-center justify-center mx-auto md:mx-0 shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
            <Check size={20} className="text-[#586242] animate-bounce" />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-gray-900 font-black text-lg uppercase font-mono">Transmission Complete!</h3>
            <p className="text-gray-600 text-xs">
              Handshake successfully verified. The secure data packet has been successfully delivered to Angad's server.
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-xl p-3.5 font-mono text-[10px] sm:text-xs text-left leading-relaxed shadow-[3px_3px_0px_#000]">
            <div><span className="text-gray-400 font-bold">STATUS:</span> <span className="text-black">SUCCESS (HTTPS / REST)</span></div>
            <div><span className="text-gray-400 font-bold">SIGNATURE:</span> <span className="text-[#c85a17] font-bold">TX-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span></div>
            <div><span className="text-gray-400 font-bold">TIMESTAMP:</span> <span className="text-gray-500">{new Date().toISOString()}</span></div>
          </div>

          <button 
            onClick={() => setContactStatus('idle')}
            className="w-full bg-[#c85a17] hover:bg-[#b04a10] border-2 border-black text-white font-mono font-bold uppercase tracking-wider py-2.5 rounded-lg shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer text-xs animate-fade-in"
          >
            Send Another Signal
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold">Your Name</label>
            <input 
              type="text" 
              required 
              value={contactName}
              onChange={e => setContactName(e.target.value)}
              className="bg-white border-2 border-black rounded-lg outline-none text-black px-3.5 py-2.5 text-xs focus:bg-white shadow-[2px_2px_0px_rgba(0,0,0,0.05)] focus:shadow-[3px_3px_0px_#000] transition-all font-sans" 
              placeholder="Name identifier" 
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold">Your Email</label>
            <input 
              type="email" 
              required 
              value={contactEmail}
              onChange={e => setContactEmail(e.target.value)}
              className="bg-white border-2 border-black rounded-lg outline-none text-black px-3.5 py-2.5 text-xs focus:bg-white shadow-[2px_2px_0px_rgba(0,0,0,0.05)] focus:shadow-[3px_3px_0px_#000] transition-all font-sans" 
              placeholder="Email coordinate" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold">Your Message</label>
          <textarea 
            required 
            rows={4} 
            value={contactMessage}
            onChange={e => setContactMessage(e.target.value)}
            className="bg-white border-2 border-black rounded-lg outline-none text-black px-3.5 py-2.5 text-xs resize-none focus:bg-white shadow-[2px_2px_0px_rgba(0,0,0,0.05)] focus:shadow-[3px_3px_0px_#000] transition-all font-sans" 
            placeholder="Type message block here..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#c85a17] hover:bg-[#b04a10] border-2 border-black text-white font-mono font-bold uppercase tracking-wider py-3 rounded-lg shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5"
        >
          <Send size={13} /> TRANSMIT SECURE SIGNAL
        </button>
      </form>
    );
  };

  // MAIN LAYOUT RETURN
  return (
    <div 
      className="w-full min-h-screen font-sans text-gray-800 relative z-20 flex flex-col items-center justify-between pb-8 select-none"
      style={{
        backgroundColor: '#faf6ee',
        backgroundImage: 'linear-gradient(to right, rgba(88, 98, 66, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(88, 98, 66, 0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      
      {/* 🖥️ DESKTOP AREA CANVAS */}
      <div className="w-full max-w-6xl px-4 md:px-8 pt-8 flex-1 flex flex-col justify-between">
        
        {/* Retro Header Info & Email Bar at the Top */}
        <div className="w-full border-2 border-black bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-lg shadow-[3px_3px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-2 mb-8 select-text">
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#586242] uppercase tracking-wider">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
            <span>ANGAD-OS v4.9 // STATUS: SECURE</span>
          </div>
          <a
            href="mailto:Parabangad123@gmail.com"
            className="font-mono text-xs font-bold text-[#c85a17] hover:text-[#b04a10] hover:underline underline-offset-2 transition-colors flex items-center gap-1.5"
          >
            ✉️ parabangad123@gmail.com
          </a>
        </div>

        {/* Sidebar desktop shortcuts columns */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 items-start gap-6 mt-2 mb-6">
          
          {/* Combined Left Sidebar / Mobile Top Desktop Icons */}
          <div className="md:col-span-2 flex flex-row flex-wrap md:flex-col items-center justify-center md:justify-start gap-5 sm:gap-6 pt-2 w-full">
            
            {/* whoami app icon (About Me) */}
            <button
              onClick={() => handleIconClick('whoami')}
              className="flex flex-col items-center group focus:outline-none cursor-pointer"
            >
              <div className={`p-1 transition-transform group-hover:scale-105 active:scale-95 ${activeWindow === 'whoami' ? 'bg-[#586242]/10 border-2 border-dashed border-[#586242] rounded-xl' : ''}`}>
                <RetroWhoamiIcon />
              </div>
              <span className="mt-2 text-[11px] font-mono font-bold text-gray-800 uppercase tracking-wide bg-white/60 border border-black/10 px-1.5 rounded">
                about me
              </span>
            </button>

            {/* projects folder icon */}
            <button
              onClick={() => handleIconClick('projects')}
              className="flex flex-col items-center group focus:outline-none cursor-pointer"
            >
              <div className={`p-1 transition-transform group-hover:scale-105 active:scale-95 ${activeWindow === 'projects' ? 'bg-[#586242]/10 border-2 border-dashed border-[#586242] rounded-xl' : ''}`}>
                <RetroFolderIcon />
              </div>
              <span className="mt-2 text-[11px] font-mono font-bold text-gray-800 uppercase tracking-wide bg-white/60 border border-black/10 px-1 rounded">
                projects
              </span>
            </button>

            {/* education folder icon */}
            <button
              onClick={() => handleIconClick('education')}
              className="flex flex-col items-center group focus:outline-none cursor-pointer"
            >
              <div className={`p-1 transition-transform group-hover:scale-105 active:scale-95 ${activeWindow === 'education' ? 'bg-[#586242]/10 border-2 border-dashed border-[#586242] rounded-xl' : ''}`}>
                <RetroFolderIcon />
              </div>
              <span className="mt-2 text-[11px] font-mono font-bold text-gray-800 uppercase tracking-wide bg-white/60 border border-black/10 px-1 rounded">
                education
              </span>
            </button>

            {/* ping folder icon (Contact Me) */}
            <button
              onClick={() => handleIconClick('ping')}
              className="flex flex-col items-center group focus:outline-none cursor-pointer"
            >
              <div className={`p-1 transition-transform group-hover:scale-105 active:scale-95 ${activeWindow === 'ping' ? 'bg-[#586242]/10 border-2 border-dashed border-[#586242] rounded-xl' : ''}`}>
                <RetroFolderIcon />
              </div>
              <span className="mt-2 text-[11px] font-mono font-bold text-gray-800 uppercase tracking-wide bg-white/60 border border-black/10 px-1.5 rounded">
                contact me
              </span>
            </button>

            {/* resume folder icon */}
            <button
              onClick={() => handleIconClick('resume')}
              className="flex flex-col items-center group focus:outline-none cursor-pointer"
            >
              <div className="p-1 transition-transform group-hover:scale-105 active:scale-95">
                <RetroFolderIcon />
              </div>
              <span className="mt-2 text-[11px] font-mono font-bold text-gray-800 uppercase tracking-wide bg-white/60 border border-black/10 px-1 rounded">
                resume
              </span>
            </button>

            {/* terminal app icon to switch back to terminal portfolio */}
            <button
              onClick={onSwitchToTerminal}
              className="flex flex-col items-center group focus:outline-none cursor-pointer"
              title="Switch to Hacker CLI mode"
            >
              <div className="p-1 transition-transform group-hover:scale-105 active:scale-95">
                <RetroTerminalIcon />
              </div>
              <span className="mt-2 text-[11px] font-mono font-bold text-gray-800 uppercase tracking-wide bg-white/60 border border-black/10 px-1 rounded">
                terminal
              </span>
            </button>

          </div>

          {/* Center Main Floating Application Window (Spans remaining 10 columns!) */}
          <div className="md:col-span-10 flex justify-center items-center py-2 h-full min-h-[380px] w-full">
            {activeWindow ? (
              <div 
                className={`w-full max-w-3xl border-[3px] border-black rounded-b-2xl shadow-[6px_6px_0px_#000] overflow-hidden flex flex-col animate-fade-in ${
                  activeWindow === 'hack' ? 'bg-black' : 'bg-[#faf6ee]'
                }`}
              >
                {/* Thick Olive Green Window Header Path */}
                <div className="bg-[#586242] border-b-[3px] border-black px-4 py-3 flex items-center justify-between select-none">
                  <span className="font-mono text-white text-[11px] font-bold uppercase tracking-wider">
                    {activeWindow === 'whoami' && 'C:\\ANGAD\\about_me'}
                    {activeWindow === 'projects' && 'C:\\ANGAD\\projects'}
                    {activeWindow === 'education' && `C:\\ANGAD\\education${educationPath !== 'root' ? '\\' + educationPath : ''}`}
                    {activeWindow === 'ping' && 'C:\\ANGAD\\contact_me'}
                  </span>
                  
                  {/* Retro Red Square Close Button */}
                  <button 
                    onClick={handleCloseWindow}
                    className="w-6 h-6 bg-[#d9534f] hover:bg-[#c9302c] border-2 border-black flex items-center justify-center text-white font-bold font-mono text-xs shadow-[1.5px_1.5px_0px_#000] active:translate-y-[0.5px] active:shadow-[0.5px_0.5px_0px_#000] focus:outline-none cursor-pointer"
                    title="Close Window"
                  >
                    ×
                  </button>
                </div>

                {/* Solid window body */}
                <div className="p-6 md:p-8 flex-1 bg-[#f5efe4]">
                  {activeWindow === 'whoami' && renderWhoamiWindow()}
                  {activeWindow === 'projects' && renderProjectsWindow()}
                  {activeWindow === 'education' && renderEducationWindow()}
                  {activeWindow === 'ping' && renderPingWindow()}
                </div>
              </div>
            ) : (
              <div className="text-center font-mono text-xs text-gray-500 bg-white/50 border-2 border-dashed border-black/20 rounded-2xl py-16 px-6 shadow-inner select-none flex flex-col items-center justify-center gap-2 w-full">
                <span>SYSTEM DISCONNECTED // STATUS: IDLE</span>
                <span className="text-[10px] text-gray-400">CLICK ANY SHORTCUT ICON ON THE DESKTOP TO LOAD PROGRAM CONSOLE</span>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 🚥 MIDDLE HORIZONTAL OLIVE GREEN DIVIDER BAND & SOCIAL APP BUTTONS */}
      <div className="w-full bg-[#586242] border-y-[3px] border-black py-3.5 flex items-center justify-center shadow-[0_4px_0px_rgba(0,0,0,0.06)] select-none">
        <div className="flex gap-5 sm:gap-7">
          {[
            { id: 'linkedin', url: 'https://www.linkedin.com/in/angad-parab130905/', color: 'bg-[#0077b5]', text: 'in' },
            { id: 'github', url: 'https://github.com/AngadParab', color: 'bg-[#333333]', text: 'git' },
            { id: 'instagram', url: 'https://www.instagram.com/the1nonly.angad/', color: 'bg-[#e1306c]', text: 'ig' },
            { id: 'facebook', url: 'https://www.facebook.com/angad.parab.7/', color: 'bg-[#1877f2]', text: 'fb' },
          ].map(app => (
            <a
              key={app.id}
              href={app.url}
              target="_blank"
              rel="noreferrer"
              className={`w-10 h-10 ${app.color} border-[2.5px] border-black rounded-xl flex items-center justify-center text-white font-black text-sm tracking-wide shadow-[3.5px_3.5px_0px_#000] hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0px_#000] active:translate-y-0 active:shadow-[1.5px_1.5px_0px_#000] transition-all cursor-pointer`}
              title={app.id}
            >
              {app.text}
            </a>
          ))}
        </div>
      </div>

      {/* Retro 90s system status clock footer bar */}
      <div className="w-full max-w-6xl px-4 md:px-8 mt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-gray-500 gap-2 select-none">
        <div>
          ANGAD-OS DESKTOP // CLICK FOLDER ICONS TO LOAD RETRO APPLICATION WINDOWS
        </div>
        <div className="hidden sm:block">
          SYSTEM_VER: RETRO_90S_V4.9 // STATUS: COMPILATION SECURED
        </div>
      </div>

    </div>
  );
};

export default StandardPortfolio;
