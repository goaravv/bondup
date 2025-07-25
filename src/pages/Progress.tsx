import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { milestones, getUnlockedTasks } from '@/data/tasks';
import { ArrowLeft, Lock, Star, Crown, Heart, Award } from 'lucide-react';

const ProgressPage = () => {
  const navigate = useNavigate();
  const { progress, user } = useApp();
  
  const unlockedTasks = getUnlockedTasks(progress.paidUpTo);
  const completionPercentage = (progress.completedTasks.length / unlockedTasks.length) * 100;
  
  const getMilestoneIcon = (emoji: string) => {
    switch (emoji) {
      case '💕': return <Heart className="h-6 w-6" />;
      case '🌶️': return <Star className="h-6 w-6" />;
      case '🔥': return <Crown className="h-6 w-6" />;
      case '💍': return <Award className="h-6 w-6" />;
      default: return <Heart className="h-6 w-6" />;
    }
  };

  const getMilestoneProgress = (milestone: any) => {
    const relevantTasks = milestone.tasksRequired;
    const completed = Math.min(progress.completedTasks.length, relevantTasks);
    return (completed / relevantTasks) * 100;
  };

  const isMilestoneUnlocked = (milestone: any) => {
    if (!milestone.price) return true; // Free milestone
    return progress.paidUpTo >= milestone.price;
  };

  const isMilestoneCompleted = (milestone: any) => {
    return progress.completedTasks.length >= milestone.tasksRequired;
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
            <h1 className="text-xl font-bold">Your Journey</h1>
            <p className="text-sm text-muted-foreground">
              {user?.name} & {user?.partnerName}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Overall Progress */}
        <Card className="shadow-romantic border-primary/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🌟</span>
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {progress.completedTasks.length}
              </div>
              <p className="text-muted-foreground">
                of {unlockedTasks.length} tasks completed
              </p>
            </div>
            <Progress value={completionPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Just Started</span>
              <span>Love Masters</span>
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-xl">🏆</span>
            Milestones
          </h2>
          
          {milestones.map((milestone, index) => {
            const isUnlocked = isMilestoneUnlocked(milestone);
            const isCompleted = isMilestoneCompleted(milestone);
            const milestoneProgress = getMilestoneProgress(milestone);
            
            return (
              <Card
                key={milestone.id}
                className={`transition-all ${
                  isCompleted
                    ? 'border-green-200 bg-green-50/50 shadow-soft'
                    : isUnlocked
                    ? 'border-primary/20 shadow-soft'
                    : 'border-muted bg-muted/30'
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      isCompleted
                        ? 'bg-green-100 text-green-600'
                        : isUnlocked
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isUnlocked ? getMilestoneIcon(milestone.emoji) : <Lock className="h-6 w-6" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${
                          isUnlocked ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {milestone.name}
                        </h3>
                        {isCompleted && (
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            Complete
                          </Badge>
                        )}
                        {!isUnlocked && (
                          <Badge variant="outline" className="bg-muted text-muted-foreground">
                            Locked
                          </Badge>
                        )}
                      </div>
                      
                      <p className={`text-sm mb-3 ${
                        isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'
                      }`}>
                        {milestone.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className={isUnlocked ? 'text-foreground' : 'text-muted-foreground'}>
                            Progress
                          </span>
                          <span className={isUnlocked ? 'text-foreground' : 'text-muted-foreground'}>
                            {Math.min(progress.completedTasks.length, milestone.tasksRequired)} / {milestone.tasksRequired}
                          </span>
                        </div>
                        <Progress 
                          value={getMilestoneProgress(milestone)} 
                          className={`h-2 ${!isUnlocked ? 'opacity-50' : ''}`}
                        />
                      </div>
                      
                      {milestone.price && !isUnlocked && (
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Unlock for ${milestone.price}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/pricing')}
                          >
                            Unlock
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-soft border-primary/10">
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="romantic"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Continue Tasks 💕
              </Button>
              <Button
                variant="sweet"
                onClick={() => navigate('/pricing')}
                className="flex-1"
              >
                Unlock More 🚀
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;