import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  MapPin, 
  Send, 
  ArrowRight, 
  Gamepad2, 
  GraduationCap, 
  CheckCircle2, 
  Code, 
  Cpu, 
  Lightbulb, 
  Play
} from 'lucide-react';

import { ProjectsGrid } from './ProjectsGrid';

// Define Skill Interfaces
interface SkillItem {
  name: string;
  category: string;
}

const SKILLS_DATA: SkillItem[] = [
  // Languages
  { name: 'Python', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },
  { name: 'HTML5', category: 'languages' },
  { name: 'CSS3', category: 'languages' },
  
  // Frontend
  { name: 'Responsive Web Design', category: 'frontend' },
  { name: 'CSS Animations', category: 'frontend' },
  { name: 'Modern UI Development', category: 'frontend' },
  { name: 'React SPA Frameworks', category: 'frontend' },
  { name: 'Tailwind Utility CSS', category: 'frontend' },
  { name: 'TypeScript Core', category: 'frontend' },
  
  // Tools
  { name: 'Git & GitHub', category: 'tools' },
  { name: 'Visual Studio Code', category: 'tools' },
  { name: 'Figma', category: 'tools' },
  { name: 'Canva', category: 'tools' },
  { name: 'Adobe Photoshop', category: 'tools' }
];

export const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'hold' | 'techtrek' | 'pocketlab'>('hold');

  // Contact Form states
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMsg, setSenderMsg] = useState('');
  const [transmitState, setTransmitState] = useState<'idle' | 'sending' | 'success'>('idle');

  // --- INTERACTIVE SIMULATION STATES ---
  
  // 1. HOLD Game Platform Simulation
  const [holdScore, setHoldScore] = useState(1420);
  const [holdStreak, setHoldStreak] = useState(5);
  const [holdUnlocks, setHoldUnlocks] = useState<string[]>(['Beta Participant']);
  const [holdToast, setHoldToast] = useState<string | null>(null);
  
  const handleSimulateGame = () => {
    // Generate random points
    const points = Math.floor(Math.random() * 150) + 50;
    setHoldScore(prev => prev + points);
    
    // Anomaly/chance for new badge
    const badgeOptions = ['Speedrunner', 'Logic Sentry', 'Sovereign Player', 'High-Fidelity Catalyst', 'Quantum Builder'];
    const unacquired = badgeOptions.filter(b => !holdUnlocks.includes(b));
    
    if (unacquired.length > 0 && Math.random() > 0.4) {
      const newBadge = unacquired[Math.floor(Math.random() * unacquired.length)];
      setHoldUnlocks(prev => [...prev, newBadge]);
      triggerHoldToast(`BADGE UNLOCKED: ${newBadge}! +${points} XP`);
      setHoldStreak(prev => prev + 1);
    } else {
      triggerHoldToast(`Session completed successfully. +${points} XP dispatched.`);
    }
  };

  const triggerHoldToast = (msg: string) => {
    setHoldToast(msg);
    setTimeout(() => setHoldToast(null), 3000);
  };

  // 2. Tech Trek Career Matcher
  const [trekAnswers, setTrekAnswers] = useState<Record<number, boolean>>({});
  const [trekStep, setTrekStep] = useState(0);
  const [trekResult, setTrekResult] = useState<string | null>(null);

  const trekQuestions = [
    { text: "Do you enjoy designing visual layouts and micro-interactions over backend algorithms?", type: "visual" },
    { text: "Do you prefer building scalable Python tools and planning database models?", type: "system" },
    { text: "Are you interested in how hardware, products, and software integrate as one cohesive system?", type: "product" }
  ];

  const handleTrekAnswer = (answer: boolean) => {
    const updated = { ...trekAnswers, [trekStep]: answer };
    setTrekAnswers(updated);
    
    if (trekStep < trekQuestions.length - 1) {
      setTrekStep(prev => prev + 1);
    } else {
      // Calculate career mapping
      if (updated[0] && !updated[1]) {
        setTrekResult("UI/UX Designer & Frontend Engineer");
      } else if (!updated[0] && updated[1]) {
        setTrekResult("Python Systems Developer");
      } else if (updated[2]) {
        setTrekResult("Product Builder & Full-Stack Architect");
      } else {
        setTrekResult("Software Engineer (Generalist)");
      }
    }
  };

  const resetTrek = () => {
    setTrekAnswers({});
    setTrekStep(0);
    setTrekResult(null);
  };

  // 3. PocketLab Code Sandbox Compiler
  const [pocketCode, setPocketCode] = useState(`def solve_problems():\n    ideas = ["HOLD", "Tech Trek", "PocketLab"]\n    for idea in ideas:\n        print(f"Impact: {idea} is active.")\n\nsolve_problems()`);
  const [compileOutput, setCompileOutput] = useState<string[]>(['Idle. Press Compile to execute payload.']);
  const [isCompiling, setIsCompiling] = useState(false);

  const pocketLessons = [
    {
      title: "Impact Generator (Python)",
      code: `def solve_problems():\n    ideas = ["HOLD", "Tech Trek", "PocketLab"]\n    for idea in ideas:\n        print(f"Impact: {idea} is active.")\n\nsolve_problems()`
    },
    {
      title: "User Experience (JS)",
      code: `const designer = "Daniel Aminu";\nconst ethos = "Defensive, simple & responsive";\n\nconsole.log(\`Crafted by \${designer} with: \${ethos}\`);`
    }
  ];

  const selectPocketLesson = (code: string) => {
    setPocketCode(code);
    setCompileOutput(['Payload updated. Ready for execution.']);
  };

  const runPocketCompile = async () => {
    setIsCompiling(true);
    setCompileOutput(['Initializing virtual compiler...', 'Fetching sandboxed context...', 'Resolving static dependencies...']);
    
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    if (pocketCode.includes('solve_problems')) {
      setCompileOutput([
        '>>> Executing Python interpreter v3.11.2...',
        'Impact: HOLD is active.',
        'Impact: Tech Trek is active.',
        'Impact: PocketLab is active.',
        '-------------------------------------------',
        'Execution complete. Status: SUCCESS (0 errors)'
      ]);
    } else if (pocketCode.includes('designer')) {
      setCompileOutput([
        '>>> Executing V8 Javascript sandbox...',
        'Crafted by Daniel Aminu with: Defensive, simple & responsive',
        '-------------------------------------------',
        'Execution complete. Status: SUCCESS (0 errors)'
      ]);
    } else {
      setCompileOutput([
        '>>> Compiling custom script...',
        'Parsing AST tokens...',
        'Evaluating statement blocks...',
        'Console output:',
        '  No major compilation errors detected.',
        '  Evaluated script context successfully.',
        '-------------------------------------------',
        'Execution complete. Status: SUCCESS (0 errors)'
      ]);
    }
    setIsCompiling(false);
  };

  // Transmit Mailbox Handler
  const handleTransmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMsg) return;

    setTransmitState('sending');
    await new Promise(resolve => setTimeout(resolve, 1200));
    setTransmitState('success');

    // Clean fields
    setSenderName('');
    setSenderEmail('');
    setSenderMsg('');
  };

  const handleInteractFromGrid = (id: string) => {
    if (id === 'hold' || id === 'techtrek' || id === 'pocketlab') {
      setActiveInteractiveTab(id);
      const element = document.getElementById('playground-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#A1A1A1] font-sans antialiased min-h-screen relative selection:bg-zinc-800 selection:text-white">
      {/* Background Micro-Grid noise and ambient radial flare */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none"></div>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-[#262626]/40">
        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
          <a href="#" className="text-xs font-mono tracking-widest text-white hover:text-zinc-300 transition-colors duration-150">
            DA // SYSTEM PORTFOLIO
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] font-mono tracking-wider">
            <a href="#about" className="text-zinc-400 hover:text-white transition duration-150">[ ABOUT ]</a>
            <a href="#work" className="text-zinc-400 hover:text-white transition duration-150">[ PROJECTS ]</a>
            <a href="#playground-section" className="text-zinc-400 hover:text-white transition duration-150">[ SIMULATIONS ]</a>
            <a href="#skills" className="text-zinc-400 hover:text-white transition duration-150">[ SKILLS ]</a>
            <a href="#contact" className="text-white hover:underline transition duration-150">[ CONNECT ]</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-400 hover:text-white transition duration-150 cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0A0A0A] border-t border-[#262626]/40 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col space-y-4 text-xs font-mono tracking-widest">
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition py-1">ABOUT</a>
                <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition py-1">PROJECTS</a>
                <a href="#playground-section" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition py-1">SIMULATIONS</a>
                <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition py-1">SKILLS</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-white hover:underline transition py-1 flex items-center space-x-1.5">
                  <span>CONNECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="pt-20 pb-24 md:pt-32 md:pb-36 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Context */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>DANIEL AMINU // SOFTWARE ENGINEERING STUDENT</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              I Build Digital <span className="font-semibold block">Products That Solve</span> Real Problems.
            </h1>

            <p className="text-[#A1A1A1] text-base leading-relaxed font-light max-w-xl">
              Hi, I'm Daniel Aminu, a Software Engineering student passionate about building software that makes an impact. I enjoy turning ideas into polished digital products—from educational platforms to gaming experiences—with a strong focus on clean design, usability, and innovation.
            </p>

            {/* Currently building status block */}
            <div className="p-4 bg-[#111111] border border-[#262626] space-y-1 max-w-lg select-none">
              <div className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">CURRENTLY BUILDING</div>
              <div className="text-xs text-white font-mono flex flex-wrap gap-2">
                <span className="text-white font-medium">HOLD</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">Tech Trek</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">PocketLab</span>
              </div>
            </div>

            {/* CTA controls */}
            <div className="pt-2 flex flex-wrap gap-4 items-center font-mono text-xs">
              <a 
                href="#work" 
                className="px-6 py-3 bg-white text-zinc-950 hover:bg-zinc-200 transition duration-150 text-center"
              >
                View My Projects
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-[#111111] border border-[#262626] text-white hover:bg-zinc-900 transition duration-150 text-center"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>

          {/* Right Portrait & Visual Elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Ambient coordinates grid background */}
            <div className="absolute -inset-4 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none -z-10 animate-pulse"></div>
            
            {/* Rounded monochrome portrait */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full p-2 border border-[#262626] bg-[#111111]/50 backdrop-blur-sm group overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden filter grayscale contrast-125 brightness-90 hover:brightness-105 hover:contrast-100 transition-all duration-500 relative">
                <img 
                  src="https://i.postimg.cc/CKDBNg7c/1000035025_01_1.jpg" 
                  alt="Daniel Aminu Portrait" 
                  className="w-full h-full object-cover scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Visual grid overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Floating micro specification labels */}
            <div className="absolute -bottom-2 -left-2 bg-black/90 border border-[#262626] p-3 font-mono text-[9px] text-zinc-500 max-w-[150px] select-none text-left space-y-1">
              <div className="text-white uppercase tracking-widest font-semibold">COGNITIVE INDEX</div>
              <div>Software Engineer</div>
              <div>UI/UX Architect</div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ABOUT ME & STATS */}
      <section id="about" className="py-24 border-t border-[#262626]/40 bg-[#111111]/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                // BACKGROUND CONTEXT
              </span>
              <h2 className="text-3xl font-light text-white tracking-tight leading-tight">
                Engineering intuitive solutions.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <p className="text-[#A1A1A1] leading-relaxed font-light text-base">
                I'm a Software Engineering student at <strong className="text-white font-medium">Nigerian Army University Biu</strong> with a passion for creating software that people genuinely enjoy using.
              </p>
              <p className="text-[#A1A1A1] leading-relaxed font-light text-base">
                I love solving problems through code, designing intuitive user experiences, and transforming ambitious ideas into real products. Whether I'm building a web application, developing with Python, or designing interfaces, my goal is always the same: create technology that adds value. I'm constantly learning, experimenting with new ideas, and pushing myself to become a better developer and product builder.
              </p>

              {/* Statistics Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#262626]/40 font-mono">
                {[
                  { metric: "03+", title: "Major Projects", sub: "Currently Active" },
                  { metric: "10+", title: "Technologies", sub: "Mastered Stack" },
                  { metric: "∞", title: "Ideas in Progress", sub: "Continuous Pipeline" }
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 bg-[#111111] border border-[#262626] space-y-1 group hover:border-zinc-500 transition-colors duration-300">
                    <div className="text-3xl text-white font-light group-hover:text-white transition-colors duration-200">
                      {stat.metric}
                    </div>
                    <div className="text-[11px] font-semibold text-zinc-200 uppercase tracking-wider">
                      {stat.title}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-light">
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHAT I DO SECTION */}
      <section className="py-24 border-t border-[#262626]/40 max-w-5xl mx-auto px-6">
        <div className="max-w-xl mb-16 space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
            // OPERATIONAL FOCUS
          </span>
          <h2 className="text-3xl font-light text-white tracking-tight">
            Services & Value Proposition
          </h2>
          <p className="text-zinc-500 text-xs font-light">
            Bringing structure, scalable systems, and visual clarity to complex digital ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <Code className="w-5 h-5 text-white" />,
              title: "Software Development",
              desc: "Building modern, scalable applications using Python, JavaScript, HTML, and CSS. Structuring defensive frameworks built to withstand real-world packet loss and bandwidth strain."
            },
            {
              icon: <Cpu className="w-5 h-5 text-white" />,
              title: "UI/UX Design",
              desc: "Designing beautiful, intuitive interfaces in Figma and CSS that prioritize user focus, clear typography pairings, and clean interactive feedback loops."
            },
            {
              icon: <Lightbulb className="w-5 h-5 text-white" />,
              title: "Product Development",
              desc: "Planning, modeling, and engineering digital products from initial concepts and database architecture blueprints all the way to cloud provisioning and launch."
            },
            {
              icon: <CheckCircle2 className="w-5 h-5 text-white" />,
              title: "Problem Solving",
              desc: "Deploying systematic engineering principles and technology to simplify complex organizational procedures, streamline bottlenecks, and generate impact."
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="p-6 bg-[#111111] border border-[#262626] space-y-4 hover:border-zinc-500 transition-all duration-300 group"
            >
              <div className="p-2.5 bg-black w-fit border border-[#262626] group-hover:border-white transition-colors duration-200">
                {item.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-normal text-white">{item.title}</h3>
                <p className="text-xs text-[#A1A1A1] leading-relaxed font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section id="work" className="py-24 border-t border-[#262626]/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-xl mb-16 space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
              // PROJECT INDEX
            </span>
            <h2 className="text-3xl font-light text-white tracking-tight">
              Featured Products
            </h2>
            <p className="text-zinc-500 text-xs font-light">
              Explore my main digital products. Click "Launch Demonstration" below any project to interact with its live sandbox simulator further down the page!
            </p>
          </div>

          <ProjectsGrid onInteractProject={handleInteractFromGrid} />
        </div>
      </section>

      {/* DEDICATED SHOWCASE / INTERACTIVE PLAYGROUNDS */}
      <section id="playground-section" className="py-24 border-t border-[#262626]/40 bg-[#111111]/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-xl mb-12 space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
              // INTERACTIVE SHOWCASES
            </span>
            <h2 className="text-3xl font-light text-white tracking-tight">
              Live Product Playgrounds
            </h2>
            <p className="text-zinc-500 text-xs font-light">
              Simulate and test Daniel's products directly in the browser. Select a system tab below to initialize its micro-sandbox interface.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-[#262626] mb-8 font-mono text-xs overflow-x-auto select-none whitespace-nowrap">
            {[
              { id: 'hold', title: 'HOLD Simulator', subtitle: 'Gaming Panel' },
              { id: 'techtrek', title: 'Tech Trek Assessment', subtitle: 'Career Deck' },
              { id: 'pocketlab', title: 'PocketLab Sandbox', subtitle: 'Micro Compiler' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveInteractiveTab(tab.id as any)}
                className={`px-6 py-4 border-b-2 text-left transition-all duration-200 cursor-pointer ${
                  activeInteractiveTab === tab.id 
                    ? 'border-white text-white bg-[#111111]' 
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <div className="font-bold tracking-wide">{tab.title}</div>
                <div className="text-[9px] text-zinc-500 font-light mt-0.5">{tab.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Tab Content Box */}
          <div className="bg-[#111111] border border-[#262626] p-6 md:p-8 min-h-[420px] relative">
            
            {/* 1. HOLD SHOWCASE */}
            {activeInteractiveTab === 'hold' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262626] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300 uppercase tracking-widest">
                        HOLD LIVE PREVIEW
                      </span>
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase">ONLINE HUB</span>
                    </div>
                    <h3 className="text-xl font-normal text-white">Engaging Community & Badge Engine</h3>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-xs bg-black/50 p-3 border border-[#262626]">
                    <div>
                      <span className="text-zinc-500 text-[9px] block">TOTAL XP</span>
                      <span className="text-white font-semibold">{holdScore.toLocaleString()}</span>
                    </div>
                    <div className="border-l border-[#262626] pl-4">
                      <span className="text-zinc-500 text-[9px] block">DAILY STREAK</span>
                      <span className="text-white font-semibold">{holdStreak} Days</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Game controls */}
                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-xs text-[#A1A1A1] leading-relaxed font-light">
                      HOLD maps achievements and unlocks in real-time. Hit the button below to simulate a player matching session. The telemetry system will trigger dynamic calculations, count up points, and reward rare achievement badges.
                    </p>

                    <button
                      onClick={handleSimulateGame}
                      className="px-5 py-3 bg-white text-zinc-950 font-mono text-xs font-semibold hover:bg-zinc-200 transition duration-150 cursor-pointer flex items-center space-x-2 select-none"
                    >
                      <Gamepad2 className="w-4 h-4 text-zinc-950" />
                      <span>SIMULATE GAMEPLAY SESSION</span>
                    </button>

                    {/* Toast Notification Simulation */}
                    <AnimatePresence mode="wait">
                      {holdToast && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-3 bg-black border-l-2 border-white text-white font-mono text-xs flex items-center space-x-2"
                        >
                          <span className="text-green-400">✓</span>
                          <span>{holdToast}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right Column: Unlocked badges shelf */}
                  <div className="lg:col-span-5 bg-black/40 border border-[#262626] p-4 space-y-4">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                      PLAYER BADGE INVENTORY
                    </span>
                    <div className="grid grid-cols-2 gap-3 font-mono">
                      {holdUnlocks.map(badge => (
                        <div key={badge} className="p-3 bg-[#111111] border border-zinc-800 flex flex-col justify-between h-20 text-left">
                          <span className="text-zinc-600 text-[8px] uppercase">BADGE_UNIT</span>
                          <span className="text-white text-[11px] font-medium block truncate">{badge}</span>
                        </div>
                      ))}
                      {holdUnlocks.length < 4 && (
                        <div className="p-3 border border-dashed border-zinc-800 flex items-center justify-center text-zinc-600 text-[10px] h-20">
                          [ Locked Badge ]
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-600 block text-right">
                      *Click Simulate button to unlock more
                    </span>
                  </div>

                </div>
              </div>
            )}

            {/* 2. TECH TREK SHOWCASE */}
            {activeInteractiveTab === 'techtrek' && (
              <div className="space-y-6">
                <div className="border-b border-[#262626] pb-4">
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300 uppercase tracking-widest">
                    TECH TREK INTERACTIVE CAREER ASSESSMENT
                  </span>
                  <h3 className="text-xl font-normal text-white mt-2">Discover Your Optimal Digital Track</h3>
                </div>

                <div className="max-w-2xl mx-auto bg-black/30 border border-[#262626] p-6 text-center space-y-6">
                  {trekResult === null ? (
                    <div className="space-y-6 py-6">
                      <div className="font-mono text-zinc-500 text-xs">
                        QUESTION {trekStep + 1} OF {trekQuestions.length}
                      </div>
                      
                      <h4 className="text-lg font-light text-white leading-relaxed max-w-xl mx-auto">
                        "{trekQuestions[trekStep].text}"
                      </h4>

                      <div className="flex justify-center gap-4 font-mono text-xs">
                        <button
                          onClick={() => handleTrekAnswer(true)}
                          className="px-6 py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 transition cursor-pointer font-bold"
                        >
                          YES, AGREE
                        </button>
                        <button
                          onClick={() => handleTrekAnswer(false)}
                          className="px-6 py-2.5 bg-[#111111] border border-[#262626] text-white hover:bg-zinc-900 transition cursor-pointer"
                        >
                          NO, DISAGREE
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 py-4">
                      <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center mx-auto text-xl font-mono">
                        ✓
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                          TREK ALGORITHM MATCH
                        </span>
                        <h4 className="text-xl font-normal text-white">{trekResult}</h4>
                      </div>

                      <p className="text-xs text-[#A1A1A1] max-w-md mx-auto leading-relaxed font-light">
                        This career route aligns perfectly with Daniel's skill portfolio. It requires a balanced combination of user behavior empathy, interface aesthetics, and dynamic local caching systems.
                      </p>

                      <div className="flex justify-center gap-4 pt-2">
                        <button
                          onClick={resetTrek}
                          className="px-5 py-2 border border-zinc-800 text-zinc-400 hover:text-white font-mono text-xs transition cursor-pointer"
                        >
                          [ ASSESS AGAIN ]
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. POCKETLAB SHOWCASE */}
            {activeInteractiveTab === 'pocketlab' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262626] pb-4">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300 uppercase tracking-widest">
                      POCKETLAB COMPILER CONSOLE
                    </span>
                    <h3 className="text-xl font-normal text-white mt-1">On-Device Execution & Syntax Parser</h3>
                  </div>
                  
                  {/* Presets */}
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-zinc-600 text-[10px]">PRESETS:</span>
                    {pocketLessons.map((les, i) => (
                      <button
                        key={i}
                        onClick={() => selectPocketLesson(les.code)}
                        className="px-2.5 py-1 bg-[#1a1a1a] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[10px] cursor-pointer"
                      >
                        {les.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left block: Editor */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5 flex-1 flex flex-col">
                      <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">SOURCE CODE INPUT</label>
                      <textarea
                        value={pocketCode}
                        onChange={(e) => setPocketCode(e.target.value)}
                        className="w-full flex-1 min-h-[160px] bg-black p-4 text-xs font-mono text-green-400 border border-zinc-900 outline-none focus:border-zinc-700 resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      onClick={runPocketCompile}
                      disabled={isCompiling}
                      className="w-full py-3 bg-white text-zinc-950 font-mono text-xs font-semibold hover:bg-zinc-200 disabled:opacity-50 transition duration-150 flex items-center justify-center space-x-2 cursor-pointer select-none"
                    >
                      {isCompiling ? (
                        <>
                          <span className="w-3.5 h-3.5 border border-zinc-950 border-t-transparent animate-spin"></span>
                          <span>COMPILING PAYLOAD...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current text-zinc-950" />
                          <span>COMPILE & EXECUTE PAYLOAD</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right block: Console output */}
                  <div className="lg:col-span-6 bg-black p-4 border border-zinc-900 flex flex-col justify-between min-h-[220px]">
                    <div className="space-y-2">
                      <div className="text-[9px] font-mono tracking-widest text-zinc-600 uppercase">
                        VIRTUAL COMPILER STANDARD_OUTPUT
                      </div>
                      <div className="space-y-1.5 font-mono text-xs text-zinc-400 select-none">
                        {compileOutput.map((line, idx) => (
                          <div key={idx} className={line.startsWith('>>>') ? 'text-zinc-500' : line.startsWith('Execution') ? 'text-white' : 'text-zinc-300'}>
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-[9px] font-mono text-zinc-600 border-t border-zinc-950 pt-2 block">
                      *PocketLab runs 100% on sandboxed client engine. No data dispatched to server.
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* MY SYSTEM DESIGN PROCESS */}
      <section className="py-24 border-t border-[#262626]/40 max-w-5xl mx-auto px-6">
        <div className="max-w-xl mb-16 space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
            // EXECUTION MODEL
          </span>
          <h2 className="text-3xl font-light text-white tracking-tight">
            My Product Process
          </h2>
          <p className="text-zinc-500 text-xs font-light">
            An established, predictable pipeline for delivering highly reliable user-centric digital environments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          {[
            { step: "01", name: "Discover", desc: "Interrogating the fundamental core constraints. Mapping real-world requirements and specifying clear design limits." },
            { step: "02", name: "Design", desc: "Constructing high-fidelity, high-contrast user interfaces with clean aesthetic focus, robust layouts, and legible pairing." },
            { step: "03", name: "Build", desc: "Writing optimized, defensive backend code and clean frontend state frameworks to ensure seamless rendering on device." },
            { step: "04", name: "Improve", desc: "Evaluating system performance metrics, reviewing direct analytics data, and adjusting properties on iterative feedback logs." }
          ].map((proc, index) => (
            <div key={index} className="p-5 bg-[#111111] border border-[#262626] space-y-3">
              <span className="text-xs text-zinc-600 font-bold block">{proc.step} //</span>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">{proc.name}</h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed font-light font-sans">{proc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION & TIMELINE */}
      <section className="py-24 border-t border-[#262626]/40 bg-[#111111]/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Context */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                // SYSTEM HISTORIC LOG
              </span>
              <h2 className="text-3xl font-light text-white tracking-tight leading-tight">
                Education & Experience
              </h2>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                A clean operational log of my professional evolution, academic foundations, and key product rollouts.
              </p>

              {/* Education Spotlight Block */}
              <div className="p-4 bg-black/40 border border-[#262626] space-y-3 pt-6">
                <div className="flex items-center space-x-2 text-white">
                  <GraduationCap className="w-5 h-5 text-white" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">EDUCATION</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs text-white font-medium">Bachelor of Software Engineering</h4>
                  <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                    Nigerian Army University Biu. Focused on software engineering principles, application development, database design, and hands-on system building.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="lg:col-span-8 pl-0 md:pl-8 relative border-l border-[#262626]/80 space-y-12 ml-3">
              {[
                { year: "2026", event: "Building HOLD Engine", desc: "Architecting a high-concurrency player gaming platform. Crafting advanced leaderboard interfaces, live community event modules, and rapid caching databases." },
                { year: "2025", event: "Designed PocketLab", desc: "Conceived and constructed an interactive browser compiler sandbox, parsing user code inputs locally to support zero-latency, offline programming lessons." },
                { year: "2024", event: "Developed Tech Trek Deck", desc: "Engineered and deployed an accessible career-mapping assess deck. Focused on high compression ratios to guarantee reliable execution over highly constrained networks." },
                { year: "2023", event: "Began Academic Training", desc: "Initiated Software Engineering studies, deep-diving into Python systems algorithms, UI/UX interaction principles, and solid state routing paradigms." }
              ].map((log, index) => (
                <div key={index} className="relative pl-6">
                  {/* Glowing dot */}
                  <span className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[#0A0A0A] border-2 border-white ring-4 ring-black"></span>
                  
                  <div className="space-y-1 font-mono text-left">
                    <div className="text-[10px] text-zinc-500 font-bold">{log.year} //</div>
                    <h3 className="text-sm font-semibold text-white tracking-wide">{log.event}</h3>
                    <p className="text-xs text-[#A1A1A1] leading-relaxed font-sans font-light pt-1">{log.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* WHY WORK WITH ME & BEYOND CODING */}
      <section className="py-24 border-t border-[#262626]/40 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Why work with me */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                // ALIGNMENT PROFILE
              </span>
              <h2 className="text-2xl font-light text-white tracking-tight">
                Why Work With Me?
              </h2>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                { title: "Strong problem-solving mindset", d: "Viewing physical parameters as direct engineering boundaries, not bottlenecks." },
                { title: "Passion for building meaningful products", d: "Committed to turning complex ideas into functional products that people genuinely use." },
                { title: "Adaptability & quick acquisition", d: "Rapidly acquiring domain languages, protocol requirements, and third-party modules." },
                { title: "Attention to visual design detail", d: "Enforcing clear spacing grids, balanced negative space, and premium responsive typography." },
                { title: "Committed to continuous improvement", d: "Consistently refining product performance and reviewing interface feedback patterns." }
              ].map((adv, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-[#111111] border border-[#262626]">
                  <div className="text-white font-bold select-none pt-0.5">✓</div>
                  <div className="space-y-0.5">
                    <span className="text-zinc-200 block font-semibold">{adv.title}</span>
                    <span className="text-[10px] text-zinc-500 font-light font-sans block leading-relaxed">{adv.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beyond Coding */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                // EXTERNAL PARAMETERS
              </span>
              <h2 className="text-2xl font-light text-white tracking-tight">
                Beyond Coding
              </h2>
            </div>

            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              When I'm not writing software or compiling code blocks, I focus my energy on secondary creative pipelines and exploring dynamic solutions:
            </p>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              {[
                { act: "Singing & Vocals", s: "Pitch and performance loops" },
                { act: "Designing Graphics", s: "Raster & vector compositions" },
                { act: "Learning New Tech", s: "Acquiring hardware skills" },
                { act: "Brainstorming Ideas", s: "Iterating dynamic concepts" },
                { act: "Exploring Solutions", s: "Streamlining daily friction" }
              ].map((act, i) => (
                <div key={i} className="p-3 bg-black/40 border border-zinc-900 flex flex-col justify-between h-20 text-left">
                  <span className="text-zinc-600 text-[8px] uppercase">CREATIVE_ACTIVITY</span>
                  <div>
                    <span className="text-zinc-200 text-[11px] block">{act.act}</span>
                    <span className="text-[9px] text-zinc-500 font-light block mt-0.5">{act.s}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* TECHNICAL SKILLS COMPONENT */}
      <section id="skills" className="py-24 border-t border-[#262626]/40 bg-[#111111]/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-xl mb-16 space-y-1.5">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
              // COMPETENCY INDEX
            </span>
            <h2 className="text-3xl font-light text-white tracking-tight">
              Technical Competencies
            </h2>
            <p className="text-zinc-500 text-xs font-light">
              Explicit engineering competencies designed around standard browser stacks, programmatic execution, and product visualizers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Languages", cat: "languages" },
              { title: "Frontend Architecture", cat: "frontend" },
              { title: "Developer Tools", cat: "tools" }
            ].map(group => {
              const filtered = SKILLS_DATA.filter(s => s.category === group.cat);
              return (
                <div key={group.cat} className="space-y-4">
                  <h3 className="text-xs font-mono text-zinc-300 tracking-wider border-b border-[#262626] pb-2 uppercase">
                    // {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filtered.map(skill => (
                      <span
                        key={skill.name}
                        className="text-xs font-mono text-zinc-300 bg-[#111111] border border-[#262626] px-3 py-1.5 transition-all duration-200 select-none hover:border-white hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] cursor-default block"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT / TRANSMIT CARD */}
      <section id="contact" className="py-24 border-t border-[#262626]/40 bg-black">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#111111] border border-[#262626] p-8 md:p-12 relative overflow-hidden">
            
            {/* Visual background coordinates accent */}
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none -z-10"></div>
            
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Context details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                    // CONTACT HUB
                  </span>
                  <h2 className="text-3xl font-light text-white tracking-tight">
                    &gt; Let's Build Something Amazing
                  </h2>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  I'm always open to internships, collaborations, freelance opportunities, and exciting software projects. If you have an idea you'd like to bring to life—or simply want to connect—I'd love to hear from you.
                </p>

                <div className="space-y-4 font-mono text-xs pt-4">
                  {/* Direct Mail */}
                  <a 
                    href="mailto:danielaminu14@gmail.com"
                    className="block group py-2 border-b border-[#262626]/85"
                  >
                    <span className="text-[9px] text-zinc-600 uppercase block">Direct Mailbox</span>
                    <span className="text-zinc-200 group-hover:text-white transition duration-200 font-medium flex items-center space-x-1.5 mt-0.5">
                      <span>danielaminu14@gmail.com</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-transform duration-200" />
                    </span>
                  </a>

                  {/* WhatsApp Contact */}
                  <a 
                    href="https://wa.me/2348022857727"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group py-2 border-b border-[#262626]/85"
                  >
                    <span className="text-[9px] text-zinc-600 uppercase block">WhatsApp Only</span>
                    <span className="text-zinc-200 group-hover:text-white transition duration-200 font-medium flex items-center space-x-1.5 mt-0.5">
                      <span>08022857727</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-transform duration-200" />
                    </span>
                  </a>

                  {/* Geolocation */}
                  <div className="py-2 border-b border-[#262626]/85">
                    <span className="text-[9px] text-zinc-600 uppercase block">Physical Base</span>
                    <span className="text-zinc-200 font-medium flex items-center space-x-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Nigeria</span>
                    </span>
                  </div>
                </div>

                {/* Social links */}
                <div className="space-y-2 pt-2">
                  <div className="text-[9px] uppercase text-zinc-600 font-mono tracking-widest font-bold">CONNECT CHANNELS</div>
                  <div className="flex flex-wrap gap-4 text-xs font-mono">
                    <a 
                      href="https://github.com/oddbreeddev" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-zinc-400 hover:text-white transition"
                    >
                      [ GITHUB ]
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/daniel-aminu-830618319" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-zinc-400 hover:text-white transition"
                    >
                      [ LINKEDIN ]
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Form transmission */}
              <div className="lg:col-span-7 bg-black/35 border border-zinc-900 p-6 md:p-8">
                {transmitState === 'idle' && (
                  <form onSubmit={handleTransmitForm} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider block">Your Name</label>
                        <input 
                          type="text" 
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="e.g. Captain Carter"
                          className="w-full bg-[#0A0A0A] border border-zinc-900 focus:border-zinc-700 p-3 text-xs outline-none text-zinc-200 transition placeholder-zinc-800"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider block">Your Email</label>
                        <input 
                          type="email" 
                          required
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder="e.g. carter@domain.com"
                          className="w-full bg-[#0A0A0A] border border-zinc-900 focus:border-zinc-700 p-3 text-xs outline-none text-zinc-200 transition placeholder-zinc-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider block">Message Body</label>
                      <textarea 
                        required
                        rows={4}
                        value={senderMsg}
                        onChange={(e) => setSenderMsg(e.target.value)}
                        placeholder="Describe your project, parameters, or objective..."
                        className="w-full bg-[#0A0A0A] border border-zinc-900 focus:border-zinc-700 p-3 text-xs outline-none text-zinc-200 transition placeholder-zinc-800 resize-none font-light leading-relaxed"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-mono tracking-widest uppercase font-semibold transition-all cursor-pointer flex items-center justify-center space-x-2 select-none"
                    >
                      <Send className="w-3.5 h-3.5 text-zinc-950" />
                      <span>Transmit Signal</span>
                    </button>
                  </form>
                )}

                {transmitState === 'sending' && (
                  <div className="py-12 flex flex-col items-center justify-center space-y-3 h-full min-h-[220px] font-mono text-xs text-zinc-500">
                    <span className="w-4 h-4 border border-zinc-400 border-t-transparent animate-spin"></span>
                    <span className="text-[9px] uppercase tracking-widest text-zinc-600">Routing packet payload...</span>
                  </div>
                )}

                {transmitState === 'success' && (
                  <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center h-full min-h-[220px]">
                    <div className="w-8 h-8 border border-zinc-800 flex items-center justify-center text-zinc-300">
                      ✓
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-white text-xs font-mono uppercase tracking-widest">Signal Transmitted</h4>
                      <p className="text-zinc-500 text-xs max-w-xs leading-relaxed font-light">
                        Payload routed successfully. Daniel will review the transmission logs and respond prompt.
                      </p>
                    </div>
                    <button
                      onClick={() => setTransmitState('idle')}
                      className="mt-2 px-4 py-2 border border-zinc-900 text-[10px] uppercase font-mono text-zinc-400 hover:text-white transition cursor-pointer"
                    >
                      [ RETURN ]
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-[#262626]/40 bg-[#0A0A0A] text-center text-zinc-600 text-[10px] font-mono">
        <div className="max-w-5xl mx-auto px-6 space-y-2 select-none">
          <div className="text-zinc-200 font-medium">
            Daniel Aminu
          </div>
          <div>
            Building software. Designing experiences. Creating impact.
          </div>
          <div className="text-zinc-700 tracking-wider">
            Designed & Built with React, Tailwind & TypeScript // © 2026 All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
