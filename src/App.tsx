// src/App.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step } from './types';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import DetailsScreen from './components/DetailsScreen/DetailsScreen';
import RsvpScreen from './components/RsvpScreen/RsvpScreen';
import './index.css';

function App() {
  const [step, setStep] = useState<Step>(0);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 2) as Step);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0) as Step);
  };

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