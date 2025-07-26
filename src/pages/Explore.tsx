import { useState } from "react";
import { useSelector } from 'react-redux';
import {Header}  from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, TrendingUp } from "lucide-react";
import { RootState } from '../store';
import { courseCatalog } from '../data/courses';

const Explore = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const enrolledCourses = useSelector((state: RootState) => state.userCourses.enrolled);
  const enrolledTitles = new Set(enrolledCourses.map(c => c.title));

  // Filter by enrollment
  const notEnrolledCourses = courseCatalog.filter(course => !enrolledTitles.has(course.title));

  // Get all unique categories from not-enrolled courses
  const uniqueCategories = Array.from(new Set(notEnrolledCourses.map(c => c.category)));

  // Dynamic categories array
  const categories = [
    { name: "All", count: notEnrolledCourses.length, icon: "🌐" },
    ...uniqueCategories.map(cat => ({
      name: cat,
      count: notEnrolledCourses.filter(c => c.category === cat).length,
      icon:
        cat === "Programming" ? "💻" :
        cat === "Design" ? "🎨" :
        cat === "Data Science" ? "📊" :
        cat === "Marketing" ? "📈" :
        cat === "Business" ? "💼" :
        cat === "Photography" ? "📸" :
        cat === "Web Development" ? "🌐" :
        cat === "Frontend" ? "🖥️" :
        cat === "AI & ML" ? "🤖" :
        cat === "Cloud Computing" ? "☁️" :
        cat === "Security" ? "🔒" :
        cat === "Mobile Development" ? "📱" :
        cat === "DevOps" ? "⚙️" :
        "📚"
    }))
  ];

  // Filter by category
  let filteredCourses = notEnrolledCourses;
  if (selectedCategory !== 'All') {
    filteredCourses = filteredCourses.filter(course => course.category === selectedCategory);
  }

  // Filter by search term
  if (searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    filteredCourses = filteredCourses.filter(course =>
      course.title.toLowerCase().includes(term) ||
      course.instructor.toLowerCase().includes(term) ||
      course.category.toLowerCase().includes(term)
    );
  }

  // Filter by level
  if (filterLevel !== 'All') {
    filteredCourses = filteredCourses.filter(course => course.level === filterLevel);
  }

  const trendingCourses = filteredCourses.slice(0, 6);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="flex h-full w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 h-full overflow-y-auto">
          <Header />
          <main className="container mx-auto px-4 py-6 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Explore Courses
              </h1>
              <p className="text-muted-foreground">
                Discover new skills and advance your career
              </p>
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search courses, instructors, or topics..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="border rounded px-3 py-2 text-sm bg-background"
                  value={filterLevel}
                  onChange={e => setFilterLevel(e.target.value)}
                  style={{ minWidth: 140 }}
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <Button variant="outline" size="icon" disabled>
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
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${selectedCategory === category.name ? 'bg-primary/10 border border-primary text-primary font-semibold' : 'hover:bg-muted/50'}`}
                        onClick={() => setSelectedCategory(category.name)}
                      >
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
                      {trendingCourses.length === 0 && (
                        <div className="col-span-full text-center text-muted-foreground py-8">
                          No courses found in this category.
                        </div>
                      )}
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