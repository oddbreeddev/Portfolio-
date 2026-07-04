import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  CheckCircle2, 
  MapPin, 
  Send, 
  Download, 
  Mail, 
  ChevronRight
} from 'lucide-react';

import { ProjectsGrid } from './ProjectsGrid';
import { Skill, SkillCategory } from './types';

// Custom X (Twitter) Logo Component
const XLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SKILLS_DATA: Skill[] = [
  // Embedded
  { name: 'ESP32 Firmware', level: 90, category: 'embedded', description: 'Expert in FreeRTOS, GPIO configurations, hardware interrupts, and deep-sleep optimizations.' },
  { name: 'LoRa Modulation', level: 85, category: 'embedded', description: 'Experienced with Semtech SX1276 transceiver systems, configuring spreading factors and packet structures.' },
  { name: 'Hardware Prototyping', level: 80, category: 'embedded', description: 'Hands-on breadboard assembly, testing sensor suites (I2C, SPI), and managing 3.3V rail configurations.' },
  { name: 'Sensing Protocols', level: 85, category: 'embedded', description: 'Decoding, averaging, and outlier-filtering values from DHT22, ADS1115, and high-precision current monitors.' },
  
  // Backend
  { name: 'Python Core', level: 90, category: 'backend', description: 'Writing backend scripts, clean data modeling algorithms, and system integration tools.' },
  { name: 'Node.js / Express', level: 85, category: 'backend', description: 'Designing robust RESTful endpoints, streaming JSON states, and managing real-time websocket handshakes.' },
  { name: 'Database Caching', level: 75, category: 'backend', description: 'Writing clean schema definitions, localized browser databases, and SQLite caches.' },
  { name: 'API Infrastructure', level: 80, category: 'backend', description: 'Standardizing response formats, error diagnostics, and lightweight data synchronization layers.' },
  
  // Frontend
  { name: 'React SPA', level: 90, category: 'frontend', description: 'Building highly responsive, modern component structures using advanced React state and hooks.' },
  { name: 'Tailwind CSS', level: 95, category: 'frontend', description: 'Mastery of utility-first styling to build gorgeous responsive frameworks with desktop-first precision.' },
  { name: 'TypeScript Core', level: 85, category: 'frontend', description: 'Enforcing robust, type-safe interfaces, preventing runtime bugs, and mapping data schemas.' },
  { name: 'Telemetry Dashboards', level: 90, category: 'frontend', description: 'Designing high-contrast real-time data visualizers and bento-styled interfaces.' },

  // Methods
  { name: 'Resource-Constrained Design', level: 95, category: 'methods', description: 'Developing software/firmware designed from scratch to run on limited SRAM, bandwidth, and battery.' },
  { name: 'Outlier Diagnostics', level: 90, category: 'methods', description: 'Detecting physical anomalies in hardware sensors to prevent noisy telemetry and state failures.' },
  { name: 'Extreme Field Prototyping', level: 85, category: 'methods', description: 'Deploying hardware systems under harsh environmental conditions, learning from physical constraints.' }
];

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeSkillCategory, setActiveSkillCategory] = useState<SkillCategory | 'all'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  // Form states
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMsg, setSenderMsg] = useState('');
  const [senderTopic, setSenderTopic] = useState('collaboration');
  const [transmitState, setTransmitState] = useState<'idle' | 'sending' | 'success'>('idle');

  useEffect(() => {
    if (selectedProjectId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProjectId]);

  const handleOpenProject = (id: string) => {
    setSelectedProjectId(id || null);
  };

  const handleTransmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMsg) return;

    setTransmitState('sending');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTransmitState('success');

    // Clear inputs
    setSenderName('');
    setSenderEmail('');
    setSenderMsg('');
  };

  const resetFormState = () => {
    setTransmitState('idle');
  };

  const filteredSkills = activeSkillCategory === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(s => s.category === activeSkillCategory);

  return (
    <div className="bg-zinc-950 text-zinc-300 font-sans antialiased min-h-screen relative selection:bg-zinc-800 selection:text-white">
      {/* Quiet background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      {/* MINIMAL NAV HEADER */}
      <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/60">
        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
          <motion.a 
            href="#" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-mono tracking-widest text-zinc-100 hover:text-white transition duration-200"
          >
            DANIEL AMINU // SOLUTIONS_
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-[11px] font-mono tracking-wider">
            <a href="#about" className="text-zinc-500 hover:text-zinc-200 transition duration-200">philosophy</a>
            <a href="#work" className="text-zinc-500 hover:text-zinc-200 transition duration-200">solutions</a>
            <a href="#console" className="text-zinc-500 hover:text-zinc-200 transition duration-200">console</a>
            <a href="#skills" className="text-zinc-500 hover:text-zinc-200 transition duration-200">skills</a>
            <a href="#contact" className="text-zinc-200 hover:text-white transition duration-200">[ contact ]</a>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-400 hover:text-white transition duration-200 cursor-pointer" 
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-zinc-950 border-t border-zinc-900/60 overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col space-y-4 text-xs font-mono tracking-wider">
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition py-1">philosophy</a>
                <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition py-1">solutions</a>
                <a href="#console" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition py-1">console</a>
                <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition py-1">skills</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-white hover:underline transition py-1 flex items-center space-x-1">
                  <span>connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* MINIMAL HERO SECTION */}
      <section className="pt-16 pb-20 md:pt-28 md:pb-28 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Main Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 flex flex-col justify-center space-y-6"
          >
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              // ACTIVE SOLUTIONS ENGINEER
            </span>

            <h1 className="text-3xl md:text-5xl font-light tracking-tight leading-tight text-zinc-100">
              Practical systems built for <span className="font-normal text-white border-b border-zinc-800 pb-1">strict real-world constraints</span>.
            </h1>

            <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
              I sit at the intersection of robust full-stack software and embedded systems co-design. I specialize in designing client-authoritative state architectures, offline-first frameworks, and low-power telemetry loops that prioritize durability over noise.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center font-mono text-xs">
              <a 
                href="#work" 
                className="px-5 py-2.5 bg-zinc-100 text-zinc-950 hover:bg-white transition duration-200"
              >
                Inspect Solutions
              </a>
              <a 
                href="#console" 
                className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 transition duration-200"
              >
                Launch Console
              </a>
            </div>
          </motion.div>

          {/* Clean Profile card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 bg-zinc-900/30 border border-zinc-900/80 rounded-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="h-44 relative bg-zinc-950 overflow-hidden border-b border-zinc-900/80">
              <img 
                src="https://i.postimg.cc/CKDBNg7c/1000035025_01_1.jpg" 
                alt="Daniel Aminu" 
                className="w-full h-full object-cover grayscale opacity-90 hover:opacity-100 transition-all duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent"></div>
            </div>

            <div className="p-5 space-y-4 font-mono text-[11px] text-zinc-500">
              <div className="space-y-1 pb-3 border-b border-zinc-900/60">
                <span className="text-[9px] uppercase tracking-wider text-zinc-600">Location Base</span>
                <div className="flex items-center space-x-1.5 text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Nigeria // Gombe</span>
                </div>
              </div>

              <div className="space-y-1 pb-3 border-b border-zinc-900/60">
                <span className="text-[9px] uppercase tracking-wider text-zinc-600">Initiative</span>
                <div className="text-zinc-300">
                  Founder @ <a href="https://oddtech.pxxl.click/" target="_blank" rel="noreferrer" className="underline hover:text-white">Odd Tech</a>
                </div>
              </div>

              <a 
                href="https://drive.google.com/file/d/1fb_YdVtOYLAERxXE1UHPOYOFh7GVCVyI/view?usp=drivesdk" 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-center border border-zinc-800/80 flex items-center justify-center space-x-2 transition duration-200 text-[10px] uppercase text-zinc-300 font-medium"
              >
                <Download className="w-3 h-3 text-zinc-400" />
                <span>Fetch Resume (PDF)</span>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Minimal Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-zinc-900/60">
          {[
            { label: 'Platform Core', val: 'React / TypeScript / C++' },
            { label: 'Operational Model', val: 'Offline-First & Local-First' },
            { label: 'Design Framework', val: 'Strict Resource Budgeting' }
          ].map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
              className="font-mono text-xs flex justify-between items-center border border-zinc-900/50 p-4 bg-zinc-950/20 rounded-lg"
            >
              <span className="text-zinc-500">{metric.label}:</span>
              <span className="text-zinc-300 font-medium">{metric.val}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="about" className="py-20 border-y border-zinc-900/60 bg-zinc-950/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                // SYSTEM CORE VALUES
              </span>
              
              <h2 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-tight leading-tight">
                Design with respect for structural constraints.
              </h2>

              <p className="text-zinc-400 leading-relaxed text-sm">
                Software doesn't execute in a vacuum. Under real conditions, wireless networks fail, power drops, and processors throttled by heat must adapt. My workflow centers around making sure every packet matters.
              </p>

              <div className="space-y-5 pt-2">
                {[
                  { title: "Empirical Grounding", desc: "Isolating real bottlenecks first before introducing secondary software libraries or complex infrastructure layers." },
                  { title: "Co-Design Integration", desc: "Writing clean web state managers that talk seamlessly to localized registers, offline caches, and hardware transceivers." },
                  { title: "Durable Systems Architecture", desc: "Relying on standard protocols, light payloads, and modular dependencies to produce code requiring minimum lifetime overhead." }
                ].map((item, idx) => (
                  <div key={idx} className="flex space-x-3 items-start">
                    <div className="p-1 bg-zinc-900 border border-zinc-800 text-zinc-400 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-200 text-sm">{item.title}</h4>
                      <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full aspect-video rounded-xl overflow-hidden bg-zinc-900/20 border border-zinc-900/80 relative">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                alt="Schematic Concept" 
                className="w-full h-full object-cover opacity-60 grayscale" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
              <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center font-mono text-[9px] text-zinc-500">
                <span>REDUCING SYSTEM OVERHEAD</span>
                <span>V1.4.0</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SELECTED SOLUTIONS */}
      <section id="work" className="py-20 max-w-5xl mx-auto px-6">
        <div className="max-w-xl mb-12 space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
            // SELECTED PROJECTS
          </span>
          <h2 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-tight">
            High Impact Systems
          </h2>
          <p className="text-zinc-500 text-xs">
            A precise review of software frameworks and embedded experiments engineered to execute under low power, memory, or bandwidth limits.
          </p>
        </div>

        <ProjectsGrid onSelectProject={handleOpenProject} />
      </section>

      {/* COMMAND CONSOLE */}
      <section id="console" className="py-20 bg-zinc-950/60 border-t border-zinc-900/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-xl mb-10 space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center space-x-1.5">
              <Terminal className="w-3 h-3 text-zinc-500" />
              <span>INTERACTIVE DATA ENQUIRY</span>
            </span>
            <h2 className="text-2xl font-light text-zinc-100 tracking-tight">
              Interactive Command Shell
            </h2>
            <p className="text-zinc-500 text-xs">
              Interact directly with this portfolio database using the lightweight terminal core below. Type standard instructions to trigger actions.
            </p>
          </div>

          <div className="max-w-3xl">
            <TerminalWidget onOpenProject={handleOpenProject} />
          </div>
        </div>
      </section>

      {/* TECHNICAL COMPETENCY SUMMARY */}
      <section id="skills" className="py-20 border-t border-zinc-900/60 max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                // CAPABILITY OVERVIEW
              </span>
              <h2 className="text-2xl font-light text-zinc-100 tracking-tight leading-tight">
                Technical Stack
              </h2>
            </div>

            <p className="text-zinc-500 text-xs leading-relaxed">
              Isolating structural layers across different hardware and client environments. Use the filters below to browse competencies.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-col space-y-1.5 font-mono text-[11px] select-none">
              {[
                { id: 'all', label: 'All Skill Layers' },
                { id: 'embedded', label: 'Embedded Systems & Radio' },
                { id: 'backend', label: 'Systems & API Backend' },
                { id: 'frontend', label: 'High-Contrast Frontend' },
                { id: 'methods', label: 'Methods & Constraints' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveSkillCategory(cat.id as any)}
                  className={`px-3 py-2 text-left rounded transition flex items-center justify-between cursor-pointer ${
                    activeSkillCategory === cat.id 
                      ? 'bg-zinc-900 text-zinc-200 font-medium border border-zinc-800' 
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span>{cat.label}</span>
                  <ChevronRight className={`w-3 h-3 text-zinc-600 transition-transform ${activeSkillCategory === cat.id ? 'translate-x-0.5 text-zinc-400' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`bg-zinc-900/20 border p-4 rounded-xl transition-all flex flex-col justify-between h-40 ${
                      hoveredSkill?.name === skill.name 
                        ? 'border-zinc-700' 
                        : 'border-zinc-900/60'
                    }`}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => setHoveredSkill(skill)}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-1.5">
                        <h4 className="text-xs font-semibold text-zinc-200">{skill.name}</h4>
                        <span className="text-[9px] font-mono tracking-wider text-zinc-600 uppercase">
                          {skill.category}
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-600 border-t border-zinc-900/40 pt-2">
                      <span>MARGIN CAPABILITY</span>
                      <span className="text-zinc-400">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* ODD TECH INITIATIVE */}
      <section className="py-20 border-t border-zinc-900 bg-zinc-950/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border border-zinc-900 rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="md:col-span-7 space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  // THE ODD TECH INITIATIVE
                </span>

                <h2 className="text-xl md:text-2xl font-light text-zinc-100 tracking-tight">
                  Technology built to address local challenges.
                </h2>

                <p className="text-zinc-500 text-xs leading-relaxed">
                  <strong className="text-zinc-300">Odd Tech</strong> is a long-term research blueprint dedicated to testing resilient hardware, telemetry bridges, response logs, and local-first software under actual resources constraints—enforcing global durability rules on low-power devices.
                </p>

                <div className="flex flex-wrap gap-2 pt-2 font-mono text-[9px] text-zinc-500">
                  <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Resilient Hardware</span>
                  <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Offline-First Logic</span>
                  <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Resource Budgeting</span>
                </div>
              </div>

              <div className="md:col-span-5 bg-zinc-900/10 border border-zinc-900 p-5 rounded-xl font-mono text-[10px] text-zinc-500">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2 mb-3">
                  <span className="font-semibold text-zinc-400">LEDGER ENTRIES</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse"></span>
                </div>
                <ul className="space-y-2.5 leading-relaxed text-[10px]">
                  <li className="flex items-start space-x-1.5">
                    <span className="text-zinc-600 font-bold">01.</span>
                    <span>Microcontroller atmospheric logging with long-sleep modules.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-zinc-600 font-bold">02.</span>
                    <span>Self-sufficient network telemetry routing profiles.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-zinc-600 font-bold">03.</span>
                    <span>Client-centric databases that require zero remote storage transactions.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 border-t border-zinc-900 max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                // ESTABLISH CONNECTION
              </span>
              <h2 className="text-2xl font-light text-zinc-100 tracking-tight leading-tight">
                Get in Touch
              </h2>
            </div>

            <p className="text-zinc-500 text-xs leading-relaxed">
              Available for software audits, custom microcontroller prototyping, React dashboard architecture, and constraints-focused systems planning.
            </p>

            <div className="space-y-3 font-mono text-xs">
              {/* Direct email card */}
              <a 
                href="mailto:danielaminu14@gmail.com"
                className="bg-zinc-900/10 border border-zinc-900/80 hover:border-zinc-800 p-4 rounded-xl flex items-center space-x-3.5 transition group"
              >
                <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-400 group-hover:text-white transition">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-zinc-600 uppercase">Direct Email</div>
                  <div className="text-zinc-300 font-medium group-hover:text-white transition">danielaminu14@gmail.com</div>
                </div>
              </a>

              {/* Locator info */}
              <div className="bg-zinc-900/10 border border-zinc-900/80 p-4 rounded-xl flex items-center space-x-3.5">
                <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-zinc-600 uppercase">Geographic Location</div>
                  <div className="text-zinc-300 font-medium">Nigeria (GMT +1)</div>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="space-y-2">
              <div className="text-[9px] uppercase text-zinc-600 font-mono tracking-wider font-semibold">Connect channels</div>
              <div className="flex gap-2.5">
                <a 
                  href="https://github.com/oddbreeddev" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded transition"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/daniel-aminu-830618319" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded transition"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://x.com/cyb_ro" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded transition"
                  title="X (Twitter)"
                >
                  <XLogo className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Clean minimal contact form */}
          <div className="lg:col-span-7 bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 md:p-8 relative">
            
            {transmitState === 'idle' && (
              <form onSubmit={handleTransmitForm} className="space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900/80 pb-3 mb-1 font-mono text-[9px] text-zinc-600">
                  <span>TRANSMIT CONSOLE SIGNAL</span>
                  <span>SSL ACTIVE</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-400 font-mono">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Captain Carter"
                      className="w-full bg-zinc-950 border border-zinc-900 focus:border-zinc-700 rounded p-2.5 text-xs outline-none text-zinc-200 transition placeholder-zinc-800"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-400 font-mono">Your Email</label>
                    <input 
                      type="email" 
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="e.g. carter@domain.com"
                      className="w-full bg-zinc-950 border border-zinc-900 focus:border-zinc-700 rounded p-2.5 text-xs outline-none text-zinc-200 transition placeholder-zinc-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-zinc-400 font-mono">Topic</label>
                  <select
                    value={senderTopic}
                    onChange={(e) => setSenderTopic(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-zinc-700 rounded p-2.5 text-xs outline-none text-zinc-200 transition cursor-pointer"
                  >
                    <option value="collaboration">Contract / Collaboration Prototyping</option>
                    <option value="firmware">Embedded Firmware Co-design</option>
                    <option value="fullstack">Web Environment Design</option>
                    <option value="general">Direct Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-zinc-400 font-mono">Message Payload</label>
                  <textarea 
                    required
                    rows={4}
                    value={senderMsg}
                    onChange={(e) => setSenderMsg(e.target.value)}
                    placeholder="Describe your project, environment constraints, or timeline..."
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-zinc-700 rounded p-2.5 text-xs outline-none text-zinc-200 transition placeholder-zinc-800 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-mono tracking-wider rounded transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-zinc-950" />
                  <span>Send Message</span>
                </button>
              </form>
            )}

            {transmitState === 'sending' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-3 h-full min-h-[300px] font-mono text-xs">
                <span className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></span>
                <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Processing dispatch payload...</span>
              </div>
            )}

            {transmitState === 'success' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center h-full min-h-[300px]">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-200">
                  <CheckCircle2 className="w-6 h-6 text-zinc-200" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-zinc-100 text-sm font-semibold">Signal Dispatched</h4>
                  <p className="text-zinc-500 text-xs max-w-xs leading-relaxed">
                    Thank you. Your payload was successfully routed. Daniel will respond to your return mailbox promptly.
                  </p>
                </div>
                <button
                  onClick={resetFormState}
                  className="mt-2 px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] uppercase font-mono text-zinc-400 rounded hover:text-white cursor-pointer"
                >
                  Return to Form
                </button>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="py-12 border-t border-zinc-900/60 bg-zinc-950 text-center text-zinc-600 text-xs font-mono">
        <div className="max-w-5xl mx-auto px-6 space-y-2 select-none">
          <div>
            © {new Date().getFullYear()} Daniel Aminu. Solutions Engineer.
          </div>
          <div className="text-[10px] text-zinc-700">
            designed with absolute structural constraints // v1.4.0
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
