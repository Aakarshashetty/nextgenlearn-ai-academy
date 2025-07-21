import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Star, Play } from "lucide-react";

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
  style
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

  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-medium hover:-translate-y-1 ${className || ""}`} style={style}>
      <div className="relative">
        <div className="aspect-video bg-gradient-hero flex items-center justify-center">
          <Play className="h-12 w-12 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className={getLevelColor(level)}>
            {level}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">by {instructor}</p>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {students.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-warning text-warning" />
            {rating}
          </div>
        </div>
        
        {progress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant={progress > 0 ? "default" : "gradient"}>
          {progress > 0 ? "Continue Learning" : "Start Course"}
        </Button>
      </CardFooter>
    </Card>
  );
};