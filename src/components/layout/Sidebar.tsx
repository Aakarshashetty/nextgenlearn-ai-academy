import { NavLink, useLocation } from "react-router-dom";
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
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useState } from 'react';

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

const userProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@gmail.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
};

export const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const location = useLocation();
  const badgeCounts = useSelector((state: RootState) => state.userCourses.sidebarBadgeCounts);
  const [collapsedSections, setCollapsedSections] = useState<{ [title: string]: boolean }>({});

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const toggleSection = (title: string) => {
    setCollapsedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <TooltipProvider>
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
          "fixed top-0 left-0 z-50 h-screen w-64 transform border-r bg-card transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Sidebar Navigation"
      >
        {/* User Profile Section */}
        <div className="flex flex-col items-center gap-2 py-6 border-b">
          <img src={userProfile.avatar} alt={userProfile.name} className="h-14 w-14 rounded-full border-2 border-primary shadow" />
          <div className="font-semibold text-base mt-1">{userProfile.name}</div>
          <div className="text-xs text-muted-foreground">{userProfile.email}</div>
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="outline" className="rounded-full px-3">Profile</Button>
            <Button size="sm" variant="outline" className="rounded-full px-3">Logout</Button>
          </div>
        </div>
        {/* Mobile Close Button */}
        <div className="flex h-16 items-center justify-between px-4 lg:hidden">
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
                      <Tooltip key={item.name}>
                        <TooltipTrigger asChild>
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
                        </TooltipTrigger>
                        <TooltipContent>{item.name}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          {/* Bottom Section */}
          <div className="mt-auto pt-6">
            <div className="space-y-1">
              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent>Settings</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </TooltipProvider>
  );
};