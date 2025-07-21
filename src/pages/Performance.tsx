import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, TrendingUp, Target, Brain, CheckCircle, AlertCircle } from "lucide-react";

const Performance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const performanceMetrics = [
    { label: "Average Quiz Score", value: "89%", icon: Target, trend: "+5%", color: "text-success" },
    { label: "Completion Rate", value: "94%", icon: CheckCircle, trend: "+2%", color: "text-primary" },
    { label: "Learning Efficiency", value: "87%", icon: Brain, trend: "+8%", color: "text-accent" },
    { label: "Retention Rate", value: "82%", icon: TrendingUp, trend: "+3%", color: "text-warning" }
  ];

  const subjectPerformance = [
    { subject: "JavaScript", score: 92, lessons: 18, quizzes: 8, strength: "Excellent" },
    { subject: "React", score: 87, lessons: 14, quizzes: 6, strength: "Good" },
    { subject: "Python", score: 78, lessons: 7, quizzes: 3, strength: "Improving" },
    { subject: "CSS", score: 85, lessons: 12, quizzes: 5, strength: "Good" }
  ];

  const weakAreas = [
    {
      topic: "Async Programming",
      subject: "JavaScript",
      score: 65,
      recommendation: "Review Promise handling and async/await patterns"
    },
    {
      topic: "State Management", 
      subject: "React",
      score: 72,
      recommendation: "Practice with Redux and Context API examples"
    },
    {
      topic: "Data Structures",
      subject: "Python", 
      score: 68,
      recommendation: "Focus on lists, dictionaries, and set operations"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    if (score >= 70) return "text-accent";
    return "text-destructive";
  };

  const getScoreVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 80) return "secondary";
    return "outline";
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
                Performance Analytics
              </h1>
              <p className="text-muted-foreground">
                Detailed insights into your learning performance and areas for improvement
              </p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {performanceMetrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">{metric.label}</p>
                          <p className="text-2xl font-bold">{metric.value}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <IconComponent className={`h-5 w-5 ${metric.color}`} />
                          <Badge variant="secondary" className="text-xs">
                            {metric.trend}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subject Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-primary" />
                    Subject Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subjectPerformance.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">{subject.subject}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{subject.lessons} lessons</span>
                            <span>•</span>
                            <span>{subject.quizzes} quizzes</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(subject.score)}`}>
                            {subject.score}%
                          </div>
                          <Badge variant={getScoreVariant(subject.score)} className="text-xs">
                            {subject.strength}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={subject.score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-accent" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weakAreas.map((area, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">{area.topic}</h3>
                          <Badge variant="outline" className="text-xs">
                            {area.subject}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(area.score)}`}>
                            {area.score}%
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{area.recommendation}</p>
                      <Progress value={area.score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Learning Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-accent" />
                  AI Learning Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-success">Strong Performance</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          You excel at JavaScript fundamentals and show consistent improvement in quiz scores.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-warning">Focus Area</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Consider spending more time on practical coding exercises to reinforce theoretical knowledge.
                        </p>
                      </div>
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

export default Performance;