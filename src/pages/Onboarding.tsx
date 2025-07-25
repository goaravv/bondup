import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';

const Onboarding = () => {
  const navigate = useNavigate();
  const { setUser, setIsOnboarded } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    partnerName: '',
    relationshipStartDate: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      setUser({
        name: formData.name,
        partnerName: formData.partnerName,
        relationshipStartDate: formData.relationshipStartDate,
      });
      setIsOnboarded(true);
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.length > 0;
      case 2:
        return formData.partnerName.length > 0;
      case 3:
        return formData.relationshipStartDate.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-romantic border-0 bg-card/95 backdrop-blur">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4 animate-heart-beat">💕</div>
          <CardTitle className="text-3xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
            Welcome to BondUP
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            {step === 1 && "Let's get to know you! 🌸"}
            {step === 2 && "Tell us about your partner! 💖"}
            {step === 3 && "When did your love story begin? ✨"}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-bounce-in">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  What's your name? 😊
                </label>
                <Input
                  placeholder="Your beautiful name..."
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="border-primary/20 focus:border-primary transition-romantic"
                />
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4 animate-bounce-in">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  What's your partner's name? 💕
                </label>
                <Input
                  placeholder="Your amazing partner's name..."
                  value={formData.partnerName}
                  onChange={(e) => updateFormData('partnerName', e.target.value)}
                  className="border-primary/20 focus:border-primary transition-romantic"
                />
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4 animate-bounce-in">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  When did you start dating? 🗓️
                </label>
                <Input
                  type="date"
                  value={formData.relationshipStartDate}
                  onChange={(e) => updateFormData('relationshipStartDate', e.target.value)}
                  className="border-primary/20 focus:border-primary transition-romantic"
                />
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border border-primary/10">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">🔒 Privacy First:</span> Your photos are never stored. 
                  We process them in memory for 10 seconds to verify your tasks, then they're instantly deleted. 
                  Your love is safe with us! 💖
                </p>
              </div>
            </div>
          )}
          
          <div className="flex gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              variant="romantic"
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1"
            >
              {step === 3 ? "Start Our Journey! 🚀" : "Next 💕"}
            </Button>
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-3 h-3 rounded-full transition-romantic ${
                  stepNum === step
                    ? 'bg-primary shadow-glow'
                    : stepNum < step
                    ? 'bg-primary/60'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;