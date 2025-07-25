import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import heroImage from '@/assets/hero-couple.jpg';

const Index = () => {
  const navigate = useNavigate();
  const { isOnboarded } = useApp();

  // If user is already onboarded, redirect to dashboard
  React.useEffect(() => {
    if (isOnboarded) {
      navigate('/dashboard');
    }
  }, [isOnboarded, navigate]);

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-romantic border-0 bg-card/95 backdrop-blur">
        <CardContent className="pt-8 pb-8 text-center space-y-6">
          {/* Hero Image */}
          <div className="relative mb-6">
            <img 
              src={heroImage} 
              alt="Couple in love" 
              className="w-full h-32 object-cover rounded-lg shadow-soft opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-romantic opacity-20 rounded-lg"></div>
          </div>

          {/* Logo/Brand */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
              BondUP
            </h1>
            <p className="text-muted-foreground">
              Gamified challenges to bring you closer together
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 justify-center">
              <span className="text-lg">🎯</span>
              <span>Daily bonding challenges</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <span className="text-lg">🔒</span>
              <span>Privacy-first (photos deleted in 10s)</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <span className="text-lg">✨</span>
              <span>Unlock new romantic adventures</span>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3 pt-4">
            <Button 
              variant="romantic" 
              size="xl" 
              onClick={() => navigate('/onboarding')}
              className="w-full animate-pulse-glow"
            >
              Start Your Love Journey 🚀
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Perfect for Gen Z couples ready to grow closer 💖
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
