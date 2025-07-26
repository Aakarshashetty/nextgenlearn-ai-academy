import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/useUser";
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  BookOpen, 
  Users, 
  Clock, 
  Award,
  Search,
  Filter,
  TrendingUp,
  Crown,
  Sparkles,
  Medal,
  Flame,
  Brain,
  Heart,
  Shield,
  Gem,
  Diamond,
  ChevronRight,
  Eye,
  Share2,
  Download,
  Calendar,
  BarChart3
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  points: number;
  earnedDate?: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
  progress?: number;
  requirement?: string;
  isEarned: boolean;
  totalSteps?: number;
  currentSteps?: number;
  timeToEarn?: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
}

const Achievements = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedRarity, setSelectedRarity] = useState("All Rarities");
  const [activeTab, setActiveTab] = useState("overview");

  // Use Redux user state
  const { achievements: userAchievements, stats } = useUser();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Local achievements data (fallback if Redux state is empty)
  const localAchievements: Achievement[] = [
    {
      id: "1",
      title: "First Steps",
      description: "Complete your first course and begin your learning journey",
      icon: BookOpen,
      category: "Learning",
      points: 100,
      earnedDate: "2 weeks ago",
      rarity: "Common",
      isEarned: true,
      difficulty: "Easy"
    },
    {
      id: "2",
      title: "Streak Master",
      description: "Maintain a consistent study habit for 7 consecutive days",
      icon: Flame,
      category: "Consistency",
      points: 250,
      earnedDate: "1 week ago",
      rarity: "Uncommon",
      isEarned: true,
      difficulty: "Medium"
    },
    {
      id: "3",
      title: "Code Warrior",
      description: "Complete 10 coding challenges and prove your programming skills",
      icon: Zap,
      category: "Practice",
      points: 300,
      earnedDate: "3 days ago",
      rarity: "Rare",
      isEarned: true,
      difficulty: "Hard"
    },
    {
      id: "4",
      title: "Community Helper",
      description: "Help 5 fellow learners by answering questions in discussions",
      icon: Users,
      category: "Community",
      points: 200,
      earnedDate: "1 day ago",
      rarity: "Uncommon",
      isEarned: true,
      difficulty: "Medium"
    },
    {
      id: "5",
      title: "Speed Learner",
      description: "Complete a course in under 24 hours",
      icon: Clock,
      category: "Speed",
      points: 400,
      rarity: "Epic",
      progress: 75,
      requirement: "Complete 1 course quickly",
      isEarned: false,
      totalSteps: 1,
      currentSteps: 0,
      timeToEarn: "~2 hours",
      difficulty: "Hard"
    },
    {
      id: "6",
      title: "Knowledge Seeker",
      description: "Complete courses from 5 different categories",
      icon: Brain,
      category: "Exploration",
      points: 500,
      rarity: "Epic",
      progress: 60,
      requirement: "3/5 categories completed",
      isEarned: false,
      totalSteps: 5,
      currentSteps: 3,
      timeToEarn: "~2 weeks",
      difficulty: "Medium"
    },
    {
      id: "7",
      title: "Master Learner",
      description: "Earn 1000 total XP points through various activities",
      icon: Crown,
      category: "Mastery",
      points: 1000,
      rarity: "Legendary",
      progress: 85,
      requirement: "850/1000 XP",
      isEarned: false,
      totalSteps: 1000,
      currentSteps: 850,
      timeToEarn: "~1 month",
      difficulty: "Expert"
    },
    {
      id: "8",
      title: "Perfect Score",
      description: "Achieve 100% on any course assessment",
      icon: Gem,
      category: "Excellence",
      points: 600,
      rarity: "Epic",
      progress: 0,
      requirement: "Get perfect score on any quiz",
      isEarned: false,
      totalSteps: 1,
      currentSteps: 0,
      timeToEarn: "~1 week",
      difficulty: "Hard"
    },
    {
      id: "9",
      title: "Mentor",
      description: "Help 20 learners by providing valuable answers",
      icon: Heart,
      category: "Community",
      points: 350,
      rarity: "Rare",
      progress: 45,
      requirement: "9/20 helpful answers",
      isEarned: false,
      totalSteps: 20,
      currentSteps: 9,
      timeToEarn: "~3 weeks",
      difficulty: "Medium"
    },
    {
      id: "10",
      title: "Study Champion",
      description: "Complete 50 study sessions",
      icon: Shield,
      category: "Consistency",
      points: 450,
      rarity: "Rare",
      progress: 30,
      requirement: "15/50 sessions completed",
      isEarned: false,
      totalSteps: 50,
      currentSteps: 15,
      timeToEarn: "~2 months",
      difficulty: "Hard"
    }
  ];

  // Use Redux achievements or fallback to local data
  const achievements = userAchievements.length > 0 ? userAchievements : localAchievements;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "BookOpen": return BookOpen;
      case "Flame": return Flame;
      case "Zap": return Zap;
      case "Users": return Users;
      case "Clock": return Clock;
      case "Brain": return Brain;
      case "Crown": return Crown;
      case "Gem": return Gem;
      case "Heart": return Heart;
      case "Shield": return Shield;
      case "Trophy": return Trophy;
      case "Target": return Target;
      case "TrendingUp": return TrendingUp;
      case "Sparkles": return Sparkles;
      case "Medal": return Medal;
      case "Diamond": return Diamond;
      default: return Star;
    }
  };

  // Convert icon strings to components for Redux achievements
  const achievementsWithIcons = achievements.map(achievement => ({
    ...achievement,
    icon: typeof achievement.icon === 'string' ? getIconComponent(achievement.icon) : achievement.icon
  }));

  const categories = [
    { name: "All Categories", count: achievementsWithIcons.length, icon: Trophy },
    { name: "Learning", count: achievementsWithIcons.filter(a => a.category === "Learning").length, icon: BookOpen },
    { name: "Consistency", count: achievementsWithIcons.filter(a => a.category === "Consistency").length, icon: Flame },
    { name: "Practice", count: achievementsWithIcons.filter(a => a.category === "Practice").length, icon: Zap },
    { name: "Community", count: achievementsWithIcons.filter(a => a.category === "Community").length, icon: Users },
    { name: "Speed", count: achievementsWithIcons.filter(a => a.category === "Speed").length, icon: Clock },
    { name: "Exploration", count: achievementsWithIcons.filter(a => a.category === "Exploration").length, icon: Brain },
    { name: "Mastery", count: achievementsWithIcons.filter(a => a.category === "Mastery").length, icon: Crown },
    { name: "Excellence", count: achievementsWithIcons.filter(a => a.category === "Excellence").length, icon: Gem }
  ];

  const rarities = [
    { name: "All Rarities", count: achievementsWithIcons.length },
    { name: "Common", count: achievementsWithIcons.filter(a => a.rarity === "Common").length },
    { name: "Uncommon", count: achievementsWithIcons.filter(a => a.rarity === "Uncommon").length },
    { name: "Rare", count: achievementsWithIcons.filter(a => a.rarity === "Rare").length },
    { name: "Epic", count: achievementsWithIcons.filter(a => a.rarity === "Epic").length },
    { name: "Legendary", count: achievementsWithIcons.filter(a => a.rarity === "Legendary").length }
  ];

  // Filter and sort achievements
  const filteredAchievements = achievementsWithIcons
    .filter(achievement => {
      const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All Categories" || achievement.category === selectedCategory;
      const matchesRarity = selectedRarity === "All Rarities" || achievement.rarity === selectedRarity;
      return matchesSearch && matchesCategory && matchesRarity;
    })
    .sort((a, b) => {
      // Sort by earned first, then by rarity, then by points
      if (a.isEarned !== b.isEarned) return b.isEarned ? 1 : -1;
      const rarityOrder = { "Legendary": 5, "Epic": 4, "Rare": 3, "Uncommon": 2, "Common": 1 };
      if (rarityOrder[a.rarity] !== rarityOrder[b.rarity]) return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      return b.points - a.points;
    });

  const earnedAchievements = filteredAchievements.filter(a => a.isEarned);
  const progressAchievements = filteredAchievements.filter(a => !a.isEarned);

  // Use Redux stats or calculate from achievements
  const totalXP = stats.totalXP || achievementsWithIcons.reduce((sum, a) => sum + (a.isEarned ? a.points : 0), 0);
  const totalPossibleXP = stats.totalPossibleXP || achievementsWithIcons.reduce((sum, a) => sum + a.points, 0);
  const completionRate = stats.completionRate || Math.round((earnedAchievements.length / achievementsWithIcons.length) * 100);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-gray-100 text-gray-800 border-gray-200";
      case "Uncommon": return "bg-green-100 text-green-800 border-green-200";
      case "Rare": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Epic": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Legendary": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-orange-100 text-orange-700";
      case "Expert": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "Common": return Star;
      case "Uncommon": return Medal;
      case "Rare": return Gem;
      case "Epic": return Diamond;
      case "Legendary": return Crown;
      default: return Star;
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
                    Achievements
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    Track your progress and celebrate your learning milestones
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Trophy className="h-4 w-4" />
                    <span>{earnedAchievements.length}/{achievements.length} earned</span>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Progress
                  </Button>
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search achievements..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="border rounded-lg px-3 py-2 text-sm bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                <select
                  className="border rounded-lg px-3 py-2 text-sm bg-white"
                  value={selectedRarity}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                >
                  {rarities.map((rarity) => (
                    <option key={rarity.name} value={rarity.name}>
                      {rarity.name} ({rarity.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Stats */}
              <div className="lg:col-span-1 space-y-6">
                {/* Overall Stats */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total XP Earned</span>
                        <span className="font-medium">{totalXP.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Possible XP</span>
                        <span className="font-medium">{totalPossibleXP.toLocaleString()}</span>
                      </div>
                      <Progress value={(totalXP / totalPossibleXP) * 100} className="h-2" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Completion Rate</span>
                        <span className="font-medium">{Math.round(completionRate)}%</span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Rarity Breakdown */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Rarity Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {rarities.slice(1).map((rarity) => {
                      const earned = achievementsWithIcons.filter(a => a.rarity === rarity.name && a.isEarned).length;
                      const total = rarity.count;
                      const IconComponent = getRarityIcon(rarity.name);
                      return (
                        <div key={rarity.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            <span className="text-sm">{rarity.name}</span>
                          </div>
                          <span className="text-sm font-medium">{earned}/{total}</span>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {earnedAchievements.slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getRarityColor(achievement.rarity)}`}>
                          <achievement.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{achievement.title}</p>
                          <p className="text-xs text-gray-500">{achievement.earnedDate}</p>
                        </div>
                        <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                          {achievement.points} XP
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="earned">Earned ({earnedAchievements.length})</TabsTrigger>
                    <TabsTrigger value="progress">In Progress ({progressAchievements.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full bg-blue-100">
                              <Star className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">{totalXP.toLocaleString()}</div>
                              <div className="text-sm text-gray-600">Total XP</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full bg-green-100">
                              <Trophy className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">{earnedAchievements.length}</div>
                              <div className="text-sm text-gray-600">Achievements</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full bg-purple-100">
                              <Target className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">Level {Math.floor(totalXP / 100) + 1}</div>
                              <div className="text-sm text-gray-600">Current Level</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full bg-yellow-100">
                              <TrendingUp className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">#{Math.floor(Math.random() * 1000) + 1}</div>
                              <div className="text-sm text-gray-600">Global Rank</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Featured Achievements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Crown className="h-5 w-5 text-yellow-600" />
                            Latest Achievement
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {earnedAchievements.length > 0 && earnedAchievements[0] ? (
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-full ${getRarityColor(earnedAchievements[0].rarity)}`}>
                                  {(() => {
                                    const IconComponent = earnedAchievements[0].icon;
                                    return <IconComponent className="h-6 w-6" />;
                                  })()}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold">{earnedAchievements[0].title}</h3>
                                  <p className="text-sm text-gray-600">{earnedAchievements[0].description}</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge className={`text-xs ${getRarityColor(earnedAchievements[0].rarity)}`}>{earnedAchievements[0].rarity}</Badge>
                                <span className="text-sm text-gray-500">{earnedAchievements[0].earnedDate}</span>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center py-4">No achievements earned yet</p>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-600" />
                            Next Goal
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {progressAchievements.length > 0 && progressAchievements[0] ? (
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-full ${getRarityColor(progressAchievements[0].rarity)}`}>
                                  {(() => {
                                    const IconComponent = progressAchievements[0].icon;
                                    return <IconComponent className="h-6 w-6" />;
                                  })()}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold">{progressAchievements[0].title}</h3>
                                  <p className="text-sm text-gray-600">{progressAchievements[0].description}</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Progress</span>
                                  <span className="font-medium">{(progressAchievements[0] as Achievement).progress ?? 0}%</span>
                                </div>
                                <Progress value={(progressAchievements[0] as Achievement).progress ?? 0} className="h-2" />
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center py-4">All achievements completed!</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="earned" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {earnedAchievements.map((achievement) => {
                        const IconComponent = achievement.icon;
                        return (
                          <Card key={achievement.id} className={`border-2 ${getRarityColor(achievement.rarity)} hover:shadow-lg transition-all duration-300 cursor-pointer`}>
                            <CardContent className="p-6 text-center space-y-4">
                              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                                <IconComponent className="h-8 w-8 text-white" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="font-semibold text-lg">{achievement.title}</h3>
                                <p className="text-sm text-gray-600">{achievement.description}</p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                  <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                    {achievement.rarity}
                                  </Badge>
                                  <Badge className="text-xs bg-blue-100 text-blue-800">
                                    {achievement.points} XP
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-500">Earned {achievement.earnedDate}</p>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="progress" className="space-y-4">
                    <div className="space-y-4">
                      {progressAchievements.map((achievement) => {
                        const IconComponent = achievement.icon;
                        return (
                          <Card key={achievement.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <div className={`p-4 rounded-full ${getRarityColor(achievement.rarity)}`}>
                                  <IconComponent className="h-8 w-8" />
                                </div>
                                <div className="flex-1 space-y-3">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-semibold text-lg">{achievement.title}</h3>
                                        <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                          {achievement.rarity}
                                        </Badge>
                                        <Badge className={`text-xs ${getDifficultyColor(achievement.difficulty)}`}>
                                          {achievement.difficulty}
                                        </Badge>
                                      </div>
                                      <p className="text-gray-600 mb-2">{achievement.description}</p>
                                      <p className="text-sm text-gray-500">{(achievement as Achievement).requirement ?? ""}</p>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-blue-600">{achievement.points}</div>
                                      <div className="text-sm text-gray-500">XP</div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Progress</span>
                                      <span className="font-medium">{(achievement as Achievement).progress ?? 0}%</span>
                                    </div>
                                    <Progress value={(achievement as Achievement).progress ?? 0} className="h-3" />
                                  </div>
                                  
                                  <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>Estimated time: {achievement.timeToEarn}</span>
                                    <span>{achievement.currentSteps}/{achievement.totalSteps} steps</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Achievements;