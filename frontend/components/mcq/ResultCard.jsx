import React from 'react';
import { Trophy, CheckCircle2, ArrowLeft } from 'lucide-react';
import QuestionCard from './QuestionCard';

const ResultCard = ({ result, questions, onRetry }) => {
  const isPerfect = result.score === result.total;
  const answerResults = result.answers || [];

  return (
    <div className="min-h-screen bg-lavender-50 flex justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white p-12 rounded-3xl shadow-2xl w-full text-center mb-8">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
            isPerfect ? 'bg-green-100 text-green-600' : 'bg-lavender-100 text-lavender-600'
          }`}>
            {isPerfect ? <Trophy size={48} /> : <CheckCircle2 size={48} />}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isPerfect ? 'Fantastic!' : 'Good Effort!'}
          </h2>
          <p className="text-gray-500 mb-8">You've completed the quiz!</p>

          <div className="bg-lavender-50 p-6 rounded-2xl mb-8">
            <p className="text-sm text-lavender-500 uppercase tracking-wider font-semibold mb-1">Your Score</p>
            <div className="text-5xl font-black text-lavender-600">{result.score}/{result.total}</div>
          </div>

          {isPerfect ? (
            <p className="text-green-600 font-medium mb-8">This module is now marked as completed!</p>
          ) : (
            <p className="text-gray-500 mb-8">Try again to get a perfect score and unlock the private workspace.</p>
          )}

          <button
            type="button"
            onClick={onRetry}
            className="w-full flex items-center justify-center gap-2 bg-lavender-600 text-white py-4 rounded-xl font-bold hover:bg-lavender-700 transition-all"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
        </div>

        {questions.map((question, index) => {
          const answerResult = answerResults.find((answer) => answer.questionId === question.id);

          return (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              selectedOption={answerResult?.selectedAnswer}
              result={answerResult}
              onSelect={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ResultCard;
