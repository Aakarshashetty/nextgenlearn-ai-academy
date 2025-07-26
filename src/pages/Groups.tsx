import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Calendar, 
  MapPin, 
  Plus, 
  Clock, 
  BookOpen,
  Search,
  Filter,
  MessageSquare,
  Video,
  FileText,
  Star,
  Crown,
  Settings,
  UserPlus,
  UserMinus,
  Edit,
  Trash2,
  Share2,
  Bell,
  CheckCircle,
  X,
  ArrowRight,
  Play,
  Pause,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  MoreHorizontal,
  Globe,
  Lock,
  Hash,
  TrendingUp,
  Award,
  Target,
  BarChart3,
  Download
} from "lucide-react";

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: 'organizer' | 'moderator' | 'member';
  joinedAt: string;
  isOnline: boolean;
  reputation: number;
  isVerified: boolean;
}

interface GroupMeeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  type: 'online' | 'hybrid' | 'in-person';
  attendees: number;
  maxAttendees: number;
  isRecurring: boolean;
  recurringDay?: string;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
  maxMembers: number;
  location: string;
  nextMeeting: GroupMeeting | null;
  category: string;
  isJoined: boolean;
  difficulty: string;
  organizer: GroupMember;
  tags: string[];
  createdAt: string;
  isPrivate: boolean;
  meetingHistory: GroupMeeting[];
  resources: Array<{
    id: string;
    name: string;
    type: 'document' | 'video' | 'link';
    url: string;
    uploadedBy: string;
    uploadedAt: string;
  }>;
  stats: {
    totalMeetings: number;
    averageAttendance: number;
    completionRate: number;
  };
}

const Groups = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("recent");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    category: "Programming",
    difficulty: "Beginner",
    maxMembers: 20,
    isPrivate: false,
    tags: ""
  });

  const studyGroups: StudyGroup[] = [
    {
      id: "1",
      name: "JavaScript Fundamentals",
      description: "Weekly meetups to practice JavaScript concepts and solve coding challenges together. We cover ES6+, async programming, and modern JavaScript patterns.",
      members: [
        {
          id: "1",
          name: "Sarah Chen",
          avatar: "SC",
          role: "organizer",
          joinedAt: "2024-01-15",
          isOnline: true,
          reputation: 1250,
          isVerified: true
        },
        {
          id: "2",
          name: "Mike Johnson",
          avatar: "MJ",
          role: "member",
          joinedAt: "2024-01-20",
          isOnline: false,
          reputation: 890,
          isVerified: false
        },
        {
          id: "3",
          name: "Emma Wilson",
          avatar: "EW",
          role: "member",
          joinedAt: "2024-01-22",
          isOnline: true,
          reputation: 1560,
          isVerified: true
        }
      ],
      maxMembers: 30,
      location: "Online",
      nextMeeting: {
        id: "1",
        title: "Async Programming Deep Dive",
        description: "Understanding promises, async/await, and error handling",
        date: "2024-02-15",
        time: "19:00",
        duration: 90,
        type: "online",
        attendees: 18,
        maxAttendees: 30,
        isRecurring: true,
        recurringDay: "Thursday"
      },
      category: "Programming",
      isJoined: true,
      difficulty: "Beginner",
      organizer: {
        id: "1",
        name: "Sarah Chen",
        avatar: "SC",
        role: "organizer",
        joinedAt: "2024-01-15",
        isOnline: true,
        reputation: 1250,
        isVerified: true
      },
      tags: ["javascript", "es6", "async", "fundamentals"],
      createdAt: "2024-01-15",
      isPrivate: false,
      meetingHistory: [
        {
          id: "1",
          title: "Introduction to Modern JavaScript",
          description: "ES6+ features and syntax",
          date: "2024-02-08",
          time: "19:00",
          duration: 90,
          type: "online",
          attendees: 22,
          maxAttendees: 30,
          isRecurring: false
        }
      ],
      resources: [
        {
          id: "1",
          name: "JavaScript ES6+ Cheat Sheet",
          type: "document",
          url: "#",
          uploadedBy: "Sarah Chen",
          uploadedAt: "2024-02-01"
        },
        {
          id: "2",
          name: "Async Programming Examples",
          type: "video",
          url: "#",
          uploadedBy: "Mike Johnson",
          uploadedAt: "2024-02-05"
        }
      ],
      stats: {
        totalMeetings: 8,
        averageAttendance: 20,
        completionRate: 85
      }
    },
    {
      id: "2",
      name: "React Advanced Patterns",
      description: "Deep dive into advanced React patterns, hooks, and performance optimization. Perfect for developers looking to master React.",
      members: [
        {
          id: "4",
          name: "Mike Johnson",
          avatar: "MJ",
          role: "organizer",
          joinedAt: "2024-01-10",
          isOnline: true,
          reputation: 890,
          isVerified: false
        }
      ],
      maxMembers: 20,
      location: "Online",
      nextMeeting: {
        id: "2",
        title: "Custom Hooks Workshop",
        description: "Building reusable custom hooks and patterns",
        date: "2024-02-16",
        time: "18:30",
        duration: 120,
        type: "online",
        attendees: 12,
        maxAttendees: 20,
        isRecurring: true,
        recurringDay: "Friday"
      },
      category: "Web Development",
      isJoined: false,
      difficulty: "Advanced",
      organizer: {
        id: "4",
        name: "Mike Johnson",
        avatar: "MJ",
        role: "organizer",
        joinedAt: "2024-01-10",
        isOnline: true,
        reputation: 890,
        isVerified: false
      },
      tags: ["react", "hooks", "performance", "patterns"],
      createdAt: "2024-01-10",
      isPrivate: false,
      meetingHistory: [],
      resources: [],
      stats: {
        totalMeetings: 5,
        averageAttendance: 15,
        completionRate: 92
      }
    },
    {
      id: "3",
      name: "Data Science Study Circle",
      description: "Exploring data analysis, machine learning, and statistical concepts using Python. From basics to advanced ML algorithms.",
      members: [
        {
          id: "5",
          name: "Dr. Emily Watson",
          avatar: "EW",
          role: "organizer",
          joinedAt: "2024-01-05",
          isOnline: false,
          reputation: 2100,
          isVerified: true
        },
        {
          id: "6",
          name: "David Brown",
          avatar: "DB",
          role: "member",
          joinedAt: "2024-01-12",
          isOnline: true,
          reputation: 1450,
          isVerified: true
        }
      ],
      maxMembers: 25,
      location: "Hybrid",
      nextMeeting: {
        id: "3",
        title: "Machine Learning Fundamentals",
        description: "Introduction to supervised and unsupervised learning",
        date: "2024-02-17",
        time: "14:00",
        duration: 150,
        type: "hybrid",
        attendees: 8,
        maxAttendees: 25,
        isRecurring: true,
        recurringDay: "Saturday"
      },
      category: "Data Science",
      isJoined: true,
      difficulty: "Intermediate",
      organizer: {
        id: "5",
        name: "Dr. Emily Watson",
        avatar: "EW",
        role: "organizer",
        joinedAt: "2024-01-05",
        isOnline: false,
        reputation: 2100,
        isVerified: true
      },
      tags: ["python", "machine-learning", "data-analysis", "statistics"],
      createdAt: "2024-01-05",
      isPrivate: false,
      meetingHistory: [],
      resources: [],
      stats: {
        totalMeetings: 12,
        averageAttendance: 18,
        completionRate: 88
      }
    },
    {
      id: "4",
      name: "UI/UX Design Workshop",
      description: "Collaborative design sessions focusing on user experience and interface design. Learn design principles and tools.",
      members: [],
      maxMembers: 15,
      location: "Online",
      nextMeeting: {
        id: "4",
        title: "Design Systems Workshop",
        description: "Creating consistent design systems and component libraries",
        date: "2024-02-19",
        time: "20:00",
        duration: 90,
        type: "online",
        attendees: 5,
        maxAttendees: 15,
        isRecurring: true,
        recurringDay: "Monday"
      },
      category: "Design",
      isJoined: false,
      difficulty: "Beginner",
      organizer: {
        id: "7",
        name: "Emma Wilson",
        avatar: "EW",
        role: "organizer",
        joinedAt: "2024-01-20",
        isOnline: true,
        reputation: 980,
        isVerified: false
      },
      tags: ["ui", "ux", "design", "figma"],
      createdAt: "2024-01-20",
      isPrivate: false,
      meetingHistory: [],
      resources: [],
      stats: {
        totalMeetings: 3,
        averageAttendance: 10,
        completionRate: 75
      }
    }
  ];

  const categories = [
    { name: "All Categories", count: studyGroups.length, icon: Users },
    { name: "Programming", count: studyGroups.filter(g => g.category === "Programming").length, icon: Hash },
    { name: "Web Development", count: studyGroups.filter(g => g.category === "Web Development").length, icon: TrendingUp },
    { name: "Data Science", count: studyGroups.filter(g => g.category === "Data Science").length, icon: BarChart3 },
    { name: "Design", count: studyGroups.filter(g => g.category === "Design").length, icon: Target }
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Filter and sort groups
  const filteredGroups = studyGroups
    .filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "All Categories" || group.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "popular":
          return b.members.length - a.members.length;
        case "meetings":
          return b.stats.totalMeetings - a.stats.totalMeetings;
        case "attendance":
          return b.stats.averageAttendance - a.stats.averageAttendance;
        default:
          return 0;
      }
    });

  const myGroups = filteredGroups.filter(group => group.isJoined);
  const availableGroups = filteredGroups.filter(group => !group.isJoined);

  const handleJoinGroup = (groupId: string) => {
    // In a real app, this would make an API call
    console.log(`Joining group ${groupId}`);
  };

  const handleLeaveGroup = (groupId: string) => {
    // In a real app, this would make an API call
    console.log(`Leaving group ${groupId}`);
  };

  const handleCreateGroup = () => {
    // In a real app, this would make an API call
    console.log("Creating new group:", newGroup);
    setIsCreateModalOpen(false);
    setNewGroup({ name: "", description: "", category: "Programming", difficulty: "Beginner", maxMembers: 20, isPrivate: false, tags: "" });
  };

  const handleOpenGroup = (group: StudyGroup) => {
    setSelectedGroup(group);
    setIsGroupModalOpen(true);
  };

  const handleJoinMeeting = () => {
    setIsInMeeting(true);
    // In a real app, this would open video call
    console.log("Joining meeting...");
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: 'document' | 'video' | 'link') => {
    switch (type) {
      case 'document': return FileText;
      case 'video': return Video;
      case 'link': return Globe;
      default: return FileText;
    }
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
                    Study Groups
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    Join study groups and learn together with peers
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{studyGroups.length} active groups</span>
                  </div>
                  <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Group
                  </Button>
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search groups, topics, or members..." 
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
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="meetings">Most Active</option>
                  <option value="attendance">Best Attendance</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Categories */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
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

                {/* Quick Stats */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Groups</span>
                      <span className="font-medium">{studyGroups.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Members</span>
                      <span className="font-medium">{studyGroups.reduce((sum, g) => sum + g.members.length, 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active Meetings</span>
                      <span className="font-medium">{studyGroups.filter(g => g.nextMeeting).length}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Groups List */}
              <div className="lg:col-span-3 space-y-6">
                {/* My Groups */}
                {myGroups.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      My Study Groups
                      <Badge variant="secondary">{myGroups.length}</Badge>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {myGroups.map((group) => (
                        <Card key={group.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm cursor-pointer" onClick={() => handleOpenGroup(group)}>
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{group.name}</h3>
                                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{group.description}</p>
                                  
                                  {/* Tags */}
                                  <div className="flex flex-wrap gap-1 mb-3">
                                    {group.tags.map((tag, index) => (
                                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <Badge className={`text-xs ${getDifficultyColor(group.difficulty)}`}>
                                  {group.difficulty}
                                </Badge>
                              </div>
                              
                              {/* Stats */}
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  <span>{group.members.length}/{group.maxMembers} members</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{group.stats.totalMeetings} meetings</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <BarChart3 className="h-4 w-4" />
                                  <span>{group.stats.completionRate}% completion</span>
                                </div>
                              </div>

                              {/* Next Meeting */}
                              {group.nextMeeting && (
                                <div className="bg-blue-50 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-sm text-blue-900">Next Meeting</h4>
                                    <Button size="sm" onClick={(e) => { e.stopPropagation(); handleJoinMeeting(); }}>
                                      <Play className="h-3 w-3 mr-1" />
                                      Join
                                    </Button>
                                  </div>
                                  <p className="text-sm text-blue-800 mb-1">{group.nextMeeting.title}</p>
                                  <div className="flex items-center gap-2 text-xs text-blue-700">
                                    <Calendar className="h-3 w-3" />
                                    <span>{group.nextMeeting.date} at {group.nextMeeting.time}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Groups */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Available Study Groups
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableGroups.map((group) => (
                      <Card key={group.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm cursor-pointer" onClick={() => handleOpenGroup(group)}>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg text-gray-900 mb-2">{group.name}</h3>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{group.description}</p>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {group.tags.map((tag, index) => (
                                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <Badge className={`text-xs ${getDifficultyColor(group.difficulty)}`}>
                                {group.difficulty}
                              </Badge>
                            </div>
                            
                            {/* Organizer Info */}
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-xs">
                                  {group.organizer.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span>by {group.organizer.name}</span>
                              {group.organizer.isVerified && (
                                <CheckCircle className="h-3 w-3 text-blue-600" />
                              )}
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{group.members.length}/{group.maxMembers} members</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{group.stats.totalMeetings} meetings</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BarChart3 className="h-4 w-4" />
                                <span>{group.stats.averageAttendance} avg attendance</span>
                              </div>
                            </div>

                            <Button 
                              className="w-full" 
                              disabled={group.members.length >= group.maxMembers}
                              onClick={(e) => { e.stopPropagation(); handleJoinGroup(group.id); }}
                            >
                              {group.members.length >= group.maxMembers ? "Group Full" : "Join Group"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {filteredGroups.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Users className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Create Group Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Study Group</DialogTitle>
            <DialogDescription>
              Start a new study group and invite others to join
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Group Name</label>
              <Input
                placeholder="Enter group name..."
                value={newGroup.name}
                onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="Describe your study group..."
                className="min-h-[100px]"
                value={newGroup.description}
                onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={newGroup.category}
                  onChange={(e) => setNewGroup({...newGroup, category: e.target.value})}
                >
                  <option value="Programming">Programming</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Design">Design</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={newGroup.difficulty}
                  onChange={(e) => setNewGroup({...newGroup, difficulty: e.target.value})}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Max Members</label>
                <Input
                  type="number"
                  min="2"
                  max="50"
                  value={newGroup.maxMembers}
                  onChange={(e) => setNewGroup({...newGroup, maxMembers: parseInt(e.target.value)})}
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={newGroup.isPrivate}
                  onChange={(e) => setNewGroup({...newGroup, isPrivate: e.target.checked})}
                  className="rounded"
                />
                <label htmlFor="isPrivate" className="text-sm font-medium">Private Group</label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
              <Input
                placeholder="javascript, react, web-development"
                value={newGroup.tags}
                onChange={(e) => setNewGroup({...newGroup, tags: e.target.value})}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCreateGroup} className="flex-1">
                Create Group
              </Button>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Group Detail Modal */}
      <Dialog open={isGroupModalOpen} onOpenChange={setIsGroupModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedGroup && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <DialogTitle className="text-2xl">{selectedGroup.name}</DialogTitle>
                      {selectedGroup.isPrivate && (
                        <Lock className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">
                            {selectedGroup.organizer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span>Organized by {selectedGroup.organizer.name}</span>
                        {selectedGroup.organizer.isVerified && (
                          <CheckCircle className="h-3 w-3 text-blue-600" />
                        )}
                      </div>
                      <Badge variant="outline">{selectedGroup.category}</Badge>
                      <span>Created {selectedGroup.createdAt}</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="meetings">Meetings</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{selectedGroup.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedGroup.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-white text-gray-600 px-2 py-1 rounded border">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedGroup.stats.totalMeetings}</div>
                        <div className="text-sm text-gray-600">Total Meetings</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{selectedGroup.stats.averageAttendance}</div>
                        <div className="text-sm text-gray-600">Avg Attendance</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{selectedGroup.stats.completionRate}%</div>
                        <div className="text-sm text-gray-600">Completion Rate</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Next Meeting */}
                  {selectedGroup.nextMeeting && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Next Meeting
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium">{selectedGroup.nextMeeting.title}</h4>
                            <p className="text-sm text-gray-600">{selectedGroup.nextMeeting.description}</p>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{selectedGroup.nextMeeting.date} at {selectedGroup.nextMeeting.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{selectedGroup.nextMeeting.duration} minutes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{selectedGroup.nextMeeting.attendees}/{selectedGroup.nextMeeting.maxAttendees} attending</span>
                            </div>
                          </div>
                          <Button onClick={handleJoinMeeting} className="w-full">
                            <Play className="h-4 w-4 mr-2" />
                            Join Meeting
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="members" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Members ({selectedGroup.members.length}/{selectedGroup.maxMembers})</h3>
                    <Progress value={(selectedGroup.members.length / selectedGroup.maxMembers) * 100} className="w-32" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedGroup.members.map((member) => (
                      <Card key={member.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{member.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{member.name}</span>
                                {member.isVerified && (
                                  <CheckCircle className="h-3 w-3 text-blue-600" />
                                )}
                                {member.isOnline && (
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="capitalize">{member.role}</span>
                                <span>•</span>
                                <span>{formatNumber(member.reputation)} reputation</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="meetings" className="space-y-4">
                  <h3 className="text-lg font-semibold">Meeting History</h3>
                  
                  {selectedGroup.meetingHistory.length > 0 ? (
                    <div className="space-y-4">
                      {selectedGroup.meetingHistory.map((meeting) => (
                        <Card key={meeting.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{meeting.title}</h4>
                                <p className="text-sm text-gray-600">{meeting.description}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                                  <span>{meeting.date} at {meeting.time}</span>
                                  <span>{meeting.duration} minutes</span>
                                  <span>{meeting.attendees} attendees</span>
                                </div>
                              </div>
                              <Badge variant="outline">Completed</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No meeting history yet
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="resources" className="space-y-4">
                  <h3 className="text-lg font-semibold">Learning Resources</h3>
                  
                  {selectedGroup.resources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedGroup.resources.map((resource) => {
                        const IconComponent = getTypeIcon(resource.type);
                        return (
                          <Card key={resource.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <IconComponent className="h-5 w-5 text-blue-600" />
                                <div className="flex-1">
                                  <h4 className="font-medium">{resource.name}</h4>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>by {resource.uploadedBy}</span>
                                    <span>•</span>
                                    <span>{resource.uploadedAt}</span>
                                  </div>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No resources uploaded yet
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Groups;