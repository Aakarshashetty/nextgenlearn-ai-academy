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
  type?: "text" | "code" | "math" | "study-plan" | "explanation";
}

const AITutor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! I'm your AI tutor. I'm here to help you learn and understand any topic. What would you like to explore today?",
      timestamp: new Date(),
      type: "text"
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

  // AI Response Generator
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase().trim();

    // General short replies
    if (["no", "nope", "nah"].includes(lowerMessage)) {
      return "Alright! If you have any other questions or need help, just let me know.";
    }
    if (["ok", "okay", "cool", "great", "awesome", "got it", "alright", "sure"].includes(lowerMessage)) {
      return "👍 Let me know if you want to learn or ask about anything else!";
    }
    if (["thanks", "thank you", "thx", "ty", "thankyou"].includes(lowerMessage)) {
      return "You’re welcome! 😊 If you have more questions, I’m here to help.";
    }
    if (["bye", "goodbye", "see you", "see ya", "cya"].includes(lowerMessage)) {
      return "Goodbye! 👋 Have a great day and happy learning!";
    }

    // React/JavaScript related responses
    if (lowerMessage.includes('react') || lowerMessage.includes('js') || lowerMessage.includes('javascript')) {
      if (lowerMessage.includes('hook') || lowerMessage.includes('use')) {
        return `React Hooks are functions that allow you to use state and other React features in functional components. Here are the most common ones:

**useState**: Manages component state
\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

**useEffect**: Handles side effects
\`\`\`jsx
useEffect(() => {
  // Runs after component mounts
  return () => {
    // Cleanup function
  };
}, [dependencies]);
\`\`\`

**useContext**: Shares data across components
\`\`\`jsx
const ThemeContext = createContext();
const theme = useContext(ThemeContext);
\`\`\`

Would you like me to explain any specific hook in detail?`;
      }
      
      if (lowerMessage.includes('component') || lowerMessage.includes('props')) {
        return `React components are reusable UI pieces. Here's a simple example:

\`\`\`jsx
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Usage
<Welcome name="Alice" age={25} />
\`\`\`

**Key concepts:**
- Components start with capital letters
- Props are passed as attributes
- Components can be functional or class-based
- They can be nested and reused

What specific aspect of components would you like to learn more about?`;
      }
    }

    // Math related responses
    if (lowerMessage.includes('math') || lowerMessage.includes('calculus') || lowerMessage.includes('algebra') || lowerMessage.includes('equation')) {
      if (lowerMessage.includes('derivative') || lowerMessage.includes('differentiate')) {
        return `Let me help you with derivatives! Here's a step-by-step approach:

**Basic Rules:**
1. **Power Rule**: d/dx(x^n) = n·x^(n-1)
2. **Constant Rule**: d/dx(c) = 0
3. **Sum Rule**: d/dx(f + g) = d/dx(f) + d/dx(g)

**Example**: Find d/dx(3x² + 2x + 1)
1. d/dx(3x²) = 6x (power rule)
2. d/dx(2x) = 2 (power rule)
3. d/dx(1) = 0 (constant rule)
4. **Answer**: 6x + 2

Would you like me to solve a specific derivative problem?`;
      }
      
      if (lowerMessage.includes('integral') || lowerMessage.includes('integrate')) {
        return `Integration is the reverse of differentiation! Here are the key concepts:

**Basic Rules:**
1. **Power Rule**: ∫x^n dx = x^(n+1)/(n+1) + C (n ≠ -1)
2. **Constant Rule**: ∫c dx = cx + C
3. **Sum Rule**: ∫(f + g) dx = ∫f dx + ∫g dx

**Example**: Find ∫(2x + 3) dx
1. ∫2x dx = x² + C
2. ∫3 dx = 3x + C
3. **Answer**: x² + 3x + C

**Definite Integrals** give you the area under a curve:
∫[a to b] f(x) dx = F(b) - F(a)

What type of integration problem are you working on?`;
      }
    }

    // Study plan responses
    if (lowerMessage.includes('study plan') || lowerMessage.includes('schedule') || lowerMessage.includes('learn') && lowerMessage.includes('days')) {
      return `I'll create a personalized study plan for you! Here's a structured approach:

**Week 1-2: Foundation**
- Day 1-3: Basic concepts and theory
- Day 4-5: Simple exercises
- Day 6-7: Review and practice

**Week 3-4: Intermediate**
- Day 1-3: Advanced concepts
- Day 4-5: Complex problems
- Day 6-7: Projects and applications

**Week 5-6: Advanced**
- Day 1-3: Real-world applications
- Day 4-5: Problem-solving
- Day 6-7: Final review and assessment

**Tips for success:**
- Study in 25-minute focused sessions
- Take 5-minute breaks
- Practice daily, even if just 30 minutes
- Use active recall techniques
- Teach concepts to others

Would you like me to create a more specific plan for your topic?`;
    }

    // General programming responses
    if (lowerMessage.includes('programming') || lowerMessage.includes('code') || lowerMessage.includes('algorithm')) {
      return `Programming is all about solving problems with code! Here are the fundamental concepts:

**Core Principles:**
1. **Variables**: Store and manipulate data
2. **Control Flow**: if/else, loops, functions
3. **Data Structures**: Arrays, objects, lists
4. **Algorithms**: Step-by-step problem solving

**Example - Simple Algorithm:**
\`\`\`javascript
function findMax(numbers) {
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}
\`\`\`

**Learning Path:**
1. Start with basic syntax
2. Practice with small projects
3. Learn data structures
4. Study algorithms
5. Build real applications

What programming language or concept interests you most?`;
    }

    // Machine Learning responses
    if (lowerMessage.includes('machine learning') || lowerMessage.includes('ai') || lowerMessage.includes('ml')) {
      return `Machine Learning is fascinating! Here's a simple breakdown:

**Types of ML:**
1. **Supervised Learning**: Learn from labeled data
2. **Unsupervised Learning**: Find patterns in unlabeled data
3. **Reinforcement Learning**: Learn through trial and error

**Basic Example - Linear Regression:**
\`\`\`python
import numpy as np
from sklearn.linear_model import LinearRegression

# Sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Predict
prediction = model.predict([[6]])
print(f"Prediction: {prediction[0]}")
\`\`\`

**Key Concepts:**
- Features (input data)
- Labels (output data)
- Training vs Testing data
- Model evaluation metrics

Would you like to explore a specific ML algorithm or application?`;
    }

    // Default responses for general questions
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! I'm excited to help you learn today. What topic would you like to explore? I can help with:
- Programming and coding
- Mathematics and problem-solving
- Study strategies and planning
- Concept explanations
- And much more!

Just ask me anything!`;
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return `I'm your AI tutor and I can help you with many subjects! Here's what I can do:

**📚 Academic Subjects:**
- Mathematics (Algebra, Calculus, Statistics)
- Programming (JavaScript, Python, React, etc.)
- Computer Science concepts
- Physics and Chemistry basics

**🎯 Learning Support:**
- Create personalized study plans
- Explain complex concepts simply
- Provide step-by-step solutions
- Give coding examples and explanations
- Help with problem-solving strategies

**💡 Study Tips:**
- Time management techniques
- Memory and retention strategies
- Effective note-taking methods
- Test preparation advice

What would you like to learn about today?`;
    }

    // Generic helpful response
    return `I understand you're asking about "${userMessage}". Let me help you with that!

To give you the best possible answer, could you provide a bit more context? For example:
- What specific aspect are you struggling with?
- Are you looking for a step-by-step explanation?
- Do you need practical examples?
- Is this for a specific course or project?

The more details you share, the better I can assist you! 😊`;
  };

  const handleSendMessage = () => {
    if (!message.trim() || isTyping) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    setIsTyping(true);

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiResponse,
        timestamp: new Date(),
        type: aiResponse.includes('```') ? "code" : "text"
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="flex h-full w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 h-full overflow-y-auto">
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
                        {isTyping ? "Typing..." : "Online"}
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
                              {msg.type === "code" ? (
                                <div className="whitespace-pre-wrap font-mono text-sm">
                                  {msg.content}
                                </div>
                              ) : (
                                <div className="whitespace-pre-wrap text-sm">
                                  {msg.content}
                                </div>
                              )}
                              <span className="text-xs opacity-70 mt-1 block">
                                {msg.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-muted rounded-lg px-4 py-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
                          </div>
                        )}
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
                          disabled={isTyping}
                        />
                        <Button onClick={handleSendMessage} disabled={!message.trim() || isTyping}>
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
                        disabled={isTyping}
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
                        <span className="font-medium">{messages.filter(m => m.role === 'user').length}</span>
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