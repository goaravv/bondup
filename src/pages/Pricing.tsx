import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { milestones } from '@/data/tasks';
import { ArrowLeft, Check, Star, Lock } from 'lucide-react';

const PricingPage = () => {
  const navigate = useNavigate();
  const { progress, setProgress } = useApp();

  const handleUpgrade = (price: number) => {
    // Simulate payment - in real app, this would integrate with Stripe
    alert(`Redirecting to Stripe Checkout for $${price}...`);
    
    // For demo purposes, unlock the tier immediately
    setProgress({
      ...progress,
      paidUpTo: Math.max(progress.paidUpTo, price),
    });
    
    // Navigate back to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const isUnlocked = (price?: number) => {
    if (!price) return true;
    return progress.paidUpTo >= price;
  };

  const getCurrentTier = () => {
    if (progress.paidUpTo >= 100) return 'Ultimate Bond';
    if (progress.paidUpTo >= 50) return 'Love Masters';
    if (progress.paidUpTo >= 10) return "Now It's Spicy";
    return 'Getting Closer (Free)';
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur border-b border-primary/10 shadow-soft">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Unlock More Love</h1>
            <p className="text-sm text-muted-foreground">
              Current: {getCurrentTier()}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Current Status */}
        <Card className="shadow-romantic border-primary/20">
          <CardContent className="pt-4">
            <div className="text-center space-y-2">
              <div className="text-3xl">💕</div>
              <h2 className="text-lg font-semibold">Your Love Journey</h2>
              <p className="text-sm text-muted-foreground">
                You've completed {progress.completedTasks.length} tasks so far!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Tiers */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center">Choose Your Adventure</h2>
          
          {milestones.map((milestone) => {
            const unlocked = isUnlocked(milestone.price);
            const isCurrent = milestone.price ? progress.paidUpTo === milestone.price : progress.paidUpTo === 0;
            
            return (
              <Card
                key={milestone.id}
                className={`transition-all ${
                  unlocked
                    ? isCurrent
                      ? 'border-primary shadow-romantic bg-primary/5'
                      : 'border-green-200 bg-green-50/50 shadow-soft'
                    : 'border-border shadow-soft'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{milestone.emoji}</span>
                      {milestone.name}
                    </CardTitle>
                    {unlocked && (
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        {isCurrent ? 'Current' : 'Unlocked'}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {milestone.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Up to {milestone.tasksRequired} romantic tasks</span>
                    </div>
                    
                    {milestone.id === 'getting-closer' && (
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Sweet & innocent bonding moments</span>
                      </div>
                    )}
                    
                    {milestone.id === 'now-its-spicy' && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Flirty & playful challenges</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Enhanced photo verification</span>
                        </div>
                      </>
                    )}
                    
                    {milestone.id === 'love-masters' && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Intimate connection challenges</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Advanced romantic scenarios</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Exclusive couple content</span>
                        </div>
                      </>
                    )}
                    
                    {milestone.id === 'ultimate-bond' && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Ultimate romantic experiences</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Personalized challenges</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Premium couple coaching</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">Lifetime access</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="pt-2">
                    {!milestone.price ? (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">FREE</div>
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Always Free
                        </Badge>
                      </div>
                    ) : unlocked ? (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          ${milestone.price}
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          {isCurrent ? 'Current Plan' : 'Purchased'}
                        </Badge>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">
                            ${milestone.price}
                          </div>
                          <p className="text-xs text-muted-foreground">One-time purchase</p>
                        </div>
                        <Button
                          variant="romantic"
                          onClick={() => handleUpgrade(milestone.price!)}
                          className="w-full"
                          size="lg"
                        >
                          Unlock Now 🚀
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Privacy Reminder */}
        <Card className="border-primary/10 bg-muted/30">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm mb-1">Privacy Promise</h3>
                <p className="text-xs text-muted-foreground">
                  All photos are processed in memory for 10 seconds then permanently deleted. 
                  Your intimate moments remain completely private. 🔒💕
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Tasks */}
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard')}
          className="w-full"
        >
          Back to Tasks
        </Button>
      </div>
    </div>
  );
};

export default PricingPage;