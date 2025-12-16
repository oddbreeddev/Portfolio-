import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ArrowUpRight, 
  FileText, 
  Cpu, 
  Code, 
  HardHat, 
  Github, 
  Linkedin, 
  Zap 
} from 'lucide-react';

// Custom X (Twitter) Logo Component since standard libraries often lag on brand updates
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

// --- Types & Interfaces ---
interface Project {
  id: string;
  title: string;
  desc: string;
  techContext: string;
  image: string;
  tags: string[];
}

interface ProjectData {
  [key: string]: Project;
}

// --- Data ---
const PROJECTS: ProjectData = {
  techtrek: {
    id: 'techtrek',
    title: "Tech Trek",
    desc: "A career-discovery platform designed to help teenagers explore paths in technology. The core challenge was presenting complex career data in a way that felt approachable without being childish. The interface focuses on clarity, using a consistent card-based layout to guide users through discovery paths.",
    techContext: "Built using vanilla HTML/CSS/JS to ensure maximum performance on low-end devices. Uses a JSON-based data structure to map career paths, allowing for easy updates without redeploying the code logic.",
    image: "https://i.postimg.cc/bJK6f09V/Screenshot_20251216_151629_1.jpg",
    tags: ["Frontend", "UX Thinking", "Education Tech"]
  },
  eounia: {
    id: 'eounia',
    title: "Eounia",
    desc: "A self-discovery and assessment platform built around structured questions, logic, and reflection. It helps users understand patterns in their thinking. The design prioritizes a distraction-free environment to encourage deep reflection.",
    techContext: "Leverages complex JavaScript logic to map user inputs to psychological archetypes. State management is handled locally to ensure privacy—no user answers are sent to a server unless explicitly saved.",
    image: "https://i.postimg.cc/SswZbLf5/Screenshot_20251216_151848_1.jpg",
    tags: ["Logic Design", "Frontend (HTML/JS)", "Product Thinking"]
  }
};

const App: React.FC = () => {
  // --- State ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'process' | 'tools'>('process');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // --- Effects ---
  // Handle body scroll locking when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  // --- Handlers ---
  const handleOpenModal = (id: string) => {
    setSelectedProjectId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProjectId(null), 300); // Clear data after animation
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const selectedProject = selectedProjectId ? PROJECTS[selectedProjectId] : null;

  return (
    <div className="bg-background text-primary-text font-sans antialiased min-h-screen">
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border-color">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold tracking-tight text-white hover:text-accent transition duration-200">
            DANIEL AMINU
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-secondary-text hover:text-accent transition duration-200">About</a>
            <a href="#work" className="text-secondary-text hover:text-accent transition duration-200">Work</a>
            <a href="#skills" className="text-secondary-text hover:text-accent transition duration-200">Skills</a>
            <a href="#contact" className="text-secondary-text hover:text-accent transition duration-200">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-secondary-text hover:text-accent transition duration-200" 
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {mobileMenuOpen && (
          <div className="flex flex-col items-center py-4 md:hidden bg-surface border-t border-border-color fade-in">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-center text-secondary-text hover:text-accent transition duration-200">About</a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-center text-secondary-text hover:text-accent transition duration-200">Work</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-center text-secondary-text hover:text-accent transition duration-200">Skills</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-center text-secondary-text hover:text-accent transition duration-200">Contact</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="pt-24 pb-32 md:pt-40 md:pb-56 max-w-7xl mx-auto px-6 text-center">
        <div className="mb-10 w-32 h-32 mx-auto rounded-full border-white/20 border overflow-hidden bg-surface grayscale hover:grayscale-0 transition duration-500">
          <img src="https://i.postimg.cc/CKDBNg7c/1000035025_01_1.jpg" alt="Daniel Aminu" className="w-full h-full object-cover" />
        </div>
        <p className="text-secondary-text text-xl font-medium mb-4">DANIEL AMINU</p>
        <h1 className="hero-title text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight max-w-4xl mx-auto">
          Building practical systems<br className="hidden sm:block" />
          that work in real conditions.
        </h1>
        <p className="mt-6 text-xl text-secondary-text max-w-3xl mx-auto">
          Solutions Engineer focused on software and embedded systems,<br className="hidden md:block" />
          shaped by real constraints — environment, people, and purpose.
        </p>
        <div className="mt-10">
          <a href="#work" className="inline-flex items-center space-x-2 px-8 py-3 text-sm font-semibold rounded-full border border-accent text-black bg-accent hover:bg-amber-400 transition duration-300 shadow-md shadow-accent/10">
            <span>View Key Projects</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 border-t border-border-color">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">How I Approach Problems</h2>

            <p className="text-lg text-secondary-text leading-relaxed">
              I start by understanding the situation first — the people involved,
              the limitations, and what actually needs to work in the real world.
              From there, I design systems that are simple, durable, and practical.
            </p>

            <p className="text-lg text-secondary-text leading-relaxed mt-4">
              My work often sits between software and hardware.
              Sometimes that means building web-based tools,
              other times it means experimenting with embedded systems,
              reusing components, and learning directly from failure.
            </p>
            
            <p className="text-lg text-secondary-text leading-relaxed mt-4">
              This work contributes toward a long-term vision under
              <a href="https://oddtech.pxxl.click/" target="_blank" rel="noreferrer" className="text-white decoration-accent underline underline-offset-4 hover:text-accent transition duration-200">Odd Tech</a> —
              building technology that solves local problems at a standard that can scale globally.
            </p>

            <div className="mt-8">
              <a href="mailto:danielaminu14@gmail.com" className="inline-flex items-center text-accent hover:text-amber-300 transition duration-200 font-medium border-b border-accent/50 pb-1">
                Let's Connect and Discuss a Solution <ArrowUpRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
          
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-surface border border-border-color shadow-lg grayscale hover:grayscale-0 transition duration-500">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="Abstract visualization of systems and networks" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </section>

      {/* WORK SECTION */}
      <section id="work" className="py-24 border-t border-border-color">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Selected Solutions</h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            {Object.values(PROJECTS).map((project) => (
              <div key={project.id} className="bg-surface rounded-xl overflow-hidden shadow-xl transition-all hover:shadow-white/10 hover:border-accent/30 border border-transparent hover:scale-[1.01] flex flex-col h-full">
                <div className="w-full aspect-video min-h-[200px] bg-surface border-b border-border-color overflow-hidden group">
                     <img src={project.image} alt={`${project.title} Screenshot`} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-secondary-text mb-4 flex-grow">
                        {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm mb-6">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-background rounded-full border border-border-color text-secondary-text">{tag}</span>
                        ))}
                    </div>
                    <button 
                      onClick={() => handleOpenModal(project.id)} 
                      className="inline-flex items-center text-accent hover:text-amber-300 transition duration-200 font-medium cursor-pointer"
                    >
                        Read Project Notes <FileText className="w-4 h-4 ml-1" />
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 border-t border-border-color">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">Core Competencies</h2>
            
            <div className="flex justify-center mb-8 border-b border-border-color">
                <button 
                  onClick={() => setActiveTab('process')}
                  className={`px-6 py-3 font-semibold transition-all border-b-2 ${activeTab === 'process' ? 'text-white border-accent' : 'text-secondary-text border-transparent hover:border-accent/50 hover:text-white'}`}
                >
                    Process & Principles
                </button>
                <button 
                  onClick={() => setActiveTab('tools')}
                  className={`px-6 py-3 font-semibold transition-all border-b-2 ${activeTab === 'tools' ? 'text-white border-accent' : 'text-secondary-text border-transparent hover:border-accent/50 hover:text-white'}`}
                >
                    Technologies & Tools
                </button>
            </div>

            <div className="max-w-4xl mx-auto min-h-[200px]">
                {/* Process Content */}
                {activeTab === 'process' && (
                  <div className="grid sm:grid-cols-3 gap-8 text-center fade-in">
                      <div className="p-6 bg-surface rounded-xl border border-border-color">
                          <Cpu className="w-8 h-8 text-accent mx-auto mb-3" />
                          <h3 className="text-xl font-semibold mb-2">System Thinking</h3>
                          <p className="text-secondary-text text-sm">
                              Breaking problems down, understanding how parts relate,
                              and designing systems that don’t collapse under real use.
                          </p>
                      </div>
                      <div className="p-6 bg-surface rounded-xl border border-border-color">
                          <Code className="w-8 h-8 text-accent mx-auto mb-3" />
                          <h3 className="text-xl font-semibold mb-2">Software Development</h3>
                          <p className="text-secondary-text text-sm">
                              Writing clear, maintainable code with an emphasis on correctness and simplicity.
                          </p>
                      </div>
                      <div className="p-6 bg-surface rounded-xl border border-border-color">
                          <HardHat className="w-8 h-8 text-accent mx-auto mb-3" />
                          <h3 className="text-xl font-semibold mb-2">Embedded Mindset</h3>
                          <p className="text-secondary-text text-sm">
                              Awareness of hardware limits, power constraints, and how software meets the physical world.
                          </p>
                      </div>
                  </div>
                )}

                {/* Tools Content */}
                {activeTab === 'tools' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center fade-in">
                      <div className="py-3 px-2 bg-surface rounded-lg border border-border-color text-sm">Python</div>
                      <div className="py-3 px-2 bg-surface rounded-lg border border-border-color text-sm">Frontend (HTML/JS/Tailwind)</div>
                      <div className="py-3 px-2 bg-surface rounded-lg border border-border-color text-sm">Backend Fundamentals</div>
                      <div className="py-3 px-2 bg-surface rounded-lg border border-border-color text-sm">Embedded Experimentation</div>
                  </div>
                )}
            </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 border-t border-border-color">
        <div className="max-w-7xl mx-auto px-6 max-w-xl text-center">
            <h2 className="text-4xl font-bold mb-4">Let’s Build Something Meaningful</h2>
            <p className="text-secondary-text text-lg mb-8">
                Open to meaningful collaborations, learning opportunities,
                and building systems that matter.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="mailto:danielaminu14@gmail.com"
                   className="inline-block px-8 py-3 bg-accent text-black font-semibold rounded-full hover:bg-amber-400 transition duration-300 shadow-md shadow-accent/20">
                    Get in Touch
                </a>
                <a href="https://drive.google.com/file/d/1fb_YdVtOYLAERxXE1UHPOYOFh7GVCVyI/view?usp=drivesdk" target="_blank" rel="noreferrer"
                   className="inline-block px-8 py-3 border border-border-color rounded-full text-white hover:border-accent hover:text-accent transition duration-300">
                    View Resume
                </a>
            </div>

            <div className="flex justify-center gap-6 pt-10 text-secondary-text">
                <a href="https://github.com/oddbreeddev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition duration-200">
                    <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/daniel-aminu-830618319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition duration-200">
                    <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://x.com/cyb_ro" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover:text-accent transition duration-200">
                     <XLogo className="w-6 h-6" />
                </a>
                <a href="https://oddtech.pxxl.click/" target="_blank" rel="noopener noreferrer" aria-label="Odd Tech" className="hover:text-accent transition duration-200">
                    <Zap className="w-6 h-6" />
                </a>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border-color text-center text-secondary-text text-sm">
        <div className="max-w-7xl mx-auto px-6">
            © {new Date().getFullYear()} Daniel Aminu. Solutions Engineer.
        </div>
      </footer>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
              onClick={handleCloseModal}
            ></div>
            
            {/* Panel Container */}
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    {/* Panel */}
                    <div className="relative transform overflow-hidden rounded-lg bg-surface border border-border-color text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="px-6 py-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold leading-6 text-white" id="modal-title">{selectedProject?.title}</h3>
                                <button type="button" onClick={handleCloseModal} className="text-secondary-text hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="mt-4">
                                <p className="text-secondary-text leading-relaxed">
                                  {selectedProject?.desc}
                                </p>
                                
                                <div className="border-t border-border-color pt-4 mt-6">
                                    <h4 className="text-sm font-semibold text-accent mb-2 uppercase tracking-wider">Technical Context</h4>
                                    <p className="text-sm text-secondary-text leading-relaxed">
                                      {selectedProject?.techContext}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;