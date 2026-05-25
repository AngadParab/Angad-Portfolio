import React from 'react';

export enum CommandType {
  NAVIGATION = 'NAVIGATION',
  ACTION = 'ACTION',
  GAME = 'GAME',
  SYSTEM = 'SYSTEM',
  UNKNOWN = 'UNKNOWN'
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'component';
  content: React.ReactNode | string;
  timestamp?: number;
  context?: 'main' | 'whoami' | 'education';
}

export interface CommandConfig {
  command: string;
  alias?: string[];
  description: string;
  action: (args?: string[]) => React.ReactNode | void;
  type: CommandType;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  github?: string;
  previewable?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  certificate?: string;
}

export interface Workshop {
  title: string;
  organizer: string;
  period: string;
  description: string;
  certificate?: string;
  role?: string;
  grade?: string;
}

