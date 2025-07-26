import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Star, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  title: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  progress: number;
  thumbnail: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  className?: string;
  style?: React.CSSProperties;
  nextLesson?: string;
  isRecommended?: boolean;
  videoUrl?: string;
  enrolled?: boolean;
}

export const CourseCard = ({ 
  title, 
  instructor, 
  duration, 
  students, 
  rating, 
  progress, 
  thumbnail, 
  level, 
  category,
  className,
  style,
  nextLesson,
  isRecommended,
  videoUrl,
  enrolled
}: CourseCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-success/10 text-success border-success/20";
      case "Intermediate":
        return "bg-warning/10 text-warning border-warning/20";
      case "Advanced":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const navigate = useNavigate();

  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-medium hover:-translate-y-1 ${className || ""}`} style={style}>
      <div className="relative overflow-hidden">
        {thumbnail ? (
          <div className="relative">
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100">
                <Play className="h-6 w-6 text-white fill-white" />
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-gradient-hero flex items-center justify-center">
            <Play className="h-12 w-12 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="text-xs bg-black/20 text-white border-0 backdrop-blur-sm">
            {category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className={`${getLevelColor(level)} backdrop-blur-sm`}>
            {level}
          </Badge>
        </div>
        
        {isRecommended && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-accent text-accent-foreground text-xs">
              ⭐ AI Recommended
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors text-base">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">by {instructor}</p>
          
          {nextLesson && (
            <div className="text-sm text-primary font-medium bg-primary/5 px-2 py-1 rounded-md">
              Next: {nextLesson}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {students.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-warning text-warning" />
            {rating}
          </div>
        </div>
        
        {/* {progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )} */}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          variant={"gradient"}
          onClick={() => navigate(`/courses/${encodeURIComponent(title)}`, { state: { videoUrl } })}
        >
          {enrolled ? "Continue Learning" : "Start Course"}
        </Button>
      </CardFooter>
    </Card>
  );
};