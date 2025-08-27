import React, { useState } from 'react';
import { Heart, CheckCircle, XCircle, Trophy, Sparkles } from 'lucide-react';

interface QuizGameProps {
  onComplete: () => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Customize these questions about your relationship!
  const questions = [
    {
      question: "When did we confess our love to each other?",
      options: [
        "23 April 2024",
        "23 June 2024",
        "23 May 2024",
        "23 July 2024"
      ],
      correct: 1, // Change this to the correct answer index
      explanation: "It was a lovely day. We went to lingaraj temple! ☕💕"
    },
    {
      question: "What's my favorite thing about you?",
      options: [
        "Your beautiful smile",
        "Your supportiveness",
        "Your body",
        "Everything!"
      ],
      correct: 3,
      explanation: "I love absolutely everything about you! yaar 😍"
    },
    {
      question: "When did we have our first kiss?",
      options: [
        "31 August 2024",
        "1 October 2024",
        "30 August 2024",
        "2 October 2024"
      ],
      correct: 0,
      explanation: "Our first kiss was amazing, I want to go that time and stay there! 💖"
    },
    {
      question: "Which song did i recommend to you first?",
      options: [
        "Samjho Na",
        "Faasle",
        "Mere hi liye",
        "Kya karien"
      ],
      correct: 2,
      explanation: "Every single moment with you feels like romantic song! ✨"
    },
    {
      question: "What is our favorite thing to do together?",
      options: [
        "Watching movies",
        "Going to parks",
        "travel with you to new places",
        "Just being together"
      ],
      correct: 3,
      explanation: "No matter what we do, being together is always the best part! 💑"
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <div className="text-center animate-fade-in">
        <div className="mb-8 animate-celebration">
          <Trophy className="mx-auto text-yellow-500 mb-4 animate-bounce" size={80} />
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Sparkles 
                key={i}
                className="text-yellow-400 animate-twinkle"
                size={30}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text mb-6 animate-rainbow">
          Quiz Complete! 🎉
        </h2>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 transform transition-all duration-500 hover:scale-105">
          <p className="text-3xl text-gray-800 mb-4">
            Your Score: <span className="font-bold text-pink-600">{score}/{questions.length}</span>
          </p>
          
          {score === questions.length ? (
            <div className="animate-pulse-glow">
              <p className="text-2xl text-gray-700 mb-4">Perfect Score! 💯</p>
              <p className="text-xl text-gray-600">You know our love story by heart! 💕</p>
            </div>
          ) : score >= questions.length * 0.8 ? (
            <div>
              <p className="text-2xl text-gray-700 mb-4">Amazing! 🌟</p>
              <p className="text-xl text-gray-600">You really know us well! 💖</p>
            </div>
          ) : (
            <div>
              <p className="text-2xl text-gray-700 mb-4">Good try! 😊</p>
              <p className="text-xl text-gray-600">We have so many more memories to make! 💕</p>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={handlePlayAgain}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold transform transition-all duration-300 hover:scale-110 mr-4"
          >
            Play Again 🔄
          </button>
          <button 
            onClick={onComplete}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold transform transition-all duration-300 hover:scale-110"
          >
            Continue Journey 💕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center max-w-4xl animate-fade-in">
      <div className="mb-8">
        <Heart className="mx-auto text-red-500 mb-4 animate-pulse" size={60} />
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-4">
          Our Love Story Quiz 💕
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {!showResult ? (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 animate-slide-down">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                  selectedAnswer === index
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/50 hover:bg-white/70 text-gray-800'
                } animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {option}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`px-8 py-3 rounded-full text-lg font-semibold transform transition-all duration-300 ${
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white hover:scale-110 animate-glow'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'} →
          </button>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 animate-slide-up">
          <div className="flex justify-center mb-4">
            {selectedAnswer === questions[currentQuestion].correct ? (
              <CheckCircle className="text-green-500 animate-bounce" size={60} />
            ) : (
              <XCircle className="text-red-500 animate-pulse" size={60} />
            )}
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            {selectedAnswer === questions[currentQuestion].correct ? 'Correct! 🎉' : 'Oops! 💕'}
          </h3>
          
          <p className="text-lg text-gray-600 italic">
            {questions[currentQuestion].explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizGame;