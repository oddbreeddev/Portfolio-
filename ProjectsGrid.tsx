import React from 'react';
import { motion } from 'motion/react';
import { Project } from './types';
import { ArrowUpRight, Github, Gamepad2, Compass, BookOpen } from 'lucide-react';

export const PROJECTS_DATA: { [key: string]: Project } = {
  hold: {
    id: 'hold',
    title: "HOLD",
    desc: "A next-generation gaming platform built to bring players together through exciting challenges, achievements, seasonal events, and rewarding gameplay. Features a highly optimized, fast-refresh community interface and real-time multiplayer coordination panels.",
    longDesc: "HOLD focuses on creating an engaging gaming ecosystem where players compete, earn exclusive rewards, unlock badges, and become part of an active community. The architecture optimizes high-concurrency player interactions, providing fluid leaderboard updates, localized data caching, and rewarding micro-interactions.",
    techContext: "React SPA, Node.js, Express, Tailwind CSS, Local Storage state synchronization, high-performance UI components with low latency updates.",
    challenge: "Traditional community and event boards generate high server overhead and introduce lag in fast-paced live environments.",
    solution: "Designed custom event queues on the client-side combined with localized web cache stores. Reduced network roundtrips, allowing the interface to maintain a smooth 60 FPS refresh rate under intensive data-payload updates.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    tags: ["Product Architecture", "UI/UX Design", "Platform Systems"],
    metrics: [
      { label: "Active Players", value: "10k+ Peak" },
      { label: "Response Delay", value: "< 45ms" },
      { label: "State Refresh", value: "Real-time" }
    ],
    links: {
      github: "https://github.com/oddbreeddev/hold-platform",
      demo: "#hold-showcase"
    }
  },
  techtrek: {
    id: 'techtrek',
    title: "Tech Trek",
    desc: "Tech Trek is an educational initiative that helps students discover careers in technology and develop the skills needed to succeed in the digital world. Highly optimized for resource-constrained environments.",
    longDesc: "The platform provides career guidance, learning resources, mentorship opportunities, and interactive career assessments to inspire the next generation of tech professionals. By simplifying career decision frameworks into lightweight interactive assessment decks, it empowers students across high-latency connection grids.",
    techContext: "TypeScript Core, Tailwind Utility CSS, Static JSON Career Deck mappings, zero external database requirements.",
    challenge: "Bulky, media-heavy educational resources fail to load on high-cost, unstable cellular networks in remote regional schools.",
    solution: "Compiled all career profiles, skills roadmaps, and binary assessments into a single static client-side JSON database of 120KB. Reduced initial transfer data size by over 90%.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    tags: ["Frontend Design", "Education Tech", "UX Research"],
    metrics: [
      { label: "Initial Payload", value: "120 KB" },
      { label: "Load Velocity", value: "< 0.8s" },
      { label: "Students Reached", value: "1,500+" }
    ],
    links: {
      github: "https://github.com/oddbreeddev/tech-trek",
      demo: "#tech-trek-playground"
    }
  },
  pocketlab: {
    id: 'pocketlab',
    title: "PocketLab",
    desc: "PocketLab is an interactive learning platform that teaches programming through project-based lessons, visual explanations, coding exercises, and practical challenges.",
    longDesc: "The goal is to make learning programming engaging, accessible, and enjoyable for everyone. By implementing isolated client-side code execution sandboxes, it offers instant feedback to learners without requiring active server compilation units.",
    techContext: "TypeScript, React, Local Storage persistence, Client-side Isolated Evaluator, custom visual syntax markers.",
    challenge: "Deploying high-overhead server sandboxes for code execution is costly, slow, and raises critical remote environment security risks.",
    solution: "Developed an on-device sandboxed interpreter and regex-based code-path validator. All lessons and execution checkouts run locally on the browser, offering sub-millisecond compile states and total offline durability.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    tags: ["Compiler Mechanics", "SaaS EdTech", "Interactive Design"],
    metrics: [
      { label: "Compilation Latency", value: "Sub-ms" },
      { label: "Platform Footprint", value: "320 KB" },
      { label: "Offline Availability", value: "100%" }
    ],
    links: {
      github: "https://github.com/oddbreeddev/pocketlab",
      demo: "#pocketlab-playground"
    }
  }
};

interface ProjectsGridProps {
  onInteractProject?: (id: string) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onInteractProject }) => {
  return (
    <div className="space-y-24 md:space-y-36">
      {Object.values(PROJECTS_DATA).map((project, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <div 
            key={project.id}
            id={`project-${project.id}`}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
          >
            {/* Visual Aspect */}
            <motion.div 
              initial={{ opacity: 0, x: isEven ? -25 : 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
            >
              <div className="group relative overflow-hidden bg-zinc-950 border border-zinc-900 aspect-[16/10] flex items-center justify-center">
                {/* Image under strict monochrome filter */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:scale-105 group-hover:brightness-75 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
                
                {/* Absolute overlay indicator */}
                <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest bg-black/85 border border-zinc-900 px-2 py-1 text-zinc-500">
                  {project.id === 'hold' ? <Gamepad2 className="w-3 h-3 inline mr-1 text-white" /> :
                   project.id === 'techtrek' ? <Compass className="w-3 h-3 inline mr-1 text-white" /> :
                   <BookOpen className="w-3 h-3 inline mr-1 text-white" />}
                  PROJECT_0{index + 1}
                </div>

                {/* Performance index badge */}
                <div className="absolute bottom-4 right-4 bg-black/85 border border-zinc-900 p-3 font-mono text-left space-y-1 max-w-[150px] select-none">
                  <div className="text-[8px] text-zinc-600 uppercase tracking-widest">METRIC_LOG</div>
                  <div className="text-[11px] font-bold text-white">{project.metrics[0].value}</div>
                  <div className="text-[9px] text-zinc-400 font-light">{project.metrics[0].label}</div>
                </div>
              </div>
            </motion.div>

            {/* Content Context */}
            <motion.div 
              initial={{ opacity: 0, x: isEven ? 25 : -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
            >
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                    // FEATURED SYSTEM
                  </span>
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5">
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                  {project.title}
                </h3>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                {project.desc}
              </p>

              {/* Collapsed breakdown in linear form */}
              <div className="space-y-4 pt-2 border-t border-zinc-900/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">THE CHALLENGE</span>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">{project.challenge}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider block">THE SOLUTION</span>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">{project.solution}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs">
                {project.links?.demo && (
                  <a 
                    href={project.links.demo}
                    onClick={() => onInteractProject && onInteractProject(project.id)}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white text-zinc-950 hover:bg-zinc-200 transition duration-150"
                  >
                    <span>Launch Demonstration</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-950" />
                  </a>
                )}
                {project.links?.github && (
                  <a 
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-zinc-950 border border-zinc-900 text-zinc-300 hover:bg-zinc-900 transition duration-150"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
