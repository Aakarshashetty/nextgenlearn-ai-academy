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

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationItems = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/", icon: Home, badge: null },
      { name: "My Courses", href: "/courses", icon: BookOpen, badge: "3" },
      { name: "Live Sessions", href: "/sessions", icon: Video, badge: "Live" },
    ]
  },
  {
    title: "Learning",
    items: [
      { name: "Explore", href: "/explore", icon: Target, badge: null },
      { name: "AI Tutor", href: "/ai-tutor", icon: Brain, badge: "New" },
      { name: "Practice", href: "/practice", icon: Zap, badge: null },
      { name: "Resources", href: "/resources", icon: FileText, badge: null },
    ]
  },
  {
    title: "Community",
    items: [
      { name: "Discussion", href: "/discussion", icon: MessageSquare, badge: "5" },
      { name: "Study Groups", href: "/groups", icon: Users, badge: null },
      { name: "Achievements", href: "/achievements", icon: Trophy, badge: null },
    ]
  },
  {
    title: "Analytics",
    items: [
      { name: "Progress", href: "/progress", icon: BarChart3, badge: null },
      { name: "Performance", href: "/performance", icon: PlayCircle, badge: null },
    ]
  }
];

export const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
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
          "fixed top-0 left-0 z-50 h-screen w-64 transform border-r bg-card transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
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
                <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge
                          variant={item.badge === "Live" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto pt-6">
            <div className="space-y-1">
              <NavLink
                to="/settings"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                  isActive("/settings")
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground"
                )}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </NavLink>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};