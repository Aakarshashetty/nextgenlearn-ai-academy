import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Users, Calendar, Clock, Play } from "lucide-react";

const Sessions = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const liveSessions = [
    {
      title: "Advanced JavaScript Patterns",
      instructor: "Dr. Sarah Chen",
      time: "2:00 PM - 3:30 PM",
      date: "Today",
      participants: 45,
      isLive: true,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"
    },
    {
      title: "React Performance Optimization",
      instructor: "Alex Rodriguez", 
      time: "4:00 PM - 5:00 PM",
      date: "Today",
      participants: 32,
      isLive: false,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
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
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Live Sessions
              </h1>
              <p className="text-muted-foreground">
                Join interactive learning sessions with expert instructors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveSessions.map((session, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={session.thumbnail} 
                      alt={session.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {session.isLive && (
                      <Badge className="absolute top-3 left-3 bg-destructive text-white animate-pulse">
                        🔴 LIVE
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {session.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">by {session.instructor}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {session.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {session.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {session.participants}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={session.isLive ? "destructive" : "outline"}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      {session.isLive ? "Join Live Session" : "Set Reminder"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Sessions;