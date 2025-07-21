import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Grid3x3, 
  List,
  Star,
  Clock,
  Users,
  TrendingUp 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Courses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const courses = [
    {
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      duration: "65h 30m",
      students: 15420,
      rating: 4.9,
      progress: 75,
      thumbnail: "",
      level: "Beginner" as const,
      category: "Web Development"
    },
    {
      title: "Advanced React and Redux",
      instructor: "Stephen Grider",
      duration: "47h 15m",
      students: 8932,
      rating: 4.8,
      progress: 45,
      thumbnail: "",
      level: "Advanced" as const,
      category: "Frontend"
    },
    {
      title: "Python for Data Science",
      instructor: "Jose Portilla",
      duration: "42h 20m",
      students: 12567,
      rating: 4.7,
      progress: 0,
      thumbnail: "",
      level: "Intermediate" as const,
      category: "Data Science"
    },
    {
      title: "Machine Learning A-Z",
      instructor: "Kirill Eremenko",
      duration: "44h 0m",
      students: 25671,
      rating: 4.9,
      progress: 20,
      thumbnail: "",
      level: "Intermediate" as const,
      category: "AI & ML"
    },
    {
      title: "AWS Certified Solutions Architect",
      instructor: "Ryan Kroonenburg",
      duration: "28h 45m",
      students: 7843,
      rating: 4.6,
      progress: 60,
      thumbnail: "",
      level: "Advanced" as const,
      category: "Cloud Computing"
    },
    {
      title: "Complete Digital Marketing Course",
      instructor: "Rob Percival",
      duration: "23h 30m",
      students: 9876,
      rating: 4.5,
      progress: 0,
      thumbnail: "",
      level: "Beginner" as const,
      category: "Marketing"
    }
  ];

  const categories = ["All", "Web Development", "Data Science", "AI & ML", "Cloud Computing", "Marketing", "Design"];
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "progress", label: "My Progress" }
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
          
          <main className="container mx-auto px-4 py-6 space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">My Courses</h1>
                  <p className="text-muted-foreground">
                    Continue learning and explore new skills
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    6 Active
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    4.8 Avg Rating
                  </Badge>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select defaultValue="popular">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex rounded-lg border">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {courses.map((course, index) => (
                <CourseCard
                  key={course.title}
                  {...course}
                  className={`animate-fade-in ${viewMode === "list" ? "flex-row" : ""}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center pt-8">
              <Button variant="outline" size="lg">
                Load More Courses
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Courses;