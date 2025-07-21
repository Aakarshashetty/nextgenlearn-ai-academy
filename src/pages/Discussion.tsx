import { useState } from "react";
import {Header}  from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Users, Pin, TrendingUp, Plus } from "lucide-react";

const Discussion = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const discussions = [
    {
      id: 1,
      title: "Best practices for React state management",
      author: "Sarah Chen",
      avatar: "SC",
      category: "React",
      replies: 24,
      likes: 156,
      lastActivity: "2 hours ago",
      isPinned: true,
      excerpt: "What are your thoughts on using Context vs Redux for state management in medium-sized React applications?"
    },
    {
      id: 2,
      title: "JavaScript async/await vs Promises",
      author: "Mike Johnson",
      avatar: "MJ",
      category: "JavaScript",
      replies: 18,
      likes: 89,
      lastActivity: "4 hours ago",
      isPinned: false,
      excerpt: "Can someone explain when to use async/await versus traditional promise chains?"
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox - When to use what?",
      author: "Emma Wilson",
      avatar: "EW",
      category: "CSS",
      replies: 32,
      likes: 203,
      lastActivity: "6 hours ago",
      isPinned: false,
      excerpt: "I'm always confused about when to use CSS Grid versus Flexbox. Any guidelines?"
    },
    {
      id: 4,
      title: "Python data analysis libraries comparison",
      author: "Dr. Alex Rodriguez",
      avatar: "AR",
      category: "Python",
      replies: 15,
      likes: 67,
      lastActivity: "1 day ago",
      isPinned: false,
      excerpt: "Comparing pandas, NumPy, and Polars for data analysis workflows."
    }
  ];

  const categories = [
    { name: "All Topics", count: 245, active: true },
    { name: "JavaScript", count: 89, active: false },
    { name: "React", count: 67, active: false },
    { name: "Python", count: 45, active: false },
    { name: "CSS", count: 34, active: false },
    { name: "General", count: 28, active: false }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="flex h-full w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 h-full overflow-y-auto">
          <Header 
            
          />
          
          <main className="container mx-auto px-4 py-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Discussion Forum
                </h1>
                <p className="text-muted-foreground">
                  Connect, ask questions, and share knowledge with the community
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Discussion
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MessageSquare className="h-5 w-5" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((category, index) => (
                      <div key={index} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                        category.active ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"
                      }`}>
                        <span className="text-sm font-medium">{category.name}</span>
                        <Badge variant={category.active ? "secondary" : "outline"} className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3 space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            {discussion.isPinned && (
                              <Pin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                            )}
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarFallback className="text-xs font-medium">
                                {discussion.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1 flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold hover:text-primary transition-colors">
                                  {discussion.title}
                                </h3>
                                {discussion.isPinned && (
                                  <Badge variant="secondary" className="text-xs">
                                    Pinned
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {discussion.excerpt}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>by {discussion.author}</span>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">
                                  {discussion.category}
                                </Badge>
                                <span>•</span>
                                <span>{discussion.lastActivity}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{discussion.likes} likes</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Discussion;