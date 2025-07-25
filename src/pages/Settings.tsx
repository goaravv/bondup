import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Heart, Bell, Shield, MessageCircle, User } from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [feedback, setFeedback] = useState('');

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    alert('Profile updated! 💕');
  };

  const handleSendFeedback = () => {
    if (!feedback.trim()) return;
    
    // In a real app, this would send feedback to backend
    alert('Thank you for your feedback! We love hearing from our couples. 💖');
    setFeedback('');
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
            <h1 className="text-xl font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground">Customize your experience</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Profile Settings */}
        <Card className="shadow-soft border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium block mb-1">Your Name</label>
                <Input
                  value={user?.name || ''}
                  onChange={(e) => setUser(user ? { ...user, name: e.target.value } : null)}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Partner's Name</label>
                <Input
                  value={user?.partnerName || ''}
                  onChange={(e) => setUser(user ? { ...user, partnerName: e.target.value } : null)}
                  placeholder="Partner's name"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-1">Relationship Start Date</label>
              <Input
                type="date"
                value={user?.relationshipStartDate || ''}
                onChange={(e) => setUser(user ? { ...user, relationshipStartDate: e.target.value } : null)}
              />
            </div>
            
            <Button onClick={handleSaveProfile} variant="sweet" className="w-full">
              Save Profile 💕
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-soft border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Love Reminders</h3>
                <p className="text-sm text-muted-foreground">Daily nudges to stay connected</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Daily Tasks</h3>
                <p className="text-sm text-muted-foreground">Get reminded about new tasks</p>
              </div>
              <Switch checked={dailyReminders} onCheckedChange={setDailyReminders} />
            </div>
            
            {notifications && (
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💌 Perfect! We'll send you sweet reminders to keep your love growing.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="shadow-soft border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Safety
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Photos are never stored permanently</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>10-second processing then instant deletion</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No data shared with third parties</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>End-to-end encrypted storage</span>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => navigate('/privacy')}
              className="w-full"
            >
              Read Full Privacy Policy
            </Button>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card className="shadow-soft border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">
                Tell us how we can make BondUP better! 💭
              </label>
              <Textarea
                placeholder="We'd love to hear your thoughts, suggestions, or any issues you've encountered..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
              />
            </div>
            
            <Button
              onClick={handleSendFeedback}
              disabled={!feedback.trim()}
              variant="romantic"
              className="w-full"
            >
              Send Feedback 💌
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="shadow-soft border-primary/10">
          <CardContent className="pt-4">
            <div className="text-center space-y-2">
              <div className="text-3xl">💕</div>
              <h3 className="font-semibold">BondUP</h3>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              <p className="text-xs text-muted-foreground">
                Made with 💖 for couples who want to grow closer
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;