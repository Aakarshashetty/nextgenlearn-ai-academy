import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Trophy, 
  MessageSquare, 
  Video,
  FileText,
  CheckCircle 
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "course" | "achievement" | "discussion" | "video" | "quiz" | "completion";
  title: string;
  description: string;
  timestamp: string;
  metadata?: {
    course?: string;
    points?: number;
    participants?: number;
  };
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "completion",
    title: "Completed Chapter 3",
    description: "Advanced React Patterns",
    timestamp: "2 hours ago",
    metadata: { course: "React Mastery", points: 150 }
  },
  {
    id: "2",
    type: "achievement",
    title: "Earned 'Problem Solver' Badge",
    description: "Completed 10 coding challenges",
    timestamp: "1 day ago",
    metadata: { points: 500 }
  },
  {
    id: "3",
    type: "discussion",
    title: "Joined Study Group Discussion",
    description: "JavaScript Fundamentals Q&A",
    timestamp: "2 days ago",
    metadata: { participants: 12 }
  },
  {
    id: "4",
    type: "video",
    title: "Watched Live Session",
    description: "Modern CSS Grid Techniques",
    timestamp: "3 days ago",
    metadata: { course: "CSS Advanced" }
  },
  {
    id: "5",
    type: "quiz",
    title: "Aced Weekly Quiz",
    description: "TypeScript Fundamentals - 95% Score",
    timestamp: "1 week ago",
    metadata: { points: 200 }
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "course":
      return BookOpen;
    case "achievement":
      return Trophy;
    case "discussion":
      return MessageSquare;
    case "video":
      return Video;
    case "quiz":
      return FileText;
    case "completion":
      return CheckCircle;
    default:
      return BookOpen;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case "achievement":
      return "text-warning";
    case "completion":
      return "text-success";
    case "discussion":
      return "text-info";
    case "video":
      return "text-primary";
    case "quiz":
      return "text-accent";
    default:
      return "text-muted-foreground";
  }
};

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start gap-3 pb-3 last:pb-0 border-b last:border-0">
              <Avatar className="h-8 w-8">
                <AvatarFallback className={`${getActivityColor(activity.type)} bg-muted`}>
                  <Icon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  {activity.metadata?.points && (
                    <Badge variant="secondary" className="text-xs">
                      +{activity.metadata.points} XP
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};