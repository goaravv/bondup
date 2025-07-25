import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { getTaskById, getUnlockedTasks } from '@/data/tasks';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ProgressBar } from '@/components/ProgressBar';
import { TaskCard } from '@/components/TaskCard';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, progress, setProgress } = useApp();
  const { toast } = useToast();

  const currentTask = getTaskById(progress.currentTask);
  const unlockedTasks = getUnlockedTasks(progress.paidUpTo);
  const isTaskUnlocked = currentTask && unlockedTasks.some(task => task.id === currentTask.id);
  const completionPercentage = (progress.completedTasks.length / unlockedTasks.length) * 100;

  const handleTaskComplete = () => {
    if (!currentTask) return;
    
    const newCompletedTasks = [...progress.completedTasks, currentTask.id];
    const newCurrentTask = progress.currentTask + 1;
    
    setProgress({
      ...progress,
      completedTasks: newCompletedTasks,
      currentTask: newCurrentTask,
    });

    toast({
      title: "Task Completed! 🎉",
      description: `You've completed ${newCompletedTasks.length} tasks so far!`,
    });
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
      <DashboardHeader 
        user={user}
        onNavigateToProgress={() => navigate('/progress')}
        onNavigateToSettings={() => navigate('/settings')}
      />

      <div className="max-w-md mx-auto p-4 space-y-6">
        <ProgressBar 
          completedTasks={progress.completedTasks.length}
          totalTasks={unlockedTasks.length}
          completionPercentage={completionPercentage}
        />

        <TaskCard 
          task={currentTask}
          isUnlocked={isTaskUnlocked}
          onTaskComplete={handleTaskComplete}
          onUnlockMore={() => navigate('/pricing')}
        />
      </div>
    </div>
  );
};

export default Dashboard;