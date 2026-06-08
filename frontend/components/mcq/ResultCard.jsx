import React from 'react';
import { CheckCircle2, XCircle, Trophy, ArrowLeft } from 'lucide-react';

const ResultCard = ({ result, onRetry }) => {
  const isPerfect = result.score === 3;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-md w-full text-center">
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
          isPerfect ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
        }`}>
          {isPerfect ? <Trophy size={48} /> : <CheckCircle2 size={48} />}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {isPerfect ? 'Fantastic!' : 'Good Effort!'}
        </h2>
        <p className="text-gray-500 mb-8">You've completed the challenge for <b>{result.moduleName}</b></p>
        
        <div className="bg-gray-50 p-6 rounded-2xl mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Your Score</p>
          <div className="text-5xl font-black text-blue-600">{result.score}/3</div>
        </div>

        {isPerfect ? (
          <p className="text-green-600 font-medium mb-8">This module is now marked as completed! 🌟</p>
        ) : (
          <p className="text-gray-500 mb-8">Try again to get a perfect score and unlock the private workspace.</p>
        )}

        <button
          onClick={onRetry}
          className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-4 rounded-xl font-bold hover:bg-gray-900 transition-all"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
