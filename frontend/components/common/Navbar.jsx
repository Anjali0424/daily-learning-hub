import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookText, Info, Code2, Terminal } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Notes', path: '/notes', icon: <BookText size={20} /> },
    { name: 'About', path: '/about', icon: <Info size={20} /> },
    { name: 'Web Compiler', path: '/compiler', icon: <Code2 size={20} /> },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                DLH
              </div>
              <span className="text-xl font-bold text-gray-900 hidden md:block">Daily Hub</span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            {/* Secret ipconfig button */}
            <Link 
              to="/ipconfig" 
              title="System Config"
              className="p-2 text-gray-300 hover:text-gray-400 transition-colors"
            >
              <Terminal size={14} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
