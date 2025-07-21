import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Search, Filter, BookOpen, Video, Link, FileCode } from "lucide-react";

const Resources = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const resources = [
    {
      title: "JavaScript Complete Reference Guide",
      type: "PDF",
      category: "Programming",
      size: "2.5 MB",
      downloads: 1250,
      icon: FileText,
      description: "Comprehensive guide covering ES6+ features and best practices"
    },
    {
      title: "React Hooks Cheat Sheet",
      type: "PDF",
      category: "Web Development",
      size: "1.2 MB", 
      downloads: 890,
      icon: FileText,
      description: "Quick reference for all React hooks with examples"
    },
    {
      title: "CSS Grid Layout Examples",
      type: "Code",
      category: "CSS",
      size: "850 KB",
      downloads: 650,
      icon: FileCode,
      description: "Practical CSS Grid examples and templates"
    },
    {
      title: "Python Data Science Notebook",
      type: "Jupyter",
      category: "Data Science",
      size: "3.1 MB",
      downloads: 720,
      icon: FileCode,
      description: "Interactive notebook with pandas and matplotlib examples"
    },
    {
      title: "Design System Templates",
      type: "Figma",
      category: "Design",
      size: "5.2 MB",
      downloads: 420,
      icon: Link,
      description: "Complete design system with components and guidelines"
    }
  ];

  const categories = [
    { name: "All Resources", count: 142 },
    { name: "Programming", count: 45 },
    { name: "Design", count: 32 },
    { name: "Data Science", count: 28 },
    { name: "Web Development", count: 37 }
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
            <div className="space-y-4">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Learning Resources
              </h1>
              <p className="text-muted-foreground">
                Access study materials, templates, and reference guides
              </p>
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search resources..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                        <span className="text-sm font-medium">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  {resources.map((resource, index) => {
                    const IconComponent = resource.icon;
                    return (
                      <Card key={index} className="hover:shadow-md transition-all duration-200">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-primary/10">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">{resource.title}</h3>
                                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                                </div>
                                <Button>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <Badge variant="outline" className="text-xs">
                                  {resource.type}
                                </Badge>
                                <span>{resource.category}</span>
                                <span>{resource.size}</span>
                                <span>{resource.downloads.toLocaleString()} downloads</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Resources;