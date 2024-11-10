import React, { useState } from 'react';
import './QuizStyles.css';

const Quiz = () => {
  const questions = [
    {
      id: 1,
      question: "pregunta 1",
      options: ["respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4"],
      correct: 2
    },
    {
      id: 2,
      question: "pregunta 2",
      options: ["respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4"],
      correct: 0
    },
    {
      id: 3,
      question: "pregunta 3",
      options: ["respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4"],
      correct: 0
    },
    {
      id: 4,
      question: "pregunta 4",
      options: ["respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4"],
      correct: 0
    },
    {
      id: 5,
      question: "pregunta 5",
      options: ["respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4"],
      correct: 0
    },
    {
      id: 6,
      question: "pregunta 6",
      options: ["respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4"],
      correct: 0
    },
    {
      id: 7,
      question: "pregunta 7",
      options: ["respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4"],
      correct: 0
    },
    {
      id: 8,
      question: "pregunta 8",
      options: ["respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4"],
      correct: 0
    },
    {
      id: 9,
      question: "pregunta 9",
      options: ["respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4"],
      correct: 0
    },
    {
      id: 10,
      question: "pregunta 10",
      options: ["respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4"],
      correct: 0
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);

    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setShowFeedback(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setAnswers(Array(questions.length).fill(null));
    setShowFeedback(false);
  };

  const getProgressWidth = () => {
    return `${((currentQuestion + 1) / questions.length) * 100}%`;
  };

  const getFeedbackMessage = () => {
    if (!showFeedback || selectedAnswer === null) return null;
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    return (
      <div className={`feedback-message ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
        {isCorrect ? '¡Correcto!' : 'Incorrecto. La respuesta correcta era: ' + 
          questions[currentQuestion].options[questions[currentQuestion].correct]}
      </div>
    );
  };

  if (showResults) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h1 className="quiz-title">Cuestionario</h1>
          <div className="quiz-subtitle">Gracias por participar</div>
        </div>
        <div className="results-container">
          <h2 className="results-title">Tus resultados</h2>
          <div className="results-score">
            {score} / {questions.length}
          </div>
          <div className="score-detail">
            Puntuación: {((score / questions.length) * 100).toFixed(1)}%
          </div>
          <button onClick={resetQuiz} className="reset-button">
            Volver a intentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="quiz-title">Cuestionario de conocimientos generales</h1>
        <div className="quiz-subtitle">
          Pregunta {currentQuestion + 1} de {questions.length}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: getProgressWidth() }}
          ></div>
        </div>
      </div>
      
      <div className="quiz-content">
        <div className="question-container">
          <div className="question-text">
            {questions[currentQuestion].question}
            <span className="required-mark">*</span>
          </div>
          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => {
              let optionClass = "option-button";
              if (selectedAnswer === index) {
                if (showFeedback) {
                  optionClass += index === questions[currentQuestion].correct
                    ? " correct"
                    : " incorrect";
                } else {
                  optionClass += " selected";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={optionClass}
                  disabled={showFeedback}
                >
                  <div className="option-radio"></div>
                  {option}
                </button>
              );
            })}
          </div>
          {getFeedbackMessage()}
        </div>
      </div>

      <div className="navigation-buttons">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="nav-button nav-button-previous"
        >
          Anterior
        </button>
        <button 
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="nav-button nav-button-next"
        >
          {currentQuestion === questions.length - 1 ? 'Enviar' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
