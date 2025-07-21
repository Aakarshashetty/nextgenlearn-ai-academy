import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings as SettingsIcon, User, Bell, Shield, Eye, Save } from "lucide-react";

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    courseUpdates: true,
    achievements: true,
    discussions: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    progressVisible: false,
    achievementsVisible: true
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className="flex-1 lg:ml-64">
          <Header 
            onMenuClick={toggleSidebar}
            isDarkMode={isDarkMode}
            onThemeToggle={toggleTheme}
          />
          
          <main className="container mx-auto px-4 py-6 space-y-8 max-w-4xl">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account preferences and privacy settings
              </p>
            </div>

            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg">AC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline">Change Photo</Button>
                    <p className="text-sm text-muted-foreground">
                      Recommended: Square image, at least 200x200px
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Chen" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex.chen@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us about yourself..."
                    defaultValue="Passionate learner focused on web development and data science. Always eager to explore new technologies and share knowledge with the community."
                  />
                </div>

                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-accent" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Course Updates</Label>
                      <p className="text-sm text-muted-foreground">New lessons and course announcements</p>
                    </div>
                    <Switch 
                      checked={notifications.courseUpdates}
                      onCheckedChange={(checked) => setNotifications({...notifications, courseUpdates: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Achievement Alerts</Label>
                      <p className="text-sm text-muted-foreground">When you earn badges and milestones</p>
                    </div>
                    <Switch 
                      checked={notifications.achievements}
                      onCheckedChange={(checked) => setNotifications({...notifications, achievements: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Discussion Replies</Label>
                      <p className="text-sm text-muted-foreground">When someone replies to your posts</p>
                    </div>
                    <Switch 
                      checked={notifications.discussions}
                      onCheckedChange={(checked) => setNotifications({...notifications, discussions: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Marketing Communications</Label>
                      <p className="text-sm text-muted-foreground">Product updates and promotional content</p>
                    </div>
                    <Switch 
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-warning" />
                  Privacy & Visibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Public Profile</Label>
                      <p className="text-sm text-muted-foreground">Make your profile visible to other learners</p>
                    </div>
                    <Switch 
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Show Learning Progress</Label>
                      <p className="text-sm text-muted-foreground">Display your course progress publicly</p>
                    </div>
                    <Switch 
                      checked={privacy.progressVisible}
                      onCheckedChange={(checked) => setPrivacy({...privacy, progressVisible: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Show Achievements</Label>
                      <p className="text-sm text-muted-foreground">Display earned badges and certificates</p>
                    </div>
                    <Switch 
                      checked={privacy.achievementsVisible}
                      onCheckedChange={(checked) => setPrivacy({...privacy, achievementsVisible: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-destructive" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Password</Label>
                    <div className="flex gap-2 mt-2">
                      <Input type="password" placeholder="••••••••" className="flex-1" />
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                        Delete Account
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;