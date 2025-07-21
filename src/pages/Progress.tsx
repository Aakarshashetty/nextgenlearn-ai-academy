import { useState } from "react";
import {Header} from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Clock, Target, BookOpen, Award, Calendar } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
// Remove theme and toggleTheme imports

const ProgressPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Remove theme and dispatch

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // Remove the local toggleTheme function entirely, as theme toggling is handled in the Header and globally.
  // If you need a theme toggle in this page, use: dispatch(toggleTheme()) directly in your event handler.

  const currentCourses = [
    {
      title: "JavaScript Fundamentals",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      timeSpent: "12h 30m",
      category: "Programming",
      lastAccessed: "Today"
    },
    {
      title: "React Development Bootcamp", 
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      timeSpent: "8h 15m",
      category: "Web Development",
      lastAccessed: "Yesterday"
    },
    {
      title: "Python for Data Science",
      progress: 25,
      totalLessons: 28,
      completedLessons: 7,
      timeSpent: "4h 45m",
      category: "Data Science",
      lastAccessed: "3 days ago"
    }
  ];

  const weeklyStats = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 2.1 },
    { day: "Fri", hours: 1.5 },
    { day: "Sat", hours: 4.0 },
    { day: "Sun", hours: 2.8 }
  ];

  const maxHours = Math.max(...weeklyStats.map(stat => stat.hours));

  const overallStats = [
    { label: "Total Study Time", value: "156h", icon: Clock, trend: "+12%" },
    { label: "Courses Completed", value: "8", icon: Award, trend: "+2" },
    { label: "Current Streak", value: "12 days", icon: Target, trend: "+3" },
    { label: "XP Earned", value: "2,450", icon: TrendingUp, trend: "+250" }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="flex h-full w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 h-full overflow-y-auto">
          <Header 
            />
          
          <main className="container mx-auto px-4 py-6 space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Learning Progress
              </h1>
              <p className="text-muted-foreground">
                Track your learning journey and see how far you've come
              </p>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {overallStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <IconComponent className="h-5 w-5 text-primary" />
                          <Badge variant="secondary" className="text-xs">
                            {stat.trend}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Weekly Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Weekly Study Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-end justify-between h-40 gap-2">
                      {weeklyStats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1">
                          <div 
                            className="w-full bg-primary/20 rounded-t-sm relative overflow-hidden"
                            style={{ height: `${(stat.hours / maxHours) * 100}%` }}
                          >
                            <div 
                              className="absolute bottom-0 w-full bg-primary transition-all duration-300"
                              style={{ height: '100%' }}
                            />
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-medium">{stat.day}</div>
                            <div className="text-xs text-muted-foreground">{stat.hours}h</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Total this week: {weeklyStats.reduce((sum, stat) => sum + stat.hours, 0).toFixed(1)} hours
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    This Month
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Goal Progress</span>
                      <span className="font-medium">18/25 hours</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Study Days</span>
                      <span className="font-medium">18/30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg. per Day</span>
                      <span className="font-medium">1.2h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best Day</span>
                      <span className="font-medium">4.2h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Current Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentCourses.map((course, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{course.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {course.category}
                            </Badge>
                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                            <span>{course.timeSpent} studied</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{course.progress}%</div>
                          <div className="text-xs text-muted-foreground">Last: {course.lastAccessed}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{course.progress}% complete</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;