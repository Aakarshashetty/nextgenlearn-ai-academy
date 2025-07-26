import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Bell, 
  Search, 
  User, 
  Menu,
  Sun,
  Moon,
  GraduationCap,
  LogOut,
  AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useUser } from '@/hooks/useUser';

interface HeaderProps {
  onMenuClick?: () => void;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    profile,
    setTheme,
    appearance,
    resetUserState,
    setAuthenticated
  } = useUser();

  // Search handler
  const handleSearch = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search results page or show suggestions
      navigate(`/explore?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchExpanded(false);
    }
  };

  // Theme toggle handler
  const handleThemeToggle = () => {
    setTheme(appearance.theme === 'dark' ? 'light' : 'dark');
    if (appearance.theme === 'dark') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Profile navigation
  const handleProfile = () => {
    navigate('/settings');
  };

  // My Courses navigation
  const handleMyCourses = () => {
    navigate('/courses');
  };

  // Sign out handler
  const handleSignOut = () => {
    resetUserState();
    setAuthenticated(false);
    navigate('/');
  };

  // Notifications (dummy data)
  const notifications = [
    { id: 1, message: "You earned a new badge!", time: "2m ago", type: "success" },
    { id: 2, message: "Your session starts in 10 minutes.", time: "10m ago", type: "info" },
    { id: 3, message: "New reply in Discussion.", time: "30m ago", type: "info" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left Section - Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              NextGenLearn
            </span>
          </div>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form className="relative w-full" onSubmit={handleSearch}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses, topics, or skills..."
              className="pl-10 pr-4 w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch(e)}
              ref={searchInputRef}
            />
          </form>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={handleThemeToggle}
            aria-label="Toggle dark mode"
          >
            {appearance.theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button> */}

          {/* Notifications */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 max-w-xs" align="end" forceMount>
              <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">No new notifications</div>
              ) : (
                notifications.map(n => (
                  <DropdownMenuItem key={n.id} className="flex items-start gap-2 py-2">
                    <AlertCircle className={`h-4 w-4 mt-0.5 ${n.type === 'success' ? 'text-green-500' : 'text-blue-500'}`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{n.message}</div>
                      <div className="text-xs text-muted-foreground">{n.time}</div>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.firstName + ' ' + profile.lastName} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{profile.firstName} {profile.lastName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profile.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleMyCourses}>
                <BookOpen className="mr-2 h-4 w-4" />
                My Courses
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Expanded */}
      {isSearchExpanded && (
        <div className="border-t px-4 py-2 md:hidden">
          <form className="relative" onSubmit={handleSearch}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses, topics, or skills..."
              className="pl-10 pr-4 w-full"
              autoFocus
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch(e)}
              ref={searchInputRef}
            />
          </form>
        </div>
      )}
    </header>
  );
};