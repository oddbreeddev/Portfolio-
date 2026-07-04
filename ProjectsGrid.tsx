import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from './types';
import { ArrowUpRight, ChevronDown, Code, Shield, HelpCircle } from 'lucide-react';

export const PROJECTS_DATA: { [key: string]: Project } = {
  techtrek: {
    id: 'techtrek',
    title: "Tech Trek",
    desc: "A lightweight career-discovery deck built for teenagers to explore modern technology pathways. Optimized for ultra-low data consumption on budget mobile devices.",
    longDesc: "Exploring tech careers is often cluttered with bulky databases and heavy media. Tech Trek was engineered to provide structured career decks that load instantly, even on weak edge connections, presenting approachable learning paths for students.",
    techContext: "Written with a highly optimized React footprint. All asset routing is mapped statically to minimize network roundtrips, resulting in a page load time of under a second under active bandwidth throttling.",
    challenge: "Heavy database-driven websites fail to load on erratic, expensive cellular networks in regional schools.",
    solution: "Compiled all career nodes into a single, compact client-side JSON dictionary, reducing the initial data weight to 120KB and enabling near-instant local search.",
    image: "https://i.postimg.cc/bJK6f09V/Screenshot_20251216_151629_1.jpg",
    tags: ["Frontend", "UX Thinking", "Education Tech"],
    metrics: [
      { label: "Data Weight", value: "120 KB" },
      { label: "Load Time", value: "0.8s" },
      { label: "Target Devices", value: "Budget Mobile" }
    ],
    links: {
      github: "https://github.com/oddbreeddev/tech-trek"
    }
  },
  eounia: {
    id: 'eounia',
    title: "Eounia Platform",
    desc: "A distraction-free, local-first assessment platform mapping cognitive patterns and archetypes with client-authoritative privacy.",
    longDesc: "Assessment platforms typically track user telemetry and store sensitive psychological logs on remote databases. Eounia serves as a quiet, local-first mirror that analyzes response metrics without server reliance, respecting absolute user privacy.",
    techContext: "Built around a robust local state router that manages multi-step evaluation states entirely in the browser memory. Relies on structured LocalStorage cache buffers for persistent session retrieval.",
    challenge: "Sending personal, highly specific psychological answers to a central server raises severe privacy risks and API overhead.",
    solution: "Developed an client-side branching evaluation engine. All analysis is completed locally on the client's processor, yielding instant outputs and zero external data exposure.",
    image: "https://i.postimg.cc/SswZbLf5/Screenshot_20251216_151848_1.jpg",
    tags: ["Logic Design", "Local Storage", "Product Design"],
    metrics: [
      { label: "Data Privacy", value: "100% Local" },
      { label: "Compute Latency", value: "2ms" },
      { label: "Compliance Risk", value: "Zero" }
    ],
    links: {
      github: "https://github.com/oddbreeddev/eounia-core"
    }
  },
  voltsentry: {
    id: 'voltsentry',
    title: "VoltSentry IoT Monitor",
    desc: "A remote, low-power telemetry logger capturing solar battery voltage waveforms and ambient data over high-frequency LoRa radio networks.",
    longDesc: "Solar charging arrays deployed in remote locations are difficult to monitor due to the lack of cellular grids and grid power. VoltSentry is custom hardware and firmware designed to gather real-time voltage analytics, perform anomaly diagnostics, and broadcast reports on unlicensed RF bands.",
    techContext: "Firmware engineered in optimized C++ for the ESP32 platform. Features hardware interrupts for voltage sampling, a state machine for packet routing, and dynamic sleep registers.",
    challenge: "Active wireless modems drain battery reserves quickly, rendering remote monitoring units inoperable during long cloudy spells.",
    solution: "Configured ESP32 deep-sleep registers to drop current draw to 15µA. The system wakes up on interval interrupts, samples the sensors in a 40ms burst, and goes back to sleep, reducing radio power consumption by over 99%.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    tags: ["Embedded Systems", "LoRa / IoT", "Firmware C++"],
    metrics: [
      { label: "Sleep Current", value: "15 µA" },
      { label: "Uptime Margin", value: "Continuous" },
      { label: "RF Range", value: "4.2 KM" }
    ],
    links: {
      github: "https://github.com/oddbreeddev/volt-sentry"
    }
  }
};

interface ProjectsGridProps {
  onSelectProject: (id: string) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-6">
        {Object.values(PROJECTS_DATA).map((project) => {
          const isExpanded = expandedId === project.id;
          return (
            <div 
              key={project.id}
              className="border-b border-zinc-800 pb-8 last:border-b-0"
            >
              <div 
                onClick={() => toggleExpand(project.id)}
                className="flex flex-col md:flex-row md:items-start justify-between gap-4 cursor-pointer group py-4"
              >
                {/* Text Summary */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-medium text-zinc-100 group-hover:text-amber-500 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded">
                      {project.tags[0]}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                {/* Toggle control */}
                <div className="flex items-center space-x-2 text-zinc-500 group-hover:text-zinc-300 transition-colors duration-200">
                  <span className="text-xs font-mono">
                    {isExpanded ? "[ Close Details ]" : "[ Read Case Study ]"}
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  </motion.div>
                </div>
              </div>

              {/* Expandable Case Study Details */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                      
                      {/* Technical breakdown columns */}
                      <div className="md:col-span-8 space-y-6">
                        
                        {/* Project Narrative */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                            Context & Requirements
                          </h4>
                          <p className="text-sm text-zinc-300 leading-relaxed">
                            {project.longDesc}
                          </p>
                        </div>

                        {/* Constraints vs Solution Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl space-y-1.5">
                            <div className="flex items-center space-x-2 text-red-400">
                              <HelpCircle className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                                Environmental Constraint
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                              {project.challenge}
                            </p>
                          </div>

                          <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-1.5">
                            <div className="flex items-center space-x-2 text-amber-500">
                              <Shield className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                                Systems Solution
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                              {project.solution}
                            </p>
                          </div>
                        </div>

                        {/* Under the hood context */}
                        <div className="space-y-2 p-4 bg-zinc-950 border border-zinc-900 rounded-xl">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center space-x-1.5">
                            <Code className="w-3.5 h-3.5 text-amber-500" />
                            <span>Implementation Architecture</span>
                          </h4>
                          <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                            {project.techContext}
                          </p>
                        </div>

                      </div>

                      {/* Right sidebar specs */}
                      <div className="md:col-span-4 flex flex-col justify-between bg-zinc-950 border border-zinc-900 rounded-xl p-5 font-mono">
                        <div className="space-y-4">
                          <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                            Performance Log
                          </h4>
                          <div className="space-y-3">
                            {project.metrics.map((metric, idx) => (
                              <div key={idx} className="border-b border-zinc-900 pb-2 last:border-b-0">
                                <div className="text-[10px] text-zinc-500 uppercase">{metric.label}</div>
                                <div className="text-sm font-semibold text-zinc-200 mt-0.5">{metric.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6">
                          <div className="text-[10px] text-zinc-500 uppercase mb-2">Technology Deck</div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="text-[9px] px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {project.links?.github && (
                          <div className="pt-6">
                            <a 
                              href={project.links.github} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1.5 text-xs text-amber-500 hover:text-amber-400 hover:underline"
                            >
                              <span>Inspect Repository</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}

                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
