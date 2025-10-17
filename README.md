# Cursor Workbook Feature

An integrated, structured environment to combine text-based notes, code snippets, interactive exercises, and personal reflections within your coding workflow.

## Features

- 📝 **Markdown-based** workbook format with rich text support
- 💻 **Executable code blocks** with syntax highlighting (Python, JavaScript, TypeScript, etc.)
- ❓ **Interactive Q&A prompts** with collapsible answers
- ✅ **Checkbox/To-do lists** for habit tracking and task management
- 🗂️ **Section navigation** with automatic outline generation
- 🔍 **Search functionality** within workbooks
- 💾 **Local storage** with IndexedDB
- 🎨 **Modern UI** with Tailwind CSS
- 📅 **Daily Focus Page** - Automated daily guidance with personalized content for each day of the week
- 🎯 **Smart Task Management** - Daily tasks, affirmations, and focus areas that adapt to your schedule
- 🌟 **Progress Tracking** - Real-time completion rates and visual progress indicators

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Workbook Syntax

### Sections/Chapters
```markdown
## Chapter 1: Introduction
### Subsection 1.1
```

### Code Blocks (Executable)
````markdown
```javascript:run
console.log("Hello, World!");
```
````

### Q&A Prompts
```markdown
> Question: What is React?
< Answer: React is a JavaScript library for building user interfaces.
```

### Checkboxes
```markdown
- [ ] Task 1
- [x] Task 2 (completed)
```

### Habits Tracker
```markdown
---habit: Daily Exercise
- [x] 2023-10-26
- [ ] 2023-10-27
---
```

## Daily Focus Page

The **Daily Focus Page** is an automated daily guidance system that provides personalized content for each day of the week. Access it from the Dashboard or navigate to `/daily-focus`.

### Weekly Structure

Each day has a unique theme with specific content:

- **Sunday**: Vision & Planning - Set weekly intentions and visualize success
- **Monday**: Momentum & Action - Build unstoppable momentum with high-impact tasks
- **Tuesday**: Deep Work & Mastery - Enter flow states and master new skills
- **Wednesday**: Connection & Communication - Build relationships and communicate effectively
- **Thursday**: Execution & Results - Complete projects and create measurable outcomes
- **Friday**: Optimization & Improvement - Review, optimize, and improve systems
- **Saturday**: Recharge & Restore - Rest, recover, and pursue passion projects

### Features

- ✨ **Morning Affirmations** - 3 daily affirmations aligned with the day's theme
- 🎯 **Daily Tasks** - 4 actionable tasks categorized as mindset, action, or reflection
- 🧠 **Focus Areas** - 4 key areas to concentrate on throughout the day
- 🌙 **Evening Reflection** - Thoughtful questions that appear after 5 PM
- 📊 **Progress Tracking** - Real-time completion rates and visual progress bars
- 📅 **Weekly Navigation** - Quick access to any day's content
- 💾 **Auto-Save** - Your progress is automatically saved for each day

### How to Use

1. Visit the Dashboard and click the large "Daily Focus" banner
2. Read and click through your morning affirmations
3. Complete your daily tasks by clicking on them
4. Review your focus areas throughout the day
5. In the evening (after 5 PM), reflect on the day with guided questions
6. Track your progress with the completion percentage

See [DAILY-FOCUS-FEATURE.md](./DAILY-FOCUS-FEATURE.md) for complete documentation.

## Architecture

- **React** + **TypeScript** for UI components
- **Vite** for fast development and building
- **Zustand** for state management
- **IndexedDB** for local storage
- **Sandboxed code execution** using Web Workers
- **Tailwind CSS** for styling

## Security

Code execution is sandboxed to prevent malicious code from affecting your system.

## License

MIT
