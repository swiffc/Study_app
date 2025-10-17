# Quick Start Guide - Cursor Workbook

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

## First Steps

### Creating Your First Workbook

1. Click the **"New"** button in the sidebar
2. Enter a name for your workbook (e.g., "My Learning Journey")
3. Start writing using markdown syntax

### Workbook Syntax Guide

#### 1. **Sections and Chapters**
```markdown
# Main Title
## Chapter 1: Introduction
### Subsection 1.1
```

#### 2. **Executable Code Blocks**
Add `:run` after the language name to make code executable:

````markdown
```javascript:run
console.log("Hello, World!");
const result = 2 + 2;
console.log("2 + 2 =", result);
```
````

**Supported Languages:**
- JavaScript / TypeScript (fully functional)
- Python (placeholder - requires Pyodide integration)

#### 3. **Interactive Q&A**
```markdown
> Question: What is React?
< Answer: React is a JavaScript library for building user interfaces.
```

Click the question to toggle the answer visibility.

#### 4. **Task Lists / Checkboxes**
```markdown
- [ ] Incomplete task
- [x] Completed task
```

Click checkboxes to toggle completion state.

#### 5. **Regular Markdown**
All standard markdown is supported:
- **Bold**, *italic*, `code`
- Lists (ordered and unordered)
- Links: [text](url)
- Images: ![alt](url)
- Tables
- Blockquotes

## Features

### View Modes

- **Preview Mode**: Read-only view with rendered markdown and interactive elements
- **Edit Mode**: Raw markdown editor
- **Split Mode**: Side-by-side editing and preview

Toggle between modes using the toolbar buttons.

### Navigation

The **Outline View** (right sidebar) automatically generates a table of contents from your headings (## and ###). Click any section to jump to it.

### Search

Use the search bar in the toolbar to find content within your workbook.

### Import/Export

- **Export**: Click the download icon to save your workbook as a `.workbook` file
- **Import**: Click the upload icon to load a previously saved workbook

### Code Execution

1. Write code in a code block with `:run` suffix
2. Click the **"Run"** button
3. See output below the code block
4. Errors are displayed in red

**Example:**
````markdown
```javascript:run
// Calculate factorial
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log("5! =", factorial(5));
```
````

## Tips & Best Practices

1. **Organize with Sections**: Use `##` for chapters and `###` for subsections
2. **Test Code Incrementally**: Run code blocks frequently to catch errors early
3. **Use Q&A for Study**: Hide answers initially to test your knowledge
4. **Track Progress**: Use checkboxes for learning goals and daily habits
5. **Regular Saves**: Workbooks auto-save, but export important ones as backup

## Example Use Cases

### 1. Learning Programming
- Create chapters for each topic
- Include executable code examples
- Add Q&A for concept review
- Track learning progress with checkboxes

### 2. Course Notes
- Organize by lectures or modules
- Embed code snippets from lessons
- Create practice problems with hidden answers
- Track assignment completion

### 3. Personal Development
- Daily habit tracking with checkboxes
- Reflection prompts using Q&A format
- Goal setting and progress monitoring
- Journal entries with structured sections

### 4. Technical Documentation
- Code examples with live execution
- Interactive tutorials
- FAQ sections with Q&A
- Step-by-step guides with checklists

## Keyboard Shortcuts

*Note: These are standard browser/textarea shortcuts*

- **Ctrl/Cmd + S**: Save (auto-save is enabled)
- **Ctrl/Cmd + F**: Search
- **Tab**: Indent (in edit mode)

## Troubleshooting

### Code Won't Execute
- Ensure the code block has `:run` suffix
- Check for syntax errors in your code
- Look for error messages in the output area

### Workbook Not Saving
- Check browser console for errors
- Ensure IndexedDB is enabled in your browser
- Try exporting as backup

### UI Not Responsive
- Refresh the page
- Clear browser cache
- Check browser compatibility (modern browsers required)

## Data Storage

Workbooks are stored locally in your browser using **IndexedDB**. This means:
- ✅ No internet required
- ✅ Data stays private on your machine
- ⚠️ Clearing browser data will delete workbooks
- 💡 Export important workbooks as files

## Next Steps

1. Explore the **demo.workbook** example in `src/examples/`
2. Create your first workbook
3. Experiment with different features
4. Build your personal knowledge base!

## Support & Contributing

For issues or feature requests, please refer to the main README.md file.

Happy learning! 📚✨
