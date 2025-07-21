import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Brain, 
  Send, 
  Lightbulb, 
  BookOpen, 
  Code, 
  Calculator,
  MessageSquare,
  Zap,
  Star,
  Mic,
  Paperclip
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  type?: "text" | "code" | "math";
}

const AITutor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! I'm your AI tutor. I'm here to help you learn and understand any topic. What would you like to explore today?",
      timestamp: new Date(),
    }
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const quickPrompts = [
    {
      icon: Code,
      title: "Explain React Hooks",
      description: "Learn about useState and useEffect",
      prompt: "Can you explain React hooks with practical examples?"
    },
    {
      icon: Calculator,
      title: "Solve Math Problem",
      description: "Step-by-step solutions",
      prompt: "Help me solve calculus problems step by step"
    },
    {
      icon: BookOpen,
      title: "Study Plan",
      description: "Create personalized schedule",
      prompt: "Create a study plan for learning JavaScript in 30 days"
    },
    {
      icon: Lightbulb,
      title: "Concept Clarification",
      description: "Understand difficult topics",
      prompt: "Explain machine learning concepts in simple terms"
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "I understand your question. Let me provide a comprehensive explanation...",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className="flex-1 lg:ml-64">
          <Header 
            onMenuClick={toggleSidebar}
            isDarkMode={isDarkMode}
            onThemeToggle={toggleTheme}
          />
          
          <main className="container mx-auto px-4 py-6 h-[calc(100vh-4rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
              {/* Chat Interface */}
              <div className="lg:col-span-3 flex flex-col h-full">
                <Card className="flex-1 flex flex-col">
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                      AI Tutor
                      <Badge variant="secondary" className="ml-auto">
                        <Zap className="h-3 w-3 mr-1" />
                        Online
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col p-0">
                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                msg.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <span className="text-xs opacity-70 mt-1 block">
                                {msg.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    {/* Input */}
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mic className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Ask me anything about your studies..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage} disabled={!message.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Prompts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Start</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickPrompt(prompt.prompt)}
                        className="w-full p-3 text-left rounded-lg border hover:bg-accent transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <prompt.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{prompt.title}</p>
                            <p className="text-xs text-muted-foreground">{prompt.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>

                {/* AI Capabilities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="h-4 w-4 text-warning" />
                      AI Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MessageSquare className="h-3 w-3 text-primary" />
                        Natural Language Q&A
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Code className="h-3 w-3 text-primary" />
                        Code Explanation & Debug
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calculator className="h-3 w-3 text-primary" />
                        Math Problem Solving
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-3 w-3 text-primary" />
                        Study Plan Creation
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Lightbulb className="h-3 w-3 text-primary" />
                        Concept Simplification
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Usage Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Today's Usage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Questions Asked</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Topics Explored</span>
                        <span className="font-medium">5</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Learning Time</span>
                        <span className="font-medium">2h 15m</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AITutor;