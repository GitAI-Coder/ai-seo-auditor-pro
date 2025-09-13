import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Search, Globe, Users, MessageSquare, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createAuditData, saveAuditData, type AuditInput } from "@/lib/auditData";

const AuditForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    website: "",
    region: "",
    audience: "",
    targetQuestions: [""],
    competitors: [""]
  });

  const addField = (field: "targetQuestions" | "competitors") => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeField = (field: "targetQuestions" | "competitors", index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateField = (field: "targetQuestions" | "competitors", index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validQuestions = formData.targetQuestions.filter(q => q.trim());
    const validCompetitors = formData.competitors.filter(c => c.trim());
    
    if (!formData.website || !formData.region || !formData.audience) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (validQuestions.length < 10) {
      toast({
        title: "Insufficient Target Questions",
        description: "Please provide at least 10 target questions",
        variant: "destructive"
      });
      return;
    }

    if (validCompetitors.length === 0) {
      toast({
        title: "No Competitors Added",
        description: "Please add at least one competitor",
        variant: "destructive"
      });
      return;
    }

    // Create and save audit data
    const auditInput: AuditInput = {
      website: formData.website,
      region: formData.region,
      audience: formData.audience,
      targetQuestions: validQuestions,
      competitors: validCompetitors
    };

    const auditData = createAuditData(auditInput);
    saveAuditData(auditData);

    toast({
      title: "Audit Started",
      description: "Your SEO audit data has been generated and saved!",
    });

    // Navigate to progress screen
    setTimeout(() => {
      navigate("/audit/progress");
    }, 1000);
  };

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
            <h2 className="text-4xl font-bold mb-4">AI-SEO Audit Platform</h2>
            <p className="text-xl opacity-90 mb-2">Empowering Healthcare SEO in the Age of AI</p>
            <p className="opacity-80">The first platform designed specifically for healthcare marketers to understand and optimize their digital presence in AI-driven search environments.</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Building2 className="h-6 w-6 mr-3 text-primary" />
              Start Your AI-SEO Audit
            </CardTitle>
            <p className="text-muted-foreground">
              Provide your website details and target information to get a comprehensive SEO analysis 
              optimized for AI-driven search environments in healthcare.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Website URL */}
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center text-base font-medium">
                  <Globe className="h-4 w-4 mr-2 text-primary" />
                  Website URL *
                </Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="text-base"
                  required
                />
              </div>

              {/* Region and Audience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="region" className="flex items-center text-base font-medium">
                    <Globe className="h-4 w-4 mr-2 text-primary" />
                    Region *
                  </Label>
                  <Select value={formData.region} onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Europe">Europe</SelectItem>
                      <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Global">Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience" className="flex items-center text-base font-medium">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    Target Audience *
                  </Label>
                  <Select value={formData.audience} onValueChange={(value) => setFormData(prev => ({ ...prev, audience: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Healthcare Professional (HCP)">Healthcare Professional (HCP)</SelectItem>
                      <SelectItem value="Patients">Patients</SelectItem>
                      <SelectItem value="Caregivers">Caregivers</SelectItem>
                      <SelectItem value="Researchers">Researchers</SelectItem>
                      <SelectItem value="Medical Students">Medical Students</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Target Questions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center text-base font-medium">
                    <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                    Target Questions * (minimum 10)
                  </Label>
                  <Badge variant="outline" className="text-xs">
                    {formData.targetQuestions.filter(q => q.trim()).length}/10 minimum
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add questions that your target audience might ask AI systems about your field or products.
                </p>
                <div className="space-y-3">
                  {formData.targetQuestions.map((question, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Target question ${index + 1}...`}
                        value={question}
                        onChange={(e) => updateField("targetQuestions", index, e.target.value)}
                        className="flex-1"
                      />
                      {formData.targetQuestions.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeField("targetQuestions", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addField("targetQuestions")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Question
                  </Button>
                </div>
              </div>

              {/* Competitors */}
              <div className="space-y-4">
                <Label className="flex items-center text-base font-medium">
                  <Building2 className="h-4 w-4 mr-2 text-primary" />
                  Competitors *
                </Label>
                <p className="text-sm text-muted-foreground">
                  Add competitor websites (one per line) to compare your AI visibility and SEO performance.
                </p>
                <div className="space-y-3">
                  {formData.competitors.map((competitor, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="competitor-website.com"
                        value={competitor}
                        onChange={(e) => updateField("competitors", index, e.target.value)}
                        className="flex-1"
                      />
                      {formData.competitors.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeField("competitors", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addField("competitors")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Competitor
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg"
                  size="lg"
                >
                  Start AI-SEO Audit Analysis
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditForm;