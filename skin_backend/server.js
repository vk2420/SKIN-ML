const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const skinAnalysisModel = require('./ml/model');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005','https://capable-lolly-a86d1e.netlify.app'],
  credentials: true
}));
app.use(express.json());

// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();
console.log("Connected");

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skinAnalysis: [{
    date: { type: Date, default: Date.now },
    skinType: String,
    confidence: Number,
    imageUrl: String
  }]
});

const User = mongoose.model('User', userSchema);

// Skin Analysis Schema
const skinAnalysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  skinType: String,
  confidence: Number,
  imageUrl: String,
  analysis: {
    oiliness: Number,
    dryness: Number,
    sensitivity: Number,
    pigmentation: Number,
    wrinkles: Number
  }
});

const SkinAnalysis = mongoose.model('SkinAnalysis', skinAnalysisSchema);

// Skin Analysis Function
async function analyzeSkin(imageBuffer) {
  try {
    const analysis = await skinAnalysisModel.analyze(imageBuffer);
    return analysis;
  } catch (error) {
    console.error('Skin analysis error:', error);
    throw error;
  }
}

// Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Received registration request:', req.body);
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log('User created successfully:', user.email);

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Skin Analysis Route
app.post('/api/skin/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image provided' });
    }

    // Send mock analysis data for development
    const mockAnalysis = {
      skinType: 'Normal',
      confidence: 0.85,
      details: {
        dryness: 0.3,
        oiliness: 0.4,
        sensitivity: 0.2,
        pigmentation: 0.5,
        wrinkles: 0.2
      },
      metrics: {
        hydration: 0.7,
        elasticity: 0.6,
        texture: 0.8,
        pores: 0.3,
        redness: 0.2
      },
      healthScore: 85,
      recommendations: {
        cleansers: [
          { 
            id: 1,
            name: 'Gentle Foaming Cleanser',
            brand: 'SkinCare Plus',
            description: 'Suitable for normal skin',
            price: 24.99,
            imageUrl: 'https://via.placeholder.com/200',
            benefits: ['Gentle', 'Non-drying', 'pH balanced']
          }
        ],
        moisturizers: [
          {
            id: 2,
            name: 'Daily Hydrating Lotion',
            brand: 'SkinCare Plus',
            description: 'Light moisturizer for normal skin',
            price: 29.99,
            imageUrl: 'https://via.placeholder.com/200',
            benefits: ['Hydrating', 'Non-comedogenic', 'Light-weight']
          }
        ],
        serums: [],
        sunscreens: [],
        treatments: []
      }
    };

    res.json({
      message: 'Skin analysis completed',
      analysis: mockAnalysis
    });
  } catch (error) {
    console.error('Skin analysis error:', error);
    res.status(500).json({ message: 'Error analyzing skin' });
  }
});

// Get User's Skin Analysis History
app.get('/api/skin/history', async (req, res) => {
  try {
    // Return mock history data for development
    const mockHistory = [
      {
        date: new Date(),
        skinType: 'Normal',
        confidence: 0.85,
        imageUrl: 'https://via.placeholder.com/200',
        healthScore: 85,
        recommendations: ['Gentle Cleanser', 'Light Moisturizer']
      }
    ];

    res.json(mockHistory);
  } catch (error) {
    console.error('Error fetching skin analysis history:', error);
    res.status(500).json({ message: 'Error fetching skin analysis history' });
  }
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
