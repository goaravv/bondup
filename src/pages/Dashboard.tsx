import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import { getTaskById, getUnlockedTasks } from '@/data/tasks';
import { Camera, Upload, Timer, CheckCircle, XCircle, Settings, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, progress, setProgress } = useApp();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'fail' | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [timer, setTimer] = useState(10);

  const currentTask = getTaskById(progress.currentTask);
  const unlockedTasks = getUnlockedTasks(progress.paidUpTo);
  const isTaskUnlocked = currentTask && unlockedTasks.some(task => task.id === currentTask.id);
  const completionPercentage = (progress.completedTasks.length / unlockedTasks.length) * 100;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const simulateVerification = async () => {
    setIsVerifying(true);
    setVerificationResult(null);
    
    // Simulate 10-second processing timer
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // Simulate random success/failure for demo
          const success = Math.random() > 0.3; // 70% success rate
          setVerificationResult(success ? 'success' : 'fail');
          setIsVerifying(false);
          
          if (success && currentTask) {
            // Update progress
            const newCompletedTasks = [...progress.completedTasks, currentTask.id];
            const newCurrentTask = progress.currentTask + 1;
            setProgress({
              ...progress,
              completedTasks: newCompletedTasks,
              currentTask: newCurrentTask,
            });
          }
          
          setTimer(10);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setUploadedImage(null);
  };

  if (!currentTask) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-romantic">
          <CardContent className="pt-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-muted-foreground">You've completed all available tasks!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur border-b border-primary/10 shadow-soft">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">BondUP</h1>
            <p className="text-sm text-muted-foreground">
              {user?.name} & {user?.partnerName}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/progress')}
            >
              <BarChart3 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Progress Bar */}
        <Card className="shadow-soft border-primary/10">
          <CardContent className="pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{progress.completedTasks.length} / {unlockedTasks.length}</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* Current Task */}
        <Card className="shadow-romantic border-primary/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Task {currentTask.id} {currentTask.emoji}
              </CardTitle>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                currentTask.category === 'Sweet' ? 'bg-sweet text-sweet-foreground' :
                currentTask.category === 'Flirty' ? 'bg-accent text-accent-foreground' :
                currentTask.category === 'Intimate' ? 'bg-primary text-primary-foreground' :
                'bg-spicy text-spicy-foreground'
              }`}>
                {currentTask.category}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{currentTask.title}</h3>
              <p className="text-muted-foreground">{currentTask.prompt}</p>
            </div>

            {!isTaskUnlocked ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🔒</div>
                <p className="text-muted-foreground mb-4">This task is locked</p>
                <Button
                  variant="romantic"
                  onClick={() => navigate('/pricing')}
                >
                  Unlock More Tasks 💕
                </Button>
              </div>
            ) : (
              <>
                {/* Image Upload */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium">
                    Upload your selfie to verify completion 📸
                  </label>
                  
                  {!uploadedImage ? (
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:border-primary/50 transition-romantic cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Camera className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">
                          Tap to take a photo or choose from gallery
                        </p>
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-muted rounded-lg p-3 flex items-center gap-3">
                        <Upload className="h-5 w-5 text-primary" />
                        <span className="text-sm flex-1">{uploadedImage.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedImage(null)}
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Verification Button */}
                {uploadedImage && !isVerifying && verificationResult === null && (
                  <Button
                    variant="romantic"
                    onClick={simulateVerification}
                    className="w-full"
                    size="lg"
                  >
                    Verify Task Completion ✨
                  </Button>
                )}

                {/* Verification Process */}
                {isVerifying && (
                  <div className="text-center py-6 space-y-3">
                    <Timer className="h-8 w-8 mx-auto text-primary animate-pulse" />
                    <p className="font-medium">Verifying your photo...</p>
                    <p className="text-lg font-bold text-primary">{timer}s</p>
                    <p className="text-xs text-muted-foreground">
                      Your photo will be deleted after verification 🔒
                    </p>
                  </div>
                )}

                {/* Verification Result */}
                {verificationResult === 'success' && (
                  <div className="text-center py-6 space-y-3 animate-bounce-in">
                    <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
                    <h3 className="text-lg font-bold text-green-600">Success! 🎉</h3>
                    <p className="text-muted-foreground">
                      Great job! Your task has been completed.
                    </p>
                    <Button
                      variant="sweet"
                      onClick={() => window.location.reload()}
                      className="w-full"
                    >
                      Next Task 💕
                    </Button>
                  </div>
                )}

                {verificationResult === 'fail' && (
                  <div className="text-center py-6 space-y-3 animate-bounce-in">
                    <XCircle className="h-12 w-12 mx-auto text-red-500" />
                    <h3 className="text-lg font-bold text-red-600">Try Again! 💪</h3>
                    <p className="text-muted-foreground">
                      We couldn't verify the task. Give it another try!
                    </p>
                    <Button
                      variant="spicy"
                      onClick={resetVerification}
                      className="w-full"
                    >
                      Try Again 🔄
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;