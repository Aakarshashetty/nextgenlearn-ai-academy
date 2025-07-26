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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/useUser";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Save,
  Moon,
  Sun,
  Monitor,
  Download,
  Upload,
  Trash2,
  Key,
  Mail,
  Globe,
  Clock,
  Palette,
  Languages,
  Volume2,
  VolumeX,
  Smartphone,
  Laptop,
  Database,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Edit,
  Camera,
  Lock,
  Unlock,
  EyeOff,
  Calendar,
  MapPin,
  Phone,
  ExternalLink,
  Copy,
  RefreshCw,
  LogOut,
  CreditCard,
  FileText,
  Zap,
  Target,
  BarChart3,
  Users,
  BookOpen,
  MessageSquare
} from "lucide-react";

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Use Redux user state
  const {
    profile,
    notifications,
    privacy,
    security,
    appearance,
    updateProfile,
    updateNotificationSettings,
    updatePrivacySettings,
    updateSecuritySettings,
    updateAppearanceSettings,
    setTheme,
    toggleTwoFactor,
    resetUserState,
  } = useUser();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
  };

  const handleExportData = () => {
    setShowExportModal(true);
    // Simulate data export
    setTimeout(() => {
      setShowExportModal(false);
    }, 2000);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = () => {
    // Simulate account deletion
    resetUserState();
    setShowDeleteConfirm(false);
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add('dark');
    } else if (newTheme === "light") {
      document.documentElement.classList.remove('dark');
    } else {
      // System theme logic
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const getThemeIcon = (themeName: string) => {
    switch (themeName) {
      case "light": return Sun;
      case "dark": return Moon;
      case "system": return Monitor;
      default: return Monitor;
    }
  };

  const timezones = [
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "Europe/London", label: "GMT" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" }
  ];

  const languages = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Español" },
    { value: "French", label: "Français" },
    { value: "German", label: "Deutsch" },
    { value: "Chinese", label: "中文" },
    { value: "Japanese", label: "日本語" }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <div className="flex h-full w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 h-full overflow-y-auto">
          <Header />
          
          <main className="container mx-auto px-6 py-8 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Settings
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    Manage your account preferences and privacy settings
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={handleExportData} className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                  <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2">
                    {isSaving ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <nav className="space-y-2">
                      <button
                        onClick={() => setActiveTab("profile")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === "profile" 
                            ? "bg-blue-50 text-blue-700 border border-blue-200" 
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">Profile</span>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab("notifications")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === "notifications" 
                            ? "bg-blue-50 text-blue-700 border border-blue-200" 
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <Bell className="h-4 w-4" />
                        <span className="text-sm font-medium">Notifications</span>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab("privacy")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === "privacy" 
                            ? "bg-blue-50 text-blue-700 border border-blue-200" 
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="text-sm font-medium">Privacy</span>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab("security")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === "security" 
                            ? "bg-blue-50 text-blue-700 border border-blue-200" 
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <Shield className="h-4 w-4" />
                        <span className="text-sm font-medium">Security</span>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab("appearance")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === "appearance" 
                            ? "bg-blue-50 text-blue-700 border border-blue-200" 
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <Palette className="h-4 w-4" />
                        <span className="text-sm font-medium">Appearance</span>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab("account")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === "account" 
                            ? "bg-blue-50 text-blue-700 border border-blue-200" 
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <SettingsIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Account</span>
                      </button>
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Profile Settings */}
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-blue-600" />
                          Profile Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                          <div className="relative">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src={profile.avatar} />
                              <AvatarFallback className="text-xl">{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
                            </Avatar>
                            <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                              <Camera className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold">{profile.firstName} {profile.lastName}</h3>
                            <p className="text-sm text-gray-500">Member since {profile.joinDate}</p>
                            <p className="text-sm text-gray-500">Last active {profile.lastActive}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              value={profile.firstName}
                              onChange={(e) => updateProfile({ firstName: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              value={profile.lastName}
                              onChange={(e) => updateProfile({ lastName: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={profile.email}
                              onChange={(e) => updateProfile({ email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone" 
                              value={profile.phone}
                              onChange={(e) => updateProfile({ phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input 
                              id="location" 
                              value={profile.location}
                              onChange={(e) => updateProfile({ location: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Select value={profile.timezone} onValueChange={(value) => updateProfile({ timezone: value })}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {timezones.map((tz) => (
                                  <SelectItem key={tz.value} value={tz.value}>
                                    {tz.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio" 
                            placeholder="Tell us about yourself..."
                            value={profile.bio}
                            onChange={(e) => updateProfile({ bio: e.target.value })}
                            rows={4}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bell className="h-5 w-5 text-green-600" />
                          Notification Preferences
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Notification Channels</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-gray-500">Receive notifications via email</p>
                              </div>
                              <Switch 
                                checked={notifications.email}
                                onCheckedChange={(checked) => updateNotificationSettings({ email: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Push Notifications</Label>
                                <p className="text-sm text-gray-500">Receive browser push notifications</p>
                              </div>
                              <Switch 
                                checked={notifications.push}
                                onCheckedChange={(checked) => updateNotificationSettings({ push: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>SMS Notifications</Label>
                                <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                              </div>
                              <Switch 
                                checked={notifications.sms}
                                onCheckedChange={(checked) => updateNotificationSettings({ sms: checked })}
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Notification Types</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Course Updates</Label>
                                <p className="text-sm text-gray-500">New lessons and course announcements</p>
                              </div>
                              <Switch 
                                checked={notifications.courseUpdates}
                                onCheckedChange={(checked) => updateNotificationSettings({ courseUpdates: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Achievement Alerts</Label>
                                <p className="text-sm text-gray-500">When you earn badges and milestones</p>
                              </div>
                              <Switch 
                                checked={notifications.achievements}
                                onCheckedChange={(checked) => updateNotificationSettings({ achievements: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Discussion Replies</Label>
                                <p className="text-sm text-gray-500">When someone replies to your posts</p>
                              </div>
                              <Switch 
                                checked={notifications.discussions}
                                onCheckedChange={(checked) => updateNotificationSettings({ discussions: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Study Reminders</Label>
                                <p className="text-sm text-gray-500">Daily study reminders and goals</p>
                              </div>
                              <Switch 
                                checked={notifications.studyReminders}
                                onCheckedChange={(checked) => updateNotificationSettings({ studyReminders: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Live Sessions</Label>
                                <p className="text-sm text-gray-500">Upcoming live sessions and webinars</p>
                              </div>
                              <Switch 
                                checked={notifications.liveSessions}
                                onCheckedChange={(checked) => updateNotificationSettings({ liveSessions: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Group Invites</Label>
                                <p className="text-sm text-gray-500">Study group invitations and updates</p>
                              </div>
                              <Switch 
                                checked={notifications.groupInvites}
                                onCheckedChange={(checked) => updateNotificationSettings({ groupInvites: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Marketing Communications</Label>
                                <p className="text-sm text-gray-500">Product updates and promotional content</p>
                              </div>
                              <Switch 
                                checked={notifications.marketing}
                                onCheckedChange={(checked) => updateNotificationSettings({ marketing: checked })}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === "privacy" && (
                  <div className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Eye className="h-5 w-5 text-purple-600" />
                          Privacy & Visibility
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Profile Visibility</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Public Profile</Label>
                                <p className="text-sm text-gray-500">Make your profile visible to other learners</p>
                              </div>
                              <Switch 
                                checked={privacy.profileVisible}
                                onCheckedChange={(checked) => updatePrivacySettings({ profileVisible: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Show Learning Progress</Label>
                                <p className="text-sm text-gray-500">Display your course progress publicly</p>
                              </div>
                              <Switch 
                                checked={privacy.progressVisible}
                                onCheckedChange={(checked) => updatePrivacySettings({ progressVisible: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Show Achievements</Label>
                                <p className="text-sm text-gray-500">Display earned badges and certificates</p>
                              </div>
                              <Switch 
                                checked={privacy.achievementsVisible}
                                onCheckedChange={(checked) => updatePrivacySettings({ achievementsVisible: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Show Email Address</Label>
                                <p className="text-sm text-gray-500">Display your email to other users</p>
                              </div>
                              <Switch 
                                checked={privacy.emailVisible}
                                onCheckedChange={(checked) => updatePrivacySettings({ emailVisible: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Show Location</Label>
                                <p className="text-sm text-gray-500">Display your location to other users</p>
                              </div>
                              <Switch 
                                checked={privacy.locationVisible}
                                onCheckedChange={(checked) => updatePrivacySettings({ locationVisible: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Show Activity</Label>
                                <p className="text-sm text-gray-500">Display your recent activity</p>
                              </div>
                              <Switch 
                                checked={privacy.activityVisible}
                                onCheckedChange={(checked) => updatePrivacySettings({ activityVisible: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Searchable Profile</Label>
                                <p className="text-sm text-gray-500">Allow others to find your profile in search</p>
                              </div>
                              <Switch 
                                checked={privacy.searchable}
                                onCheckedChange={(checked) => updatePrivacySettings({ searchable: checked })}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === "security" && (
                  <div className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-red-600" />
                          Account Security
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Password</Label>
                            <div className="flex gap-2 mt-2">
                              <Input type="password" placeholder="••••••••" className="flex-1" />
                              <Button variant="outline">Change Password</Button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Last changed: {security.passwordLastChanged}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <Label>Two-Factor Authentication</Label>
                              <p className="text-sm text-gray-500">Add an extra layer of security</p>
                            </div>
                            <Button 
                              variant={security.twoFactorEnabled ? "default" : "outline"}
                              onClick={toggleTwoFactor}
                            >
                              {security.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <Label>Login Notifications</Label>
                              <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                            </div>
                            <Switch 
                              checked={security.loginNotifications}
                              onCheckedChange={(checked) => updateSecuritySettings({ loginNotifications: checked })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Session Timeout</Label>
                            <Select 
                              value={security.sessionTimeout.toString()} 
                              onValueChange={(value) => updateSecuritySettings({ sessionTimeout: parseInt(value) })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="60">1 hour</SelectItem>
                                <SelectItem value="120">2 hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Active Sessions</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Laptop className="h-5 w-5 text-gray-500" />
                                <div>
                                  <p className="font-medium">Current Session</p>
                                  <p className="text-sm text-gray-500">San Francisco, CA • Chrome on Mac</p>
                                </div>
                              </div>
                              <Badge variant="secondary">Current</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Smartphone className="h-5 w-5 text-gray-500" />
                                <div>
                                  <p className="font-medium">Mobile Session</p>
                                  <p className="text-sm text-gray-500">San Francisco, CA • Safari on iPhone</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">Revoke</Button>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="pt-4 border-t">
                          <h4 className="font-medium text-red-600 mb-4">Danger Zone</h4>
                          <div className="space-y-4">
                            <Button 
                              variant="outline" 
                              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                              onClick={handleDeleteAccount}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Account
                            </Button>
                            <p className="text-sm text-gray-500">
                              This action cannot be undone. All your data will be permanently deleted.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Appearance Settings */}
                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Palette className="h-5 w-5 text-indigo-600" />
                          Appearance & Display
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Theme</h4>
                          <div className="grid grid-cols-3 gap-3">
                            {(["light", "dark", "system"] as const).map((themeOption) => {
                              const IconComponent = getThemeIcon(themeOption);
                              return (
                                <button
                                  key={themeOption}
                                  onClick={() => handleThemeChange(themeOption)}
                                  className={`p-4 rounded-lg border-2 transition-all ${
                                    appearance.theme === themeOption
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="h-4 w-4" />
                                    <span className="text-sm font-medium capitalize">{themeOption}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Display Settings</h4>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Font Size</Label>
                              <Select 
                                value={appearance.fontSize} 
                                onValueChange={(value: "small" | "medium" | "large") => 
                                  updateAppearanceSettings({ fontSize: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="small">Small</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="large">Large</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Sound Effects</Label>
                                <p className="text-sm text-gray-500">Play sounds for notifications and interactions</p>
                              </div>
                              <Switch 
                                checked={appearance.soundEnabled}
                                onCheckedChange={(checked) => updateAppearanceSettings({ soundEnabled: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Auto-save</Label>
                                <p className="text-sm text-gray-500">Automatically save your progress</p>
                              </div>
                              <Switch 
                                checked={appearance.autoSave}
                                onCheckedChange={(checked) => updateAppearanceSettings({ autoSave: checked })}
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Language & Region</h4>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Language</Label>
                              <Select 
                                value={profile.language} 
                                onValueChange={(value) => updateProfile({ language: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {languages.map((lang) => (
                                    <SelectItem key={lang.value} value={lang.value}>
                                      {lang.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Account Settings */}
                {activeTab === "account" && (
                  <div className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <SettingsIcon className="h-5 w-5 text-gray-600" />
                          Account Management
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Data & Privacy</h4>
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start" onClick={handleExportData}>
                              <Download className="h-4 w-4 mr-2" />
                              Export My Data
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Upload className="h-4 w-4 mr-2" />
                              Import Data
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Database className="h-4 w-4 mr-2" />
                              Download Learning History
                            </Button>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Account Actions</h4>
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                              <LogOut className="h-4 w-4 mr-2" />
                              Sign Out All Devices
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Refresh Account Data
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Connected Accounts
                            </Button>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Account Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Account ID:</span>
                              <p className="font-medium">{profile.id}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Member Since:</span>
                              <p className="font-medium">{profile.joinDate}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Last Login:</span>
                              <p className="font-medium">{security.lastLogin}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Account Status:</span>
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold">Delete Account</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteAccount}>
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Export Data Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <Download className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Exporting Data</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Preparing your data for export. This may take a few moments...
            </p>
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-sm text-gray-600">Processing...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;