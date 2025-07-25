import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Timer, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TaskVerificationProps {
  onSuccess: () => void;
  onReset: () => void;
}

export const TaskVerification: React.FC<TaskVerificationProps> = ({ onSuccess, onReset }) => {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'fail' | null>(null);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isVerifying && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (isVerifying && timer === 0) {
      // Simulate verification result
      const success = Math.random() > 0.3; // 70% success rate
      setVerificationResult(success ? 'success' : 'fail');
      setIsVerifying(false);
      setTimer(10);
      
      toast({
        title: success ? "Verification Successful! 🎉" : "Verification Failed 💪",
        description: success ? "Great job completing the task!" : "Please try again with a better photo.",
      });
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVerifying, timer, toast]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      toast({
        title: "Photo uploaded! 📸",
        description: "Ready for verification",
      });
    }
  };

  const startVerification = () => {
    if (!uploadedImage) return;
    
    setIsVerifying(true);
    setVerificationResult(null);
    setTimer(10);
    
    toast({
      title: "Verifying photo... ✨",
      description: "This will take 10 seconds",
    });
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setUploadedImage(null);
    setIsVerifying(false);
    setTimer(10);
    onReset();
  };

  const handleSuccess = () => {
    onSuccess();
    resetVerification();
  };

  return (
    <div className="space-y-4">
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
          onClick={startVerification}
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

      {/* Verification Results */}
      {verificationResult === 'success' && (
        <div className="text-center py-6 space-y-3 animate-bounce-in">
          <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
          <h3 className="text-lg font-bold text-green-600">Success! 🎉</h3>
          <p className="text-muted-foreground">
            Great job! Your task has been completed.
          </p>
          <Button
            variant="sweet"
            onClick={handleSuccess}
            className="w-full"
          >
            Continue to Next Task 💕
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
    </div>
  );
};