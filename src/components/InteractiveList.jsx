/**
 * INTERACTIVE TIMELINE LIST
 * Renders the Work and Education timelines.
 * - Displays high-level info (Role, Date, Location) in a sleek list.
 * - Handles the click-to-expand logic that launches the InfoModal with detailed content.
 */
import React, { useState } from 'react';
import InfoModal from './InfoModal';

export default function InteractiveList({ items, type }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpen = (item) => {
    // Use HTML content when available, otherwise fallback to description
    const content = item.html || (item.description ? `<p>${item.description}</p>` : '<p>No details available.</p>');
    setSelectedItem({
      title: type === 'work' ? item.role : item.school,
      subtitle: type === 'work' ? item.company : item.degree,
      date: item.date,
      content
    });
  };

  const handleClick = (e, item) => {
    e.stopPropagation();
    handleOpen(item);
  };

  const handleKey = (e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen(item);
    }
  };

  return (
    <>
      {/* 
         LAYOUT CONTAINER 
         - Work: Left Border Line (solid)
         - Education: Alternating timeline (left/right)
      */}
      <div className={type === 'work' ? "relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-12" : "relative"}>
        
        {/* Central Timeline for Education */}
        {type === 'education' && (
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-primary/50"></div>
        )}
        
        {/* Alternating Layout */}
        <div className={type === 'education' ? "space-y-8 md:space-y-12" : ""}>
          {items.map((item, index) => (
            <div 
              key={index}
              role={item.html || item.description ? 'button' : undefined}
              tabIndex={item.html || item.description ? 0 : -1}
              onClick={(e) => handleClick(e, item)}
              onKeyDown={(e) => handleKey(e, item)}
              className={`group transition-all duration-300 ${item.html || item.description ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {/* ==========================
                  TYPE: WORK (Standard Timeline)
                  ========================== */}
              {type === 'work' && (
                <div className="relative pl-10 pb-2">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-darkBg border-4 border-slate-300 dark:border-slate-700 group-hover:border-primary group-hover:scale-125 transition-all duration-300 shadow-sm z-10"></div>
                  <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{item.role}</span>
                      {item.html && (
                        <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 animate-pulse">
                          Details ↗
                        </span>
                      )}
                    </h3>
                    <div className="text-primary font-semibold text-lg mb-3 flex items-center gap-2">
                       <span className="w-5 h-px bg-primary/30"></span>
                       {item.company}
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {item.date}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl relative z-10">{item.description}</p>
                  </div>
                </div>
              )}

              {/* ==========================
                  TYPE: EDUCATION (Alternating Timeline)
                  ========================== */}
              {type === 'education' && (
                <>
                  {/* Mobile View */}
                  <div className="md:hidden relative border-l-2 border-dashed border-slate-200 dark:border-slate-800 pl-8 space-y-2 pb-4">
                    <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-white dark:bg-darkBg border-2 border-slate-300 dark:border-slate-700 group-hover:border-primary transition-colors"></div>
                    <div className="bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                      <div className="text-sm font-mono text-slate-400 dark:text-slate-500 mb-2">{item.date}</div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center justify-between">
                        <span>{item.school}</span>
                        {item.html && (
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                            ↗
                          </span>
                        )}
                      </h3>
                      <div className="text-primary font-medium mb-3">{item.degree}</div>
                      <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
                        {item.location && <span className="flex items-center gap-1">📍 {item.location}</span>}
                        {item.gpa && <span className="flex items-center gap-1">⭐ GPA: {item.gpa}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Desktop View - Alternating */}
                  <div className="hidden md:flex items-center justify-center gap-8">
                    {/* Left Side (shown for even index) */}
                    {index % 2 === 0 ? (
                      <div className="w-5/12">
                        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 text-right backdrop-blur-sm group-hover:bg-white dark:group-hover:bg-slate-900 relative h-full">
                          <div className="text-sm font-mono text-slate-400 dark:text-slate-500 mb-3">{item.date}</div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2 mb-2 justify-end">
                            {item.html && (
                              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                                ↗
                              </span>
                            )}
                            <span>{item.school}</span>
                          </h3>
                          <div className="text-primary font-medium text-lg mb-4">{item.degree}</div>
                          <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 items-end">
                            {item.location && <span className="flex items-center gap-1">📍 {item.location}</span>}
                            {item.gpa && <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-bold font-mono">GPA: {item.gpa}</span>}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-5/12 invisible h-0 overflow-hidden"></div>
                    )}

                    {/* Center Dot */}
                    <div className="w-1/12 flex justify-center relative">
                      <div className="w-5 h-5 rounded-full bg-white dark:bg-darkBg border-4 border-slate-300 dark:border-slate-700 group-hover:border-primary group-hover:scale-125 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 blur-sm"></div>
                    </div>

                    {/* Right Side (shown for odd index) */}
                    {index % 2 === 1 ? (
                      <div className="w-5/12">
                        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm group-hover:bg-white dark:group-hover:bg-slate-900 relative h-full">
                          <div className="text-sm font-mono text-slate-400 dark:text-slate-500 mb-3">{item.date}</div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2 mb-2">
                            <span>{item.school}</span>
                            {item.html && (
                              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                                ↗
                              </span>
                            )}
                          </h3>
                          <div className="text-primary font-medium text-lg mb-4">{item.degree}</div>
                          <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                            {item.location && <span className="flex items-center gap-1">📍 {item.location}</span>}
                            {item.gpa && <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-bold font-mono w-fit">GPA: {item.gpa}</span>}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-5/12 invisible h-0 overflow-hidden"></div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <InfoModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        data={selectedItem} 
      />
    </>
  );
}