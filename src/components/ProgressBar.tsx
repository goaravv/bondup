import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  completedTasks: number;
  totalTasks: number;
  completionPercentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  completedTasks,
  totalTasks,
  completionPercentage
}) => {
  return (
    <Card className="shadow-soft border-primary/10">
      <CardContent className="pt-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{completedTasks} / {totalTasks}</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </CardContent>
    </Card>
  );
};