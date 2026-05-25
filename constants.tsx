import React from 'react';
import { Project, Experience, Workshop } from './types';
import Typewriter from './components/Typewriter';

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://www.instagram.com/the1nonly.angad/', icon: 'Instagram' },
  { name: 'Facebook', url: 'https://www.facebook.com/angad.parab.7/', icon: 'Facebook' },
  { name: 'GitHub', url: 'https://github.com/AngadParab', icon: 'Github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/angad-parab130905/', icon: 'Linkedin' },
];

export const PROJECTS: Project[] = [
  {
    title: "Cyber Ranger",
    description: "A community-driven cyber awareness initiative for Goa, empowering citizens to become cyber ambassadors. Features structured safety courses, real-time threat alerts, a secure password strength analyzer, and a custom Botpress AI assistant to educate against phishing, UPI fraud, and online scams.",
    tags: ["HTML5", "TailwindCSS", "JavaScript", "Firebase", "Botpress AI"],
    link: "https://cyber-ranger.web.app/",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/AngadParab/CYBER-RANGER.git",
    previewable: true
  },
  {
    title: "PlayMeet",
    description: "A full-stack matchmaking and event management platform bridging physical sports and competitive esports. Features dual-ecosystem profile tracking, a unified global points economy and rewards store, real-time WebSocket messaging, dynamic leaderboards, and automated tournament brackets.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "TailwindCSS", "Redis"],
    link: "https://playmeet-seven.vercel.app/",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/AngadParab/playmeet.git",
    previewable: true
  },
  {
    title: "SnapSort",
    description: "A high-performance native Android utility designed to resolve mobile storage bloat. It recursively scans directories like DCIM or Downloads, reads chronological media metadata, and performs file-system-level moves in milliseconds using Storage Access Framework (SAF) and DocumentsContract API.",
    tags: ["Kotlin", "Jetpack Compose", "Coroutines", "SAF API", "Android SDK"],
    link: "https://github.com/AngadParab/SnapSort",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/AngadParab/SnapSort.git",
    previewable: false
  },
  {
    title: "College Navigation Kiosk",
    description: "An interactive navigation and visitor check-in kiosk built for GCASQC Goa. Integrates a touch-screen professor directory, visitor check-in flow with Telegram alerts, SQLite data storage, and a serial hardware bridge connected to an ESP32 microcontroller for physical proximity wake-up.",
    tags: ["Python", "Flask", "SQLite", "HTML/CSS/JS", "IoT", "ESP32"],
    link: "https://github.com/AngadParab/College-Navigation-Kiosk",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/AngadParab/College-Navigation-Kiosk.git",
    previewable: false
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Lenovo Leap WD Internship",
    company: "Lenovo",
    period: "2024",
    description: "Completed the Lenovo Leap WD Internship program, gaining hands-on experience and insights into the tech industry.",
    certificate: "/lenovo-internship.jpg"
  }
];

export const WORKSHOPS: Workshop[] = [
  {
    title: "BootCamp Training on Drone Design and Electronics",
    organizer: "C-DAC (Centre for Development of Advanced Computing), Bengaluru",
    period: "Oct 13 - 17, 2025",
    description: "An intensive state-level training program on drone aerodynamics, assembly, electrical components calibration, and microcontrollers. Passed assessment with 'C' grade.",
    certificate: "/workshops/IMG_20260524_104058.jpg",
    grade: "C"
  },
  {
    title: "Cyber Crimes and Digital Hygiene Awareness Session",
    organizer: "Government College of Arts, Science and Commerce, Quepem, Goa",
    period: "2025",
    description: "Conducted an educational workshop as a guest speaker ('Cyber Yoddha') in association with Goa Police to train students in recognizing financial fraud, phishing, and securing digital accounts.",
    certificate: "/workshops/IMG_20260524_104108.jpg",
    role: "Speaker / Cyber Yoddha"
  },
  {
    title: "Computational Chemistry & Drug Design (Winter School)",
    organizer: "Goa College of Pharmacy (Supported by GSRF)",
    period: "Nov 24 - 28, 2025",
    description: "Attended a hands-on winter school exploring molecular modeling, docking platforms, and computational chemistry tools to design therapeutically active small molecules.",
    certificate: "/workshops/IMG_0320.jpg"
  },
  {
    title: "Computational Linguistics state-level workshop",
    organizer: "Directorate of Higher Education, Govt. of Goa",
    period: "Oct 3, 2025",
    description: "Participated in an academic seminar focused on corpus development, morphological analysis, NLP applications, and technology career pathways in language research.",
    certificate: "/workshops/IMG_20260524_104524.jpg"
  },
  {
    title: "Cyber Security & Ethical Hacking state-level workshop",
    organizer: "SPES's Goa Multi-Faculty College, Dharbandora-Goa",
    period: "March 13 - 14, 2026",
    description: "Engaged in hands-on labs for Wi-Fi penetration testing, network sniffing, SQL injection, system vulnerabilities assessment, and threat mitigation strategies.",
    certificate: "/workshops/IMG_20260524_104501.jpg"
  },
  {
    title: "Sentiment Analysis & Social Media Analytics national-level seminar",
    organizer: "Rosary College of Commerce & Arts, Navelim, Goa",
    period: "Feb 19, 2024",
    description: "Explored opinions mining methodologies, natural language processing pipelines, feature extraction models, and analytics workflows for social media platforms.",
    certificate: "/workshops/IMG_20260524_104513.jpg"
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
          { id: '1', cmd: 'whoami', desc: 'Opens about me' },
          { id: '2', cmd: 'cd education', desc: 'View education & skills' },
          { id: '3', cmd: 'ls projects', desc: 'View projects' },
          { id: '4', cmd: 'ping', desc: 'Send a message' },
          { id: '5', cmd: 'get resume', desc: 'Download Resume' },
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
