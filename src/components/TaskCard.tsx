import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Task } from '@/types';
import { TaskVerification } from './TaskVerification';

interface TaskCardProps {
  task: Task;
  isUnlocked: boolean;
  onTaskComplete: () => void;
  onUnlockMore: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  isUnlocked, 
  onTaskComplete, 
  onUnlockMore 
}) => {
  return (
    <Card className="shadow-romantic border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Task {task.id} {task.emoji}
          </CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            task.category === 'Sweet' ? 'bg-sweet text-sweet-foreground' :
            task.category === 'Flirty' ? 'bg-accent text-accent-foreground' :
            task.category === 'Intimate' ? 'bg-primary text-primary-foreground' :
            'bg-spicy text-spicy-foreground'
          }`}>
            {task.category}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">{task.title}</h3>
          <p className="text-muted-foreground">{task.prompt}</p>
        </div>

        {!isUnlocked ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🔒</div>
            <p className="text-muted-foreground mb-4">This task is locked</p>
            <Button
              variant="romantic"
              onClick={onUnlockMore}
            >
              Unlock More Tasks 💕
            </Button>
          </div>
        ) : (
          <TaskVerification 
            onSuccess={onTaskComplete}
            onReset={() => {}}
          />
        )}
      </CardContent>
    </Card>
  );
};