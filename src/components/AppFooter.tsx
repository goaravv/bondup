import React from 'react';
import { PWAInstallButton } from './PWAInstallButton';

export const AppFooter: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-primary/10 shadow-soft z-50">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/6f8a6597-9b93-425e-a902-d037e3a9fe7c.png" 
            alt="BondUP Logo" 
            className="h-8 w-8"
          />
          <span className="text-sm font-medium">BondUP</span>
        </div>
        <PWAInstallButton />
      </div>
    </footer>
  );
};