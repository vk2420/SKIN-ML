import React, { useState } from 'react';
import '../styles/main.css';

const SkincareForm = () => {
  const [formData, setFormData] = useState({
    gender: '',
    skinType: '',
    timeOfDay: ''
  });
  const [recommendations, setRecommendations] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate recommendations based on form data
    const recommendations = {
      cleanser: getCleanserRecommendation(formData.skinType),
      moisturizer: getMoisturizerRecommendation(formData.skinType),
      sunscreen: getSunscreenRecommendation(formData.skinType)
    };

    setRecommendations(recommendations);
  };

  const getCleanserRecommendation = (skinType) => {
    switch (skinType) {
      case 'oily':
        return 'Gel-based cleanser with salicylic acid';
      case 'dry':
        return 'Creamy, hydrating cleanser';
      case 'combination':
        return 'Balanced, gentle cleanser';
      case 'sensitive':
        return 'Fragrance-free, gentle cleanser';
      default:
        return 'Gentle, pH-balanced cleanser';
    }
  };

  const getMoisturizerRecommendation = (skinType) => {
    switch (skinType) {
      case 'oily':
        return 'Lightweight, oil-free moisturizer';
      case 'dry':
        return 'Rich, hydrating cream';
      case 'combination':
        return 'Balanced moisturizer';
      case 'sensitive':
        return 'Hypoallergenic moisturizer';
      default:
        return 'Basic moisturizer';
    }
  };

  const getSunscreenRecommendation = (skinType) => {
    switch (skinType) {
      case 'oily':
        return 'Oil-free, matte finish SPF 30+';
      case 'dry':
        return 'Hydrating SPF 30+ with moisturizing ingredients';
      case 'combination':
        return 'Lightweight SPF 30+';
      case 'sensitive':
        return 'Mineral-based SPF 30+';
      default:
        return 'Broad-spectrum SPF 30+';
    }
  };

  return (
    <div className="skincare-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="skinType">Skin Type</label>
          <select
            id="skinType"
            name="skinType"
            value={formData.skinType}
            onChange={handleChange}
            required
          >
            <option value="">Select skin type</option>
            <option value="oily">Oily</option>
            <option value="dry">Dry</option>
            <option value="combination">Combination</option>
            <option value="sensitive">Sensitive</option>
            <option value="normal">Normal</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="timeOfDay">Time of Day</label>
          <select
            id="timeOfDay"
            name="timeOfDay"
            value={formData.timeOfDay}
            onChange={handleChange}
            required
          >
            <option value="">Select time of day</option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Get Recommendations</button>
      </form>

      {recommendations && (
        <div className="recommendations">
          <h3>Your Personalized Skincare Routine</h3>
          <div className="recommendation-card">
            <h4>Cleanser</h4>
            <p>{recommendations.cleanser}</p>
          </div>
          <div className="recommendation-card">
            <h4>Moisturizer</h4>
            <p>{recommendations.moisturizer}</p>
          </div>
          <div className="recommendation-card">
            <h4>Sunscreen</h4>
            <p>{recommendations.sunscreen}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkincareForm; 