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
      <div className={type === 'work' ? "relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-12" : "relative"}>
        
        {/* Central Timeline for Education */}
        {type === 'education' && (
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-200 to-slate-200 dark:from-slate-700 dark:to-slate-700"></div>
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
              className={`group ${item.html || item.description ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {/* ==========================
                  TYPE: WORK (Standard Timeline)
                 ========================== */}
              {type === 'work' && (
                <div className="relative pl-10 pb-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-darkBg border-4 border-slate-300 dark:border-slate-600 group-hover:border-primary transition-colors"></div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
                    {item.role}
                    {item.html && (
                      <span className="text-[10px] uppercase tracking-wide font-bold text-primary bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800">
                        ↗
                      </span>
                    )}
                  </h3>
                  <div className="text-primary font-medium mb-1">{item.company}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-mono bg-slate-100 dark:bg-slate-800 inline-block px-2 py-1 rounded">{item.date}</div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">{item.description}</p>
                </div>
              )}

              {/* ==========================
                  TYPE: EDUCATION (Alternating Timeline)
                 ========================== */}
              {type === 'education' && (
                <>
                  {/* Mobile View */}
                  <div className="md:hidden relative border-l-2 border-dashed border-slate-200 dark:border-slate-700 pl-8 space-y-2">
                    <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-white dark:bg-darkBg border-2 border-slate-300 dark:border-slate-600 group-hover:border-primary transition-colors"></div>
                    <div className="text-sm font-mono text-slate-400 dark:text-slate-500">{item.date}</div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
                      {item.school}
                      {item.html && (
                        <span className="text-[10px] uppercase tracking-wide font-bold text-primary bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800">
                          ↗
                        </span>
                      )}
                    </h3>
                    <div className="text-slate-600 dark:text-slate-400 font-medium">{item.degree}</div>
                    <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
                      {item.location && (
                        <span className="flex items-center gap-1">
                          📍 {item.location}
                        </span>
                      )}
                      {item.gpa && (
                        <span className="flex items-center gap-1">
                          ⭐ GPA: {item.gpa}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Desktop View - Alternating */}
                  <div className="hidden md:flex items-center justify-center gap-4">
                    {/* Left Side (shown for even index) */}
                    {index % 2 === 0 ? (
                      <div className="w-5/12 text-right">
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:shadow-lg transition-all">
                          <div className="text-sm font-mono text-slate-400 dark:text-slate-500 mb-2">{item.date}</div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2 mb-1 justify-end">
                            <span>{item.school}</span>
                            {item.html && (
                              <span className="text-[10px] uppercase tracking-wide font-bold text-primary bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800">
                                ↗
                              </span>
                            )}
                          </h3>
                          <div className="text-slate-600 dark:text-slate-400 font-medium mb-2">{item.degree}</div>
                          <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 items-end">
                            {item.location && (
                              <span className="flex items-center gap-1">
                                📍 {item.location}
                              </span>
                            )}
                            {item.gpa && (
                              <span className="flex items-center gap-1">
                                ⭐ GPA: {item.gpa}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-5/12"></div>
                    )}

                    {/* Center Dot */}
                    <div className="w-2/12 flex justify-center">
                      <div className="w-4 h-4 rounded-full bg-white dark:bg-darkBg border-4 border-slate-300 dark:border-slate-600 group-hover:border-primary transition-all group-hover:shadow-lg flex-shrink-0"></div>
                    </div>

                    {/* Right Side (shown for odd index) */}
                    {index % 2 === 1 ? (
                      <div className="w-5/12 text-left">
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:shadow-lg transition-all">
                          <div className="text-sm font-mono text-slate-400 dark:text-slate-500 mb-2">{item.date}</div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2 mb-1">
                            <span>{item.school}</span>
                            {item.html && (
                              <span className="text-[10px] uppercase tracking-wide font-bold text-primary bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800">
                                ↗
                              </span>
                            )}
                          </h3>
                          <div className="text-slate-600 dark:text-slate-400 font-medium mb-2">{item.degree}</div>
                          <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                            {item.location && (
                              <span className="flex items-center gap-1">
                                📍 {item.location}
                              </span>
                            )}
                            {item.gpa && (
                              <span className="flex items-center gap-1">
                                ⭐ GPA: {item.gpa}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-5/12"></div>
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