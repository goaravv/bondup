import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, BarChart3 } from 'lucide-react';
import { User } from '@/types';

interface DashboardHeaderProps {
  user: User | null;
  onNavigateToProgress: () => void;
  onNavigateToSettings: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  onNavigateToProgress,
  onNavigateToSettings
}) => {
  return (
    <div className="bg-card/95 backdrop-blur border-b border-primary/10 shadow-soft">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/6f8a6597-9b93-425e-a902-d037e3a9fe7c.png" 
            alt="BondUP Logo" 
            className="h-8 w-8"
          />
          <div>
            <h1 className="text-xl font-bold">BondUP</h1>
            <p className="text-sm text-muted-foreground">
              {user?.name} & {user?.partnerName}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNavigateToProgress}
          >
            <BarChart3 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNavigateToSettings}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};