import React from 'react';
import { Project, Experience } from './types';
import Typewriter from './components/Typewriter';

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://www.instagram.com/the1nonly.angad/', icon: 'Instagram' },
  { name: 'Facebook', url: 'https://www.facebook.com/angad.parab.7/', icon: 'Facebook' },
  { name: 'GitHub', url: 'https://github.com/AngadParab', icon: 'Github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/angad-parab130905/', icon: 'Linkedin' },
];

export const PROJECTS: Project[] = [
  {
    title: "Software Architecture & Web Apps",
    description: "Building scalable, high-performance web applications using modern frameworks like React, Node.js, and TypeScript. Turning complex problems into elegant user interfaces.",
    tags: ["React", "TypeScript", "Node.js"],
    link: "https://github.com/AngadParab",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Hardware Tinkering & IoT",
    description: "Bridging the gap between the physical and digital worlds. Experimenting with microcontrollers, sensors, and low-level programming to build interactive hardware.",
    tags: ["Arduino", "C++", "Sensors"],
    link: "https://github.com/AngadParab",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Digital Design & Media",
    description: "Exploring the creative side of technology. Crafting 3D visuals, editing media, and designing intuitive user experiences that captivate and engage.",
    tags: ["Design", "3D Modeling", "Video"],
    link: "https://github.com/AngadParab",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Independent Creator & Technologist",
    company: "Self-Employed",
    period: "Ongoing",
    description: "Diving into various disciplines from frontend engineering to hardware hacking. Continuously learning new tools to build whatever idea comes to mind."
  },
  {
    role: "Software Developer",
    company: "Various Projects",
    period: "2020 - Present",
    description: "Developed end-to-end web applications and scripts. Specialized in finding pragmatic solutions to complex problems, regardless of the technology stack."
  }
];

export const WELCOME_MSG = (
  <div className="mb-6 space-y-4">
    <h1 className="font-pixel text-3xl md:text-5xl lg:text-6xl text-pixelPink tracking-widest mb-2 select-none animate-fade-in">
    ANGAD PARAB
    </h1>
    <div className="text-neonGreen text-lg md:text-xl font-bold border-b border-neonGreen/20 pb-2 w-fit animate-fade-in" style={{ animationDelay: '0.1s' }}>
      &gt; Jack of all trades, master of some
    </div>
    <div className="text-gray-300 max-w-2xl leading-relaxed animate-fade-in min-h-[5rem]" style={{ animationDelay: '0.2s' }}>
      <Typewriter 
        text="System connection established. Welcome to my interactive node. I engineer software, hack hardware, and architect solutions across the full stack—using whatever exploits or tools are necessary to get the system online." 
        delay={25} 
      />
      <br />
      <span className="inline-block mt-4 animate-fade-in opacity-0" style={{ animationDelay: '4s', animationFillMode: 'forwards' }}>
        <button className="text-neonGreen hover:text-mint hover:underline decoration-mint decoration-2 underline-offset-4 cursor-pointer transition-all">
          Explore the Terminal
        </button>
      </span>
    </div>
    
    <div className="mt-6 grid gap-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="text-gray-400 text-sm mb-2">Available Commands:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-xl">
        {[
          { id: '1', cmd: 'open aboutMe', desc: 'Opens about me' },
          { id: '2', cmd: 'open experience', desc: 'View career path' },
          { id: '3', cmd: 'open work', desc: 'View projects' },
          { id: '4', cmd: 'cat skills.txt', desc: 'View tech & hardware stack' },
          { id: '5', cmd: 'run contactMe', desc: 'Send a message' },
        ].map((item) => (
          <div key={item.id} className="font-mono text-sm group cursor-pointer">
            <span className="text-mustard mr-2">[{item.id}]</span>
            <span className="text-mustard group-hover:text-mint transition-colors">[{item.cmd}]</span>
            <span className="text-gray-500 mx-2">:</span>
            <span className="text-neonGreen">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
