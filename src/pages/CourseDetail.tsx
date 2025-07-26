import { useParams, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Clock, Users, BookOpen, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, ChevronLeft, ChevronRight, Download, FileText, ExternalLink, User, CheckCircle } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useDispatch, useSelector } from 'react-redux';
import { enrollCourse, toggleLessonCompletion, toggleResourceFavorite } from '../store';
import { RootState } from '../store';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Copy, Mail, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { courseCatalog } from '../data/courses';

// Enhanced course data with lessons, resources, and related courses
const enhancedCourseData = {
  "Complete Web Development Bootcamp": {
    instructorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    instructorBio: "Lead instructor at London App Brewery. Passionate about teaching web development to millions.",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
    lessons: [
      { title: "Introduction & Setup", duration: "10:00", videoUrl: "https://www.youtube.com/embed/ZxKM3DCV2kE" },
      { title: "HTML & CSS Basics", duration: "25:00", videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE" },
      { title: "JavaScript Essentials", duration: "40:00", videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk" },
      { title: "Frontend Frameworks", duration: "35:00", videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0" },
      { title: "Backend with Node.js", duration: "50:00", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4" },
      { title: "Deployment & Best Practices", duration: "20:00", videoUrl: "https://www.youtube.com/embed/nhBVL41-_Cw" }
    ],
    resources: [
      { name: "Course Slides", url: "#", type: "pdf" },
      { name: "Project Files", url: "#", type: "zip" },
      { name: "Cheat Sheet", url: "#", type: "pdf" },
      { name: "External Docs", url: "https://developer.mozilla.org/", type: "link" }
    ]
  },
  "Advanced React and Redux": {
    instructorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    instructorBio: "Senior React developer and instructor with 10+ years of experience in frontend development.",
    cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600",
    lessons: [
      { title: "React Fundamentals Review", duration: "15:00", videoUrl: "https://www.youtube.com/embed/9D1x7-2FmTA" },
      { title: "Advanced Hooks", duration: "30:00", videoUrl: "https://www.youtube.com/embed/TNhaISOUy6Q" },
      { title: "Redux Core Concepts", duration: "45:00", videoUrl: "https://www.youtube.com/embed/93p3LxR9xfM" },
      { title: "Redux Toolkit", duration: "40:00", videoUrl: "https://www.youtube.com/embed/0ZJgIjIuY7U" },
      { title: "Redux Middleware", duration: "35:00", videoUrl: "https://www.youtube.com/embed/3sjMRS1gJys" },
      { title: "Performance Optimization", duration: "25:00", videoUrl: "https://www.youtube.com/embed/7YhdqIR2Yzo" }
    ],
    resources: [
      { name: "React Cheat Sheet", url: "#", type: "pdf" },
      { name: "Redux Examples", url: "#", type: "zip" },
      { name: "Performance Guide", url: "#", type: "pdf" },
      { name: "React Docs", url: "https://react.dev/", type: "link" }
    ]
  },
  "Python for Data Science": {
    instructorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    instructorBio: "Data scientist and Python instructor specializing in machine learning and data analysis.",
    cover: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600",
    lessons: [
      { title: "Python Basics", duration: "20:00", videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw" },
      { title: "NumPy Fundamentals", duration: "35:00", videoUrl: "https://www.youtube.com/embed/GB9ByFAIAH4" },
      { title: "Pandas Data Manipulation", duration: "40:00", videoUrl: "https://www.youtube.com/embed/daefaLgNkw0" },
      { title: "Data Visualization", duration: "30:00", videoUrl: "https://www.youtube.com/embed/3Xc3CA655Y4" },
      { title: "Statistical Analysis", duration: "45:00", videoUrl: "https://www.youtube.com/embed/rDe0CS_qvdE" },
      { title: "Machine Learning Intro", duration: "25:00", videoUrl: "https://www.youtube.com/embed/KNAWp2S3w94" }
    ],
    resources: [
      { name: "Python Cheat Sheet", url: "#", type: "pdf" },
      { name: "Data Science Projects", url: "#", type: "zip" },
      { name: "Jupyter Notebooks", url: "#", type: "zip" },
      { name: "Pandas Docs", url: "https://pandas.pydata.org/", type: "link" }
    ]
  },
  "Machine Learning A-Z": {
    instructorAvatar: "https://randomuser.me/api/portraits/men/28.jpg",
    instructorBio: "AI researcher and machine learning expert with publications in top-tier conferences.",
    cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
    lessons: [
      { title: "ML Fundamentals", duration: "25:00", videoUrl: "https://www.youtube.com/embed/GwIo3gDZCVQ" },
      { title: "Supervised Learning", duration: "40:00", videoUrl: "https://www.youtube.com/embed/4PXAztQtoTg" },
      { title: "Unsupervised Learning", duration: "35:00", videoUrl: "https://www.youtube.com/embed/8dtdm9MsWno" },
      { title: "Deep Learning Basics", duration: "45:00", videoUrl: "https://www.youtube.com/embed/VyWAvY2CF3c" },
      { title: "Neural Networks", duration: "50:00", videoUrl: "https://www.youtube.com/embed/aircAruvnKk" },
      { title: "Model Deployment", duration: "30:00", videoUrl: "https://www.youtube.com/embed/8Ppdh-9jJLo" }
    ],
    resources: [
      { name: "ML Algorithms Guide", url: "#", type: "pdf" },
      { name: "Dataset Collection", url: "#", type: "zip" },
      { name: "Model Templates", url: "#", type: "zip" },
      { name: "Scikit-learn Docs", url: "https://scikit-learn.org/", type: "link" }
    ]
  },
  "AWS Certified Solutions Architect": {
    instructorAvatar: "https://randomuser.me/api/portraits/men/52.jpg",
    instructorBio: "AWS certified solutions architect with 15+ years of cloud infrastructure experience.",
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
    lessons: [
      { title: "AWS Fundamentals", duration: "20:00", videoUrl: "https://www.youtube.com/embed/ulprqHHWlng" },
      { title: "EC2 & VPC Design", duration: "35:00", videoUrl: "https://www.youtube.com/embed/ITcX6aIJ0Ls" },
      { title: "S3 & Storage Services", duration: "30:00", videoUrl: "https://www.youtube.com/embed/77lMCiiMilo" },
      { title: "Database Services", duration: "40:00", videoUrl: "https://www.youtube.com/embed/7CZF6I8dnyY" },
      { title: "Security & IAM", duration: "45:00", videoUrl: "https://www.youtube.com/embed/9OrmRe_glbI" },
      { title: "Architecture Best Practices", duration: "25:00", videoUrl: "https://www.youtube.com/embed/0Kjzc8Tyq8M" }
    ],
    resources: [
      { name: "AWS Architecture Guide", url: "#", type: "pdf" },
      { name: "Practice Tests", url: "#", type: "zip" },
      { name: "CloudFormation Templates", url: "#", type: "zip" },
      { name: "AWS Documentation", url: "https://aws.amazon.com/documentation/", type: "link" }
    ]
  },
  "Complete Digital Marketing Course": {
    instructorAvatar: "https://randomuser.me/api/portraits/men/38.jpg",
    instructorBio: "Digital marketing strategist helping businesses grow through effective online marketing.",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    lessons: [
      { title: "Marketing Fundamentals", duration: "15:00", videoUrl: "https://www.youtube.com/embed/7nS2lrbAD5w" },
      { title: "SEO Basics", duration: "30:00", videoUrl: "https://www.youtube.com/embed/2crRfGojUfE" },
      { title: "Social Media Marketing", duration: "35:00", videoUrl: "https://www.youtube.com/embed/9P8mASSREYM" },
      { title: "Content Marketing", duration: "25:00", videoUrl: "https://www.youtube.com/embed/2IuHkkSdA8Y" },
      { title: "Email Marketing", duration: "20:00", videoUrl: "https://www.youtube.com/embed/9P8mASSREYM" },
      { title: "Analytics & ROI", duration: "30:00", videoUrl: "https://www.youtube.com/embed/2IuHkkSdA8Y" }
    ],
    resources: [
      { name: "Marketing Strategy Template", url: "#", type: "pdf" },
      { name: "SEO Tools", url: "#", type: "zip" },
      { name: "Content Calendar", url: "#", type: "pdf" },
      { name: "Google Analytics", url: "https://analytics.google.com/", type: "link" }
    ]
  },
  "UI/UX Design Fundamentals": {
    instructorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
    instructorBio: "Senior UX designer with expertise in user research, wireframing, and design systems.",
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
    lessons: [
      { title: "Design Principles", duration: "20:00", videoUrl: "https://www.youtube.com/embed/3Y1H1iG3bTg" },
      { title: "User Research", duration: "30:00", videoUrl: "https://www.youtube.com/embed/7VZLIPrjoUk" },
      { title: "Wireframing", duration: "25:00", videoUrl: "https://www.youtube.com/embed/9P8mASSREYM" },
      { title: "Prototyping", duration: "35:00", videoUrl: "https://www.youtube.com/embed/2IuHkkSdA8Y" },
      { title: "User Testing", duration: "20:00", videoUrl: "https://www.youtube.com/embed/9P8mASSREYM" },
      { title: "Design Systems", duration: "30:00", videoUrl: "https://www.youtube.com/embed/2IuHkkSdA8Y" }
    ],
    resources: [
      { name: "Design System Guide", url: "#", type: "pdf" },
      { name: "UI Kits", url: "#", type: "zip" },
      { name: "Research Templates", url: "#", type: "pdf" },
      { name: "Figma Community", url: "https://www.figma.com/community", type: "link" }
    ]
  },
  "Cybersecurity Essentials": {
    instructorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
    instructorBio: "Former hacker turned cybersecurity expert, specializing in ethical hacking and security.",
    cover: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600",
    lessons: [
      { title: "Network Security", duration: "25:00", videoUrl: "https://www.youtube.com/embed/2e--5cGJq98" },
      { title: "Cryptography Basics", duration: "30:00", videoUrl: "https://www.youtube.com/embed/7nS2lrbAD5w" },
      { title: "Ethical Hacking", duration: "40:00", videoUrl: "https://www.youtube.com/embed/2crRfGojUfE" },
      { title: "Penetration Testing", duration: "35:00", videoUrl: "https://www.youtube.com/embed/9P8mASSREYM" },
      { title: "Incident Response", duration: "25:00", videoUrl: "https://www.youtube.com/embed/2IuHkkSdA8Y" },
      { title: "Security Compliance", duration: "20:00", videoUrl: "https://www.youtube.com/embed/9P8mASSREYM" }
    ],
    resources: [
      { name: "Security Tools", url: "#", type: "zip" },
      { name: "Penetration Testing Guide", url: "#", type: "pdf" },
      { name: "Security Checklist", url: "#", type: "pdf" },
      { name: "OWASP", url: "https://owasp.org/", type: "link" }
    ]
  },
  "Mobile App Development with Flutter": {
    instructorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    instructorBio: "Mobile app developer and Flutter expert with 50+ published apps on app stores.",
    cover: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600",
    lessons: [
      { title: "Flutter Basics", duration: "20:00", videoUrl: "https://www.youtube.com/embed/fq4N0hgOWzU" },
      { title: "Widgets & Layout", duration: "30:00", videoUrl: "https://www.youtube.com/embed/7nS2lrbAD5w" },
      { title: "State Management", duration: "35:00", videoUrl: "https://www.youtube.com/embed/2crRfGojUfE" },
      { title: "Navigation", duration: "25:00", videoUrl: "https://www.youtube.com/embed/9P8mASSREYM" },
      { title: "API Integration", duration: "40:00", videoUrl: "https://www.youtube.com/embed/2IuHkkSdA8Y" },
      { title: "App Deployment", duration: "20:00", videoUrl: "https://www.youtube.com/embed/9P8mASSREYM" }
    ],
    resources: [
      { name: "Flutter Widget Catalog", url: "#", type: "pdf" },
      { name: "Sample Apps", url: "#", type: "zip" },
      { name: "Deployment Guide", url: "#", type: "pdf" },
      { name: "Flutter Docs", url: "https://docs.flutter.dev/", type: "link" }
    ]
  },
  "DevOps Masterclass": {
    instructorAvatar: "https://randomuser.me/api/portraits/men/72.jpg",
    instructorBio: "DevOps engineer and cloud architect with expertise in CI/CD and infrastructure automation.",
    cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
    lessons: [
      { title: "CI/CD Pipelines", duration: "30:00", videoUrl: "https://www.youtube.com/embed/9A6Xf4oP7s8" },
      { title: "Docker Containers", duration: "35:00", videoUrl: "https://www.youtube.com/embed/7nS2lrbAD5w" },
      { title: "Kubernetes Orchestration", duration: "40:00", videoUrl: "https://www.youtube.com/embed/2crRfGojUfE" },
      { title: "Infrastructure as Code", duration: "45:00", videoUrl: "https://www.youtube.com/embed/9P8mASSREYM" },
      { title: "Monitoring & Logging", duration: "25:00", videoUrl: "https://www.youtube.com/embed/2IuHkkSdA8Y" },
      { title: "Security in DevOps", duration: "30:00", videoUrl: "https://www.youtube.com/embed/9P8mASSREYM" }
    ],
    resources: [
      { name: "Docker Cheat Sheet", url: "#", type: "pdf" },
      { name: "Kubernetes Manifests", url: "#", type: "zip" },
      { name: "CI/CD Templates", url: "#", type: "zip" },
      { name: "Docker Hub", url: "https://hub.docker.com/", type: "link" }
    ]
  }
};

function getCourseData(title: string) {
  const baseCourse = courseCatalog.find(c => c.title === title);
  if (!baseCourse) return null;
  
  const enhancedData = enhancedCourseData[title] || {
    instructorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    instructorBio: "Experienced instructor passionate about teaching and helping students succeed.",
    cover: baseCourse.thumbnail,
    lessons: [
      { title: "Introduction", duration: "10:00", videoUrl: baseCourse.videoUrl },
      { title: "Getting Started", duration: "15:00", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { title: "Core Concepts", duration: "20:00", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { title: "Advanced Topics", duration: "25:00", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { title: "Practical Examples", duration: "30:00", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { title: "Final Project", duration: "35:00", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ],
    resources: [
      { name: "Course Materials", url: "#", type: "pdf" },
      { name: "Project Files", url: "#", type: "zip" },
      { name: "Reference Guide", url: "#", type: "pdf" },
      { name: "External Resources", url: "https://example.com", type: "link" }
    ]
  };

  return {
    ...baseCourse,
    ...enhancedData,
    related: courseCatalog
      .filter(c => c.title !== title)
      .slice(0, 2)
      .map(c => ({
        title: c.title,
        instructor: c.instructor,
        cover: c.thumbnail,
        students: c.students
      }))
  };
}

const CourseDetail = () => {
  const { title } = useParams<{ title: string }>();
  const location = useLocation();
  // Get course info FIRST
  const course = getCourseData(decodeURIComponent(title || ""));
  if (!course) return <div className="p-8 text-center text-lg">Course not found.</div>;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState("");
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [resourceSearch, setResourceSearch] = useState("");
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state: RootState) => state.userCourses.enrolled);
  const isEnrolled = enrolledCourses.some(c => c.title === course.title);
  const [shareOpen, setShareOpen] = useState(false);
  const lessonCompletion = useSelector((state: RootState) => state.userCourses.lessonCompletion[course.title] || {});
  const resourceFavorites = useSelector((state: RootState) => state.userCourses.resourceFavorites[course.title] || []);
  const [lessonNotes, setLessonNotes] = useState<{ [idx: number]: string }>({});
  const [resourceTypeFilter, setResourceTypeFilter] = useState('all');

  const lesson = course.lessons[currentLesson];
  const videoUrl = lesson.videoUrl;

  // Filtered resources with type filter
  const filteredResources = useMemo(() => {
    let res = course.resources;
    if (resourceTypeFilter !== 'all') res = res.filter(r => r.type === resourceTypeFilter);
    if (!resourceSearch.trim()) return res;
    return res.filter(r => r.name.toLowerCase().includes(resourceSearch.toLowerCase()));
  }, [resourceSearch, resourceTypeFilter, course.resources]);

  // Save playback position per lesson
  useEffect(() => {
    const key = `course-${course.title}-lesson-${currentLesson}-time`;
    const saved = localStorage.getItem(key);
    if (videoRef.current && saved) {
      videoRef.current.currentTime = parseFloat(saved);
    }
    return () => {
      if (videoRef.current) {
        localStorage.setItem(key, videoRef.current.currentTime.toString());
      }
    };
    // eslint-disable-next-line
  }, [currentLesson, course.title]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [volume, playbackSpeed]);

  // Custom video player logic
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };
  const handleVolume = (v: number) => setVolume(v);
  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Number(e.target.value);
      setProgress(Number(e.target.value));
    }
  };
  const handleTimeUpdate = () => {
    if (videoRef.current) setProgress(videoRef.current.currentTime);
  };
  const handleLoadedMetadata = () => {
    if (videoRef.current) setProgress(videoRef.current.currentTime);
  };
  const handleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!fullscreen) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      }
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setFullscreen(false);
    }
  };
  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlaybackSpeed(Number(e.target.value));
  };
  const handlePrevLesson = () => setCurrentLesson(l => Math.max(0, l - 1));
  const handleNextLesson = () => setCurrentLesson(l => Math.min(course.lessons.length - 1, l + 1));

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes(prev => [...prev, newNote.trim()]);
      setNewNote("");
    }
  };

  const handleEnroll = () => {
    if (!isEnrolled) {
      // Set enrolled to true for this course
      const enrolledCourse = { ...course, enrolled: true };
      dispatch(enrollCourse(enrolledCourse));
      toast('Enrolled!');
    }
  };
  const handleShare = () => setShareOpen(true);
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast('Link copied!');
  };

  // Demo: fallback to a sample mp4 if no videoUrl
  const fallbackMp4 = "https://www.w3schools.com/html/mov_bbb.mp4";
  const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="flex h-full w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 h-full overflow-y-auto">
          <Header 
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            isDarkMode={isDarkMode}
            onThemeToggle={() => {
              setIsDarkMode(!isDarkMode);
              document.documentElement.classList.toggle('dark');
            }}
          />
          <TooltipProvider>
                    <main className="container mx-auto px-6 py-8">
            {/* Course Header Section */}
            <div className="mb-12">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="lg:w-1/3">
                  <img src={course.cover} alt="Course cover" className="w-full rounded-xl shadow-lg object-cover aspect-video" />
                </div>
                <div className="lg:w-2/3 space-y-6">
                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">{course.title}</h1>
                    <div className="flex flex-wrap gap-4 items-center text-muted-foreground">
                      <Badge variant="secondary" className="text-sm px-3 py-1">{course.level}</Badge>
                      <Badge variant="secondary" className="text-sm px-3 py-1">{course.category}</Badge>
                      <span className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4" />{course.duration}</span>
                      <span className="flex items-center gap-2 text-sm"><Users className="h-4 w-4" />{course.students.toLocaleString()} students</span>
                      <span className="flex items-center gap-2 text-sm"><Star className="h-4 w-4 fill-warning text-warning" />{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img src={course.instructorAvatar} alt={course.instructor} className="h-16 w-16 rounded-full border-2 border-primary/20" />
                      <div>
                        <div className="font-semibold text-lg">{course.instructor}</div>
                        <div className="text-sm text-muted-foreground max-w-md">{course.instructorBio}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Course Progress</span>
                        <span className="font-semibold text-primary">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-3" />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isEnrolled ? 'success' : 'gradient'}
                          size="lg"
                          className={`px-8 py-3 text-lg ${isEnrolled ? 'bg-green-500 text-white hover:bg-green-600' : ''}`}
                          onClick={handleEnroll}
                          disabled={isEnrolled}
                        >
                          {isEnrolled ? '✓ Enrolled' : 'Enroll Now'}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{isEnrolled ? 'You are already enrolled in this course' : 'Enroll in this course'}</TooltipContent>
                    </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="lg" onClick={handleShare} className="px-8 py-3 text-lg">
                          Share Course
                        </Button>
                    </TooltipTrigger>
                      <TooltipContent>Copy share link</TooltipContent>
                  </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Left Sidebar: Syllabus & Resources */}
              <aside className="xl:col-span-1 space-y-8">
                {/* Syllabus Section */}
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      Syllabus
                      <Badge variant="secondary" className="ml-auto">{course.lessons.length} lessons</Badge>
                    </CardTitle>
                </CardHeader>
                  <CardContent className="space-y-3">
                    {course.lessons?.map((l, idx) => (
                      <Tooltip key={idx}>
                        <TooltipTrigger asChild>
                          <div
                            className={`group relative p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                              idx === currentLesson 
                                ? 'bg-primary/10 border-2 border-primary/30 shadow-md' 
                                : 'bg-white/80 border border-gray-100 hover:bg-gray-50 hover:shadow-md'
                            }`}
                            onClick={() => setCurrentLesson(idx)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`flex items-center justify-center h-10 w-10 rounded-lg transition-colors ${
                                idx === currentLesson ? 'bg-primary/10 border-2 border-primary' : 'bg-gray-100 group-hover:bg-primary/10'
                              }`}>
                                {lessonCompletion[idx] ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <Play className={`h-5 w-5 ${idx === currentLesson ? 'text-primary' : 'text-primary'}`} />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className={`font-semibold text-sm leading-tight ${
                                  idx === currentLesson ? 'text-primary' : 'text-gray-900'
                                }`}>
                                  {idx + 1}. {l.title}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">{l.duration}</div>
                              </div>
                            <input
                              type="checkbox"
                              checked={!!lessonCompletion[idx]}
                                onChange={e => { 
                                  e.stopPropagation(); 
                                  dispatch(toggleLessonCompletion({ courseTitle: course.title, lessonIndex: idx })); 
                                }}
                                className="accent-primary h-4 w-4 mt-1"
                              />
                            </div>
                            

                          </div>
                        </TooltipTrigger>
                        <TooltipContent>{l.title} • {l.duration}</TooltipContent>
                        

                      </Tooltip>
                    ))}
                </CardContent>
              </Card>

              {/* Resources Section */}
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <span className="text-2xl">📚</span>
                      </div>
                      Resources
                      <Badge variant="secondary" className="ml-auto">{filteredResources.length}</Badge>
                    </CardTitle>
                </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Search and Filter */}
                    <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Search resources..."
                      value={resourceSearch}
                      onChange={e => setResourceSearch(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                    <select
                      value={resourceTypeFilter}
                      onChange={e => setResourceTypeFilter(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="all">All Types</option>
                        <option value="pdf">PDF Files</option>
                        <option value="zip">ZIP Archives</option>
                        <option value="link">External Links</option>
                    </select>
                  </div>

                    {/* Resources List */}
                  {filteredResources.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <div className="text-4xl mb-2">📭</div>
                        <div className="text-sm">No resources found</div>
                      </div>
                  ) : (
                      <div className="space-y-3">
                      {filteredResources.map((res, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                              <div className="group p-4 bg-white/80 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-200">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                                {res.type === 'pdf' && <FileText className="h-6 w-6 text-red-500" />}
                                {res.type === 'zip' && <Download className="h-6 w-6 text-blue-500" />}
                                {res.type === 'link' && <ExternalLink className="h-6 w-6 text-green-600" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                                      {res.name}
                                    </div>
                                <div className="text-xs text-muted-foreground capitalize mt-1">{res.type}</div>
                              </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      className={`p-1 rounded transition-colors ${
                                        resourceFavorites.includes(res.name) 
                                          ? 'text-yellow-500 hover:text-yellow-600' 
                                          : 'text-gray-400 hover:text-yellow-500'
                                      }`}
                                      onClick={e => { 
                                        e.stopPropagation(); 
                                        dispatch(toggleResourceFavorite({ courseTitle: course.title, resourceName: res.name })); 
                                      }}
                                    >
                                      <Star className="h-4 w-4" fill={resourceFavorites.includes(res.name) ? 'currentColor' : 'none'} />
                                    </button>
                                {res.type === 'link' ? (
                                  <a
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                        className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                                  >
                                        <ExternalLink className="h-4 w-4" />
                                  </a>
                                ) : (
                                  <a
                                    href={res.url}
                                    download
                                        className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                                  >
                                        <Download className="h-4 w-4" />
                                  </a>
                                )}
                                  </div>
                                </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{res.name} • {res.type.charAt(0).toUpperCase() + res.type.slice(1)}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </aside>

                            {/* Main Content Area */}
              <section className="xl:col-span-3 space-y-8">

              {/* Video Player Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" /> {lesson.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div ref={playerContainerRef} className="relative bg-black rounded-lg shadow-lg w-full aspect-video flex items-center justify-center">
                    {isYouTube ? (
                      <iframe
                        src={videoUrl + (videoUrl.includes('?') ? '&' : '?') + 'rel=0&modestbranding=1&autoplay=0&controls=0&showinfo=0'}
                        title="Course Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full rounded-lg border-0"
                        style={{ minHeight: 320 }}
                      ></iframe>
                    ) : (
                      <video
                        ref={videoRef}
                        src={videoUrl || fallbackMp4}
                        className="w-full h-full rounded-lg"
                        controls={false}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                      />
                    )}
                    {/* Custom Controls (for non-YouTube videos) */}
                    {!isYouTube && (
                      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center px-4">
                        <div className="flex w-full items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={handlePrevLesson} aria-label="Previous Lesson" disabled={currentLesson === 0}><ChevronLeft className="h-5 w-5" /></Button>
                          <Button variant="ghost" size="icon" onClick={handlePlayPause} aria-label={playing ? 'Pause' : 'Play'}>
                            {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={handleNextLesson} aria-label="Next Lesson" disabled={currentLesson === course.lessons.length - 1}><ChevronRight className="h-5 w-5" /></Button>
                          <input
                            type="range"
                            min={0}
                            max={videoRef.current?.duration || 100}
                            value={progress}
                            onChange={handleProgress}
                            className="flex-1 accent-primary"
                          />
                          <Button variant="ghost" size="icon" onClick={() => handleVolume(volume === 0 ? 1 : 0)} aria-label={volume === 0 ? 'Unmute' : 'Mute'}>
                            {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                          </Button>
                          <select value={playbackSpeed} onChange={handleSpeedChange} className="rounded border px-2 py-1 text-xs">
                            {[0.5, 1, 1.25, 1.5, 2].map(s => <option key={s} value={s}>{s}x</option>)}
                          </select>
                          <Button variant="ghost" size="icon" onClick={handleFullscreen} aria-label={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
                            {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">📝 Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {notes.length === 0 && <div className="text-muted-foreground">No notes yet.</div>}
                    {notes.map((note, idx) => (
                      <div key={idx} className="p-2 bg-muted rounded border text-sm">{note}</div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <textarea
                      className="flex-1 border rounded p-2 text-sm"
                      rows={2}
                      placeholder="Add a note..."
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                    />
                    <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Courses Carousel */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">🔗 Related Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6 overflow-x-auto pb-2">
                    {course.related?.map((rel, idx) => (
                      <div key={idx} className="min-w-[220px] bg-muted rounded-lg shadow p-4 flex flex-col items-center">
                        <img src={rel.cover} alt={rel.title} className="w-full h-28 object-cover rounded mb-2" />
                        <div className="font-semibold text-base text-center line-clamp-2">{rel.title}</div>
                        <div className="text-xs text-muted-foreground mb-2">by {rel.instructor}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2"><Users className="h-4 w-4" />{rel.students.toLocaleString()} students</div>
                        <Button variant="gradient" size="sm" className="w-full mt-auto">Quick Enroll</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
            </div>
          </main>
          </TooltipProvider>
        </div>
      </div>
      {/* Share Modal */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share this course</DialogTitle>
            <DialogClose asChild>
              <button className="absolute top-3 right-3 text-muted-foreground hover:text-primary" aria-label="Close">✕</button>
            </DialogClose>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded hover:bg-muted transition text-base font-medium">
              <Copy className="h-5 w-5 text-primary" /> Copy Link
            </button>
            <a href={`mailto:?subject=Check out this course!&body=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-muted transition text-base font-medium">
              <Mail className="h-5 w-5 text-primary" /> Email
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-muted transition text-base font-medium">
              <MessageCircle className="h-5 w-5 text-green-600" /> WhatsApp
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-muted transition text-base font-medium">
              <Twitter className="h-5 w-5 text-sky-500" /> Twitter
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-muted transition text-base font-medium">
              <Facebook className="h-5 w-5 text-blue-600" /> Facebook
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseDetail; 