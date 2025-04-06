import React from 'react';
import '../styles/main.css';

const RecommendationCard = ({ recommendation }) => {
  return (
    <div className="recommendation-card">
      <div className="recommendation-content" dangerouslySetInnerHTML={{ __html: recommendation }} />
    </div>
  );
};

export default RecommendationCard; 