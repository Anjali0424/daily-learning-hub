import React from 'react';

const QuestionCard = ({ question, index, onSelect, selectedOption }) => {
  const options = [
    { key: 'A', value: question.optionA },
    { key: 'B', value: question.optionB },
    { key: 'C', value: question.optionC },
    { key: 'D', value: question.optionD },
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm mb-6 border border-lavender-100">
      <p className="text-lavender-400 font-medium mb-2">Question {index + 1}</p>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h3>
      <div className="space-y-4">
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onSelect(question.id, opt.key)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
              selectedOption === opt.key
                ? 'border-lavender-500 bg-lavender-50 text-lavender-700'
                : 'border-gray-50 hover:border-lavender-200 hover:bg-lavender-50 text-gray-700'
            }`}
          >
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              selectedOption === opt.key ? 'bg-lavender-500 text-white' : 'bg-lavender-50 text-lavender-400'
            }`}>
              {opt.key}
            </span>
            {opt.value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
