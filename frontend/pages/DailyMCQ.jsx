import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionsByModule, submitAnswers } from '../services/questionService';
import QuestionCard from '../components/mcq/QuestionCard';
import ResultCard from '../components/mcq/ResultCard';

const DailyMCQ = () => {
  const { moduleId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, [moduleId]);

  const fetchQuestions = async () => {
    try {
      const questionsData = await getQuestionsByModule(moduleId);
      if (!questionsData || questionsData.length === 0) {
        setError('No questions available for this module.');
      }
      setQuestions(questionsData);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Error loading questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert('Please answer all questions!');
      return;
    }

    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId: Number(questionId),
        selectedAnswer
      }));

      const resultData = await submitAnswers(Number(moduleId), formattedAnswers);
      setResult(resultData);
    } catch (error) {
      console.error('Error submitting attempt:', error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (error) return (
    <div className="min-h-screen bg-lavender-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{error}</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 transition-all"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  if (result) return <ResultCard result={result} questions={questions} onRetry={() => navigate('/')} />;

  return (
    <div className="min-h-screen bg-lavender-50 p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Daily MCQ Challenge</h2>
        {questions.map((q, index) => (
          <QuestionCard 
            key={q.id} 
            question={q} 
            index={index} 
            onSelect={handleOptionSelect}
            selectedOption={answers[q.id]}
          />
        ))}
        <button
          onClick={handleSubmit}
          className="w-full bg-lavender-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-lavender-700 transition-all shadow-lg mt-8"
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
};

export default DailyMCQ;
