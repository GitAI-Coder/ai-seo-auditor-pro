import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Globe, 
  Brain, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Loader2,
  TrendingUp,
  Target,
  Zap
} from "lucide-react";

const auditSteps = [
  {
    id: 1,
    title: "Website Analysis",
    description: "Scanning website structure and content",
    icon: Globe,
    duration: 2000
  },
  {
    id: 2,
    title: "AI Visibility Check",
    description: "Testing AI model responses for target questions",
    icon: Brain,
    duration: 3000
  },
  {
    id: 3,
    title: "SEO Performance",
    description: "Analyzing technical SEO and content optimization",
    icon: TrendingUp,
    duration: 2500
  },
  {
    id: 4,
    title: "Competitor Analysis",
    description: "Comparing with competitor performance",
    icon: Target,
    duration: 2000
  },
  {
    id: 5,
    title: "Report Generation",
    description: "Creating comprehensive audit report",
    icon: BarChart3,
    duration: 1500
  }
];

const AuditProgress = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    let stepIndex = 0;
    let totalProgress = 0;

    const runStep = () => {
      if (stepIndex >= auditSteps.length) {
        // All steps completed, navigate to dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
        return;
      }

      const step = auditSteps[stepIndex];
      setCurrentStep(stepIndex);

      // Animate progress for current step
      const stepProgress = 100 / auditSteps.length;
      const startProgress = totalProgress;
      const endProgress = totalProgress + stepProgress;
      
      let currentProgress = startProgress;
      const progressInterval = setInterval(() => {
        currentProgress += 2;
        if (currentProgress >= endProgress) {
          currentProgress = endProgress;
          clearInterval(progressInterval);
          
          // Mark step as completed
          setCompletedSteps(prev => [...prev, stepIndex]);
          totalProgress = endProgress;
          setProgress(totalProgress);
          
          // Move to next step
          stepIndex++;
          setTimeout(runStep, 500);
        } else {
          setProgress(currentProgress);
        }
      }, step.duration / 50);
    };

    // Start the audit process
    setTimeout(runStep, 1000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-hero-gradient text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">AI-SEO Audit</h1>
              <p className="text-sm opacity-90">Indegene NexGen AI Surfers</p>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Processing Your Audit</h2>
            <p className="text-xl opacity-90">Our AI is analyzing your website and generating insights...</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="h-6 w-6 mr-3 text-primary animate-pulse" />
              Audit in Progress
            </CardTitle>
            <p className="text-muted-foreground">
              Please wait while we analyze your website and generate your comprehensive AI-SEO audit report.
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Overall Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Overall Progress</h3>
                <Badge variant="outline" className="text-sm">
                  {Math.round(progress)}% Complete
                </Badge>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Audit Steps</h3>
              <div className="space-y-4">
                {auditSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = completedSteps.includes(index);
                  const isCurrent = currentStep === index;
                  const isPending = index > currentStep;

                  return (
                    <div 
                      key={step.id}
                      className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                          : isCurrent 
                            ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' 
                            : 'bg-muted/30 border-muted'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        isCompleted 
                          ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-400' 
                          : isCurrent 
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-400' 
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : isCurrent ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <StepIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step.title}
                        </h4>
                        <p className={`text-sm ${
                          isCompleted || isCurrent ? 'text-muted-foreground' : 'text-muted-foreground/70'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      {isCompleted && (
                        <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-800 dark:text-green-100 dark:border-green-700">
                          Complete
                        </Badge>
                      )}
                      {isCurrent && (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-700">
                          Processing
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium text-sm">AI-Powered</h4>
                    <p className="text-xs text-muted-foreground">Advanced AI analysis</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium text-sm">Healthcare Focus</h4>
                    <p className="text-xs text-muted-foreground">Industry-specific insights</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium text-sm">Comprehensive</h4>
                    <p className="text-xs text-muted-foreground">Detailed reporting</p>
                  </div>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditProgress;