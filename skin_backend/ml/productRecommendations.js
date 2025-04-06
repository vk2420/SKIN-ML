// Product database with skincare products
const productDatabase = {
  cleansers: [
    {
      id: 'c1',
      name: 'Gentle Foaming Cleanser',
      brand: 'SkinCare Basics',
      price: 24.99,
      skinTypes: ['Normal', 'Combination', 'Oily'],
      ingredients: ['Glycerin', 'Aloe Vera', 'Chamomile'],
      benefits: ['Gentle', 'Non-irritating', 'pH balanced'],
      imageUrl: 'https://example.com/cleanser1.jpg'
    },
    {
      id: 'c2',
      name: 'Hydrating Cream Cleanser',
      brand: 'Moisture Plus',
      price: 29.99,
      skinTypes: ['Dry', 'Sensitive'],
      ingredients: ['Ceramides', 'Hyaluronic Acid', 'Shea Butter'],
      benefits: ['Hydrating', 'Soothing', 'Creamy'],
      imageUrl: 'https://example.com/cleanser2.jpg'
    }
  ],
  moisturizers: [
    {
      id: 'm1',
      name: 'Lightweight Gel Moisturizer',
      brand: 'SkinCare Basics',
      price: 34.99,
      skinTypes: ['Normal', 'Combination', 'Oily'],
      ingredients: ['Hyaluronic Acid', 'Niacinamide', 'Aloe Vera'],
      benefits: ['Lightweight', 'Non-greasy', 'Hydrating'],
      imageUrl: 'https://example.com/moisturizer1.jpg'
    },
    {
      id: 'm2',
      name: 'Rich Cream Moisturizer',
      brand: 'Moisture Plus',
      price: 39.99,
      skinTypes: ['Dry', 'Sensitive'],
      ingredients: ['Ceramides', 'Shea Butter', 'Jojoba Oil'],
      benefits: ['Rich', 'Nourishing', 'Protective'],
      imageUrl: 'https://example.com/moisturizer2.jpg'
    }
  ],
  serums: [
    {
      id: 's1',
      name: 'Vitamin C Serum',
      brand: 'SkinCare Basics',
      price: 44.99,
      skinTypes: ['Normal', 'Combination', 'Dry'],
      ingredients: ['Vitamin C', 'Ferulic Acid', 'Hyaluronic Acid'],
      benefits: ['Brightening', 'Antioxidant', 'Anti-aging'],
      imageUrl: 'https://example.com/serum1.jpg'
    },
    {
      id: 's2',
      name: 'Hyaluronic Acid Serum',
      brand: 'Moisture Plus',
      price: 39.99,
      skinTypes: ['All'],
      ingredients: ['Hyaluronic Acid', 'Niacinamide', 'Panthenol'],
      benefits: ['Hydrating', 'Plumping', 'Soothing'],
      imageUrl: 'https://example.com/serum2.jpg'
    }
  ],
  sunscreens: [
    {
      id: 'spf1',
      name: 'Lightweight SPF 50',
      brand: 'SkinCare Basics',
      price: 29.99,
      skinTypes: ['Normal', 'Combination', 'Oily'],
      ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Niacinamide'],
      benefits: ['Lightweight', 'Non-greasy', 'Broad spectrum'],
      imageUrl: 'https://example.com/sunscreen1.jpg'
    },
    {
      id: 'spf2',
      name: 'Moisturizing SPF 30',
      brand: 'Moisture Plus',
      price: 34.99,
      skinTypes: ['Dry', 'Sensitive'],
      ingredients: ['Zinc Oxide', 'Ceramides', 'Hyaluronic Acid'],
      benefits: ['Moisturizing', 'Gentle', 'Broad spectrum'],
      imageUrl: 'https://example.com/sunscreen2.jpg'
    }
  ],
  treatments: [
    {
      id: 't1',
      name: 'Retinol Night Treatment',
      brand: 'SkinCare Basics',
      price: 49.99,
      skinTypes: ['Normal', 'Combination', 'Dry'],
      ingredients: ['Retinol', 'Niacinamide', 'Peptides'],
      benefits: ['Anti-aging', 'Cell turnover', 'Firming'],
      imageUrl: 'https://example.com/treatment1.jpg'
    },
    {
      id: 't2',
      name: 'Calming Toner',
      brand: 'Moisture Plus',
      price: 24.99,
      skinTypes: ['Sensitive', 'Dry'],
      ingredients: ['Chamomile', 'Aloe Vera', 'Panthenol'],
      benefits: ['Soothing', 'Calming', 'Hydrating'],
      imageUrl: 'https://example.com/treatment2.jpg'
    }
  ]
};

// Function to get product recommendations based on skin analysis
function getRecommendations(analysis) {
  const { skinType, metrics } = analysis;
  
  // Identify skin concerns based on metrics
  const concerns = [];
  if (metrics.dryness > 0.6) concerns.push('dryness');
  if (metrics.oiliness > 0.6) concerns.push('oiliness');
  if (metrics.sensitivity > 0.6) concerns.push('sensitivity');
  if (metrics.pigmentation > 0.6) concerns.push('pigmentation');
  if (metrics.wrinkles > 0.6) concerns.push('aging');
  
  // Filter products based on skin type and concerns
  const recommendations = {
    cleansers: filterProducts('cleansers', skinType, concerns),
    moisturizers: filterProducts('moisturizers', skinType, concerns),
    serums: filterProducts('serums', skinType, concerns),
    sunscreens: filterProducts('sunscreens', skinType, concerns),
    treatments: filterProducts('treatments', skinType, concerns)
  };
  
  return recommendations;
}

// Helper function to filter products
function filterProducts(category, skinType, concerns) {
  return productDatabase[category]
    .filter(product => {
      // Check if product is suitable for skin type
      const skinTypeMatch = product.skinTypes.includes(skinType) || 
                          product.skinTypes.includes('All');
      
      // Check if product addresses concerns
      const concernsMatch = concerns.some(concern => 
        product.benefits.some(benefit => 
          benefit.toLowerCase().includes(concern)
        )
      );
      
      return skinTypeMatch && (concerns.length === 0 || concernsMatch);
    })
    .sort((a, b) => {
      // Calculate product score based on how well it matches concerns
      const scoreA = calculateProductScore(a, concerns);
      const scoreB = calculateProductScore(b, concerns);
      return scoreB - scoreA;
    });
}

// Helper function to calculate product score
function calculateProductScore(product, concerns) {
  if (concerns.length === 0) return 0;
  
  return concerns.reduce((score, concern) => {
    const benefitMatch = product.benefits.some(benefit => 
      benefit.toLowerCase().includes(concern)
    );
    return score + (benefitMatch ? 1 : 0);
  }, 0);
}

module.exports = {
  getRecommendations
}; 