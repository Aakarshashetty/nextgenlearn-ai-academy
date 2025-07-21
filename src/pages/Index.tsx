import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Target,
  TrendingUp,
  Users,
  Brain,
  Zap,
  Calendar,
  Plus,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const statsData = [
    {
      title: "Courses in Progress",
      value: "3",
      icon: BookOpen,
      description: "2 new this week",
      trend: { value: 15, isPositive: true }
    },
    {
      title: "Study Streak",
      value: "12 days",
      icon: Target,
      description: "Personal best!",
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Total XP",
      value: "2,450",
      icon: Trophy,
      description: "Level 8 learner",
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Study Time",
      value: "24h",
      icon: Clock,
      description: "This month",
      trend: { value: 25, isPositive: true }
    }
  ];

  const featuredCourses = [
    {
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      duration: "8h 30m",
      students: 1250,
      rating: 4.8,
      progress: 65,
      thumbnail: "",
      level: "Advanced" as const,
      category: "Web Development"
    },
    {
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Michael Chen",
      duration: "12h 15m",
      students: 3200,
      rating: 4.9,
      progress: 0,
      thumbnail: "",
      level: "Beginner" as const,
      category: "Data Science"
    },
    {
      title: "UX Design Principles",
      instructor: "Emma Wilson",
      duration: "6h 45m",
      students: 890,
      rating: 4.7,
      progress: 30,
      thumbnail: "",
      level: "Intermediate" as const,
      category: "Design"
    }
  ];

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
            {/* Welcome Section */}
            <div className="space-y-2 animate-fade-in">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">Welcome back, Alex! 👋</h1>
                <Badge variant="secondary" className="animate-pulse">
                  <Brain className="h-3 w-3 mr-1" />
                  AI Ready
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Continue your learning journey. You're doing great!
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 animate-slide-up">
              <Button variant="gradient" className="gap-2">
                <Plus className="h-4 w-4" />
                Start New Course
              </Button>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Study Time
              </Button>
              <Button variant="outline" className="gap-2">
                <Brain className="h-4 w-4" />
                Ask AI Tutor
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-scale-in">
              {statsData.map((stat, index) => (
                <StatsCard
                  key={stat.title}
                  {...stat}
                  className={`opacity-0 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Courses */}
              <div className="lg:col-span-2 space-y-6">
                {/* Continue Learning Section */}
                <Card className="animate-slide-up">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Continue Learning
                    </CardTitle>
                    <Button variant="ghost" size="sm">
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featuredCourses.slice(0, 2).map((course, index) => (
                      <CourseCard
                        key={course.title}
                        {...course}
                        className={`opacity-0 animate-fade-in`}
                        style={{ animationDelay: `${(index + 1) * 200}ms` }}
                      />
                    ))}
                  </CardContent>
                </Card>

                {/* Recommended Section */}
                <Card className="animate-slide-up">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-accent" />
                      Recommended for You
                    </CardTitle>
                    <Button variant="ghost" size="sm">
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {featuredCourses.slice(1).map((course, index) => (
                        <CourseCard
                          key={course.title}
                          {...course}
                          className={`opacity-0 animate-fade-in`}
                          style={{ animationDelay: `${(index + 3) * 200}ms` }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Activity & Community */}
              <div className="space-y-6">
                <RecentActivity />
                
                {/* Study Goal */}
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="h-5 w-5 text-success" />
                      Weekly Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">4/7</div>
                      <p className="text-sm text-muted-foreground">days completed</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-success h-2 rounded-full" style={{ width: '57%' }}></div>
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                      Great progress! Keep it up to reach your goal.
                    </p>
                  </CardContent>
                </Card>

                {/* Community Highlights */}
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-info" />
                      Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Study Groups</span>
                      <Badge variant="secondary">5 online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New Discussions</span>
                      <Badge variant="secondary">12 today</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Join Discussion
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
