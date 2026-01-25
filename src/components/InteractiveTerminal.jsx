import React, { useState, useEffect, useRef } from 'react';

export default function InteractiveTerminal({ data }) {
  const [history, setHistory] = useState([
    { type: 'input', text: 'whoami' },
    { type: 'output', text: `"${data.basics.role}"` },
    { type: 'input', text: 'uptime' },
    { type: 'output', text: '4+ Years Experience' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => 'Available commands: whoami, uptime, ls, cat [file], clear, skills, projects, contact, date',
    whoami: () => `${data.basics.name} - ${data.basics.role}`,
    uptime: () => 'System active since 2019. Current uptime: 4+ years of professional IT automation experience.',
    date: () => new Date().toString(),
    ls: () => 'skills.md  projects.md  contact.md  about.txt',
    clear: () => {
      setHistory([]);
      return null;
    },
    skills: () => data.skills.map(s => `• [${s.category}] ${s.items.map(i => i.name).join(', ')}`).join('\n'),
    projects: () => data.projects.map(p => `• ${p.title}\n  ${p.description}`).join('\n\n'),
    contact: () => `Email: ${data.basics.email}\nPhone: ${data.basics.phone}\nLocation: ${data.basics.location}`,
    cat: (args) => {
      if (!args) return 'cat: missing file operand';
      const file = args.toLowerCase().trim();
      if (file === 'skills.md') return commands.skills();
      if (file === 'projects.md') return commands.projects();
      if (file === 'contact.md') return commands.contact();
      if (file === 'about.txt') return data.basics.tagline;
      return `cat: ${args}: No such file or directory`;
    }
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim();
      const parts = trimmedInput.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      
      if (!trimmedInput) {
        setHistory([...history, { type: 'input', text: '' }]);
        setInput('');
        return;
      }

      if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }
      
      const newHistory = [...history, { type: 'input', text: trimmedInput }];
      
      if (commands[cmd]) {
        const result = commands[cmd](args.join(' '));
        if (result !== null) {
          newHistory.push({ type: 'output', text: result });
        }
      } else if (cmd === 'sudo') {
        newHistory.push({ type: 'output', text: 'nice try, but you do not have permission to rule this machine.' });
      } else {
        newHistory.push({ type: 'output', text: `command not found: ${cmd}. type 'help' for available commands.` });
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div 
      className="bg-slate-900 rounded-xl shadow-2xl border border-slate-800 font-mono text-sm transform transition-all duration-300 hover:scale-[1.01] flex flex-col h-[420px] w-full max-w-2xl overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">zsh — 80x24</div>
        <div className="w-12"></div>
      </div>

      {/* Terminal View */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-2"
      >
        <div className="text-slate-500 text-[10px] mb-4">
          Type 'help' to see available commands
        </div>
        
        {history.map((line, i) => (
          <div key={i} className="leading-relaxed">
            {line.type === 'input' ? (
              <div className="flex gap-2">
                <span className="text-green-400 font-bold">➜</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">{line.text}</span>
              </div>
            ) : (
              <div className="text-slate-300 pl-4 whitespace-pre-wrap opacity-90">{line.text}</div>
            )}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex gap-2 items-center">
          <span className="text-green-400 font-bold">➜</span>
          <span className="text-blue-400">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
            autoFocus
          />
        </div>
      </div>
      
      {/* Bottom Help Bar */}
      <div className="px-4 py-1.5 bg-primary/10 border-t border-primary/20 flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
         {['help', 'ls', 'skills', 'projects', 'contact', 'clear'].map(cmd => (
           <button 
             key={cmd}
             onClick={(e) => {
               e.stopPropagation();
               setInput(cmd);
               inputRef.current?.focus();
             }}
             className="text-[10px] font-bold text-primary hover:text-white transition-colors"
           >
             {cmd}
           </button>
         ))}
      </div>
    </div>
  );
}
