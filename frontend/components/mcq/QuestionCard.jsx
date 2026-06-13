import React from 'react';

const QuestionCard = ({ question, index, onSelect, selectedOption, result }) => {
  const options = [
    { key: 'A', value: question.optionA },
    { key: 'B', value: question.optionB },
    { key: 'C', value: question.optionC },
    { key: 'D', value: question.optionD },
  ];
  const isReview = Boolean(result);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm mb-6 border border-lavender-100">
      <p className="text-lavender-400 font-medium mb-2">Question {index + 1}</p>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h3>
      <div className="space-y-4">
        {options.map((opt) => {
          const isSelected = selectedOption === opt.value;
          const isCorrectSelection = isReview && isSelected && result?.correct;
          const isWrongSelection = isReview && isSelected && !result?.correct;

          const optionClass = isReview
            ? isCorrectSelection
              ? 'border-green-400 bg-green-50 text-green-700'
              : isWrongSelection
                ? 'border-red-400 bg-red-50 text-red-700'
                : 'border-gray-50 text-gray-500'
            : isSelected
              ? 'border-lavender-500 bg-lavender-50 text-lavender-700'
              : 'border-gray-50 hover:border-lavender-200 hover:bg-lavender-50 text-gray-700';

          const badgeClass = isReview
            ? isCorrectSelection
              ? 'bg-green-500 text-white'
              : isWrongSelection
                ? 'bg-red-500 text-white'
                : 'bg-lavender-50 text-lavender-400'
            : isSelected
              ? 'bg-lavender-500 text-white'
              : 'bg-lavender-50 text-lavender-400';

          return (
            <button
              key={opt.key}
              type="button"
              disabled={isReview}
              onClick={() => onSelect(question.id, opt.value)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${optionClass}`}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 ${badgeClass}`}>
                {opt.key}
              </span>
              <span className="flex-1">{opt.value}</span>
              {isCorrectSelection && <span className="text-sm font-semibold">Correct</span>}
              {isWrongSelection && <span className="text-sm font-semibold">Wrong</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
