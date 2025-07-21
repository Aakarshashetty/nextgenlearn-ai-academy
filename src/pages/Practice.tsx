import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Code, Trophy, Clock, Target, CheckCircle, Play } from "lucide-react";

const Practice = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const challenges = [
    {
      title: "JavaScript Array Methods",
      difficulty: "Easy",
      category: "Programming",
      timeEstimate: "15 min",
      completed: true,
      score: 95,
      description: "Master array manipulation with map, filter, and reduce"
    },
    {
      title: "React Component Design",
      difficulty: "Medium",
      category: "Web Development", 
      timeEstimate: "30 min",
      completed: false,
      score: 0,
      description: "Build reusable components following best practices"
    },
    {
      title: "Algorithm Optimization",
      difficulty: "Hard",
      category: "Computer Science",
      timeEstimate: "45 min",
      completed: false,
      score: 0,
      description: "Optimize time and space complexity of algorithms"
    }
  ];

  const stats = [
    { label: "Challenges Completed", value: "12", icon: CheckCircle, color: "text-success" },
    { label: "Average Score", value: "89%", icon: Trophy, color: "text-warning" },
    { label: "Time Spent", value: "8h", icon: Clock, color: "text-primary" },
    { label: "Current Streak", value: "5 days", icon: Target, color: "text-accent" }
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
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Practice Hub
              </h1>
              <p className="text-muted-foreground">
                Sharpen your skills with hands-on challenges and exercises
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-muted ${stat.color}`}>
                        <IconComponent className="h-5 w-5" />
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Coding Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {challenges.map((challenge, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{challenge.title}</h3>
                          {challenge.completed && (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <Badge 
                          variant={
                            challenge.difficulty === "Easy" ? "default" :
                            challenge.difficulty === "Medium" ? "secondary" : "destructive"
                          }
                          className="text-xs"
                        >
                          {challenge.difficulty}
                        </Badge>
                        {challenge.completed && (
                          <Badge variant="outline" className="text-xs">
                            Score: {challenge.score}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{challenge.category}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {challenge.timeEstimate}
                        </div>
                      </div>
                      
                      <Button size="sm" variant={challenge.completed ? "outline" : "default"}>
                        <Play className="h-4 w-4 mr-2" />
                        {challenge.completed ? "Retry" : "Start"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Practice;