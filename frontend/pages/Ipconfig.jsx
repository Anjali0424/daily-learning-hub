import React from 'react';

const Ipconfig = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-12 font-mono">
      <div className="max-w-4xl mx-auto bg-black border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400 text-xs ml-2">Terminal</span>
        </div>
        <div className="p-8 space-y-4">
          <h1 className="text-2xl font-bold border-b border-green-900 pb-2 uppercase tracking-widest text-green-500">
            Terminal
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">user@daily-hub:~$</span>
            <span className="animate-pulse">_</span>
          </div>
          <p className="text-gray-400 leading-relaxed bg-gray-900/50 p-6 rounded border border-gray-800 italic">
            "Terminal UI will be implemented later."
          </p>
          <div className="pt-8">
            <button 
              onClick={() => window.history.back()}
              className="text-green-500 hover:text-green-300 transition-colors flex items-center gap-2"
            >
              <span>[</span>
              <span className="underline">Back to Hub</span>
              <span>]</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ipconfig;
