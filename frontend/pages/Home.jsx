import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllModules } from '../services/moduleService';
import { getWorkspaceStatus } from '../services/attemptService';
import ModuleCard from '../components/mcq/ModuleCard';
import { Lock } from 'lucide-react';

const Home = () => {
  const [modules, setModules] = useState([]);
  const [workspaceStatus, setWorkspaceStatus] = useState({ unlocked: false, completedModulesCount: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [modulesRes, statusRes] = await Promise.all([
        getAllModules(),
        getWorkspaceStatus()
      ]);
      setModules(modulesRes.data);
      setWorkspaceStatus(statusRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-blue-600">Learning Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>

      {/* Minimal Unlock Button at Bottom-Right */}
      <button
        onClick={() => workspaceStatus.unlocked && navigate('/ipconfig')}
        className={`fixed bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all z-[9999] shadow-lg ${
          workspaceStatus.unlocked
            ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
        }`}
      >
        {workspaceStatus.unlocked ? (
          <span className="text-lg font-bold">&</span>
        ) : (
          <Lock size={16} />
        )}
      </button>
    </div>
  );
};

export default Home;
