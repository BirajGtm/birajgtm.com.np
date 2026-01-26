---
title: "My Portfolio Architecture"
description: "How I built a hybrid IT portfolio using Astro, React, and Tailwind CSS."
stack: ["Astro", "React", "Tailwind CSS", "Astro Content Collections", "Vite"]
repoUrl: "https://github.com/birajgtm/birajgtm.com.np"
liveUrl: "https://birajgtm.com.np"
category: "Coding"
visible: true
featured: false
---

Building this portfolio was a strategic effort to showcase two distinct professional identities: **Enterprise IT Support Specialist** and **Automation/AI Engineer**. The architecture was designed to be modular, fast, and visually premium.

## The Thought Process

The primary challenge was information density. As an IT specialist with certifications, hardware projects, and various coding applications, a standard "About Me" page wasn't enough. I needed a system that could:

- Highlight **Key Achievements** while making the full technical repository accessible.
- Clearly divide **IT Infrastructure** work from **Software Development**.
- Provide a **High-Fidelity** user experience that mirrors the quality of enterprise systems I manage.

## Planning & Architecture

### 1. Hybrid Data Management

I implemented a dual-source content system. **Markdown** files power the dedicated project and blog pages for SEO and deep-dives, while a central **JSON registry** (`portfolio.json`) feeds interactive components like the **Command Terminal**. This ensures I only have to update data once to see it reflected site-wide.

### 2. Smart Filtering System

To manage the "Best vs. All" problem, I built a custom flag system:

- `visible: bool`: Allows me to keep experimental projects in the codebase without them appearing in the UI.
- `featured: bool`: Promotes high-impact projects to the homepage while keeping the others in the full inventory.
- `category: string`: Automatically routes projects into "IT" or "Coding" sections to maintain professional clarity.

### 3. Interactive Engagement

I focused on creating a "living" interface:

- **Interactive Terminal**: A CLI component that feels native to IT professionals, allowing users to query my skills and projects directly.
- **Categorized Skills Engine**: A 6-section grid for high-level visibility, paired with a comprehensive modal that reveals over 50 specific technical competencies.
- **Smart Navigation**: Implementing "Suggested Projects" based on current categories to keep visitors engaged in my narrative.

## Technical Highlights

- **Astro**: Used as the backbone for lightning-fast Static Site Generation (SSG).
- **React Components**: Leveraged for complex UI states like the theme toggle, terminal, and search filters.
- **Tailwind CSS v4**: Enabled a modern, glassmorphic design language with smooth theme transitions and technical background textures.
- **Glassmorphism**: Integrated subtle blurs and radial glows to give the site an executive, high-tech aesthetic.
