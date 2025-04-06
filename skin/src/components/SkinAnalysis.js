import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { skincareData } from './Home';
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  LinearProgress,
  Card,
  CardContent,
 
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';


import SpaIcon from '@mui/icons-material/Spa';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import InfoIcon from '@mui/icons-material/Info';

const Input = styled('input')({
  display: 'none',
});

const SkinAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5003/api/skin/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await axios.post('http://localhost:5003/api/skin/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setAnalysis(response.data.analysis);
    } catch (error) {
      setError(error.response?.data?.message || 'Error analyzing skin');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderHealthScore = () => {
    if (!analysis) return null;

    return (
      <Card sx={{ mt: 3, mb: 3, p: 2, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Skin Health Score
          </Typography>
          <Box sx={{ position: 'relative', display: 'inline-flex', my: 2 }}>
            <CircularProgress
              variant="determinate"
              value={analysis.healthScore}
              size={120}
              thickness={4}
              sx={{ color: getHealthScoreColor(analysis.healthScore) }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" component="div" color="text.secondary">
                {analysis.healthScore}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" color="text.secondary">
            {getHealthScoreDescription(analysis.healthScore)}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return '#4caf50'; // Green
    if (score >= 60) return '#8bc34a'; // Light Green
    if (score >= 40) return '#ffc107'; // Amber
    if (score >= 20) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  const getHealthScoreDescription = (score) => {
    if (score >= 80) return 'Excellent skin health! Keep up your routine.';
    if (score >= 60) return 'Good skin health. Small improvements can be made.';
    if (score >= 40) return 'Average skin health. Consider adjusting your routine.';
    if (score >= 20) return 'Below average skin health. Significant improvements needed.';
    return 'Poor skin health. Consult a dermatologist.';
  };

  const renderAnalysisResults = () => {
    if (!analysis) return null;

    return (
      <Card sx={{ mt: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Analysis Results
          </Typography>
          <Typography variant="h6" color="primary">
            Skin Type: {analysis.skinType}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Confidence: {(analysis.confidence * 100).toFixed(1)}%
          </Typography>

          {analysis.details && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Detailed Analysis
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(analysis.details).map(([key, value]) => (
                  <Grid item xs={12} key={key}>
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                      {key}: {(value * 100).toFixed(1)}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={value * 100}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {analysis.metrics && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Additional Metrics
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(analysis.metrics).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                      {key}: {(value * 100).toFixed(1)}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={value * 100}
                      sx={{ 
                        height: 10, 
                        borderRadius: 5,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getMetricColor(key, value)
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  const getMetricColor = (metric, value) => {
    // For metrics where lower is better
    if (['redness', 'wrinkles', 'pores', 'oiliness', 'dryness', 'sensitivity'].includes(metric)) {
      if (value < 0.3) return '#4caf50'; // Green
      if (value < 0.5) return '#8bc34a'; // Light Green
      if (value < 0.7) return '#ffc107'; // Amber
      if (value < 0.9) return '#ff9800'; // Orange
      return '#f44336'; // Red
    }
    
    // For metrics where higher is better
    if (['hydration', 'elasticity', 'texture'].includes(metric)) {
      if (value > 0.7) return '#4caf50'; // Green
      if (value > 0.5) return '#8bc34a'; // Light Green
      if (value > 0.3) return '#ffc107'; // Amber
      if (value > 0.1) return '#ff9800'; // Orange
      return '#f44336'; // Red
    }
    
    // Default color
    return '#2196f3'; // Blue
  };

  const renderProductRecommendations = () => {
    if (!analysis || !analysis.skinType) return null;

    // Determine gender based on user profile or default to 'female'
    const gender = 'female'; // You can make this dynamic based on user profile
    const skinType = analysis.skinType.toLowerCase();

    // Get recommendations from skincareData
    const genderData = skincareData[gender];
    if (!genderData) return null;

    const skinTypeData = genderData[skinType];
    if (!skinTypeData) return null;

    const categories = [
      { key: 'morning', title: 'Morning Routine', icon: <WbSunnyIcon /> },
      { key: 'afternoon', title: 'Afternoon Care', icon: <AccessTimeIcon /> },
      { key: 'evening', title: 'Evening Routine', icon: <NightlightIcon /> },
      { key: 'night', title: 'Night Care', icon: <NightlightIcon /> },
      { key: 'preOutdoor', title: 'Pre-Outdoor', icon: <WbSunnyIcon /> },
      { key: 'postOutdoor', title: 'Post-Outdoor', icon: <WbSunnyIcon /> }
    ];

    return (
      <Card sx={{ mt: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Recommended Products
          </Typography>
          <Typography variant="body1" paragraph>
            Based on your skin analysis, we recommend the following products:
          </Typography>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 2 }}
          >
            {categories.map((category, index) => (
              <Tab 
                key={category.key} 
                label={category.title} 
                icon={category.icon} 
                iconPosition="start"
                sx={{ textTransform: 'none' }}
              />
            ))}
          </Tabs>

          {categories.map((category, index) => (
            <div
              key={category.key}
              role="tabpanel"
              hidden={activeTab !== index}
            >
              {activeTab === index && (
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {category.title}
                  </Typography>
                  <List>
                    {skinTypeData[category.key]?.map((product, idx) => (
                      <ListItem key={idx} component="a" href={product.url} target="_blank" rel="noopener noreferrer">
                        <ListItemIcon>
                          <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText 
                          primary={product.name}
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              Click to view on Amazon
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  const renderHistory = () => {
    // If you don't need history, you can remove this function
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Alert 
          severity="info" 
          icon={<InfoIcon />}
          sx={{ 
            mb: 4, 
            borderRadius: 2,
            '& .MuiAlert-message': {
              fontSize: '1rem',
              fontWeight: 'bold'
            }
          }}
        >
          This feature is coming soon! The skin analysis functionality is currently in development.
        </Alert>
        
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
            color: 'white',
            py: 8,
            mb: 4,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Analyze Your Skin
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Get personalized skincare recommendations based on AI-powered analysis
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <label htmlFor="image-upload">
                    <Input
                      accept="image/*"
                      id="image-upload"
                      type="file"
                      onChange={handleImageSelect}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      size="large"
                      sx={{
                        bgcolor: 'white',
                        color: '#000DFF',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                        },
                      }}
                    >
                      Upload Image
                    </Button>
                  </label>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleAnalyze}
                    disabled={!selectedImage || loading}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Analyze'}
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {preview ? (
                    <Box
                      component="img"
                      src={preview}
                      alt="Selected skin image"
                      sx={{
                        maxWidth: '100%',
                        maxHeight: 300,
                        borderRadius: 1,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      <SpaIcon sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h6">Upload your skin image</Typography>
                      <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                        Take a clear photo of your face in good lighting
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg">
          {error && (
            <Paper sx={{ p: 2, mb: 3, bgcolor: '#ffebee' }}>
              <Typography color="error">{error}</Typography>
            </Paper>
          )}

          {analysis && (
            <>
              {renderHealthScore()}
              {renderAnalysisResults()}
              {renderProductRecommendations()}
            </>
          )}

          {renderHistory()}
        </Container>
      </Container>
    </Box>
  );
};

export default SkinAnalysis; 
