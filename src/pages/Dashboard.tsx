import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, 
  Download, Settings, Bell, ExternalLink, Search, Target,
  Users, Globe, MessageSquare, Zap, Award, ArrowUp
} from "lucide-react";

// Mock data based on the JSON structure provided
const mockAuditData = {
  "input": {
    "website": "rnaiscience.com",
    "region": "United States",
    "audience": "Healthcare Professional (HCP)",
    "targetQuestions": [
      "What is RNA interference (RNAi), and how does it work?",
      "What are current best practices for diagnosing hereditary ATTR amyloidosis?",
      "Where can healthcare professionals find educational tools on RNAi therapies?",
      "List ongoing clinical trials involving RNA interference for rare diseases.",
      "Show recent congress updates or publications about RNAi in amyloidosis.",
      "Download patient education resources for RNAi-based therapies.",
      "How can HCPs connect with scientific liaisons for information about RNAi?",
      "List diagnostic aids available for rare cardiomyopathies.",
      "Share recent case studies about RNAi therapies in the United States.",
      "What is the process for reporting adverse events related to RNAi therapies?"
    ],
    "competitors": [
      "pfizermedical.pfizerpro.com",
      "ionispharma.com",
      "medicalinformation.astrazeneca-us.com",
      "scientific-exchange.com"
    ]
  },
  "audit": {
    "seoScore": 74,
    "aiCitationScore": 61,
    "criticalIssues": 8,
    "trafficTrend": [1200, 1250, 1230, 1180, 1300, 1350],
    "opportunityGaps": [
      {
        "issue": "Missing FAQ schema for key RNAi questions",
        "page": "/faq/rnai",
        "impact": "High",
        "effort": "Low",
        "recommendation": "Add FAQ Structured Data for all RNAi questions",
        "quickWin": true
      },
      {
        "issue": "Brand does not appear in AI/LLM citations for 'hereditary ATTR amyloidosis'",
        "page": "/conditions/amyloidosis",
        "impact": "High",
        "effort": "Medium",
        "recommendation": "Optimize pages for AI visibility with targeted content and structured data",
        "quickWin": false
      },
      {
        "issue": "Competitors ranking for 'RNAi clinical trials'",
        "page": "/clinical-trials/rnai",
        "impact": "Medium",
        "effort": "Medium",
        "recommendation": "Add regularly updated clinical trials widget and optimize metadata",
        "quickWin": false
      }
    ],
    "seoIssues": [
      {
        "issue": "Mobile site speed is below industry benchmark.",
        "page": "/",
        "impact": "High",
        "recommendation": "Enable caching, optimize images, and reduce JS payload."
      },
      {
        "issue": "No XML sitemap found.",
        "page": "/",
        "impact": "Medium",
        "recommendation": "Generate and submit an XML sitemap to Google Search Console."
      },
      {
        "issue": "Missing alt attributes for images in patient education resources.",
        "page": "/education/patient-resources",
        "impact": "Medium",
        "recommendation": "Add descriptive alt text for accessibility and SEO."
      },
      {
        "issue": "Title tags are missing for some clinical trials subpages.",
        "page": "/clinical-trials/",
        "impact": "Low",
        "recommendation": "Add unique, keyword-rich title tags."
      }
    ],
    "aiVisibility": {
      "comparison": [
        { "domain": "rnaiscience.com", "citations": 23, "SERP_mentions": 27 },
        { "domain": "pfizermedical.pfizerpro.com", "citations": 43, "SERP_mentions": 51 },
        { "domain": "ionispharma.com", "citations": 40, "SERP_mentions": 47 },
        { "domain": "medicalinformation.astrazeneca-us.com", "citations": 32, "SERP_mentions": 33 },
        { "domain": "scientific-exchange.com", "citations": 30, "SERP_mentions": 38 }
      ],
      "topQuestionsPerformance": [
        {
          "question": "What is RNA interference (RNAi), and how does it work?",
          "rnaiscience": {"rank": 3, "citations": 2},
          "topCompetitor": {"domain": "ionispharma.com", "rank": 1, "citations": 6}
        },
        {
          "question": "Where can healthcare professionals find educational tools on RNAi therapies?",
          "rnaiscience": {"rank": 4, "citations": 1},
          "topCompetitor": {"domain": "pfizermedical.pfizerpro.com", "rank": 1, "citations": 5}
        },
        {
          "question": "What are current best practices for diagnosing hereditary ATTR amyloidosis?",
          "rnaiscience": {"rank": 5, "citations": 1},
          "topCompetitor": {"domain": "medicalinformation.astrazeneca-us.com", "rank": 1, "citations": 4}
        }
      ]
    },
    "quickWins": [
      "Add FAQPage schema for all key questions on RNAi and amyloidosis.",
      "Submit XML sitemap and fix crawling issues.",
      "Improve mobile speed by optimizing images and deferring non-critical JS.",
      "Enhance content for top 3 non-branded treatment questions.",
      "Increase internal linking between patient resources and HCP landing pages.",
      "Update alt attributes for all education resource images.",
      "Add rich snippets for clinical trials and recent case studies.",
      "Monitor AI/LLM citations every month for new questions and topics."
    ],
    "forecast": {
      "currentTraffic": [1200, 1250, 1230, 1180, 1300, 1350],
      "projectedUplift": [1280, 1340, 1400, 1460, 1550, 1630]
    }
  }
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-hero-gradient text-white p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">AI-SEO Audit</h1>
                <p className="text-sm opacity-90">Indegene NexGen AI Surfers</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockAuditData.audit.seoScore}/100</div>
              <Progress value={mockAuditData.audit.seoScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Citation Score</CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{mockAuditData.audit.aiCitationScore}/100</div>
              <Progress value={mockAuditData.audit.aiCitationScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{mockAuditData.audit.criticalIssues}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Require immediate attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Traffic Trend</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">+12.5%</div>
              <p className="text-xs text-muted-foreground mt-1">
                vs last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="seo-issues">SEO Issues</TabsTrigger>
            <TabsTrigger value="ai-visibility">AI Visibility</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traffic Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={mockAuditData.audit.trafficTrend.map((value, index) => ({ month: `Month ${index + 1}`, traffic: value }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="traffic" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* AI Citation Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Citation Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockAuditData.audit.aiVisibility.comparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="domain" angle={-45} textAnchor="end" height={80} fontSize={10} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="citations" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Wins */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-warning" />
                  Quick Wins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAuditData.audit.quickWins.slice(0, 5).map((win, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">{win}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo-issues" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Issues Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAuditData.audit.seoIssues.map((issue, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{issue.issue}</h4>
                        <Badge variant={getImpactColor(issue.impact) as any}>
                          {issue.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Page: {issue.page}
                      </p>
                      <p className="text-sm">{issue.recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-visibility" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Citations by Domain</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockAuditData.audit.aiVisibility.comparison}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry: any) => `${entry.domain.split('.')[0]}: ${entry.value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="citations"
                      >
                        {mockAuditData.audit.aiVisibility.comparison.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Questions Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAuditData.audit.aiVisibility.topQuestionsPerformance.map((question, index) => (
                      <div key={index} className="space-y-2">
                        <p className="text-sm font-medium">{question.question}</p>
                        <div className="flex justify-between text-xs">
                          <span>Your Rank: #{question.rnaiscience.rank}</span>
                          <span>Citations: {question.rnaiscience.citations}</span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Top Competitor: {question.topCompetitor.domain}</span>
                          <span>#{question.topCompetitor.rank} ({question.topCompetitor.citations} citations)</span>
                        </div>
                        <Progress value={(6 - question.rnaiscience.rank) * 20} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="competitors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Competitor Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockAuditData.input.competitors.map((competitor, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          {competitor}
                        </h4>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Site
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">AI Citations:</span>
                          <span className="ml-2 font-medium">
                            {mockAuditData.audit.aiVisibility.comparison.find(c => c.domain === competitor)?.citations || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">SERP Mentions:</span>
                          <span className="ml-2 font-medium">
                            {mockAuditData.audit.aiVisibility.comparison.find(c => c.domain === competitor)?.SERP_mentions || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Opportunity Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAuditData.audit.opportunityGaps.map((gap, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{gap.issue}</h4>
                        <div className="flex space-x-2">
                        <Badge variant={getImpactColor(gap.impact) as any}>
                          {gap.impact} Impact
                        </Badge>
                        <Badge variant={gap.effort === "Low" ? "default" : "secondary"}>
                          {gap.effort} Effort
                        </Badge>
                          {gap.quickWin && (
                            <Badge variant="outline" className="border-warning text-warning">
                              Quick Win
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Page: {gap.page}
                      </p>
                      <p className="text-sm">{gap.recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      data={mockAuditData.audit.forecast.currentTraffic.map((value, index) => ({ month: `M${index + 1}`, traffic: value }))}
                      type="monotone" 
                      dataKey="traffic" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeDasharray="5 5"
                      name="Current Trend"
                    />
                    <Line 
                      data={mockAuditData.audit.forecast.projectedUplift.map((value, index) => ({ month: `M${index + 1}`, traffic: value }))}
                      type="monotone" 
                      dataKey="traffic" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Projected Growth"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;