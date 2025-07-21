import { useState } from "react";
import {Header}  from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, TrendingUp, Star, BookOpen } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

const Explore = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const trendingCourses = [
    {
      title: "Full Stack Web Development",
      instructor: "John Smith",
      duration: "15h 30m",
      students: 4200,
      rating: 4.9,
      progress: 0,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
      level: "Intermediate" as const,
      category: "Web Development"
    },
    {
      title: "Machine Learning with Python",
      instructor: "Dr. Emily Watson",
      duration: "20h 15m",
      students: 3800,
      rating: 4.8,
      progress: 0,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      level: "Advanced" as const,
      category: "Data Science"
    },
    {
      title: "Mobile App Development",
      instructor: "Mike Johnson",
      duration: "18h 45m",
      students: 2900,
      rating: 4.7,
      progress: 0,
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      level: "Intermediate" as const,
      category: "Mobile Development"
    }
  ];

  const categories = [
    { name: "Programming", count: 45, icon: "💻" },
    { name: "Design", count: 32, icon: "🎨" },
    { name: "Data Science", count: 28, icon: "📊" },
    { name: "Marketing", count: 24, icon: "📈" },
    { name: "Business", count: 18, icon: "💼" },
    { name: "Photography", count: 15, icon: "📸" }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="flex h-full w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 h-full overflow-y-auto">
          <Header 
            
          />
          
          <main className="container mx-auto px-4 py-6 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Explore Courses
              </h1>
              <p className="text-muted-foreground">
                Discover new skills and advance your career
              </p>
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search courses, instructors, or topics..." 
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
                  <CardContent className="space-y-3">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{category.icon}</span>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3 space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Trending Courses
                    </CardTitle>
                    <Badge variant="secondary">🔥 Hot</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {trendingCourses.map((course, index) => (
                        <CourseCard
                          key={course.title}
                          {...course}
                          className="hover:shadow-lg transition-all duration-300"
                        />
                      ))}
                    </div>
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

export default Explore;