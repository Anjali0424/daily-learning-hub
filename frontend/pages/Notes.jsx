import React from 'react';
import { BookText, Plus } from 'lucide-react';

const Notes = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <BookText size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Study Notes</h1>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
            <Plus size={20} />
            <h1 className="text-sm font-medium">New Note</h1>
            <span>New Note</span>
          </button>
        </div>

        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">React Hooks Summary</h3>
            <p className="text-gray-600 mb-4">A quick guide to useEffect, useState, and custom hooks.</p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded">React</span>
              <span className="text-sm text-gray-400">June 8, 2026</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center py-20">
            <p className="text-gray-400 italic">No notes found. Create your first note!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
