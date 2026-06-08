import React from 'react';
import { Info, Github, Twitter, Mail } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 p-12 text-center text-white">
            <Info size={64} className="mx-auto mb-4 opacity-50" />
            <h1 className="text-4xl font-bold mb-2">Daily Learning Hub</h1>
            <p className="text-blue-100 text-lg">Your companion for continuous technical growth.</p>
          </div>
          
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Daily Learning Hub is designed to help software engineers and students stay consistent with their learning. 
              By providing daily MCQ challenges across 12 core computer science modules, we ensure that you retain 
              fundamental concepts while keeping up with modern technologies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tech Stack</h2>
            <ul className="grid grid-cols-2 gap-4 mb-10">
              <li className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                React.js + Vite
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Spring Boot 3
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                PostgreSQL (Supabase)
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Tailwind CSS
              </li>
            </ul>

            <div className="border-t border-gray-100 pt-10 flex justify-center gap-6">
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><Github size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors"><Mail size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
