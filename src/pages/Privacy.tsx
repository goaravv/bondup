import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, Lock, Eye, Trash2, Server, Heart } from 'lucide-react';

const PrivacyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur border-b border-primary/10 shadow-soft">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Your privacy matters</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header */}
        <Card className="shadow-romantic border-primary/20">
          <CardContent className="pt-4">
            <div className="text-center space-y-3">
              <div className="text-4xl">🔐</div>
              <h2 className="text-xl font-bold">Privacy First, Always</h2>
              <p className="text-muted-foreground">
                Your intimate moments are sacred. Here's how we protect them.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Image Processing */}
        <Card className="shadow-soft border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Image Processing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-sm">10-Second Rule</h3>
                  <p className="text-xs text-muted-foreground">
                    Your photos are processed in memory for exactly 10 seconds for task verification, then immediately deleted.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-sm">No Permanent Storage</h3>
                  <p className="text-xs text-muted-foreground">
                    We never save your photos to our servers, databases, or any permanent storage.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-sm">RAM Processing Only</h3>
                  <p className="text-xs text-muted-foreground">
                    Images exist only in temporary memory during AI verification.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="shadow-soft border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Data Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-sm">Encrypted Communication</h3>
                  <p className="text-xs text-muted-foreground">
                    All data transmission uses industry-standard SSL/TLS encryption.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-sm">Minimal Data Collection</h3>
                  <p className="text-xs text-muted-foreground">
                    We only store your names, relationship date, and task progress.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-sm">No Third-Party Sharing</h3>
                  <p className="text-xs text-muted-foreground">
                    Your data never leaves our secure environment or gets shared.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What We Store */}
        <Card className="shadow-soft border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              What We Store
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <h3 className="font-medium text-sm text-green-800 mb-2">✅ We DO store:</h3>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• Your names (encrypted)</li>
                <li>• Relationship start date</li>
                <li>• Task completion progress</li>
                <li>• Payment status</li>
                <li>• App preferences</li>
              </ul>
            </div>
            
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <h3 className="font-medium text-sm text-red-800 mb-2">❌ We DON'T store:</h3>
              <ul className="text-xs text-red-700 space-y-1">
                <li>• Your photos or videos</li>
                <li>• Location data</li>
                <li>• Contact information</li>
                <li>• Chat history</li>
                <li>• Biometric data</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* AI Processing */}
        <Card className="shadow-soft border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              AI Verification Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2">
              <p><strong>Step 1:</strong> Photo uploaded to secure processing</p>
              <p><strong>Step 2:</strong> AI checks if task requirements are met</p>
              <p><strong>Step 3:</strong> Result sent back (✅ or ❌)</p>
              <p><strong>Step 4:</strong> Photo immediately deleted from memory</p>
              <p><strong>Step 5:</strong> No trace remains in our systems</p>
            </div>
            
            <div className="bg-primary/10 p-3 rounded-lg">
              <p className="text-xs text-primary">
                <strong>Promise:</strong> The AI only determines if your photo shows the required action. No human ever sees your photos.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="shadow-soft border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Questions?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Have privacy concerns? We're here to help and always improving our protections.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => navigate('/settings')}>
                Feedback
              </Button>
              <Button variant="romantic" onClick={() => navigate('/dashboard')}>
                Back to Tasks
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <div className="text-center text-xs text-muted-foreground">
          Privacy Policy last updated: January 2024
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;