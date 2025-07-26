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
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Users, 
  Pin, 
  TrendingUp, 
  Plus, 
  Search,
  Filter,
  Clock,
  Eye,
  Share2,
  Bookmark,
  Flag,
  Edit,
  Trash2,
  Reply,
  MoreHorizontal,
  Award,
  Star,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Calendar,
  User,
  Hash,
  ArrowUp,
  ArrowDown,
  X
} from "lucide-react";

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
    isVerified: boolean;
  };
  category: string;
  tags: string[];
  replies: Reply[];
  upvotes: number;
  downvotes: number;
  views: number;
  isPinned: boolean;
  isSolved: boolean;
  createdAt: string;
  lastActivity: string;
  userVote?: 'up' | 'down' | null;
  isBookmarked?: boolean;
}

interface Reply {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
    isVerified: boolean;
  };
  upvotes: number;
  downvotes: number;
  createdAt: string;
  isAccepted: boolean;
  userVote?: 'up' | 'down' | null;
}

const Discussion = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [sortBy, setSortBy] = useState("recent");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: "General",
    tags: ""
  });
  const [newReply, setNewReply] = useState("");

  const discussions: Discussion[] = [
    {
      id: "1",
      title: "Best practices for React state management",
      content: "I'm working on a medium-sized React application and I'm trying to decide between using Context API and Redux for state management. What are your thoughts on when to use each approach? I'm particularly interested in performance implications and developer experience.",
      author: {
        name: "Sarah Chen",
        avatar: "SC",
        reputation: 1250,
        isVerified: true
      },
      category: "React",
      tags: ["react", "state-management", "redux", "context"],
      replies: [
        {
          id: "1-1",
          content: "For medium-sized apps, I'd recommend starting with Context API. It's built into React and doesn't add bundle size. Redux is great for larger apps with complex state interactions.",
          author: {
            name: "Mike Johnson",
            avatar: "MJ",
            reputation: 890,
            isVerified: false
          },
          upvotes: 45,
          downvotes: 2,
          createdAt: "2 hours ago",
          isAccepted: false
        },
        {
          id: "1-2",
          content: "I agree with Mike. Context API is perfect for medium apps. Redux adds complexity that you might not need. Start simple and scale up when necessary.",
          author: {
            name: "Emma Wilson",
            avatar: "EW",
            reputation: 1560,
            isVerified: true
          },
          upvotes: 32,
          downvotes: 1,
          createdAt: "1 hour ago",
          isAccepted: true
        }
      ],
      upvotes: 156,
      downvotes: 8,
      views: 1247,
      isPinned: true,
      isSolved: true,
      createdAt: "3 days ago",
      lastActivity: "1 hour ago"
    },
    {
      id: "2",
      title: "JavaScript async/await vs Promises",
      content: "Can someone explain when to use async/await versus traditional promise chains? I'm confused about the performance differences and when each approach is more appropriate.",
      author: {
        name: "Mike Johnson",
        avatar: "MJ",
        reputation: 890,
        isVerified: false
      },
      category: "JavaScript",
      tags: ["javascript", "async", "promises", "es6"],
      replies: [
        {
          id: "2-1",
          content: "Async/await is generally more readable and easier to debug. It's syntactic sugar over promises, so there's no performance difference. Use async/await for sequential operations and promises for parallel operations.",
          author: {
            name: "Dr. Alex Rodriguez",
            avatar: "AR",
            reputation: 2100,
            isVerified: true
          },
          upvotes: 67,
          downvotes: 3,
          createdAt: "4 hours ago",
          isAccepted: false
        }
      ],
      upvotes: 89,
      downvotes: 5,
      views: 892,
      isPinned: false,
      isSolved: false,
      createdAt: "1 day ago",
      lastActivity: "4 hours ago"
    },
    {
      id: "3",
      title: "CSS Grid vs Flexbox - When to use what?",
      content: "I'm always confused about when to use CSS Grid versus Flexbox. Are there any clear guidelines or rules of thumb for choosing between them?",
      author: {
        name: "Emma Wilson",
        avatar: "EW",
        reputation: 1560,
        isVerified: true
      },
      category: "CSS",
      tags: ["css", "grid", "flexbox", "layout"],
      replies: [
        {
          id: "3-1",
          content: "Use Flexbox for 1D layouts (rows OR columns) and Grid for 2D layouts (rows AND columns). Flexbox is great for navigation, cards, and components. Grid is perfect for page layouts and complex arrangements.",
          author: {
            name: "Lisa Wang",
            avatar: "LW",
            reputation: 980,
            isVerified: false
          },
          upvotes: 89,
          downvotes: 1,
          createdAt: "6 hours ago",
          isAccepted: true
        }
      ],
      upvotes: 203,
      downvotes: 12,
      views: 1567,
      isPinned: false,
      isSolved: true,
      createdAt: "2 days ago",
      lastActivity: "6 hours ago"
    },
    {
      id: "4",
      title: "Python data analysis libraries comparison",
      content: "I'm comparing pandas, NumPy, and Polars for data analysis workflows. What are the pros and cons of each, and when should I use which one?",
      author: {
        name: "Dr. Alex Rodriguez",
        avatar: "AR",
        reputation: 2100,
        isVerified: true
      },
      category: "Python",
      tags: ["python", "pandas", "numpy", "polars", "data-analysis"],
      replies: [
        {
          id: "4-1",
          content: "Pandas is the most mature and has the best ecosystem. NumPy is faster for numerical operations. Polars is the newest and fastest, but has a smaller community. Start with pandas, use NumPy for performance-critical operations, and consider Polars for large datasets.",
          author: {
            name: "David Brown",
            avatar: "DB",
            reputation: 1450,
            isVerified: true
          },
          upvotes: 56,
          downvotes: 2,
          createdAt: "1 day ago",
          isAccepted: false
        }
      ],
      upvotes: 67,
      downvotes: 3,
      views: 734,
      isPinned: false,
      isSolved: false,
      createdAt: "3 days ago",
      lastActivity: "1 day ago"
    }
  ];

  const categories = [
    { name: "All Topics", count: discussions.length, icon: MessageSquare },
    { name: "React", count: discussions.filter(d => d.category === "React").length, icon: TrendingUp },
    { name: "JavaScript", count: discussions.filter(d => d.category === "JavaScript").length, icon: Hash },
    { name: "Python", count: discussions.filter(d => d.category === "Python").length, icon: Hash },
    { name: "CSS", count: discussions.filter(d => d.category === "CSS").length, icon: Hash },
    { name: "General", count: discussions.filter(d => d.category === "General").length, icon: MessageSquare }
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Filter and sort discussions
  const filteredDiscussions = discussions
    .filter(discussion => {
      const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "All Topics" || discussion.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        case "popular":
          return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        case "views":
          return b.views - a.views;
        case "replies":
          return b.replies.length - a.replies.length;
        default:
          return 0;
      }
    });

  const handleVote = (discussionId: string, voteType: 'up' | 'down') => {
    // In a real app, this would make an API call
    console.log(`Voting ${voteType} on discussion ${discussionId}`);
  };

  const handleReplyVote = (discussionId: string, replyId: string, voteType: 'up' | 'down') => {
    // In a real app, this would make an API call
    console.log(`Voting ${voteType} on reply ${replyId} in discussion ${discussionId}`);
  };

  const handleCreateDiscussion = () => {
    // In a real app, this would make an API call
    console.log("Creating new discussion:", newDiscussion);
    setIsCreateModalOpen(false);
    setNewDiscussion({ title: "", content: "", category: "General", tags: "" });
  };

  const handleAddReply = () => {
    if (!selectedDiscussion || !newReply.trim()) return;
    
    // In a real app, this would make an API call
    console.log("Adding reply to discussion:", selectedDiscussion.id, newReply);
    setNewReply("");
  };

  const handleOpenDiscussion = (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
    setIsDiscussionModalOpen(true);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getVoteColor = (voteType: 'up' | 'down' | null, userVote?: 'up' | 'down' | null) => {
    if (userVote === voteType) return "text-blue-600";
    return "text-gray-400 hover:text-gray-600";
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
                    Discussion Forum
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    Connect, ask questions, and share knowledge with the community
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{discussions.length} active discussions</span>
                  </div>
                  <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Discussion
                  </Button>
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search discussions, tags, or content..." 
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
                  <option value="views">Most Viewed</option>
                  <option value="replies">Most Replies</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Categories */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
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
                      <span className="text-gray-600">Total Discussions</span>
                      <span className="font-medium">{discussions.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Replies</span>
                      <span className="font-medium">{discussions.reduce((sum, d) => sum + d.replies.length, 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Solved Issues</span>
                      <span className="font-medium">{discussions.filter(d => d.isSolved).length}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Discussions List */}
              <div className="lg:col-span-3 space-y-4">
                {filteredDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm cursor-pointer" onClick={() => handleOpenDiscussion(discussion)}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Voting */}
                        <div className="flex flex-col items-center gap-1">
                          <button 
                            className={`p-1 rounded hover:bg-gray-100 ${getVoteColor('up', discussion.userVote)}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(discussion.id, 'up');
                            }}
                          >
                            <ArrowUp className="h-5 w-5" />
                          </button>
                          <span className="text-sm font-medium text-gray-700">
                            {discussion.upvotes - discussion.downvotes}
                          </span>
                          <button 
                            className={`p-1 rounded hover:bg-gray-100 ${getVoteColor('down', discussion.userVote)}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(discussion.id, 'down');
                            }}
                          >
                            <ArrowDown className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors">
                                  {discussion.title}
                                </h3>
                                {discussion.isPinned && (
                                  <Pin className="h-4 w-4 text-blue-600" />
                                )}
                                {discussion.isSolved && (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                {discussion.content}
                              </p>
                              
                              {/* Tags */}
                              <div className="flex flex-wrap gap-1 mb-3">
                                {discussion.tags.map((tag, index) => (
                                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    #{tag}
                                  </span>
                                ))}
                              </div>

                              {/* Meta Info */}
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Avatar className="h-5 w-5">
                                    <AvatarFallback className="text-xs">
                                      {discussion.author.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{discussion.author.name}</span>
                                  {discussion.author.isVerified && (
                                    <CheckCircle className="h-3 w-3 text-blue-600" />
                                  )}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {discussion.category}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {discussion.lastActivity}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Stats */}
                          <div className="flex items-center gap-6 text-sm text-gray-500 pt-2 border-t">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{discussion.replies.length} replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{formatNumber(discussion.views)} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{formatNumber(discussion.upvotes)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredDiscussions.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <MessageSquare className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Create Discussion Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Discussion</DialogTitle>
            <DialogDescription>
              Share your question or start a conversation with the community
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                placeholder="What's your question or topic?"
                value={newDiscussion.title}
                onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={newDiscussion.category}
                onChange={(e) => setNewDiscussion({...newDiscussion, category: e.target.value})}
              >
                <option value="General">General</option>
                <option value="React">React</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="CSS">CSS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <Textarea
                placeholder="Describe your question or topic in detail..."
                className="min-h-[200px]"
                value={newDiscussion.content}
                onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
              <Input
                placeholder="react, state-management, hooks"
                value={newDiscussion.tags}
                onChange={(e) => setNewDiscussion({...newDiscussion, tags: e.target.value})}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCreateDiscussion} className="flex-1">
                Create Discussion
              </Button>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Discussion Detail Modal */}
      <Dialog open={isDiscussionModalOpen} onOpenChange={setIsDiscussionModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedDiscussion && (
            <div className="space-y-6">
              <DialogHeader>
                                   <div className="flex items-center gap-2 mb-2">
                     <DialogTitle className="text-xl">{selectedDiscussion.title}</DialogTitle>
                     {selectedDiscussion.isPinned && (
                       <Pin className="h-4 w-4 text-blue-600" />
                     )}
                     {selectedDiscussion.isSolved && (
                       <CheckCircle className="h-4 w-4 text-green-600" />
                     )}
                   </div>
                   <div className="flex items-center gap-4 text-sm text-gray-500">
                     <div className="flex items-center gap-1">
                       <Avatar className="h-5 w-5">
                         <AvatarFallback className="text-xs">
                           {selectedDiscussion.author.avatar}
                         </AvatarFallback>
                       </Avatar>
                       <span>{selectedDiscussion.author.name}</span>
                       {selectedDiscussion.author.isVerified && (
                         <CheckCircle className="h-3 w-3 text-blue-600" />
                       )}
                     </div>
                     <Badge variant="outline">{selectedDiscussion.category}</Badge>
                     <span>{selectedDiscussion.createdAt}</span>
                   </div>
              </DialogHeader>

              {/* Discussion Content */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">{selectedDiscussion.content}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedDiscussion.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-white text-gray-600 px-2 py-1 rounded border">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Replies */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Replies ({selectedDiscussion.replies.length})</h3>
                
                {selectedDiscussion.replies.map((reply) => (
                  <div key={reply.id} className="border rounded-lg p-4">
                    <div className="flex gap-4">
                      {/* Voting */}
                      <div className="flex flex-col items-center gap-1">
                        <button className={`p-1 rounded hover:bg-gray-100 ${getVoteColor('up', reply.userVote)}`}>
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-medium text-gray-700">
                          {reply.upvotes - reply.downvotes}
                        </span>
                        <button className={`p-1 rounded hover:bg-gray-100 ${getVoteColor('down', reply.userVote)}`}>
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {reply.author.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{reply.author.name}</span>
                          {reply.author.isVerified && (
                            <CheckCircle className="h-3 w-3 text-blue-600" />
                          )}
                          {reply.isAccepted && (
                            <Badge className="text-xs bg-green-100 text-green-800">
                              Accepted Answer
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{reply.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Reply */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Add Your Reply</h4>
                  <Textarea
                    placeholder="Share your thoughts or provide an answer..."
                    className="min-h-[100px] mb-3"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <Button onClick={handleAddReply} disabled={!newReply.trim()}>
                      Post Reply
                    </Button>
                    <Button variant="outline" onClick={() => setNewReply("")}>
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Discussion;