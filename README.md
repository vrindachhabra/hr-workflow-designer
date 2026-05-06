# Welcome to my HR Workflow Designer!

Hey there! Thanks for taking the time to review my submission. I've built a drag-and-drop HR Workflow Designer that allows users to visually map out HR processes like onboarding, approvals, and automated tasks. 

My main goal was to create something that doesn't just work under the hood, but also feels snappy, intuitive, and looks great to the end-user.
Here's the deployed link to the application : https://hr-workflow-designer-mauve.vercel.app/

---

## The Architecture

I built this as a modern Single Page Application (SPA). Here's the stack I went with and how it's organized:

- **Core:** React 19 with TypeScript. I love the type safety TS brings, especially when dealing with complex node and edge data structures.
- **Tooling:** Vite. It's incredibly fast, making the development loop (HMR) a breeze.
- **The Canvas Engine:** [React Flow](https://reactflow.dev/). This handles the heavy lifting of the panning, zooming, and node connections.
- **State Management:** [Zustand](https://github.com/pmndrs/zustand). It holds the global state (our nodes, edges, and what's currently selected).
- **Styling:** Tailwind CSS v4. I used this to rapidly build out a clean, modern UI without fighting with separate stylesheets.
- **Forms:** React Hook Form for handling the dynamic configuration panel on the right.

**Folder Structure:**
I kept things modular. `src/components/` holds the main layout pieces (Canvas, Sidebar, ConfigPanel). `src/nodes/` contains all the custom React Flow nodes I built. `src/hooks/` manages our Zustand store, and `src/types/` keeps all my TypeScript interfaces centralized.

---

## Getting it Running

It's super easy to spin this up locally. You'll just need Node.js installed.

1. Clone or extract this project, then jump into the folder:
   ```bash
   cd hr-workflow-designer
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start up the development server:
   ```bash
   npm run dev
   ```
4. Open up your browser and head to [http://localhost:5173](http://localhost:5173). You should be good to go!

*(If you want to test the production build, you can run `npm run build` followed by `npm run preview`)*

---

## My Design Decisions

When planning this out, I had to make a few key technical choices:

- **Why React Flow?** I considered building a custom canvas from scratch using HTML5 Drag and Drop or an SVG overlay, but reinventing the wheel for panning, zooming, and node-linking is notoriously tricky to get right. React Flow gave me a rock-solid, extensible foundation so I could focus on the actual HR business logic and UI.
- **Why Zustand instead of Redux or Context?** React Context is great, but it can trigger massive re-renders when managing frequently updating data like node coordinates. Redux felt like overkill for a project this size. Zustand sits right in the sweet spot—it's lightweight, requires almost zero boilerplate, and keeps the canvas buttery smooth.
- **Custom Nodes over Default Nodes:** I decided to build completely custom node components (Start, Task, Approval, Automation, End) rather than using React Flow's default boxes. This gave me total control over the aesthetics, letting me use Tailwind and Lucide icons to make the workflow look like a premium enterprise tool.
- **The Screen-to-Flow Math:** One tricky part was getting nodes to drop exactly where the mouse pointer was. I used React Flow's `screenToFlowPosition` hook to ensure the drag-and-drop experience felt flawless, regardless of zoom level or pan position.

---

## What I Got Done vs. What's Next

### What's working right now:
1. An interactive drag-and-drop workflow canvas.
2. A sidebar palette loaded with custom, HR-specific node types.
3. Flawless drag-and-drop coordinate mapping onto the canvas.
4. A global Zustand store managing the entire workflow state.
5. A dynamic configuration panel that updates based on the node you click.
6. A polished, modern UI.

### Where I'd take this next (with more time!):
If I had another week to work on this, here is exactly what I'd tackle next:

1. **Backend Integration:** I'd spin up a Node.js/Express backend (or use Supabase) to actually save, load, and execute these workflows via a REST or GraphQL API.
2. **Advanced Node Configs:** I'd expand the Configuration Panel using `react-hook-form` alongside `zod` for strict validation, allowing users to assign tasks to specific roles, set API endpoints for the "Automation" nodes, etc.
3. **Undo/Redo Stack:** A must-have for any visual editor! I'd implement a history state array in Zustand to allow `Ctrl+Z` undo functionality.
4. **Smart Edge Routing & Logic:** I'd add conditional branching, so a user could draw an edge that specifically says "If Approved" or "If Rejected".
5. **Testing:** I'd write unit tests for the complex state logic using Vitest, and set up a Playwright suite to end-to-end test the drag-and-drop flows.

---
*Thanks again for reviewing my code. I really enjoyed building this and I hope you enjoy playing around with it!*
