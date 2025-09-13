import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Search, Target, Users, TrendingUp, Zap, 
  Brain, Shield, BarChart3, Globe, CheckCircle
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-2">
              <Search className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">AI-SEO Audit</h1>
                <p className="text-sm opacity-90">Indegene NexGen AI Surfers</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link to="/audit">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  New Audit
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <Badge className="mb-6 bg-white/10 text-white border-white/20">
            🚀 Indegene Hackathon Demo
          </Badge>

          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6">AI-SEO Audit Platform</h2>
            <p className="text-xl mb-4 opacity-90">Empowering Healthcare SEO in the Age of AI</p>
            <p className="text-lg opacity-80 mb-8">
              The first platform designed specifically for healthcare marketers to understand 
              and optimize their digital presence in AI-driven search environments.
            </p>
            
            <div className="flex justify-center space-x-4">
              <Link to="/audit">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Start Free Audit
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  View Sample Report
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Healthcare Sites Analyzed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">85%</div>
              <p className="text-muted-foreground">Average SEO Score Improvement</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">3x</div>
              <p className="text-muted-foreground">Faster AI Citation Discovery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-6 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Healthcare Needs Specialized SEO</h3>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Traditional SEO tools don't understand healthcare regulations, AI citation patterns, 
              or the unique challenges of medical content optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <Brain className="h-12 w-12 mb-4 text-accent" />
                <CardTitle>AI Visibility Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">
                  Test how AI systems like ChatGPT and Perplexity cite your healthcare content
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <Shield className="h-12 w-12 mb-4 text-success" />
                <CardTitle>Healthcare SEO Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">
                  Specialized SEO analysis for pharmaceutical and medical device companies
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <BarChart3 className="h-12 w-12 mb-4 text-warning" />
                <CardTitle>Competitive Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">
                  See how competitors rank for key healthcare queries and identify gaps
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <Zap className="h-12 w-12 mb-4 text-accent" />
                <CardTitle>Quick Wins Identification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">
                  Get prioritized recommendations for immediate SEO improvements
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">See It In Action</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            This demo showcases real healthcare SEO challenges and AI-powered solutions. 
            No signup required—dive right into the platform.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link to="/audit">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                Try Demo Audit
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">
                AI Features Tour
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-hero-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Optimize for the AI Era?</h3>
          <p className="text-lg opacity-90 mb-8">
            Join forward-thinking healthcare marketers who are already preparing for AI-driven search.
          </p>
          
          <Link to="/audit">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start Your Free Audit Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
