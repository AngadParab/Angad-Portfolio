import React, { useState } from 'react';
import { PROJECTS, EXPERIENCE, WORKSHOPS } from '../constants';
import TerminalWindow from './Terminal';
import { 
  Send, 
  Terminal as TermIcon, 
  Code2, 
  Cpu, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Shield, 
  Activity, 
  Layers, 
  ExternalLink,
  Github,
  User,
  Wrench,
  Palette
} from 'lucide-react';

interface StandardPortfolioProps {
  onSwitchToTerminal: () => void;
}

const StandardPortfolio: React.FC<StandardPortfolioProps> = ({ onSwitchToTerminal }) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState<'software' | 'hardware' | 'design'>('software');
  const [projectFilter, setProjectFilter] = useState<string>('ALL');

  // Collect all unique tags from projects for filtering
  const allTags = ['ALL', ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];

  const filteredProjects = projectFilter === 'ALL' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tags.includes(projectFilter));

  const skillsData = {
    software: [
      { name: "JavaScript / TypeScript", level: 95, color: "bg-neonGreen shadow-neonGreen/30" },
      { name: "React & Next.js", level: 85, color: "bg-mint shadow-mint/30" },
      { name: "Node.js & Python", level: 75, color: "bg-pixelPink shadow-pixelPink/30" },
      { name: "C++ / Low-level", level: 55, color: "bg-mustard shadow-mustard/30" },
    ],
    hardware: [
      { name: "Arduino / ESP32 Development", level: 85, color: "bg-mint shadow-mint/30" },
      { name: "Raspberry Pi & Linux Systems", level: 70, color: "bg-neonGreen shadow-neonGreen/30" },
      { name: "Circuit Design & Prototyping", level: 60, color: "bg-mustard shadow-mustard/30" },
      { name: "Soldering & Assembly", level: 90, color: "bg-pixelPink shadow-pixelPink/30" },
    ],
    design: [
      { name: "Figma / UI & UX Prototyping", level: 90, color: "bg-pixelPink shadow-pixelPink/30" },
      { name: "Adobe Photoshop / Vector Art", level: 70, color: "bg-neonGreen shadow-neonGreen/30" },
      { name: "Premiere Pro / Video Editing", level: 60, color: "bg-mustard shadow-mustard/30" },
      { name: "3D Modeling & Rendering", level: 45, color: "bg-mint shadow-mint/30" },
    ]
  };

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 font-mono text-gray-300 relative z-20 pb-24 px-4 md:px-8">
      
      {/* 🚀 SCI-FI GLOW OVERLAYS */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-neonGreen/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-pixelPink/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* ====================================================
          DESKTOP & MOBILE SHORTCUT SIDEBAR/NAVBAR
         ==================================================== */}
      <aside className="w-full lg:w-32 shrink-0 p-3 lg:p-8 flex flex-row lg:flex-col gap-4 lg:gap-8 justify-around lg:justify-start items-center border border-white/[0.08] bg-black/85 lg:bg-black/60 backdrop-blur-md lg:backdrop-blur-sm rounded-2xl lg:rounded-3xl sticky top-2 lg:top-24 h-fit z-30 select-none overflow-x-auto lg:overflow-visible">
        
        {/* About Icon (Opens About Terminal in Window Overlay) */}
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="flex flex-col items-center gap-1.5 group active:scale-95 transition-all cursor-pointer"
        >
          <div className="bg-[#fbd971]/10 p-2 lg:p-2.5 border border-[#fbd971]/30 rounded-xl shadow-[0_0_10px_rgba(251,217,113,0.1)] group-hover:bg-[#fbd971]/20 transition-all flex items-center justify-center">
            <User size={22} className="text-[#fbd971] group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-gray-400 font-bold text-[8px] lg:text-[9px] uppercase tracking-wider group-hover:text-white transition-colors">
            about
          </span>
        </button>

        {/* Skills Icon (Closes Terminal Window, Scrolls to Section) */}
        <button
          onClick={() => {
            setIsTerminalOpen(false);
            smoothScrollTo('skills');
          }}
          className="flex flex-col items-center gap-1.5 group active:scale-95 transition-all cursor-pointer"
        >
          <div className="bg-mint/10 p-2 lg:p-2.5 border border-mint/30 rounded-xl shadow-[0_0_10px_rgba(158,240,106,0.1)] group-hover:bg-mint/20 transition-all flex items-center justify-center">
            <Cpu size={22} className="text-mint group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-gray-400 font-bold text-[8px] lg:text-[9px] uppercase tracking-wider group-hover:text-white transition-colors">
            skills
          </span>
        </button>

        {/* Timeline Icon (Closes Terminal Window, Scrolls to Section) */}
        <button
          onClick={() => {
            setIsTerminalOpen(false);
            smoothScrollTo('education-workshops');
          }}
          className="flex flex-col items-center gap-1.5 group active:scale-95 transition-all cursor-pointer"
        >
          <div className="bg-pixelPink/10 p-2 lg:p-2.5 border border-pixelPink/30 rounded-xl shadow-[0_0_10px_rgba(244,114,182,0.1)] group-hover:bg-pixelPink/20 transition-all flex items-center justify-center">
            <Award size={22} className="text-pixelPink group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-gray-400 font-bold text-[8px] lg:text-[9px] uppercase tracking-wider group-hover:text-white transition-colors">
            registry
          </span>
        </button>

        {/* Works Icon (Closes Terminal Window, Scrolls to Section) */}
        <button
          onClick={() => {
            setIsTerminalOpen(false);
            smoothScrollTo('work');
          }}
          className="flex flex-col items-center gap-1.5 group active:scale-95 transition-all cursor-pointer"
        >
          <div className="bg-white/5 p-2 lg:p-2.5 border border-white/20 rounded-xl shadow-[0_0_10px_rgba(255,255,255,0.05)] group-hover:bg-white/10 transition-all flex items-center justify-center">
            <Code2 size={22} className="text-white group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-gray-400 font-bold text-[8px] lg:text-[9px] uppercase tracking-wider group-hover:text-white transition-colors">
            showroom
          </span>
        </button>

        {/* Contact Icon (Closes Terminal Window, Scrolls to Section) */}
        <button
          onClick={() => {
            setIsTerminalOpen(false);
            smoothScrollTo('contact');
          }}
          className="flex flex-col items-center gap-1.5 group active:scale-95 transition-all cursor-pointer"
        >
          <div className="bg-mustard/10 p-2 lg:p-2.5 border border-mustard/30 rounded-xl shadow-[0_0_10px_rgba(234,179,8,0.1)] group-hover:bg-mustard/20 transition-all flex items-center justify-center">
            <Send size={22} className="text-mustard group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-gray-400 font-bold text-[8px] lg:text-[9px] uppercase tracking-wider group-hover:text-white transition-colors">
            transmit
          </span>
        </button>

        {/* Terminal Icon (Triggers switch to full-screen interactive Terminal view mode) */}
        <button
          onClick={onSwitchToTerminal}
          className="flex flex-col items-center gap-1.5 group active:scale-95 transition-all cursor-pointer"
        >
          <div className="bg-neonGreen/10 p-2 lg:p-2.5 border border-neonGreen/30 rounded-xl shadow-[0_0_10px_rgba(158,240,106,0.15)] group-hover:bg-neonGreen/20 transition-all flex items-center justify-center">
            <TermIcon size={22} className="text-neonGreen group-hover:scale-110 transition-transform" strokeWidth={2} />
          </div>
          <span className="text-gray-400 font-bold text-[8px] lg:text-[9px] uppercase tracking-wider group-hover:text-white transition-colors">
            terminal
          </span>
        </button>
      </aside>

      {/* ====================================================
          MAIN DASHBOARD BENTO BOX SPACE
         ==================================================== */}
      <div className="flex-1 space-y-8">
        
        {/* ====================================================
            1. HERO SECTION (Cybernetic Identity Card)
           ==================================================== */}
        <section id="about" className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-black/60 backdrop-blur-2xl p-6 md:p-10 group">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          {/* Decorative scanner line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neonGreen/20 to-transparent group-hover:animate-scanner pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Left Column: Avatar & Status */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-6 lg:pb-0 lg:pr-8">
              <div className="w-full text-center lg:text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neonGreen/30 bg-neonGreen/5 text-[10px] text-neonGreen font-bold tracking-widest uppercase">
                  <Activity size={10} className="animate-pulse" /> UPLINK_ESTABLISHED
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter select-none uppercase">
                  ANGAD<br className="hidden lg:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonGreen via-mint to-pixelPink">PARAB</span>
                </h1>
                
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  System Architect & Security Inquisitive. Connecting low-level circuits, modular software systems, and immersive visual design.
                </p>
              </div>

              <div className="w-full mt-6 space-y-2 border-t border-white/[0.05] pt-4 text-xs">
                <div className="flex justify-between"><span className="text-gray-500">HOST_OS</span> <span className="text-white font-bold">Linux-X64</span></div>
                <div className="flex justify-between"><span className="text-gray-500">SIGNAL_STATUS</span> <span className="text-mint font-bold">● ACTIVE</span></div>
                <div className="flex justify-between"><span className="text-gray-500">ROLE_CLASS</span> <span className="text-mustard font-bold">Jack of all Trades</span></div>
              </div>
            </div>

            {/* Right Column: Mission Core */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-2 text-white font-bold text-lg tracking-widest uppercase">
                <TermIcon size={18} className="text-neonGreen" /> MISSION_INTRODUCTION
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p className="text-lg md:text-xl font-bold leading-relaxed text-white">
                  I learn like a scientist: <span className="text-neonGreen underline decoration-neonGreen/30 underline-offset-4">observe, experiment, break, rebuild, and optimize.</span>
                </p>
                <p className="leading-relaxed text-sm md:text-base text-gray-400">
                  I am a naturally curious engineer driven by the thrill of discovering how systems operate—from high-level web stacks to bare-metal microcontrollers and visual human interfaces. Rather than specializing in a narrow vertical, I build horizontally, combining insights from software architecture, cybersecurity, and hardware design.
                </p>
                <p className="leading-relaxed text-sm md:text-base text-gray-400 hidden md:block">
                  I believe that true innovation lies at the intersections of distinct disciplines. I design with empathy, code with modularity, and test with paranoia—crafting digital experiences that feel robust, highly secure, and dynamically alive.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 text-[10px] text-gray-400 font-bold uppercase">
                <span className="px-3 py-1 border border-white/[0.08] bg-white/[0.02] rounded-md">Continuous Learning</span>
                <span className="px-3 py-1 border border-white/[0.08] bg-white/[0.02] rounded-md">Threat Mitigation</span>
                <span className="px-3 py-1 border border-white/[0.08] bg-white/[0.02] rounded-md">Hardware Interfacing</span>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            2. INTERACTIVE SKILLS & TIMELINE COMBINED ROW
           ==================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* A. Core Competencies Matrix (lg:col-span-5) */}
          <section id="skills" className="lg:col-span-5 border border-white/[0.07] bg-black/60 backdrop-blur-2xl rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-mint/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-6 border-b border-white/[0.07] pb-4">
              <h2 className="text-white font-bold text-lg flex items-center gap-2 tracking-widest uppercase">
                <Cpu size={18} className="text-mint" /> Skill Matrix
              </h2>
              {/* Telemetry Tag */}
              <span className="text-[9px] text-gray-500 font-bold">SYS.LNK // SKILLS</span>
            </div>

            {/* Interactive Category Selector Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl mb-6">
              {[
                { id: 'software', label: 'Code', icon: Code2 },
                { id: 'hardware', label: 'Hardware', icon: Wrench },
                { id: 'design', label: 'Creative', icon: Palette }
              ].map(tab => {
                const Icon = tab.icon;
                const active = activeSkillTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSkillTab(tab.id as any)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1 text-[10px] md:text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                      active 
                        ? 'bg-white/[0.08] text-white shadow-inner border-t border-white/[0.05]' 
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <Icon size={12} className={active ? 'text-mint' : ''} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Progress Bars Container */}
            <div className="flex-1 flex flex-col justify-center space-y-6">
              {skillsData[activeSkillTab].map((skill, index) => (
                <div key={index} className="space-y-2 group/bar">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-300 group-hover/bar:text-white transition-colors">{skill.name}</span>
                    <span className="text-mint">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.03] border border-white/[0.06] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* HUD Footer */}
            <div className="mt-8 border-t border-white/[0.05] pt-4 text-[10px] text-gray-500 flex justify-between">
              <span>ACTIVE_COMPILATION: ON</span>
              <span>ENGINE: V8-CORE</span>
            </div>
          </section>

          {/* B. Academic Registry & Workshops Timeline (lg:col-span-7) */}
          <section id="education-workshops" className="lg:col-span-7 border border-white/[0.07] bg-black/60 backdrop-blur-2xl rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute -left-20 -top-20 w-48 h-48 bg-pixelPink/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="flex items-center justify-between mb-6 border-b border-white/[0.07] pb-4">
              <h2 className="text-white font-bold text-lg flex items-center gap-2 tracking-widest uppercase">
                <GraduationCap size={20} className="text-pixelPink" /> Registry & Timeline
              </h2>
              <span className="text-[9px] text-gray-500 font-bold">SYS.LNK // ACADEMICS</span>
            </div>

            {/* Custom Scrollable Timeline */}
            <div className="flex-1 overflow-y-auto max-h-[420px] pr-2 space-y-8 custom-scrollbar">
              
              {/* Lenovo Internship */}
              {EXPERIENCE.map((exp, i) => (
                <div key={`exp-${i}`} className="relative pl-6 border-l-2 border-white/[0.08] hover:border-pixelPink transition-colors group/item pb-2">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#222] border border-white/[0.2] group-hover/item:bg-pixelPink group-hover/item:border-pixelPink transition-all duration-300"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-pixelPink/5 border border-pixelPink/20 text-[9px] text-pixelPink font-bold uppercase tracking-wider mb-1">
                        Professional Internship
                      </span>
                      <h3 className="text-white font-bold text-base group-hover/item:text-pixelPink transition-colors">{exp.role}</h3>
                      <h4 className="text-mint text-xs mt-0.5">{exp.company}</h4>
                    </div>
                    <span className="text-gray-500 text-xs font-mono">{exp.period}</span>
                  </div>
                  
                  <p className="text-gray-400 text-xs leading-relaxed mt-2.5">{exp.description}</p>
                  
                  {exp.certificate && (
                    <a 
                      href={exp.certificate} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 text-[9px] text-gray-400 hover:text-white border border-white/[0.08] hover:border-white px-2 py-1 rounded bg-white/[0.02] mt-3 transition-colors"
                    >
                      <Award size={11} className="text-pixelPink" /> Decrypt Certificate
                    </a>
                  )}
                </div>
              ))}

              {/* Workshops & Trainings */}
              {WORKSHOPS.map((workshop, i) => (
                <div key={`work-${i}`} className="relative pl-6 border-l-2 border-white/[0.08] hover:border-mint transition-colors group/item pb-2">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#222] border border-white/[0.2] group-hover/item:bg-mint group-hover/item:border-mint transition-all duration-300"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-mint/5 border border-mint/20 text-[9px] text-mint font-bold uppercase tracking-wider mb-1">
                        Workshop Training
                      </span>
                      <h3 className="text-white font-bold text-base group-hover/item:text-mint transition-colors">{workshop.title}</h3>
                      <h4 className="text-gray-400 text-xs mt-0.5">{workshop.organizer}</h4>
                    </div>
                    <span className="text-gray-500 text-xs font-mono">{workshop.period}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {workshop.role && (
                      <span className="inline-block text-[9px] px-2 py-0.5 bg-mustard/10 text-mustard border border-mustard/20 rounded font-bold">
                        {workshop.role}
                      </span>
                    )}
                    {workshop.grade && (
                      <span className="inline-block text-[9px] px-2 py-0.5 bg-neonGreen/10 text-neonGreen border border-neonGreen/20 rounded font-bold">
                        Grade: {workshop.grade}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-xs leading-relaxed mt-2.5">{workshop.description}</p>
                  
                  {workshop.certificate && (
                    <a 
                      href={workshop.certificate} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 text-[9px] text-gray-400 hover:text-white border border-white/[0.08] hover:border-white px-2 py-1 rounded bg-white/[0.02] mt-3 transition-colors"
                    >
                      <Award size={11} className="text-mint" /> View Certificate
                    </a>
                  )}
                </div>
              ))}

              {/* Education Background */}
              <div className="border-t border-white/[0.05] pt-6 space-y-6">
                <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest pl-6">Formal Academic History</h4>
                
                {[
                  { title: "B.Sc. in Computer Science", org: "GCASQC, Quepem, Goa", period: "Present", desc: "Focusing on core CS theory, computational mathematics, and cybersecurity protocols." },
                  { title: "Higher Secondary School (HSSC)", org: "Multipurpose HSS, Borda Margao", period: "Completed", desc: "Science major covering Advanced Physics, Chemistry, Biology, and Mathematics." },
                  { title: "Secondary School (SSC)", org: "Popular High School Margao", period: "Completed", desc: "General science and mathematics foundation." }
                ].map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-white/[0.08] hover:border-mustard transition-colors group/item">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#222] border border-white/[0.2] group-hover/item:bg-mustard group-hover/item:border-mustard transition-all duration-300"></div>
                    <div className="flex justify-between items-start text-xs sm:text-sm">
                      <div>
                        <h3 className="text-white font-bold group-hover/item:text-mustard transition-colors">{edu.title}</h3>
                        <h4 className="text-gray-400 text-xs mt-0.5">{edu.org}</h4>
                      </div>
                      <span className="text-gray-500 text-xs font-mono">{edu.period}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed mt-2">{edu.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* ====================================================
            3. PROJECTS SHOWROOM (Interactive Grid with Filters)
           ==================================================== */}
        <section id="work" className="border border-white/[0.07] bg-black/60 backdrop-blur-2xl rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group">
          <div className="absolute left-1/2 -top-40 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/[0.07] pb-6">
            <div className="space-y-1">
              <h2 className="text-white font-bold text-xl flex items-center gap-2 tracking-widest uppercase">
                <Code2 size={20} className="text-white" /> Cyber Showroom
              </h2>
              <p className="text-gray-500 text-xs leading-none">REPOSITORIES DEPLOYED AND ONLINE</p>
            </div>
            
            {/* Filter Tags */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl self-start max-w-full overflow-x-auto">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setProjectFilter(tag)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    projectFilter === tag 
                      ? 'bg-white text-black shadow-lg font-extrabold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj, i) => (
              <a 
                key={i} 
                href={proj.link} 
                target="_blank" 
                rel="noreferrer" 
                className="group/card border border-white/[0.07] hover:border-white/[0.18] bg-white/[0.01] hover:bg-white/[0.02] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 flex flex-col relative"
              >
                {/* Glowing neon bottom border */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-mint to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                
                {/* Visual Header */}
                <div className="h-44 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10"></div>
                  {/* Grid HUD Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] z-10"></div>
                  
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover opacity-60 group-hover/card:opacity-90 group-hover/card:scale-105 transition-all duration-700" 
                  />
                  
                  {/* Category Telemetry */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <span className="px-2 py-0.5 border border-white/[0.12] bg-black/80 text-white font-mono text-[8px] tracking-widest uppercase rounded">
                      VER_0{i + 1}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col relative z-20">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold text-base group-hover/card:text-neonGreen transition-colors flex items-center gap-1.5">
                      {proj.title}
                    </h3>
                    <ExternalLink size={12} className="text-gray-500 group-hover/card:text-white transition-colors" />
                  </div>
                  
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {proj.tags.map(tag => (
                      <span key={tag} className="text-[8px] px-2 py-0.5 bg-white/[0.03] text-gray-400 rounded-md border border-white/[0.06] group-hover/card:border-white/[0.12] transition-colors">{tag}</span>
                    ))}
                  </div>
                  
                  <p className="text-gray-400 text-xs leading-relaxed flex-1 line-clamp-3 group-hover/card:text-gray-300 transition-colors">
                    {proj.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ====================================================
            4. SIGNAL TRANSMIT CENTER (Contact Terminal)
           ==================================================== */}
        <section id="contact" className="border border-white/[0.07] bg-black/60 backdrop-blur-2xl rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-mustard/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex items-center justify-between mb-8 border-b border-white/[0.07] pb-6">
            <div className="space-y-1">
              <h2 className="text-white font-bold text-xl flex items-center gap-2 tracking-widest uppercase">
                <Send size={18} className="text-mustard" /> Direct Transmitter
              </h2>
              <p className="text-gray-500 text-xs leading-none">SEND ENCRYPTED SIGNALS DIRECTLY TO THE NODE</p>
            </div>
            <span className="text-[9px] text-gray-500 font-bold">SYS.LNK // PING</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Form */}
            <form className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 z-10 w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Identity Identifier</label>
                <input 
                  type="text" 
                  required 
                  className="bg-white/[0.02] border border-white/[0.08] focus:border-mustard rounded-xl outline-none text-white px-4 py-3 font-mono text-xs transition-all duration-300 focus:bg-white/[0.04]" 
                  placeholder="Enter your name" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Signal Target (Email)</label>
                <input 
                  type="email" 
                  required 
                  className="bg-white/[0.02] border border-white/[0.08] focus:border-mustard rounded-xl outline-none text-white px-4 py-3 font-mono text-xs transition-all duration-300 focus:bg-white/[0.04]" 
                  placeholder="Enter your email" 
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Payload Matrix (Message)</label>
                <textarea 
                  required 
                  rows={4} 
                  className="bg-white/[0.02] border border-white/[0.08] focus:border-mustard rounded-xl outline-none text-white px-4 py-3 font-mono text-xs resize-none transition-all duration-300 focus:bg-white/[0.04]" 
                  placeholder="Type your secure message packet here..."
                ></textarea>
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button 
                  type="submit" 
                  className="bg-white hover:bg-mustard text-black hover:text-black font-extrabold text-xs px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] cursor-pointer"
                >
                  TRANSMIT SIGNAL
                </button>
              </div>
            </form>

            {/* Diagnostic Telemetry Panel (Left column on large screens) */}
            <div className="lg:col-span-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-4">
              <h3 className="text-gray-300 font-bold text-xs uppercase tracking-widest border-b border-white/[0.07] pb-2 flex items-center gap-2">
                <Shield size={14} className="text-mustard" /> SECURITY_SHEET
              </h3>
              
              <div className="space-y-3 text-xs leading-relaxed text-gray-400">
                <p>
                  Direct transmission utilizes standard REST routing over a TLS/SSL secure handshake to forward your email payload directly.
                </p>
                <div className="space-y-1 pt-2 font-mono text-[10px]">
                  <div>METHOD: <span className="text-white">POST</span></div>
                  <div>CIPHER: <span className="text-white">ECDHE-RSA-AES128-GCM-SHA256</span></div>
                  <div>END_POINT: <span className="text-mustard">angadparab.tech/api/ping</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ====================================================
          FLOATING INTERACTIVE TERMINAL WINDOW OVERLAY
         ==================================================== */}
      {isTerminalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12 animate-fade-in animate-duration-300">
          <div className="w-full max-w-4xl animate-zoom-in relative">
            <TerminalWindow onClose={() => setIsTerminalOpen(false)} initialCommand="whoami" />
          </div>
        </div>
      )}

    </div>
  );
};

export default StandardPortfolio;
