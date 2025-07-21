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

// Demo data for course info, lessons, resources, related courses
const demoCourses = [
  {
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    instructorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    instructorBio: "Lead instructor at London App Brewery. Passionate about teaching web development to millions.",
    duration: "65h 30m",
    students: 15420,
    rating: 4.9,
    level: "Beginner",
    category: "Web Development",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
    progress: 75,
    videoUrl: "https://www.youtube.com/embed/ZxKM3DCV2kE",
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
    ],
    related: [
      {
        title: "Advanced React and Redux",
        instructor: "Stephen Grider",
        cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
        students: 8932
      },
      {
        title: "Python for Data Science",
        instructor: "Jose Portilla",
        cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
        students: 12567
      }
    ]
  }
];

function getCourseData(title) {
  return demoCourses.find(c => c.title === title) || demoCourses[0];
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
      dispatch(enrollCourse({
        ...course,
        thumbnail: course.cover || "",
        nextLesson: course.lessons[0].videoUrl || "",
        level: course.level as 'Beginner' | 'Intermediate' | 'Advanced',
      }));
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
          <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar: Syllabus & Resources */}
            <aside className="lg:col-span-4 xl:col-span-3 space-y-8 order-2 lg:order-1">
              {/* Syllabus Section */}
              <Card>
                <CardHeader>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CardTitle className="text-lg font-semibold flex items-center gap-2 cursor-help"><BookOpen className="h-5 w-5 text-primary" /> Syllabus <span className='ml-2 text-xs text-muted-foreground'>({course.lessons.length})</span></CardTitle>
                    </TooltipTrigger>
                    <TooltipContent>All lessons in this course. Click a lesson to play.</TooltipContent>
                  </Tooltip>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {course.lessons?.map((l, idx) => (
                      <Tooltip key={idx}>
                        <TooltipTrigger asChild>
                          <div
                            className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors cursor-pointer shadow-sm border bg-white/90 ${idx === currentLesson ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-muted'} `}
                            onClick={() => setCurrentLesson(idx)}
                            tabIndex={0}
                            aria-label={`Lesson: ${l.title}`}
                          >
                            <input
                              type="checkbox"
                              checked={!!lessonCompletion[idx]}
                              onChange={e => { e.stopPropagation(); dispatch(toggleLessonCompletion({ courseTitle: course.title, lessonIndex: idx })); }}
                              className="accent-primary h-5 w-5 rounded mr-2"
                              aria-label={lessonCompletion[idx] ? 'Mark as incomplete' : 'Mark as complete'}
                              onClick={e => e.stopPropagation()}
                            />
                            <div className={`flex items-center justify-center h-10 w-10 rounded-xl ${idx === currentLesson ? 'bg-primary/10' : 'bg-muted'}`}>
                              {lessonCompletion[idx] ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Play className="h-5 w-5 text-primary" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`font-semibold text-base truncate ${idx === currentLesson ? 'text-primary' : ''}`}>{idx + 1}. {l.title}</div>
                              <div className="text-xs text-muted-foreground">{l.duration}</div>
                            </div>
                            {/* Per-lesson notes icon */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className="ml-2 text-muted-foreground hover:text-primary"
                                  onClick={e => { e.stopPropagation(); setLessonNotes(notes => ({ ...notes, [idx]: notes[idx] !== undefined ? notes[idx] : '' })); setCurrentLesson(idx); }}
                                  aria-label="Add/View Notes"
                                >
                                  📝
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>Add/View Notes for this lesson</TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>{l.title} • {l.duration}</TooltipContent>
                        {/* Per-lesson notes input (show only for current lesson if toggled) */}
                        {lessonNotes[idx] !== undefined && idx === currentLesson && (
                          <div className="mt-2 flex flex-col gap-2 bg-muted rounded p-2">
                            <textarea
                              className="w-full border rounded p-2 text-sm"
                              rows={2}
                              placeholder="Add a note for this lesson..."
                              value={lessonNotes[idx]}
                              onChange={e => setLessonNotes(notes => ({ ...notes, [idx]: e.target.value }))}
                            />
                            <Button size="sm" onClick={() => setLessonNotes(notes => { const n = { ...notes }; delete n[idx]; return n; })}>Close</Button>
                          </div>
                        )}
                      </Tooltip>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Resources Section */}
              <Card>
                <CardHeader>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CardTitle className="text-lg font-semibold flex items-center gap-2 cursor-help">📚 Resources <span className='ml-2 text-xs text-muted-foreground'>({filteredResources.length})</span></CardTitle>
                    </TooltipTrigger>
                    <TooltipContent>Downloadable files and helpful links for this course.</TooltipContent>
                  </Tooltip>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Search resources..."
                      value={resourceSearch}
                      onChange={e => setResourceSearch(e.target.value)}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      aria-label="Search resources"
                    />
                    <select
                      value={resourceTypeFilter}
                      onChange={e => setResourceTypeFilter(e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                      aria-label="Filter by type"
                    >
                      <option value="all">All</option>
                      <option value="pdf">PDF</option>
                      <option value="zip">ZIP</option>
                      <option value="link">Link</option>
                    </select>
                  </div>
                  {filteredResources.length === 0 ? (
                    <div className="text-muted-foreground text-sm text-center py-6">No resources found.</div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {filteredResources.map((res, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <div
                              className="flex items-center gap-4 bg-[#f6fafd] rounded-2xl px-4 py-3 shadow-sm border border-transparent hover:border-primary transition group"
                              tabIndex={0}
                              aria-label={`Resource: ${res.name}`}
                            >
                              <button
                                className={`mr-2 ${resourceFavorites.includes(res.name) ? 'text-yellow-400' : 'text-muted-foreground'} hover:text-yellow-500`}
                                onClick={e => { e.stopPropagation(); dispatch(toggleResourceFavorite({ courseTitle: course.title, resourceName: res.name })); }}
                                aria-label={resourceFavorites.includes(res.name) ? 'Unfavorite' : 'Favorite'}
                              >
                                <Star className="h-5 w-5" fill={resourceFavorites.includes(res.name) ? 'currentColor' : 'none'} />
                              </button>
                              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#eaf1fb]">
                                {res.type === 'pdf' && <FileText className="h-6 w-6 text-red-500" />}
                                {res.type === 'zip' && <Download className="h-6 w-6 text-blue-500" />}
                                {res.type === 'link' && <ExternalLink className="h-6 w-6 text-green-600" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-lg truncate group-hover:text-primary">{res.name}</div>
                                <div className="text-xs text-muted-foreground capitalize mt-1">{res.type}</div>
                              </div>
                              <div className="flex gap-2">
                                {res.type === 'link' ? (
                                  <a
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center text-[#1877f2] hover:text-[#145dc2] focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label={`Open ${res.name}`}
                                  >
                                    <ExternalLink className="h-5 w-5" />
                                  </a>
                                ) : (
                                  <a
                                    href={res.url}
                                    download
                                    className="inline-flex items-center justify-center text-[#1877f2] hover:text-[#145dc2] focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label={`Download ${res.name}`}
                                  >
                                    <Download className="h-5 w-5" />
                                  </a>
                                )}
                              </div>
                              {/* Resource preview for PDF/Link */}
                              {res.type === 'pdf' && (
                                <a href={res.url} target="_blank" rel="noopener noreferrer" className="ml-2 underline text-xs text-primary">Preview</a>
                              )}
                              {res.type === 'link' && (
                                <a href={res.url} target="_blank" rel="noopener noreferrer" className="ml-2 underline text-xs text-primary">Visit</a>
                              )}
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

            {/* Main Content */}
            <section className="lg:col-span-8 xl:col-span-9 space-y-8 order-1 lg:order-2">
              {/* Course Cover & Info */}
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <img src={course.cover} alt="Course cover" className="w-full max-w-xs rounded-lg shadow-md object-cover" />
                <div className="flex-1 space-y-3">
                  <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{course.title}</h1>
                  <div className="flex flex-wrap gap-3 items-center text-muted-foreground text-sm">
                    <Badge variant="secondary">{course.level}</Badge>
                    <Badge variant="secondary">{course.category}</Badge>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" />{course.students.toLocaleString()} students</span>
                    <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" />{course.rating}</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex items-center gap-3 mt-2">
                    <img src={course.instructorAvatar} alt={course.instructor} className="h-10 w-10 rounded-full border" />
                    <div>
                      <div className="font-semibold text-base">{course.instructor}</div>
                      <div className="text-xs text-muted-foreground">{course.instructorBio}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isEnrolled ? 'success' : 'gradient'}
                          style={{ cursor: 'pointer', backgroundColor: isEnrolled ? '#22c55e' : undefined, color: isEnrolled ? 'white' : undefined }}
                          onClick={handleEnroll}
                          className={`transition hover:brightness-95 ${isEnrolled ? 'bg-green-500 text-white hover:bg-green-600' : ''}`}
                          disabled={isEnrolled}
                        >
                          {isEnrolled ? 'Enrolled' : 'Enroll Now'}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{isEnrolled ? 'You are already enrolled in this course' : 'Enroll in this course'}</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" style={{ cursor: 'pointer' }} onClick={handleShare} className="transition hover:bg-primary/10">
                          Share Course
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy share link</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>

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