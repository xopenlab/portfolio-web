# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional portfolio website for Josevi Pérez built with Node.js, Express v5, EJS, Alpine.js v3.15.1, and Tailwind CSS v4. The application is a single-page portfolio with server-side rendering using EJS templates.

## Common Commands

### Development
```bash
npm run dev              # Start development server with nodemon (hot reload)
npm run build:css        # Build Tailwind CSS (watch mode)
npm run dev:all          # Run both dev server and CSS build concurrently
```

### Production
```bash
npm run build:css:prod   # Build minified CSS for production
npm start                # Start production server (no hot reload)
```

### Environment Setup
1. Copy `.env.example` to `.env`
2. Update environment variables (PORT, CONTACT_EMAIL, SMTP settings if needed)

## Architecture

### ES Modules
The entire project uses ES modules (`"type": "module"` in package.json). All imports use `.js` extensions and `import/export` syntax.

### Application Structure

**Entry Point**: `server.js`
- Initializes Express app
- Configures EJS view engine with views in `src/views/`
- Sets up middleware stack: Helmet (CSP), compression, Morgan logging
- Serves static files from `public/`
- Routes defined in `src/routes/index.routes.js`
- Custom error handlers for 404 and 500 (with fallback HTML if EJS fails)

**Data-Driven Rendering**:
- Portfolio content lives in `src/controllers/page.controller.js` as `portfolioData` object
- Controller exports `getHome()` and `sendContactForm()` handlers
- To update portfolio content (personal info, experience, skills, projects), edit the `portfolioData` object

**View Layer**:
- Main layout: `src/views/layouts/main.ejs`
- Pages: `src/views/pages/home.ejs`
- Partials: `src/views/partials/` (head, header, footer)
- Sections: `src/views/partials/sections/` (hero, about, education, experience, skills, projects, contact)

**Frontend**:
- Alpine.js v3.15.1 (CDN) for reactive UI components (dark mode toggle, mobile menu)
- Custom JS modules in `public/js/`:
  - `theme.js`: Dark mode persistence with localStorage
  - `animations.js`: Scroll animations and visual effects
  - `main.js`: General utilities (scroll header effects, lazy loading, form validation, easter eggs)

### Tailwind CSS v4 Configuration

**Build Process**:
- Input: `public/css/styles.css`
- Output: `public/css/output.css` (generated, not tracked in git)
- PostCSS configured in `postcss.config.js` with `@tailwindcss/postcss` plugin
- Run `npm run build:css` to generate CSS before starting dev server, or use `npm run dev:all`

**Important v4 Features**:
- Uses `@theme` directive for custom design tokens (colors, fonts, animations)
- Uses modern `@import` with `layer()` syntax for theme, preflight, and utilities
- Custom colors (primary/secondary) defined using CSS custom properties with `--color-*` prefix
- **CRITICAL**: Dark mode usa directiva `@variant dark (&:where(.dark, .dark *))` en CSS, NO en config JS
- `tailwind.config.js` specifies content paths for tree-shaking optimization
- No need to configure colors, fonts, or theme in JS config - use `@theme` in CSS instead

**CSS Structure**:
- `@theme`: Define custom design tokens (colors, fonts, spacing, animations)
- `@layer base`: Base styles and element resets
- `@layer components`: Reusable component classes (`.btn-primary`, `.card`, etc.)
- `@layer utilities`: Custom utility classes (`.glass`, `.gradient-text`, etc.)

**Key Conventions**:
- Always use `@apply` directive for Tailwind utilities within layers
- Define keyframes outside of `@theme` but reference them inside
- Use CSS custom properties for theme values: `--color-primary-500`, `--font-sans`, etc.

**Advanced v4 Features Implemented**:

1. **Custom Variants** (`@custom-variant`):
   - `optional:` - Applies styles to optional form fields
   - `invalid:` - Applies styles to invalid form fields
   - `valid:` - Applies styles to valid form fields
   - `has-tooltip:` - Applies styles to elements with `data-tooltip` attribute
   - `interactive:` - Applies styles to interactive elements (buttons, links)

2. **Custom Selectors** (`@custom-selector`):
   - `:--heading` - Matches all heading elements (h1-h6)
   - `:--button` - Matches all button-like elements
   - Use these for consistent styling across element groups

3. **Animation Utilities**:
   - `.animate-fade-in` - Fade in animation
   - `.animate-fade-in-up` - Fade in from bottom
   - `.animate-fade-in-down` - Fade in from top
   - `.animate-slide-in-left` - Slide in from left
   - `.animate-slide-in-right` - Slide in from right
   - `.animate-bounce-slow` - Slow bounce animation
   - `.animate-pulse-slow` - Slow pulse animation
   - All animations reference variables defined in `@theme`

4. **Form Validation Utilities**:
   - `.form-field-valid` - Styles for valid form fields
   - `.form-field-invalid` - Styles for invalid form fields

**Usage Examples**:

```html
<!-- Custom variant usage -->
<input class="form-input optional:border-dashed invalid:border-red-500">

<!-- Custom selector styling in CSS -->
:--heading { @apply font-bold; }

<!-- Animation utilities -->
<div class="animate-fade-in-up">Content</div>

<!-- Form validation -->
<input type="email" class="form-input form-field-valid form-field-invalid">
```

### Security & Middleware

**Content Security Policy** (Helmet):
- Allows CDN resources from `cdn.jsdelivr.net` for Alpine.js
- Allows Google Fonts
- Requires `'unsafe-inline'` and `'unsafe-eval'` for Alpine.js reactivity

**Other Middleware**:
- Compression (GZIP)
- Morgan logging (dev mode)
- Body parsing (JSON + URL-encoded)

### Contact Form

The `/contact` POST route exists but only logs data to console. Email sending is not implemented. To add email functionality:
1. Install Nodemailer: `npm install nodemailer`
2. Configure SMTP variables in `.env`
3. Implement transporter in `page.controller.js`

## Key Files to Modify

- **Portfolio content**: `src/controllers/page.controller.js` (update `portfolioData`)
- **Styling**: `public/css/styles.css` (Tailwind utilities + custom CSS)
- **Theme colors**: Edit CSS custom properties in `styles.css`
- **Layout**: `src/views/layouts/main.ejs`
- **Sections**: `src/views/partials/sections/*.ejs`

## Notes

- Node.js >= 18.0.0 required
- `__dirname` workaround for ES modules uses `fileURLToPath(import.meta.url)`
- Error pages: 404 and 500 have dedicated EJS views with fallback HTML
- Alpine.js handles dark mode state (stored in localStorage via `theme.js`)
- Mobile menu and interactive components use Alpine.js directives (`x-data`, `x-show`, etc.)

## Multi-Agent Operating Rules

These rules ensure consistency and coordination when multiple AI agents work on this codebase.

### General Guidelines

1. **Code Quality & Consistency**:
   - Apply programming best practices while maintaining structural and stylistic coherence with existing code
   - Respect the DRY (Do Not Repeat Yourself) principle at both local (your own code) and global (code from other agents) levels
   - Maintain consistent coding patterns across all modifications

2. **Documentation**:
   - Document all functions using JSDoc with a uniform style
   - Keep documentation up-to-date when modifying existing code
   - Ensure JSDoc comments are consistent with those written by other agents

3. **Alpine.js Best Practices**:
   - Strictly follow Alpine.js v3.15.1 conventions
   - Ensure compatibility with existing Alpine.js modules and scripts
   - Use Alpine.js directives (`x-data`, `x-show`, `x-bind`, etc.) consistently
   - Never pollute the global `window` object; use Alpine stores or local scope instead

4. **Global Scope Protection**:
   - Avoid adding variables or functions to the global `window` object
   - Use ES modules and proper encapsulation
   - If global state is needed, use Alpine.js stores or appropriate state management

### Multi-Agent Coordination

1. **Consistency First**:
   - Maintain consistency with conventions, patterns, and architectural decisions already established
   - Review existing code before making changes to understand current patterns
   - When in doubt, follow the established project structure

2. **Conflict Resolution**:
   - In case of ambiguity between user requests and existing project conventions, prioritize project coherence
   - Explain the reasoning behind architectural decisions
   - Document any deviation from user requests with clear justification

3. **Knowledge Sharing**:
   - Update this CLAUDE.md file with any clarifications, style adjustments, design decisions, or additional rules that improve agent coordination
   - Document new patterns or conventions immediately
   - Record architectural decisions and their rationale

### Documentation & Context

- **MCP Context7**: Use the MCP "Context7" tool to query information about libraries, dependencies, and configurations used in the project
- **Knowledge Sharing**: When another agent requests information or documentation, provide answers consistent with this CLAUDE.md content
- **Source of Truth**: This file is the authoritative reference for project conventions and multi-agent coordination

### Git Commits

When generating commit messages, follow these rules:

1. **Language**: Always in English
2. **Format**: Use Conventional Commits standard
3. **Style**: Brief and descriptive

**Conventional Commits Format**:
```
<type>(<scope>): <subject>

<body (optional)>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`

**Examples**:
- `feat(contact): add email sending functionality`
- `fix(theme): resolve dark mode persistence issue`
- `docs(readme): update installation instructions`
- `refactor(controller): extract portfolioData to separate file`

### Communication

- **User Communication**: Always communicate with the user in Spanish
- **Code & Comments**: Code comments and documentation should be in Spanish to match existing codebase conventions
- **Technical Terms**: Use English for technical terms and library names (e.g., "Alpine.js", "middleware", "controller")
