import React from 'react';

export default function Timeline({ items, type }) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-blue-400 to-primary transform md:-translate-x-1/2"></div>
      
      <div className="space-y-12">
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col md:flex-row gap-8 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-darkBg transform md:-translate-x-1/2 z-10 shadow-lg"></div>
            
            {/* Content card */}
            <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group">
                {/* Date badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3 ${index % 2 === 0 ? 'md:float-right md:ml-4' : 'md:float-left md:mr-4'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {item.startDate} - {item.endDate || 'Present'}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {item.position || item.degree}
                </h3>
                
                <p className="text-lg text-primary font-medium mb-3">
                  {item.company || item.institution}
                </p>
                
                {item.location && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2 {index % 2 === 0 ? 'md:justify-end' : ''}">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.location}
                  </p>
                )}
                
                {item.description && (
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                )}
                
                {item.achievements && item.achievements.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            {/* Spacer for alternating layout */}
            <div className="hidden md:block flex-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
