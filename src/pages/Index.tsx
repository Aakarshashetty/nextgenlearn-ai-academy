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
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { courseCatalog } from '../data/courses';
import { Link } from 'react-router-dom';

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

  const enrolledCourses = useSelector((state: RootState) => state.userCourses.enrolled);
  const enrolledTitles = new Set(enrolledCourses.map(c => c.title));
  const recommendedCourses = courseCatalog.filter(c => !enrolledTitles.has(c.title));
console.log(enrolledCourses);
  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="flex h-full w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 h-full overflow-y-auto">
          <Header 
            onMenuClick={toggleSidebar}
            isDarkMode={isDarkMode}
            onThemeToggle={toggleTheme}
          />
          
          <main className="container mx-auto px-4 py-6 space-y-8">
            {/* Welcome Section */}
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      Welcome back, Alex! 👋
                    </h1>
                    <Badge variant="secondary" className="animate-pulse hidden sm:flex">
                      <Brain className="h-3 w-3 mr-1" />
                      AI Ready
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Continue your learning journey. You're doing great!
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>2 courses in progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Last active: Today</span>
                  </div>
                </div>
              </div>
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
                  // className={`opacity-0 animate-fade-in`}
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
                      <BookOpen className="h-5 w-5 text-primary" />
                      Continue Learning
                      <Badge variant="outline" className="ml-2">2 Active</Badge>
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-4">
                      Pick up where you left off
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {enrolledCourses.length === 0 ? (
                        <div className="col-span-full text-center text-muted-foreground py-8">
                          You have no active courses.<br />
                          <Link to="/courses">
                            <Button variant="gradient" className="mt-4">Start a new course</Button>
                          </Link>
                        </div>
                      ) : (
                        enrolledCourses.map((course, index) => {
                          const fullCourse = courseCatalog.find(c => c.title === course.title) || course;
                          return (
                            <CourseCard
                              key={fullCourse.title}
                              title={fullCourse.title}
                              instructor={fullCourse.instructor || ''}
                              duration={fullCourse.duration || ''}
                              students={fullCourse.students || 0}
                              rating={fullCourse.rating || 0}
                              progress={fullCourse.progress || 0}
                              thumbnail={fullCourse.thumbnail || ''}
                              level={fullCourse.level || 'Beginner'}
                              category={fullCourse.category || ''}
                              nextLesson={fullCourse.nextLesson || ''}
                              // className={`opacity-0 animate-fade-in hover:shadow-lg transition-all duration-300`}
                              style={{ animationDelay: `${(index + 1) * 200}ms` }}
                            />
                          );
                        })
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommended Section */}
                <Card className="animate-slide-up">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-accent" />
                      Recommended for You
                      <Badge variant="secondary" className="bg-accent/10 text-accent">AI Picked</Badge>
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="hover:bg-accent/10">
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      Based on your learning patterns and goals
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {recommendedCourses.length === 0 ? (
                        <div className="col-span-full text-center text-muted-foreground py-8">
                          No recommendations available. You're all caught up!
                        </div>
                      ) : (
                        recommendedCourses.map((course, index) => (
                          <CourseCard
                            key={course.title}
                            {...course}
                            // className={`opacity-0 animate-fade-in hover:shadow-lg transition-all duration-300`}
                            style={{ animationDelay: `${(index + 3) * 200}ms` }}
                          />
                        ))
                      )}
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
