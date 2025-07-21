import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Zap, BookOpen, Users, Clock, Award } from "lucide-react";

const Achievements = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const earnedAchievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first course",
      icon: BookOpen,
      category: "Learning",
      points: 100,
      earnedDate: "2 weeks ago",
      rarity: "Common"
    },
    {
      id: 2,
      title: "Streak Master",
      description: "Study for 7 consecutive days",
      icon: Target,
      category: "Consistency",
      points: 250,
      earnedDate: "1 week ago",
      rarity: "Uncommon"
    },
    {
      id: 3,
      title: "Code Warrior",
      description: "Complete 10 coding challenges",
      icon: Zap,
      category: "Practice",
      points: 300,
      earnedDate: "3 days ago",
      rarity: "Rare"
    },
    {
      id: 4,
      title: "Community Helper",
      description: "Help 5 fellow learners in discussions",
      icon: Users,
      category: "Community",
      points: 200,
      earnedDate: "1 day ago",
      rarity: "Uncommon"
    }
  ];

  const progressAchievements = [
    {
      id: 5,
      title: "Speed Learner",
      description: "Complete a course in under 24 hours",
      icon: Clock,
      category: "Speed",
      points: 400,
      progress: 75,
      requirement: "Complete 1 course quickly",
      rarity: "Epic"
    },
    {
      id: 6,
      title: "Knowledge Seeker",
      description: "Complete 5 different course categories",
      icon: Star,
      category: "Exploration",
      points: 500,
      progress: 60,
      requirement: "3/5 categories completed",
      rarity: "Epic"
    },
    {
      id: 7,
      title: "Master Learner",
      description: "Earn 1000 total XP points",
      icon: Award,
      category: "Mastery",
      points: 1000,
      progress: 85,
      requirement: "850/1000 XP",
      rarity: "Legendary"
    }
  ];

  const stats = [
    { label: "Total XP", value: "2,450", icon: Star },
    { label: "Achievements Earned", value: earnedAchievements.length.toString(), icon: Trophy },
    { label: "Current Level", value: "8", icon: Target },
    { label: "Rank", value: "#127", icon: Award }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "text-muted-foreground border-muted";
      case "Uncommon": return "text-success border-success";
      case "Rare": return "text-primary border-primary";
      case "Epic": return "text-accent border-accent";
      case "Legendary": return "text-warning border-warning";
      default: return "text-muted-foreground border-muted";
    }
  };

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
          
          <main className="container mx-auto px-4 py-6 space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Achievements
              </h1>
              <p className="text-muted-foreground">
                Track your progress and celebrate your learning milestones
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Earned Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-warning" />
                  Earned Achievements
                  <Badge variant="secondary">{earnedAchievements.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {earnedAchievements.map((achievement) => {
                    const IconComponent = achievement.icon;
                    return (
                      <Card key={achievement.id} className={`border-2 ${getRarityColor(achievement.rarity)} relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 bg-warning text-warning-foreground px-2 py-1 text-xs font-medium rounded-bl-lg">
                          {achievement.points} XP
                        </div>
                        <CardContent className="p-4 text-center space-y-3">
                          <div className="mx-auto w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-warning" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          </div>
                          <div className="space-y-1">
                            <Badge variant="outline" className="text-xs">
                              {achievement.category}
                            </Badge>
                            <p className="text-xs text-muted-foreground">Earned {achievement.earnedDate}</p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Progress Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressAchievements.map((achievement) => {
                    const IconComponent = achievement.icon;
                    return (
                      <Card key={achievement.id} className={`border ${getRarityColor(achievement.rarity)}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-muted">
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold flex items-center gap-2">
                                    {achievement.title}
                                    <Badge variant="outline" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                      {achievement.rarity}
                                    </Badge>
                                  </h3>
                                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {achievement.points} XP
                                </Badge>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">{achievement.requirement}</span>
                                  <span className="font-medium">{achievement.progress}%</span>
                                </div>
                                <Progress value={achievement.progress} className="h-2" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Achievements;