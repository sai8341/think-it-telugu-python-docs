import React, { useState } from 'react';

export default function Quiz({ question, options, correctIndex, explanation }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionClick = (index) => {
    if (!isSubmitted) {
      setSelectedIndex(index);
    }
  };

  const handleSubmit = () => {
    if (selectedIndex !== -1) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedIndex(-1);
    setIsSubmitted(false);
  };

  const isCorrect = selectedIndex === correctIndex;

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <span className="quiz-badge">💡 Practice Quiz</span>
      </div>
      
      <p className="quiz-question">{question}</p>
      
      <div className="quiz-options-list">
        {options.map((option, idx) => {
          let optionClass = 'quiz-option-btn';
          
          if (isSubmitted) {
            if (idx === correctIndex) {
              optionClass += ' quiz-option-btn--correct';
            } else if (idx === selectedIndex) {
              optionClass += ' quiz-option-btn--wrong';
            } else {
              optionClass += ' quiz-option-btn--disabled';
            }
          } else if (idx === selectedIndex) {
            optionClass += ' quiz-option-btn--selected';
          }
          
          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={optionClass}
              disabled={isSubmitted}
            >
              <span className="quiz-option-marker">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="quiz-option-text">{option}</span>
            </button>
          );
        })}
      </div>

      <div className="quiz-footer-actions">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedIndex === -1}
            className="quiz-action-btn quiz-action-btn--submit"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="quiz-action-btn quiz-action-btn--reset"
          >
            Try Again
          </button>
        )}
      </div>

      {isSubmitted && (
        <div className={`quiz-feedback-box ${isCorrect ? 'quiz-feedback-box--correct' : 'quiz-feedback-box--wrong'}`}>
          <div className="quiz-feedback-header">
            {isCorrect ? (
              <span className="quiz-feedback-title quiz-feedback-title--correct">
                ✅ Correct! Well done.
              </span>
            ) : (
              <span className="quiz-feedback-title quiz-feedback-title--wrong">
                ❌ Incorrect. Let's learn why:
              </span>
            )}
          </div>
          {explanation && <p className="quiz-explanation-text">{explanation}</p>}
        </div>
      )}
    </div>
  );
}
