import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionsByModule } from '../services/questionService';
import { submitAttempt } from '../services/attemptService';
import QuestionCard from '../components/mcq/QuestionCard';
import ResultCard from '../components/mcq/ResultCard';

const DailyMCQ = () => {
  const { moduleId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, [moduleId]);

  const fetchQuestions = async () => {
    try {
      const res = await getQuestionsByModule(moduleId);
      setQuestions(res.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
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
      const res = await submitAttempt({ moduleId, answers });
      setResult(res.data);
    } catch (error) {
      console.error('Error submitting attempt:', error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (result) return <ResultCard result={result} onRetry={() => navigate('/')} />;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
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
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg mt-8"
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
};

export default DailyMCQ;
