import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Users, Globe, MessageSquare, Zap, Award, ArrowUp, Plus
} from "lucide-react";
import { getLatestAuditData, type AuditData } from "@/lib/auditData";


const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [auditData, setAuditData] = useState<AuditData | null>(null);

  useEffect(() => {
    const data = getLatestAuditData();
    if (!data) {
      // Redirect to audit form if no data found
      navigate("/audit");
      return;
    }
    // Clear old data to refresh with new structure
    if (!data.audit.citationsProfile) {
      localStorage.removeItem('aiseo_audit_data');
      navigate("/audit");
      return;
    }
    setAuditData(data);
  }, [navigate]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  if (!auditData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Search className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Loading Audit Data...</h2>
          <p className="text-muted-foreground">Please wait while we load your audit results.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-hero-gradient text-white p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="h-8 w-8" />
              <div>
                <Link to="/" className="hover:opacity-80 transition-opacity">
                  <h1 className="text-2xl font-bold">AI-SEO Audit</h1>
                </Link>
                <p className="text-sm opacity-90">Indegene NexGen AI Surfers</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/audit">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Plus className="h-4 w-4 mr-2" />
                New Audit
              </Button>
            </Link>
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
        {/* Website Name */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Website: RNAiscience.com
          </h2>
        </div>
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{auditData.audit.seoScore}/100</div>
              <Progress value={auditData.audit.seoScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Citation Score</CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{auditData.audit.aiCitationScore}/100</div>
              <Progress value={auditData.audit.aiCitationScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{auditData.audit.criticalIssues}</div>
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
              {/* Clicks Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Clicks Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                     <LineChart data={[
                       { month: "Jan-25", clicks: 74 },
                       { month: "Feb-25", clicks: 74 },
                       { month: "Mar-25", clicks: 133 },
                       { month: "Apr-25", clicks: 108 },
                       { month: "May-25", clicks: 157 },
                       { month: "Jun-25", clicks: 135 },
                       { month: "Jul-25", clicks: 125 },
                       { month: "Aug-25", clicks: 113 }
                     ]}>
                       <CartesianGrid strokeDasharray="3 3" />
                       <XAxis dataKey="month" />
                       <YAxis />
                       <Tooltip />
                       <Line type="monotone" dataKey="clicks" stroke="hsl(var(--primary))" strokeWidth={2} />
                     </LineChart>
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
                     <BarChart data={auditData.audit.aiVisibility.comparison}>
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

            {/* Citations Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Citations Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* DR Score Donut */}
                  <div className="text-center">
                    <ResponsiveContainer width="100%" height={120}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "DR", value: auditData.audit.citationsProfile.dr },
                            { name: "Remaining", value: 100 - auditData.audit.citationsProfile.dr }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={35}
                          outerRadius={50}
                          startAngle={90}
                          endAngle={450}
                          dataKey="value"
                        >
                          <Cell fill="hsl(var(--primary))" />
                          <Cell fill="hsl(var(--muted))" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-primary">{auditData.audit.citationsProfile.dr}</div>
                      <div className="text-sm text-muted-foreground">DR Score</div>
                    </div>
                  </div>

                  {/* Backlinks Donut */}
                  <div className="text-center">
                    <ResponsiveContainer width="100%" height={120}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Backlinks", value: auditData.audit.citationsProfile.backlinks },
                            { name: "Remaining", value: Math.max(1000 - auditData.audit.citationsProfile.backlinks, 0) }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={35}
                          outerRadius={50}
                          startAngle={90}
                          endAngle={450}
                          dataKey="value"
                        >
                          <Cell fill="hsl(var(--accent))" />
                          <Cell fill="hsl(var(--muted))" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-accent">{auditData.audit.citationsProfile.backlinks}</div>
                      <div className="text-sm text-muted-foreground">Backlinks</div>
                    </div>
                  </div>

                  {/* Referring Domains Donut */}
                  <div className="text-center">
                    <ResponsiveContainer width="100%" height={120}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Domains", value: auditData.audit.citationsProfile.refDomains },
                            { name: "Remaining", value: Math.max(100 - auditData.audit.citationsProfile.refDomains, 0) }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={35}
                          outerRadius={50}
                          startAngle={90}
                          endAngle={450}
                          dataKey="value"
                        >
                          <Cell fill="hsl(var(--secondary))" />
                          <Cell fill="hsl(var(--muted))" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-secondary">{auditData.audit.citationsProfile.refDomains}</div>
                      <div className="text-sm text-muted-foreground">Ref. Domains</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Wins */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-warning" />
                  AI SEO Technical fixes:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                   {auditData.audit.quickWins.slice(0, 5).map((win, index) => (
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
                   {auditData.audit.seoIssues.map((issue, index) => (
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
                         data={auditData.audit.aiVisibility.comparison}
                         cx="50%"
                         cy="50%"
                         labelLine={false}
                         label={(entry: any) => `${entry.domain.split('.')[0]}: ${entry.value}`}
                         outerRadius={80}
                         fill="#8884d8"
                         dataKey="citations"
                       >
                         {auditData.audit.aiVisibility.comparison.map((entry, index) => (
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
                     {auditData.audit.aiVisibility.topQuestionsPerformance.map((question, index) => (
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
                  {auditData.input.competitors.map((competitor, index) => (
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
                            {auditData.audit.aiVisibility.comparison.find(c => c.domain === competitor)?.citations || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">SERP Mentions:</span>
                          <span className="ml-2 font-medium">
                            {auditData.audit.aiVisibility.comparison.find(c => c.domain === competitor)?.SERP_mentions || 0}
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
                  {auditData.audit.opportunityGaps.map((gap, index) => (
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
                       data={auditData.audit.forecast.currentTraffic.map((value, index) => ({ month: `M${index + 1}`, traffic: value }))}
                       type="monotone" 
                       dataKey="traffic" 
                       stroke="hsl(var(--muted-foreground))" 
                       strokeDasharray="5 5"
                       name="Current Trend"
                     />
                     <Line 
                       data={auditData.audit.forecast.projectedUplift.map((value, index) => ({ month: `M${index + 1}`, traffic: value }))}
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