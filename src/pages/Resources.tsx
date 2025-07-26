import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  BookOpen, 
  Video, 
  Link, 
  FileCode,
  Play,
  Eye,
  Star,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  FileImage,
  FileVideo,
  FileAudio,
  Archive,
  Sparkles
} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';

interface Resource {
  id: string;
  title: string;
  type: "PDF" | "Video" | "Code" | "Jupyter" | "Figma" | "Image" | "Audio" | "Archive";
  category: string;
  size: string;
  downloads: number;
  rating: number;
  duration?: string;
  icon: any;
  description: string;
  tags: string[];
  url: string;
  preview?: string;
  lastUpdated: string;
  author: string;
  isPremium: boolean;
}

interface DownloadProgress {
  resourceId: string;
  progress: number;
  status: 'pending' | 'downloading' | 'completed' | 'error';
  error?: string;
}

const Resources = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Resources");
  const [selectedType, setSelectedType] = useState("All Types");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress[]>([]);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewResource, setPreviewResource] = useState<Resource | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const resources: Resource[] = [
    {
      id: "js-complete-guide",
      title: "JavaScript Complete Reference Guide",
      type: "PDF",
      category: "Programming",
      size: "2.5 MB",
      downloads: 1250,
      rating: 4.8,
      icon: FileText,
      description: "Comprehensive guide covering ES6+ features, async programming, and modern JavaScript best practices",
      tags: ["JavaScript", "ES6", "Async", "Best Practices"],
      url: "/resources/js-complete-guide.pdf",
      lastUpdated: "2024-01-15",
      author: "John Doe",
      isPremium: false
    },
    {
      id: "react-hooks-cheatsheet",
      title: "React Hooks Cheat Sheet",
      type: "PDF",
      category: "Web Development",
      size: "1.2 MB",
      downloads: 890,
      rating: 4.9,
      icon: FileText,
      description: "Quick reference for all React hooks with practical examples and use cases",
      tags: ["React", "Hooks", "Frontend", "JavaScript"],
      url: "/resources/react-hooks-cheatsheet.pdf",
      lastUpdated: "2024-01-10",
      author: "Jane Smith",
      isPremium: false
    },
    {
      id: "css-grid-examples",
      title: "CSS Grid Layout Examples",
      type: "Code",
      category: "CSS",
      size: "850 KB",
      downloads: 650,
      rating: 4.6,
      icon: FileCode,
      description: "Practical CSS Grid examples and responsive layout templates",
      tags: ["CSS", "Grid", "Layout", "Responsive"],
      url: "/resources/css-grid-examples.zip",
      lastUpdated: "2024-01-08",
      author: "Mike Johnson",
      isPremium: false
    },
    {
      id: "python-data-science",
      title: "Python Data Science Notebook",
      type: "Jupyter",
      category: "Data Science",
      size: "3.1 MB",
      downloads: 720,
      rating: 4.7,
      icon: FileCode,
      description: "Interactive notebook with pandas, matplotlib, and scikit-learn examples",
      tags: ["Python", "Data Science", "Pandas", "Machine Learning"],
      url: "/resources/python-data-science.ipynb",
      lastUpdated: "2024-01-12",
      author: "Sarah Wilson",
      isPremium: true
    },
    {
      id: "design-system-templates",
      title: "Design System Templates",
      type: "Figma",
      category: "Design",
      size: "5.2 MB",
      downloads: 420,
      rating: 4.5,
      icon: Link,
      description: "Complete design system with components, guidelines, and Figma templates",
      tags: ["Design", "Figma", "UI/UX", "Components"],
      url: "https://figma.com/design-system",
      lastUpdated: "2024-01-05",
      author: "Alex Chen",
      isPremium: true
    },
    {
      id: "react-advanced-patterns",
      title: "React Advanced Patterns",
      type: "Video",
      category: "Web Development",
      size: "45.2 MB",
      downloads: 320,
      rating: 4.9,
      duration: "1h 23m",
      icon: Video,
      description: "Advanced React patterns and performance optimization techniques",
      tags: ["React", "Advanced", "Performance", "Patterns"],
      url: "/resources/react-advanced-patterns.mp4",
      lastUpdated: "2024-01-03",
      author: "David Brown",
      isPremium: true
    },
    {
      id: "machine-learning-basics",
      title: "Machine Learning Basics",
      type: "PDF",
      category: "Data Science",
      size: "4.8 MB",
      downloads: 580,
      rating: 4.4,
      icon: FileText,
      description: "Introduction to machine learning concepts and algorithms",
      tags: ["Machine Learning", "AI", "Algorithms", "Basics"],
      url: "/resources/ml-basics.pdf",
      lastUpdated: "2024-01-07",
      author: "Emily Davis",
      isPremium: false
    },
    {
      id: "ui-animations-guide",
      title: "UI Animations Guide",
      type: "Code",
      category: "Design",
      size: "2.1 MB",
      downloads: 380,
      rating: 4.6,
      icon: FileCode,
      description: "CSS and JavaScript animation techniques for modern web interfaces",
      tags: ["Animations", "CSS", "JavaScript", "UI"],
      url: "/resources/ui-animations.zip",
      lastUpdated: "2024-01-09",
      author: "Lisa Wang",
      isPremium: false
    }
  ];

  const categories = [
    { name: "All Resources", count: resources.length, icon: BookOpen },
    { name: "Programming", count: resources.filter(r => r.category === "Programming").length, icon: FileCode },
    { name: "Web Development", count: resources.filter(r => r.category === "Web Development").length, icon: Link },
    { name: "Data Science", count: resources.filter(r => r.category === "Data Science").length, icon: TrendingUp },
    { name: "Design", count: resources.filter(r => r.category === "Design").length, icon: FileImage },
    { name: "CSS", count: resources.filter(r => r.category === "CSS").length, icon: FileCode }
  ];

  const resourceTypes = [
    { name: "All Types", count: resources.length },
    { name: "PDF", count: resources.filter(r => r.type === "PDF").length },
    { name: "Video", count: resources.filter(r => r.type === "Video").length },
    { name: "Code", count: resources.filter(r => r.type === "Code").length },
    { name: "Jupyter", count: resources.filter(r => r.type === "Jupyter").length },
    { name: "Figma", count: resources.filter(r => r.type === "Figma").length }
  ];

  // Filter and sort resources
  const filteredResources = resources
    .filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "All Resources" || resource.category === selectedCategory;
      const matchesType = selectedType === "All Types" || resource.type === selectedType;
      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.downloads - a.downloads;
        case "rating":
          return b.rating - a.rating;
        case "recent":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF": return FileText;
      case "Video": return Video;
      case "Code": return FileCode;
      case "Jupyter": return FileCode;
      case "Figma": return Link;
      case "Image": return FileImage;
      case "Audio": return FileAudio;
      case "Archive": return Archive;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PDF": return "bg-red-100 text-red-800 border-red-200";
      case "Video": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Code": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Jupyter": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Figma": return "bg-pink-100 text-pink-800 border-pink-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleDownload = async (resource: Resource) => {
    // Add to download progress
    setDownloadProgress(prev => [...prev, {
      resourceId: resource.id,
      progress: 0,
      status: 'pending'
    }]);

    // Simulate download progress
    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        const updated = prev.map(item => {
          if (item.resourceId === resource.id && item.status === 'downloading') {
            const newProgress = Math.min(item.progress + Math.random() * 20, 100);
            return {
              ...item,
              progress: newProgress,
              status: newProgress >= 100 ? 'completed' as const : 'downloading' as const
            };
          }
          return item;
        });
        return updated;
      });
    }, 200);

    // Start download
    setTimeout(() => {
      setDownloadProgress(prev => 
        prev.map(item => 
          item.resourceId === resource.id 
            ? { ...item, status: 'downloading' as const }
            : item
        )
      );
    }, 500);

    // Complete download
    setTimeout(() => {
      clearInterval(progressInterval);
      setDownloadProgress(prev => 
        prev.map(item => 
          item.resourceId === resource.id 
            ? { ...item, progress: 100, status: 'completed' as const }
            : item
        )
      );

      // Remove from progress after 3 seconds
      setTimeout(() => {
        setDownloadProgress(prev => prev.filter(item => item.resourceId !== resource.id));
      }, 3000);

      // Handle actual download
      if (resource.type === "Figma") {
        window.open(resource.url, '_blank');
      } else {
        // Create download link
        const link = document.createElement('a');
        link.href = resource.url;
        link.download = resource.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 3000);
  };

  const getDownloadStatus = (resourceId: string) => {
    return downloadProgress.find(item => item.resourceId === resourceId);
  };

  const handlePreview = (resource: Resource) => {
    setPreviewResource(resource);
    setIsPreviewModalOpen(true);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <div className="flex h-full w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 h-full overflow-y-auto">
          <Header />
          
          <main className="container mx-auto px-6 py-8 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Learning Resources
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    Access study materials, templates, and reference guides
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Sparkles className="h-4 w-4" />
                    <span>{resources.length} resources available</span>
                  </div>
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search resources, tags, or descriptions..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="border rounded-lg px-3 py-2 text-sm bg-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="recent">Recently Updated</option>
                  <option value="name">Alphabetical</option>
                </select>
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                >
                  {viewMode === "grid" ? "Grid" : "List"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1 space-y-6">
                {/* Categories */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((category, index) => {
                      const IconComponent = category.icon;
                      return (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedCategory === category.name 
                              ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedCategory(category.name)}
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            <span className="text-sm font-medium">{category.name}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Resource Types */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Resource Types</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {resourceTypes.map((type, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedType === type.name 
                            ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedType(type.name)}
                      >
                        <span className="text-sm font-medium">{type.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {type.count}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              {/* Resources Grid/List */}
              <div className="lg:col-span-3">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredResources.map((resource) => {
                      const IconComponent = resource.icon;
                      const TypeIcon = getTypeIcon(resource.type);
                      const downloadStatus = getDownloadStatus(resource.id);
                      
                      return (
                        <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              {/* Header */}
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 rounded-lg bg-blue-50">
                                      <IconComponent className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Badge className={`text-xs ${getTypeColor(resource.type)}`}>
                                        <TypeIcon className="h-3 w-3 mr-1" />
                                        {resource.type}
                                      </Badge>
                                      {resource.isPremium && (
                                        <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                                          <Star className="h-3 w-3 mr-1" />
                                          Premium
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {resource.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                                </div>
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1">
                                {resource.tags.slice(0, 3).map((tag, index) => (
                                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    {tag}
                                  </span>
                                ))}
                                {resource.tags.length > 3 && (
                                  <span className="text-xs text-gray-500">+{resource.tags.length - 3} more</span>
                                )}
                              </div>

                              {/* Meta Info */}
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {resource.downloads.toLocaleString()}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3" />
                                    {resource.rating}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {resource.size}
                                  </div>
                                </div>
                                <span className="text-xs">{resource.lastUpdated}</span>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2 pt-2 border-t">
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePreview(resource)}
                                  className="flex-1"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => handleDownload(resource)}
                                  disabled={downloadStatus?.status === 'downloading'}
                                  className="flex-1"
                                >
                                  {downloadStatus?.status === 'downloading' ? (
                                    <>
                                      <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                      {Math.round(downloadStatus.progress)}%
                                      </>
                                  ) : (
                                    <>
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </>
                                  )}
                                </Button>
                              </div>

                              {/* Download Progress */}
                              {downloadStatus?.status === 'downloading' && (
                                <div className="space-y-2">
                                  <Progress value={downloadStatus.progress} className="h-2" />
                                  <p className="text-xs text-gray-500">Downloading...</p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredResources.map((resource) => {
                      const IconComponent = resource.icon;
                      const TypeIcon = getTypeIcon(resource.type);
                      const downloadStatus = getDownloadStatus(resource.id);
                      
                      return (
                        <Card key={resource.id} className="hover:shadow-md transition-all duration-200 border-0 shadow-sm">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-blue-50">
                                <IconComponent className="h-6 w-6 text-blue-600" />
                              </div>
                              
                              <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="font-semibold text-lg">{resource.title}</h3>
                                      <Badge className={`text-xs ${getTypeColor(resource.type)}`}>
                                        <TypeIcon className="h-3 w-3 mr-1" />
                                        {resource.type}
                                      </Badge>
                                      {resource.isPremium && (
                                        <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                                          <Star className="h-3 w-3 mr-1" />
                                          Premium
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600">{resource.description}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span>{resource.category}</span>
                                  <span>{resource.size}</span>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {resource.downloads.toLocaleString()} downloads
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3" />
                                    {resource.rating}
                                  </div>
                                  <span>{resource.author}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Button 
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handlePreview(resource)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Preview
                                  </Button>
                                                                     <Button 
                                     size="sm"
                                     onClick={() => handleDownload(resource)}
                                     disabled={downloadStatus?.status === 'downloading'}
                                   >
                                     {downloadStatus?.status === 'downloading' ? (
                                       <>
                                         <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                         {Math.round(downloadStatus.progress)}%
                                       </>
                                     ) : (
                                       <>
                                         <Download className="h-4 w-4 mr-2" />
                                         Download
                                       </>
                                     )}
                                   </Button>
                                </div>

                                {/* Download Progress */}
                                {downloadStatus?.status === 'downloading' && (
                                  <div className="space-y-2">
                                    <Progress value={downloadStatus.progress} className="h-2" />
                                    <p className="text-xs text-gray-500">Downloading...</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}

                {filteredResources.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Search className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Resource Preview</DialogTitle>
          </DialogHeader>
          {previewResource && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <previewResource.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{previewResource.title}</h3>
                  <p className="text-gray-600 mb-4">{previewResource.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Category:</span>
                      <span className="ml-2 text-gray-600">{previewResource.category}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Type:</span>
                      <span className="ml-2 text-gray-600">{previewResource.type}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Size:</span>
                      <span className="ml-2 text-gray-600">{previewResource.size}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Downloads:</span>
                      <span className="ml-2 text-gray-600">{previewResource.downloads.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Rating:</span>
                      <span className="ml-2 text-gray-600">{previewResource.rating}/5</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Author:</span>
                      <span className="ml-2 text-gray-600">{previewResource.author}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="font-medium text-gray-700">Tags:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {previewResource.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => handleDownload(previewResource)}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resource
                </Button>
                {previewResource.type === "Figma" && (
                  <Button 
                    variant="outline"
                    onClick={() => window.open(previewResource.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Figma
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;