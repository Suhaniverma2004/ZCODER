import React from 'react';
import './Scorecard.css';

const Scorecard = ({ scoreData }) => {
  const { solved, totalScore } = scoreData;
  // This calculates the percentage but assumes the max score is 1000 for a fuller bar
  const percentage = totalScore > 0 ? ((totalScore / 1000) * 100).toFixed(0) : 0;

  return (
    <div className="scorecard">
      <h3>Your Progress</h3>
      <div className="score-items">
        <div className="score-item">
          <span className="score-value">{solved}</span>
          <span className="score-label">Questions Solved</span>
        </div>
        <div className="score-item">
          <span className="score-value">{totalScore}</span>
          <span className="score-label">Total Score</span>
        </div>
      </div>
      {/* --- THE FIX: ADD THIS PROGRESS BAR --- */}
      {/* This will now use the 'percentage' variable */}
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        >
          {percentage > 0 && `${percentage}%`}
        </div>
      </div>
    </div>
  );
};

export default Scorecard;