import React, { useState, useEffect, useRef } from 'react';
import { TerminalLog } from './types';
import { Terminal, CornerDownLeft } from 'lucide-react';

const PRESETS = ['neofetch', 'projects', 'skills', 'about', 'clear'];

export const TerminalWidget: React.FC<{ onOpenProject: (id: string) => void }> = ({ onOpenProject }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: '1', type: 'system', text: 'OddTech Shell v1.4.0' },
    { id: '2', type: 'system', text: 'Type "help" to list available commands.' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const consoleEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newLogs = [...logs, { id: Date.now().toString(), type: 'input' as const, text: `$ ${trimmed}` }];
    setHistory(prev => [trimmed, ...prev.slice(0, 19)]);
    setHistoryIdx(-1);

    const parts = trimmed.toLowerCase().split(' ');
    const baseCmd = parts[0];
    const arg = parts.slice(1).join(' ');

    let outputLogs: TerminalLog[] = [];

    switch (baseCmd) {
      case 'help':
        outputLogs = [
          { id: Date.now() + '-1', type: 'system', text: '--- COMMAND PROTOCOLS ---' },
          { id: Date.now() + '-2', type: 'output', text: 'neofetch  - Profile summary' },
          { id: Date.now() + '-3', type: 'output', text: 'about     - Problem solving philosophy' },
          { id: Date.now() + '-4', type: 'output', text: 'projects  - View list of portfolio projects' },
          { id: Date.now() + '-5', type: 'output', text: 'skills    - Technical competencies index' },
          { id: Date.now() + '-6', type: 'output', text: 'clear     - Clear logs' },
        ];
        break;

      case 'neofetch':
        outputLogs = [
          {
            id: Date.now() + '-1',
            type: 'success',
            text: `
DANIEL AMINU @ ODD-TECH
-----------------------
OS: Linux Kernel + FreeRTOS (Embedded)
Focus: Systems Engineering, IoT, Responsive Dashboards
Favorite Protocol: MQTT / LoRa WAN
Status: Continuous Development
            `
          }
        ];
        break;

      case 'about':
        outputLogs = [
          { id: Date.now() + '-1', type: 'output', text: 'DANIEL AMINU: SOLUTIONS ENGINEER' },
          { id: Date.now() + '-2', type: 'output', text: 'I build systems designed to operate under strict real-world constraints.' },
          { id: Date.now() + '-3', type: 'output', text: 'My experience ranges from React frontends to firmware co-design' },
          { id: Date.now() + '-4', type: 'output', text: 'and offline-first microservices.' }
        ];
        break;

      case 'skills':
        outputLogs = [
          { id: Date.now() + '-1', type: 'system', text: '--- COMPETENCY INDEX ---' },
          { id: Date.now() + '-2', type: 'success', text: '├─ EMBEDDED SYSTEMS' },
          { id: Date.now() + '-3', type: 'output', text: '│  └─ ESP32, STM32, LoRaWAN, I2C, SPI' },
          { id: Date.now() + '-4', type: 'success', text: '├─ SYSTEMS BACKEND' },
          { id: Date.now() + '-5', type: 'output', text: '│  └─ Python, Node.js, Express, SQLite, REST APIs' },
          { id: Date.now() + '-6', type: 'success', text: '└─ FRONTEND ENVIRONMENT' },
          { id: Date.now() + '-7', type: 'output', text: '   └─ React, TypeScript, Tailwind CSS, Telemetry Dashboards' }
        ];
        break;

      case 'projects':
        if (arg.startsWith('open ')) {
          const projId = arg.replace('open ', '').trim();
          if (projId === 'techtrek' || projId === 'eounia' || projId === 'voltsentry') {
            outputLogs = [{ id: Date.now() + '-1', type: 'success', text: `Launching project reader: ${projId.toUpperCase()}...` }];
            setTimeout(() => onOpenProject(projId), 400);
          } else {
            outputLogs = [{ id: Date.now() + '-1', type: 'error', text: `Project "${projId}" not found.` }];
          }
        } else {
          outputLogs = [
            { id: Date.now() + '-1', type: 'system', text: '--- HIGH IMPACT SCHEMES ---' },
            { id: Date.now() + '-2', type: 'output', text: '1. techtrek   - Career discovery bento for teens' },
            { id: Date.now() + '-3', type: 'output', text: '2. eounia     - Psychological archetype discovery' },
            { id: Date.now() + '-4', type: 'output', text: '3. voltsentry - Remote solar telemetry logger' },
            { id: Date.now() + '-5', type: 'system', text: 'To read project notes, type: projects open [id]' }
          ];
        }
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      default:
        outputLogs = [
          { id: Date.now() + '-1', type: 'error', text: `Command not found: "${trimmed}". Type "help" for options.` }
        ];
    }

    setLogs([...newLogs, ...outputLogs]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      className="bg-zinc-950 border border-zinc-900 rounded-xl flex flex-col h-[320px] shadow-sm relative overflow-hidden font-mono text-xs text-zinc-400 selection:bg-zinc-800"
      onClick={focusInput}
    >
      {/* Top bar */}
      <div className="bg-zinc-900/40 px-4 py-2.5 flex items-center justify-between border-b border-zinc-900 select-none">
        <span className="text-[10px] text-zinc-500 font-medium flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-zinc-400" />
          <span>interactive_console // daniel@oddtech</span>
        </span>
        <span className="text-[9px] text-zinc-600">v1.4.0</span>
      </div>

      {/* Log Screen */}
      <div className="flex-grow p-4 overflow-y-auto space-y-1.5 flex flex-col">
        {logs.map((log) => (
          <div 
            key={log.id} 
            className={`whitespace-pre-wrap leading-relaxed ${
              log.type === 'input' ? 'text-zinc-100 font-medium' :
              log.type === 'error' ? 'text-zinc-500 italic' :
              log.type === 'success' ? 'text-zinc-200' :
              log.type === 'system' ? 'text-zinc-500 pb-0.5' :
              'text-zinc-400'
            }`}
          >
            {log.text}
          </div>
        ))}
        <div ref={consoleEndRef}></div>
      </div>

      {/* Suggestions preset buttons */}
      <div className="px-4 py-2 border-t border-zinc-900 bg-zinc-950/60 flex flex-wrap gap-1 items-center select-none">
        <span className="text-[9px] text-zinc-600 uppercase font-medium mr-1.5">Preset:</span>
        {PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={(e) => {
              e.stopPropagation();
              handleCommand(preset);
            }}
            className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800 rounded text-[10px] transition cursor-pointer text-zinc-500 font-mono"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="bg-zinc-950 p-3 flex items-center space-x-2 border-t border-zinc-900">
        <span className="text-zinc-500 font-bold">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command..."
          className="flex-grow bg-transparent outline-none border-none text-zinc-100 font-mono text-xs placeholder-zinc-700"
          autoComplete="off"
          autoCapitalize="off"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleCommand(input);
          }}
          className="p-1 text-zinc-600 hover:text-zinc-400 rounded transition cursor-pointer"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
