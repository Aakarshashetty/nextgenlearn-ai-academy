import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  BookOpen,
  Video,
  Users,
  MessageSquare,
  Trophy,
  BarChart3,
  Settings,
  PlayCircle,
  FileText,
  Target,
  Zap,
  Brain,
  X,
  LogOut,
  User,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useState, useRef, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationItems = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/", icon: Home, badgeKey: null },
      { name: "My Courses", href: "/courses", icon: BookOpen, badgeKey: "enrolledCourses" },
      { name: "Live Sessions", href: "/sessions", icon: Video, badgeKey: "liveSessions" },
    ]
  },
  {
    title: "Learning",
    items: [
      { name: "Explore", href: "/explore", icon: Target, badgeKey: null },
      { name: "AI Tutor", href: "/ai-tutor", icon: Brain, badgeKey: null },
      { name: "Practice", href: "/practice", icon: Zap, badgeKey: null },
      { name: "Resources", href: "/resources", icon: FileText, badgeKey: null },
    ]
  },
  {
    title: "Community",
    items: [
      { name: "Discussion", href: "/discussion", icon: MessageSquare, badgeKey: "unreadMessages" },
      { name: "Study Groups", href: "/groups", icon: Users, badgeKey: null },
      { name: "Achievements", href: "/achievements", icon: Trophy, badgeKey: null },
    ]
  },
  {
    title: "Analytics",
    items: [
      { name: "Progress", href: "/progress", icon: BarChart3, badgeKey: null },
      { name: "Performance", href: "/performance", icon: PlayCircle, badgeKey: null },
    ]
  }
];

export const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const badgeCounts = useSelector((state: RootState) => state.userCourses.sidebarBadgeCounts);
  const [collapsedSections, setCollapsedSections] = useState<{ [title: string]: boolean }>({});
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Use Redux user state
  const { profile, stats, setAuthenticated, resetUserState } = useUser();

  // Add refs for navigation items
  const navItemRefs = useRef<{ [href: string]: HTMLDivElement | null }>({});
  const settingsRef = useRef<HTMLDivElement | null>(null);

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const toggleSection = (title: string) => {
    setCollapsedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  // Handle profile button click
  const handleProfileClick = () => {
    navigate('/settings');
    if (onClose) onClose(); // Close sidebar on mobile
  };

  // Handle logout button click
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  // Handle logout confirmation
  const handleLogoutConfirm = () => {
    // Reset user state
    resetUserState();
    setAuthenticated(false);
    
    // Close modal
    setShowLogoutConfirm(false);
    
    // Close sidebar on mobile
    if (onClose) onClose();
    
    // Navigate to login page or home
    navigate('/');
    
    // Show success message (you can add a toast notification here)
    console.log('Successfully logged out');
  };

  // Scroll active nav item into view on route change
  useEffect(() => {
    if (location.pathname === "/settings") {
      settingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const activeHref = navigationItems
        .flatMap(section => section.items)
        .find(item => isActive(item.href))?.href;
      if (activeHref && navItemRefs.current[activeHref]) {
        navItemRefs.current[activeHref]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [location.pathname]);

  // Generate avatar fallback from user's name
  const getAvatarFallback = () => {
    if (profile.avatar) return profile.avatar;
    return `${profile.firstName[0]}${profile.lastName[0]}`;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 transform border-r bg-card transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Sidebar Navigation"
      >
        {/* User Profile Section */}
        <div className="flex flex-col items-center gap-2 py-6 border-b flex-shrink-0">
          <div className="h-14 w-14 rounded-full border-2 border-primary shadow bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
            {profile.avatar ? (
              <img src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} className="h-full w-full rounded-full object-cover" />
            ) : (
              getAvatarFallback()
            )}
          </div>
          <div className="font-semibold text-base mt-1">{profile.firstName} {profile.lastName}</div>
          <div className="text-xs text-muted-foreground">{profile.email}</div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">
              Level {stats.currentLevel}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {stats.totalXP} XP
            </Badge>
          </div>
          <div className="flex gap-2 mt-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-full px-3 gap-1"
              onClick={handleProfileClick}
            >
              <User className="h-3 w-3" />
              Profile
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-full px-3 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogoutClick}
            >
              <LogOut className="h-3 w-3" />
              Logout
            </Button>
          </div>
        </div>
        {/* Mobile Close Button */}
        <div className="flex h-16 items-center justify-between px-4 lg:hidden flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">NextGenLearn</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-3 py-4">
            <nav className="space-y-6">
              {navigationItems.map((section) => (
                <div key={section.title}>
                  <div className="flex items-center justify-between mb-2 px-3 cursor-pointer select-none" onClick={() => toggleSection(section.title)} tabIndex={0} aria-label={`Toggle ${section.title} section`}>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</h3>
                    <span className="text-lg text-muted-foreground">{collapsedSections[section.title] ? '+' : '-'}</span>
                  </div>
                  {!collapsedSections[section.title] && (
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <div
                          key={item.name}
                          ref={el => navItemRefs.current[item.href] = el}
                        >
                          <NavLink
                            to={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                              isActive(item.href)
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground"
                            )}
                            tabIndex={0}
                            aria-label={item.name}
                          >
                            <item.icon className="h-5 w-5" />
                            <span className="flex-1">{item.name}</span>
                            {item.badgeKey && badgeCounts[item.badgeKey] > 0 && (
                              <Badge
                                variant={item.badgeKey === "liveSessions" ? "destructive" : "secondary"}
                                className="text-xs px-2 py-0.5 rounded-full"
                              >
                                {badgeCounts[item.badgeKey]}
                              </Badge>
                            )}
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            {/* Bottom Section */}
            <div className="mt-auto pt-6">
              <div className="space-y-1">
                <div ref={settingsRef}>
                  <NavLink
                    to="/settings"
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                      isActive("/settings")
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground"
                    )}
                    tabIndex={0}
                    aria-label="Settings"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold">Confirm Logout</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? Your progress will be saved, but you'll need to log back in to continue.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleLogoutConfirm}
                className="flex-1 gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};