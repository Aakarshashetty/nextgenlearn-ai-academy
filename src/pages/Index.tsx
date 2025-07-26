import { useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Target,
  TrendingUp,
  Users,
  Brain,
  Zap,
  Calendar,
  Plus,
  ArrowRight
} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addScheduledSession } from '../store';
import { courseCatalog } from '../data/courses';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '60',
    course: 'none',
    notes: ''
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recommendedSectionRef = useRef<HTMLDivElement>(null);
  const scheduledSessions = useSelector((state: RootState) => state.scheduledSessions.sessions);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Handle Start New Course - scroll to recommended section
  const handleStartNewCourse = () => {
    recommendedSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Handle Ask AI Tutor - navigate to AI tutor page
  const handleAskAITutor = () => {
    navigate('/ai-tutor');
  };

  // Handle Schedule Study Time - open modal
  const handleScheduleStudyTime = () => {
    setIsScheduleModalOpen(true);
  };

  // Handle schedule form submission
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!scheduleData.title || !scheduleData.date || !scheduleData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Add to Redux store
    dispatch(addScheduledSession({
      title: scheduleData.title,
      date: scheduleData.date,
      time: scheduleData.time,
      duration: scheduleData.duration,
      course: scheduleData.course === 'none' ? '' : scheduleData.course,
      notes: scheduleData.notes,
    }));

    // Show success message
    toast.success("Study session scheduled successfully!", {
      description: `${scheduleData.title} on ${scheduleData.date} at ${scheduleData.time}`
    });

    // Reset form and close modal
    setScheduleData({
      title: '',
      date: '',
      time: '',
      duration: '60',
      course: 'none',
      notes: ''
    });
    setIsScheduleModalOpen(false);
  };

  // Get current date for date input min value
  const today = new Date().toISOString().split('T')[0];

  const enrolledCourses = useSelector((state: RootState) => state.userCourses.enrolled);
  const enrolledTitles = new Set(enrolledCourses.map(c => c.title));
  const recommendedCourses = courseCatalog.filter(c => !enrolledTitles.has(c.title));

  // Get upcoming sessions for display
  const upcomingSessions = scheduledSessions
    .filter(session => !session.completed)
    .sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime())
    .slice(0, 3);

  const statsData = [
    {
      title: "Courses in Progress",
      value: enrolledCourses.length.toString(),
      icon: BookOpen,
      description: "Active courses",
      trend: { value: 15, isPositive: true }
    },
    {
      title: "Study Streak",
      value: "12 days",
      icon: Target,
      description: "Personal best!",
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Scheduled Sessions",
      value: scheduledSessions.filter(s => !s.completed).length.toString(),
      icon: Calendar,
      description: "Upcoming",
      trend: { value: scheduledSessions.length > 0 ? 10 : 0, isPositive: true }
    },
    {
      title: "Study Time",
      value: "24h",
      icon: Clock,
      description: "This month",
      trend: { value: 25, isPositive: true }
    }
  ];


  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="flex h-full w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 h-full overflow-y-auto">
          <Header 
            onMenuClick={toggleSidebar}
            isDarkMode={isDarkMode}
            onThemeToggle={toggleTheme}
          />
          
          <main className="container mx-auto px-4 py-6 space-y-8">
            {/* Welcome Section */}
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      Welcome back, Alex! 👋
                    </h1>
                    <Badge variant="secondary" className="animate-pulse hidden sm:flex">
                      <Brain className="h-3 w-3 mr-1" />
                      AI Ready
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Continue your learning journey. You're doing great!
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>{enrolledCourses.length} courses in progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Last active: Today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 animate-slide-up">
              <Button variant="gradient" className="gap-2" onClick={handleStartNewCourse}>
                <Plus className="h-4 w-4" />
                Start New Course
              </Button>
              <Button 
                variant="outline" 
                className="gap-2" 
                onClick={handleScheduleStudyTime}
              >
                <Calendar className="h-4 w-4" />
                Schedule Study Time
              </Button>
              <Button variant="outline" className="gap-2" onClick={handleAskAITutor}>
                <Brain className="h-4 w-4" />
                Ask AI Tutor
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-scale-in">
              {statsData.map((stat, index) => (
                <StatsCard
                  key={stat.title}
                  {...stat}
                  // className={`opacity-0 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Courses */}
              <div className="lg:col-span-2 space-y-6">
                {/* Continue Learning Section */}
                <Card className="animate-slide-up">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Continue Learning
                      <Badge variant="outline" className="ml-2">{enrolledCourses.length} Active</Badge>
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:bg-primary/10"
                      onClick={() => navigate('/courses')}
                    >
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-4">
                      Pick up where you left off
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {enrolledCourses.length === 0 ? (
                        <div className="col-span-full text-center text-muted-foreground py-8">
                          You have no active courses.<br />
                          <Link to="/courses">
                            <Button variant="gradient" className="mt-4">Start a new course</Button>
                          </Link>
                        </div>
                      ) : (
                        enrolledCourses.map((course, index) => {
                          const fullCourse = courseCatalog.find(c => c.title === course.title) || course;
                          return (
                            <CourseCard
                              key={fullCourse.title}
                              title={fullCourse.title}
                              instructor={fullCourse.instructor || ''}
                              duration={fullCourse.duration || ''}
                              students={fullCourse.students || 0}
                              rating={fullCourse.rating || 0}
                              progress={fullCourse.progress || 0}
                              thumbnail={fullCourse.thumbnail || ''}
                              level={fullCourse.level || 'Beginner'}
                              category={fullCourse.category || ''}
                              nextLesson={fullCourse.nextLesson || ''}
                              // className={`opacity-0 animate-fade-in hover:shadow-lg transition-all duration-300`}
                              style={{ animationDelay: `${(index + 1) * 200}ms` }}
                            />
                          );
                        })
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommended Section */}
                <Card className="animate-slide-up" ref={recommendedSectionRef}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-accent" />
                      Recommended for You
                      <Badge variant="secondary" className="bg-accent/10 text-accent">AI Picked</Badge>
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:bg-accent/10"
                      onClick={() => navigate('/courses')}
                    >
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      Based on your learning patterns and goals
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {recommendedCourses.length === 0 ? (
                        <div className="col-span-full text-center text-muted-foreground py-8">
                          No recommendations available. You're all caught up!
                        </div>
                      ) : (
                        recommendedCourses.map((course, index) => (
                          <CourseCard
                            key={course.title}
                            {...course}
                            // className={`opacity-0 animate-fade-in hover:shadow-lg transition-all duration-300`}
                            style={{ animationDelay: `${(index + 3) * 200}ms` }}
                          />
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Activity & Community */}
              <div className="space-y-6">
                <RecentActivity />
                
                {/* Study Goal */}
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="h-5 w-5 text-success" />
                      Weekly Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">4/7</div>
                      <p className="text-sm text-muted-foreground">days completed</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-success h-2 rounded-full" style={{ width: '57%' }}></div>
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                      Great progress! Keep it up to reach your goal.
                    </p>
                  </CardContent>
                </Card>

                {/* Upcoming Study Sessions */}
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                      Upcoming Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingSessions.length === 0 ? (
                      <div className="text-center text-muted-foreground py-4">
                        <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No upcoming sessions</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={handleScheduleStudyTime}
                        >
                          Schedule One
                        </Button>
                      </div>
                    ) : (
                      upcomingSessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{session.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(session.date).toLocaleDateString()} at {session.time}
                            </p>
                            {session.course && (
                              <p className="text-xs text-muted-foreground">{session.course}</p>
                            )}
                          </div>
                          <Badge variant="secondary" className="ml-2">
                            {session.duration}m
                          </Badge>
                        </div>
                      ))
                    )}
                    {upcomingSessions.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={handleScheduleStudyTime}
                      >
                        Schedule More
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Community Highlights */}
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-info" />
                      Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Study Groups</span>
                      <Badge variant="secondary">5 online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New Discussions</span>
                      <Badge variant="secondary">12 today</Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate('/discussion')}
                    >
                      Join Discussion
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Schedule Study Time Modal */}
      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Schedule New Study Session</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleScheduleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={scheduleData.title}
                  onChange={(e) => setScheduleData({ ...scheduleData, title: e.target.value })}
                  placeholder="e.g., React Hooks"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  id="date"
                  value={scheduleData.date}
                  onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                  min={today}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  type="time"
                  id="time"
                  value={scheduleData.time}
                  onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select
                  onValueChange={(value) => setScheduleData({ ...scheduleData, duration: value })}
                  defaultValue={scheduleData.duration}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course (Optional)</Label>
                <Select
                  onValueChange={(value) => setScheduleData({ ...scheduleData, course: value })}
                  defaultValue={scheduleData.course}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No specific course</SelectItem>
                    {courseCatalog.map(course => (
                      <SelectItem key={course.title} value={course.title}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={scheduleData.notes}
                  onChange={(e) => setScheduleData({ ...scheduleData, notes: e.target.value })}
                  placeholder="Add any notes for the session"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">Schedule Session</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
