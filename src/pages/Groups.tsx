import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Calendar, MapPin, Plus, Clock, BookOpen } from "lucide-react";

const Groups = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const studyGroups = [
    {
      id: 1,
      name: "JavaScript Fundamentals",
      description: "Weekly meetups to practice JavaScript concepts and solve coding challenges together",
      members: 24,
      maxMembers: 30,
      location: "Online",
      nextMeeting: "Tomorrow, 7:00 PM",
      category: "Programming",
      isJoined: true,
      difficulty: "Beginner",
      organizer: "Sarah Chen"
    },
    {
      id: 2,
      name: "React Advanced Patterns",
      description: "Deep dive into advanced React patterns, hooks, and performance optimization",
      members: 18,
      maxMembers: 20,
      location: "Online",
      nextMeeting: "Friday, 6:30 PM",
      category: "Web Development",
      isJoined: false,
      difficulty: "Advanced",
      organizer: "Mike Johnson"
    },
    {
      id: 3,
      name: "Data Science Study Circle",
      description: "Exploring data analysis, machine learning, and statistical concepts using Python",
      members: 15,
      maxMembers: 25,
      location: "Hybrid",
      nextMeeting: "Saturday, 2:00 PM",
      category: "Data Science",
      isJoined: true,
      difficulty: "Intermediate",
      organizer: "Dr. Emily Watson"
    },
    {
      id: 4,
      name: "UI/UX Design Workshop",
      description: "Collaborative design sessions focusing on user experience and interface design",
      members: 12,
      maxMembers: 15,
      location: "Online",
      nextMeeting: "Monday, 8:00 PM",
      category: "Design",
      isJoined: false,
      difficulty: "Beginner",
      organizer: "Emma Wilson"
    }
  ];

  const myGroups = studyGroups.filter(group => group.isJoined);
  const availableGroups = studyGroups.filter(group => !group.isJoined);

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Study Groups
                </h1>
                <p className="text-muted-foreground">
                  Join study groups and learn together with peers
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Group
              </Button>
            </div>

            {/* My Groups */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  My Study Groups
                  <Badge variant="secondary">{myGroups.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {myGroups.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {myGroups.map((group) => (
                      <Card key={group.id} className="border-primary/20">
                        <CardContent className="p-4 space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold">{group.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {group.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {group.description}
                            </p>
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{group.members}/{group.maxMembers} members</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{group.nextMeeting}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{group.location}</span>
                            </div>
                          </div>
                          
                          <Button variant="outline" className="w-full">
                            View Group
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    You haven't joined any study groups yet. Browse available groups below!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Available Groups */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Available Study Groups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableGroups.map((group) => (
                    <Card key={group.id} className="hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4 space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold">{group.name}</h3>
                            <Badge 
                              variant={group.difficulty === "Beginner" ? "default" : 
                                     group.difficulty === "Intermediate" ? "secondary" : "destructive"}
                              className="text-xs"
                            >
                              {group.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {group.description}
                          </p>
                          <Badge variant="outline" className="text-xs w-fit">
                            {group.category}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{group.members}/{group.maxMembers} members</span>
                            </div>
                            <span className="text-xs">by {group.organizer}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{group.nextMeeting}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{group.location}</span>
                          </div>
                        </div>
                        
                        <Button className="w-full" disabled={group.members >= group.maxMembers}>
                          {group.members >= group.maxMembers ? "Group Full" : "Join Group"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Groups;