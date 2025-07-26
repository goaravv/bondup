import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast({
          title: "App Installing! 📱",
          description: "BondUP is being added to your home screen",
        });
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      // Fallback for iOS Safari
      toast({
        title: "Add to Home Screen 📲",
        description: "Tap the share button and select 'Add to Home Screen'",
        duration: 5000,
      });
    }
  };

  if (!isInstallable && !(/iPad|iPhone|iPod/.test(navigator.userAgent))) {
    return null;
  }

  return (
    <Button
      onClick={handleInstallClick}
      variant="romantic"
      size="sm"
      className="flex items-center gap-2 text-xs px-3 py-2"
    >
      {isInstallable ? <Download className="h-3 w-3" /> : <Smartphone className="h-3 w-3" />}
      Download App
    </Button>
  );
};