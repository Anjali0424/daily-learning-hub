import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, BookOpen } from 'lucide-react';

const ModuleCard = ({ module }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/mcq/${module.id}`)}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 flex flex-col items-center text-center group"
    >
      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <BookOpen size={32} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{module.name}</h3>
      {module.completed ? (
        <div className="flex items-center gap-1 text-green-500 font-medium">
          <CheckCircle size={18} />
          <span>Completed</span>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Not completed yet</p>
      )}
    </div>
  );
};

export default ModuleCard;
