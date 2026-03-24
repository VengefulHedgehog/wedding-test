// src/App.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step } from './types';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import DetailsScreen from './components/DetailsScreen/DetailsScreen';
import RsvpScreen from './components/RsvpScreen/RsvpScreen';
import { preloadImages } from './utils/imagePreloader';
import './index.css';

function App() {
  const [step, setStep] = useState<Step>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Предзагрузка изображений при монтировании компонента
    preloadImages()
      .then((result) => {
        if (result.failed.length > 0) {
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 2) as Step);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0) as Step);
  };

  if (isLoading) {
    return (
      <div className="app loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
            <img 
              src="/images/heart.jpg" 
              alt="♥" 
              className="loading-heart"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <WelcomeScreen onNext={handleNext} />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DetailsScreen onBack={handleBack} onNext={handleNext} />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="rsvp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <RsvpScreen onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;