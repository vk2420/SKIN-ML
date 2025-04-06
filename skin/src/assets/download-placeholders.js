const https = require('https');
const fs = require('fs');

const images = [
  {
    url: 'https://via.placeholder.com/1920x1080/4CAF50/ffffff?text=Skincare+Hero',
    filename: 'placeholder-hero.jpg'
  },
  {
    url: 'https://via.placeholder.com/800x600/4CAF50/ffffff?text=Personalized+Care',
    filename: 'placeholder-feature1.jpg'
  },
  {
    url: 'https://via.placeholder.com/800x600/4CAF50/ffffff?text=Expert+Guidance',
    filename: 'placeholder-feature2.jpg'
  },
  {
    url: 'https://via.placeholder.com/800x600/4CAF50/ffffff?text=Proven+Results',
    filename: 'placeholder-feature3.jpg'
  }
];

images.forEach(image => {
  https.get(image.url, (response) => {
    response.pipe(fs.createWriteStream(image.filename));
  });
}); 