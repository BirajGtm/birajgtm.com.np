import React, { useState, useMemo } from 'react';

export default function ProjectsGrid({ projects }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  // Filter projects by search term
  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.stack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [projects, searchTerm]);

  // Sort projects
  const sortedProjects = useMemo(() => {
    const sorted = [...filteredProjects];
    switch (sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'stack-count':
        sorted.sort((a, b) => b.stack.length - a.stack.length);
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredProjects, sortBy]);

  return (
    <div className="space-y-8">
      {/* Search and Sort Controls */}
      <div className="flex flex-col gap-4">
        {/* Search Input - Large */}
        <div className="relative">
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Sort Dropdown - Small */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="title">A-Z</option>
            <option value="title-desc">Z-A</option>
            <option value="stack-count">Most Tech</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        {sortedProjects.length} of {projects.length} project{projects.length !== 1 ? 's' : ''}
      </div>

      {/* Projects Grid */}
      {sortedProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {sortedProjects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col h-full bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-5 border-2 border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Image or Dynamic Fallback */}
              <div className="h-40 w-full overflow-hidden border-b border-slate-200 dark:border-slate-700">
                {project.heroImage ? (
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                    <span className="text-4xl">🚀</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full p-5">
                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-base text-slate-600 dark:text-slate-400 mb-4 flex-grow line-clamp-3">
                  {project.description}
                </p>

                {/* Stack Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full border border-slate-200 dark:border-slate-600 group-hover:bg-primary/10 group-hover:border-primary/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {(project.repoUrl || project.liveUrl) && (
                  <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
                      >
                        Live
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 px-4 py-2 text-sm font-semibold border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center"
                      >
                        Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 mb-4 text-lg">No projects found matching your search.</p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-primary hover:underline font-semibold"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
