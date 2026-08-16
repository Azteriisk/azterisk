'use client';

import React from 'react';
import { SUBDOMAIN_PROJECTS, SubdomainProject } from '@/config/projects';
import { TechIcon } from './TechIcon';
import { GithubIcon } from './Icons';
import { ExternalLink, Globe, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectListViewProps {
  onSelectProject: (project: SubdomainProject) => void;
}

export function ProjectListView({ onSelectProject }: ProjectListViewProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 relative z-10">
      <div className="flex flex-col gap-4">
        {SUBDOMAIN_PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            onClick={() => onSelectProject(project)}
            className="group glass-panel glass-panel-hover rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-300 border border-white/10"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Left Column: Title, Subdomain, Description */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {project.subdomain}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Node {index + 1}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {project.name}
                  </h3>
                  <ArrowUpRight size={18} className="text-slate-500 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-sans">
                  {project.shortDescription}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                    >
                      <TechIcon techId={tech.id} size={13} />
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Direct Launch Link & GitHub */}
              <div className="flex md:flex-col gap-2.5 items-end justify-center min-w-[170px]" onClick={(e) => e.stopPropagation()}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-md"
                >
                  <Globe size={14} />
                  <span>Visit Subdomain</span>
                  <ExternalLink size={12} />
                </a>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 hover:bg-black text-white border border-white/20 font-mono text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <GithubIcon size={13} />
                    <span>View Source</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
