import React, { useState, useEffect } from 'react';

const SystemHUD: React.FC = () => {
  const [memory, setMemory] = useState(42);
  const [latency, setLatency] = useState(12);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const memInterval = setInterval(() => {
      setMemory(Math.floor(Math.random() * 15) + 35); // Fluctuates between 35 and 50
    }, 2000);

    const latInterval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 8) + 10); // Fluctuates between 10 and 18
    }, 1000);

    const upInterval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(memInterval);
      clearInterval(latInterval);
      clearInterval(upInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
      {/* Top Left */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-[#00F0FF]/50 opacity-70">
        <div>SYS.VER 4.2.1</div>
        <div>UPLINK: SECURE</div>
        <div className="flex items-center gap-1 mt-1">
          <div className="w-1.5 h-1.5 bg-neonGreen rounded-full animate-pulse"></div>
          STATUS: ONLINE
        </div>
      </div>

      {/* Top Right */}
      <div className="absolute top-4 right-4 font-mono text-[10px] text-[#00F0FF]/50 text-right opacity-70">
        <div>LAT: {latency}ms</div>
        <div>MEM: {memory}%</div>
        <div>NET: ENCRYPTED</div>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#00F0FF]/50 opacity-70">
        <div>UPTIME: {formatTime(uptime)}</div>
        <div>ROOT: ACCESS GRANTED</div>
      </div>
    </div>
  );
};

export default SystemHUD;
