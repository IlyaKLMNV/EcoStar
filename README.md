# User Task Viewer

A simple React + TypeScript + Vite single-page application that displays a list of users and their tasks from a public API. Built as a test assignment for frontend developer position.

## 📦 Stack

- React
- TypeScript
- Vite
- SCSS (BEM methodology)
- Fetch API (no external data libraries)

## 📚 Features

- ✅ Fetches users from `https://jsonplaceholder.typicode.com/users`
- ✅ Fetches tasks from `https://jsonplaceholder.typicode.com/todos`
- ✅ Displays user list with task completion stats
- ✅ Click on user opens modal with task table
- ✅ Filter tasks by status: All / Done / Undone
- ✅ Loading indicator while fetching data
- ✅ Error handling if API fails
- ✅ Clean and responsive UI

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/user-task-viewer.git
cd user-task-viewer

Install dependencies:
npm install

Run in development mode:
npm run dev

Build for production:
npm run build

Preview production build:
npm run preview

📁 Project Structure
src/
├── components/        # UI components (UserList, TaskModal, TaskList, etc.)
├── styles/            # SCSS styles (single file: globals.scss)
├── types/             # TypeScript type definitions
├── App.tsx            # Main application
├── main.tsx           # Entry point
🎯 Notes
Uses SCSS exclusively, no inline styles

BEM-naming convention applied

No UI libraries, everything built from scratch

Fully accessible with keyboard and screen reader support in modal