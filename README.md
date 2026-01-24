# Biraj Gautam - Portfolio Website

A modern, interactive portfolio built with **Astro**, **React**, and **Tailwind CSS**. Features a professional timeline for work/education, alternating education timeline on desktop, interactive modals for details, and a blog section.

## 🚀 Quick Start

```bash
npm install
npm run dev      # Start dev server at http://localhost:4321
npm run build    # Production build
npm run preview  # Preview production build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── InteractiveList.jsx      # Work/Education timeline component
│   ├── InfoModal.jsx            # Modal for detailed content
│   ├── ProjectCard.jsx          # Project card component
│   └── ...other components
├── content/
│   ├── blog/                    # Blog posts (Markdown)
│   │   └── [your-post].md
│   └── config.ts                # Content collection schema
├── data/
│   ├── portfolio.json           # Main portfolio data (work, education, skills, certs, projects)
│   └── details.json             # Detailed HTML content for work/education modals
├── pages/
│   ├── index.astro              # Home page
│   ├── blog/
│   │   ├── [...slug].astro      # Blog post page
│   │   └── index.astro          # Blog listing
│   └── ...other pages
└── styles/
    └── global.css               # Global styles
```

## 📝 How to Add a Blog Post

1. Create a new markdown file in `src/content/blog/`:
   ```bash
   src/content/blog/my-awesome-post.md
   ```

2. Add frontmatter and content:
   ```markdown
   ---
   title: "My Awesome Post"
   description: "This is a great post about something cool"
   pubDate: 2026-01-23
   updatedDate: 2026-01-24
   heroImage: "/path/to/image.jpg"
   ---

   # Your content here

   This is your blog post content in Markdown format.
   ```

3. **Required fields:**
   - `title` - Post title
   - `description` - Short description (shows in preview)
   - `pubDate` - Publication date (YYYY-MM-DD)

4. **Optional fields:**
   - `updatedDate` - Last update date
   - `heroImage` - Featured image path
   - `tags` - Array of tags (e.g., `["javascript", "react"]`)

5. Your blog post will automatically appear on `/blog` and be accessible at `/blog/my-awesome-post/`

## 💼 Update Work/Education Data

### 1. Update Main Portfolio Data

Edit `src/data/portfolio.json`:

```json
{
  "work": [
    {
      "company": "Company Name",
      "role": "Your Role",
      "detailId": "work-key",           // Link to details.json
      "date": "Jan 2024 - Present",
      "location": "City, Country",
      "description": "Short description of your role"
    }
  ],
  "education": [
    {
      "school": "University/College Name",
      "degree": "Your Degree",
      "location": "City, Country",
      "gpa": "3.8",                     // Optional
      "date": "2024",
      "detailId": "edu-key"             // Link to details.json
    }
  ]
}
```

**Key fields:**
- `detailId` - Must match a key in `details.json` to enable the modal
- `date` - Display text (format as you prefer)
- `location` - Shows on education items
- `gpa` - Shows on education items

### 2. Add Detailed Content

Edit `src/data/details.json` to add rich HTML content:

```json
{
  "work-key": {
    "title": "Job Title at Company",
    "content": "<h2>Responsibilities</h2><ul><li>Item 1</li><li>Item 2</li></ul><h2>Achievements</h2><p>Your achievements here</p>"
  },
  "edu-key": {
    "title": "Degree Name at School",
    "content": "<h2>Courses</h2><p>Course descriptions here</p>"
  }
}
```

**Notes:**
- HTML content appears in the modal when clicking on an item
- The `title` field is not used (modal uses school/company name from portfolio.json)
- Use valid HTML tags - the component renders it with prose styling

## 🎨 Update Other Portfolio Sections

### Skills
Edit `src/data/portfolio.json` - `skills` array:
```json
"skills": [
  {
    "category": "Infrastructure",
    "items": [
      { "name": "Active Directory", "icon": "microsoft" },
      { "name": "Azure", "icon": "microsoft" }
    ]
  }
]
```

### Certifications
Edit `src/data/portfolio.json` - `certs` array:
```json
"certs": [
  {
    "name": "Certification Name",
    "date": "Jan 2026",
    "issuer": "Microsoft",  // Affects emoji icon
    "url": "https://verify-link.com"
  }
]
```

### Projects
Edit `src/data/portfolio.json` - `projects` array:
```json
"projects": [
  {
    "title": "Project Name",
    "description": "Short description",
    "tags": ["Tech1", "Tech2"],
    "link": "/projects/project-slug",
    "image": "",
    "fallbackIcon": "python"
  }
]
```

### Basic Info
Edit `src/data/portfolio.json` - `basics` object:
```json
"basics": {
  "name": "Your Name",
  "role": "Your Role",
  "subRole": "Sub Role",
  "tagline": "Your tagline",
  "email": "email@example.com",
  "phone": "+1 234 567 8900",
  "location": "City, Country",
  "status": "Open to Work",
  "resumeUrl": "/resume.pdf"
}
```

## 🔄 How the Timeline Works

### Work Experience (Left Border Timeline)
- Items appear in a vertical list with a left border line
- Each item has a circle dot on the timeline
- Hover to see the "↗" details badge
- Click to open detailed modal (if `detailId` exists)

### Education (Alternating Timeline)
- **Desktop**: Items alternate left/right with a center timeline
  - Even indices (0, 2, ...) → Left side
  - Odd indices (1, 3, ...) → Right side
- **Mobile**: Falls back to vertical list with left border (like work)
- Shows location, GPA, and optional details
- Click to open detailed modal (if `detailId` exists)

## 🔧 Interactive Features

- **Click/Tap items** → Opens a modal with detailed HTML content
- **Keyboard accessible** → Press Enter or Space on focused items
- **Dark mode** → Automatic based on system preference
- **Responsive** → Optimized for mobile, tablet, and desktop

## 📂 Adding New Collections

To add a new content collection (e.g., case studies):

1. Create folder: `src/content/case-studies/`
2. Add config in `src/content/config.ts`:
   ```typescript
   const caseStudies = defineCollection({
     type: 'content',
     schema: z.object({
       title: z.string(),
       description: z.string(),
       // ... add other fields
     })
   });
   export const collections = { blog, projects, caseStudies };
   ```

## 🛠️ Tech Stack

- **Astro** - Static site generation & SSR
- **React** - Interactive components (timeline, modals)
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Markdown** - Blog content

## 📋 Available Commands

| Command           | Action                              |
|-------------------|-------------------------------------|
| `npm install`     | Install dependencies                |
| `npm run dev`     | Start dev server (localhost:4321)   |
| `npm run build`   | Build for production                |
| `npm run preview` | Preview production build            |

## 📜 License

MIT - Feel free to use this as a template for your own portfolio!
