import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { ConfigPanel } from './components/ConfigPanel';

function App() {
  return (
    <div className="w-full h-screen flex bg-gray-50 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col relative h-full">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="font-semibold text-gray-800">HR Workflow Designer</span>
          </div>
          <div className="ml-auto text-xs text-gray-500">
            All changes saved locally
          </div>
        </header>
        <main className="flex-1 relative">
          <Canvas />
        </main>
      </div>
      <ConfigPanel />
    </div>
  );
}

export default App;
