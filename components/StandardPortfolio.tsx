import React from 'react';
import { PROJECTS, EXPERIENCE } from '../constants';
import { Send, Terminal, Code2, Cpu, Sparkles } from 'lucide-react';

const StandardPortfolio: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto h-full p-4 md:p-8 font-mono animate-fade-in relative z-20 pb-24">
      
      {/* BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* ABOUT (Col Span 2) */}
        <div id="about" className="lg:col-span-2 bg-[#111111]/80 backdrop-blur-xl border border-divider hover:border-neonGreen/40 rounded-3xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-neonGreen/5 rounded-full blur-3xl group-hover:bg-neonGreen/10 transition-all duration-700"></div>
          
          <h1 className="font-pixel text-3xl md:text-4xl lg:text-5xl text-white tracking-widest mb-4 z-10">
            ANGAD PARAB
          </h1>
          <div className="text-neonGreen text-sm md:text-base font-bold mb-6 z-10 flex items-center gap-2">
            <Terminal size={16} /> System connection established.
          </div>
          
          <div className="space-y-4 max-w-2xl z-10">
            <p className="text-xl text-white font-bold tracking-wide leading-relaxed">
              I learn like a scientist: <span className="text-neonGreen">observe, experiment, break, rebuild, improve.</span>
            </p>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              I'm a naturally curious mind who loves understanding how things work—whether it’s technology, design, human behavior, or the hidden mechanics behind everyday systems. My goal isn’t to master one field, but to connect ideas across many of them and create something meaningful.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base hidden md:block">
              I believe that innovation comes from connecting ideas across different worlds—tech, design, science, creativity, and human behavior. My long-term aim is to stay curious, think boldly, experiment fearlessly, and contribute to ideas that push the world forward.
            </p>
          </div>
        </div>

        {/* EXPERIENCE (Col Span 1) */}
        <div id="experience" className="lg:col-span-1 bg-[#111111]/80 backdrop-blur-xl border border-divider hover:border-pixelPink/40 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group h-[400px] lg:h-auto">
          <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-pixelPink/5 rounded-full blur-3xl group-hover:bg-pixelPink/10 transition-all duration-700"></div>
          
          <h2 className="text-white font-bold text-xl mb-6 z-10 flex items-center gap-2">
            <Sparkles size={18} className="text-pixelPink" /> Career History
          </h2>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6 z-10 custom-scrollbar">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="border-l-2 border-divider pl-4 relative group/item hover:border-pixelPink transition-colors">
                <div className="absolute w-2 h-2 bg-divider rounded-full -left-[5px] top-1.5 group-hover/item:bg-pixelPink transition-colors"></div>
                <div className="text-white font-bold">{exp.role}</div>
                <div className="text-mint text-xs mb-2">{exp.company} • {exp.period}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS (Col Span 1) */}
        <div id="skills" className="lg:col-span-1 bg-[#111111]/80 backdrop-blur-xl border border-divider hover:border-mint/40 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-mint/5 rounded-full blur-3xl group-hover:bg-mint/10 transition-all duration-700"></div>
          
          <h2 className="text-white font-bold text-xl mb-6 z-10 flex items-center gap-2">
            <Cpu size={18} className="text-mint" /> Experimentation
          </h2>
          
          <ul className="space-y-4 text-xs md:text-sm text-gray-400 z-10 mt-2">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-neonGreen"></div> Software & AI</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-mint"></div> XR & Robotics</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-pixelPink"></div> UI/UX & 3D Modeling</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-mustard"></div> Personal Development</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white"></div> Limitless Curiosity</li>
          </ul>
        </div>

        {/* CONTACT (Col Span 2) */}
        <div id="contact" className="lg:col-span-2 bg-[#111111]/80 backdrop-blur-xl border border-divider hover:border-mustard/40 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-mustard/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none"></div>
          
          <h2 className="text-white font-bold text-xl mb-6 z-10 flex items-center gap-2">
            <Send size={18} className="text-mustard" /> Initialize Communication
          </h2>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 z-10 w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Identity</label>
              <input type="text" required className="bg-pageBg/50 border border-divider focus:border-mustard rounded-lg outline-none text-white px-4 py-2.5 font-mono text-sm transition-colors" placeholder="Enter your name" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Signal</label>
              <input type="email" required className="bg-pageBg/50 border border-divider focus:border-mustard rounded-lg outline-none text-white px-4 py-2.5 font-mono text-sm transition-colors" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Payload</label>
              <textarea required rows={2} className="bg-pageBg/50 border border-divider focus:border-mustard rounded-lg outline-none text-white px-4 py-2.5 font-mono text-sm resize-none transition-colors" placeholder="Type your message..."></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="submit" className="bg-white hover:bg-mustard text-black px-6 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-bold text-sm">
                TRANSMIT
              </button>
            </div>
          </form>
        </div>

        {/* PROJECTS (Col Span 3) */}
        <div id="work" className="lg:col-span-3 bg-[#111111]/80 backdrop-blur-xl border border-divider hover:border-white/20 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group mt-2">
          <h2 className="text-white font-bold text-xl mb-6 z-10 flex items-center gap-2">
            <Code2 size={18} className="text-white" /> Project Repositories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
            {PROJECTS.map((proj, i) => (
              <a key={i} href={proj.link} target="_blank" rel="noreferrer" className="group/card bg-pageBg/80 border border-divider hover:border-neonGreen/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="h-40 bg-gray-800 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-pageBg to-transparent z-10"></div>
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 transition-opacity duration-500 group-hover/card:scale-105" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="text-white font-bold text-base mb-2 group-hover/card:text-neonGreen transition-colors">{proj.title}</h4>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.tags.map(tag => (
                      <span key={tag} className="text-[9px] px-2 py-0.5 bg-divider/50 text-gray-400 rounded-full border border-divider">{tag}</span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs mb-4 flex-1 line-clamp-3">{proj.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StandardPortfolio;
