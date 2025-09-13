// JSON-based data storage and management for AI-SEO Audit

export interface AuditInput {
  website: string;
  region: string;
  audience: string;
  targetQuestions: string[];
  competitors: string[];
}

export interface SEOIssue {
  issue: string;
  page: string;
  impact: "High" | "Medium" | "Low";
  recommendation: string;
}

export interface OpportunityGap {
  issue: string;
  page: string;
  impact: "High" | "Medium" | "Low";
  effort: "High" | "Medium" | "Low";
  recommendation: string;
  quickWin: boolean;
}

export interface AIVisibilityComparison {
  domain: string;
  citations: number;
  SERP_mentions: number;
}

export interface QuestionPerformance {
  question: string;
  rnaiscience: { rank: number; citations: number };
  topCompetitor: { domain: string; rank: number; citations: number };
}

export interface AuditData {
  input: AuditInput;
  audit: {
    seoScore: number;
    aiCitationScore: number;
    criticalIssues: number;
    trafficTrend: number[];
    opportunityGaps: OpportunityGap[];
    seoIssues: SEOIssue[];
    competitorSeoIssues: Record<string, SEOIssue[]>;
    aiVisibility: {
      comparison: AIVisibilityComparison[];
      topQuestionsPerformance: QuestionPerformance[];
    };
    quickWins: string[];
    forecast: {
      currentTraffic: number[];
      projectedUplift: number[];
    };
  };
  settings: {
    mailNotifications: {
      enabled: boolean;
      frequency: string[];
      recipients: string[];
      attachAuditFile: boolean;
    };
    downloadOption: boolean;
    apiPlaceholders: {
      awsBedrock: string;
      otherAPIs: string[];
    };
  };
  meta: {
    lastUpdated: string;
  };
}

// Default audit data template
export const createAuditData = (input: AuditInput): AuditData => ({
  input,
  audit: {
    seoScore: Math.floor(Math.random() * 30) + 60, // 60-89
    aiCitationScore: Math.floor(Math.random() * 40) + 50, // 50-89
    criticalIssues: Math.floor(Math.random() * 15) + 3, // 3-17
    trafficTrend: Array.from({ length: 6 }, () => Math.floor(Math.random() * 300) + 1000),
    opportunityGaps: [
      {
        issue: "Missing FAQ schema for key questions",
        page: "/faq",
        impact: "High",
        effort: "Low",
        recommendation: "Add FAQ Structured Data for key questions",
        quickWin: true
      },
      {
        issue: "Brand does not appear in AI/LLM citations for key terms",
        page: "/conditions",
        impact: "High",
        effort: "Medium",
        recommendation: "Optimize pages for AI visibility with targeted content and structured data",
        quickWin: false
      },
      {
        issue: "Competitors ranking for important industry keywords",
        page: "/treatments",
        impact: "Medium",
        effort: "Medium",
        recommendation: "Add regularly updated content and optimize metadata",
        quickWin: false
      }
    ],
    seoIssues: [
      {
        issue: "Mobile site speed is below industry benchmark",
        page: "/",
        impact: "High",
        recommendation: "Enable caching, optimize images, and reduce JS payload"
      },
      {
        issue: "No XML sitemap found",
        page: "/",
        impact: "Medium",
        recommendation: "Generate and submit an XML sitemap to Google Search Console"
      },
      {
        issue: "Missing alt attributes for images",
        page: "/resources",
        impact: "Medium",
        recommendation: "Add descriptive alt text for accessibility and SEO"
      },
      {
        issue: "Title tags are missing for some pages",
        page: "/subpages",
        impact: "Low",
        recommendation: "Add unique, keyword-rich title tags"
      }
    ],
    competitorSeoIssues: input.competitors.reduce((acc, competitor) => {
      acc[competitor] = [
        {
          issue: "Several pages miss FAQ structured data",
          page: "/faq",
          impact: "High",
          recommendation: "Add FAQ schema to top-cited pages"
        },
        {
          issue: "Large JavaScript files delay LCP",
          page: "/",
          impact: "High",
          recommendation: "Code split and defer non-critical JS"
        },
        {
          issue: "Duplicate meta descriptions on pages",
          page: "/products",
          impact: "Medium",
          recommendation: "Ensure all meta descriptions are unique"
        }
      ];
      return acc;
    }, {} as Record<string, SEOIssue[]>),
    aiVisibility: {
      comparison: [
        { domain: input.website, citations: Math.floor(Math.random() * 30) + 15, SERP_mentions: Math.floor(Math.random() * 40) + 20 },
        ...input.competitors.map(competitor => ({
          domain: competitor,
          citations: Math.floor(Math.random() * 50) + 25,
          SERP_mentions: Math.floor(Math.random() * 60) + 30
        }))
      ],
      topQuestionsPerformance: input.targetQuestions.slice(0, 5).map((question, index) => ({
        question,
        rnaiscience: { rank: Math.floor(Math.random() * 5) + 3, citations: Math.floor(Math.random() * 3) + 1 },
        topCompetitor: { 
          domain: input.competitors[index % input.competitors.length] || input.competitors[0],
          rank: Math.floor(Math.random() * 2) + 1,
          citations: Math.floor(Math.random() * 5) + 3
        }
      }))
    },
    quickWins: [
      "Add FAQPage schema for all key questions",
      "Submit XML sitemap and fix crawling issues",
      "Improve mobile speed by optimizing images",
      "Enhance content for top treatment questions",
      "Increase internal linking between resources",
      "Update alt attributes for all images",
      "Add rich snippets for key content",
      "Monitor AI/LLM citations monthly"
    ],
    forecast: {
      currentTraffic: Array.from({ length: 6 }, () => Math.floor(Math.random() * 300) + 1000),
      projectedUplift: Array.from({ length: 6 }, (_, i) => Math.floor(Math.random() * 300) + 1200 + (i * 50))
    }
  },
  settings: {
    mailNotifications: {
      enabled: true,
      frequency: ["weekly", "monthly"],
      recipients: [`admin@${input.website.replace(/https?:\/\//, '')}`],
      attachAuditFile: true
    },
    downloadOption: true,
    apiPlaceholders: {
      awsBedrock: "<BEDROCK_API_KEY_PLACEHOLDER>",
      otherAPIs: ["<GA4_PLACEHOLDER>", "<GSC_PLACEHOLDER>"]
    }
  },
  meta: {
    lastUpdated: new Date().toISOString()
  }
});

// Local storage management
const STORAGE_KEY = 'aiseo_audit_data';

export const saveAuditData = (data: AuditData): void => {
  try {
    const existingData = getAuditHistory();
    const newData = [...existingData, data];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } catch (error) {
    console.error('Failed to save audit data:', error);
  }
};

export const getLatestAuditData = (): AuditData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    const auditHistory: AuditData[] = JSON.parse(data);
    return auditHistory[auditHistory.length - 1] || null;
  } catch (error) {
    console.error('Failed to retrieve audit data:', error);
    return null;
  }
};

export const getAuditHistory = (): AuditData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to retrieve audit history:', error);
    return [];
  }
};

export const clearAuditData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear audit data:', error);
  }
};