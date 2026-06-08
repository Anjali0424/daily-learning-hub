import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Uploads from './Uploads';
import Notifications from './Notifications';
import ActivityLogs from './ActivityLogs';
import { LayoutDashboard, Upload, Bell, ListTodo, ArrowLeft } from 'lucide-react';

const Ipconfig = () => {
  const [activeTab, setActiveTab] = useState('uploads');
  const navigate = useNavigate();

  const tabs = [
    { id: 'uploads', label: 'Uploads', icon: <Upload size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'logs', label: 'Activity Logs', icon: <ListTodo size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
            <LayoutDashboard size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">Workspace</span>
        </div>

        <nav className="flex-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mt-auto"
        >
          <ArrowLeft size={20} />
          Back to Hub
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'uploads' && <Uploads />}
        {activeTab === 'notifications' && <Notifications />}
        {activeTab === 'logs' && <ActivityLogs />}
      </main>
    </div>
  );
};

export default Ipconfig;
