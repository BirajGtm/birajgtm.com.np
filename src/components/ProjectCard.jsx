import React from 'react';

export default function ProjectCard({ title, description, tags, link, image, fallbackIcon }) {
  return (
    <a href={link} className="group relative block h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300">
      
      {/* IMAGE AREA */}
      <div className="h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 relative border-b border-slate-100 dark:border-slate-700">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* FALLBACK PATTERN (If no image) */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-900">
             {/* Uses the fallbackIcon string from JSON to show a large background letter/emoji */}
             <span className="text-6xl opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-300 select-none">
                {fallbackIcon === 'python' ? '🐍' : 
                 fallbackIcon === 'react' ? '⚛️' : 
                 fallbackIcon === 'shield' ? '🛡️' : 
                 '💻'}
             </span>
          </div>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
            {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
            {description}
        </p>
        
        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs font-semibold font-mono bg-blue-50 dark:bg-slate-700 text-primary dark:text-blue-300 rounded border border-blue-100 dark:border-transparent">
                    {tag}
                </span>
            ))}
        </div>
      </div>
    </a>
  );
}