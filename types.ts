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
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}
