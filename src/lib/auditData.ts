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

export interface CitationsProfile {
  dr: number;
  backlinks: number;
  refDomains: number;
}

export interface AuditData {
  input: AuditInput;
  audit: {
    seoScore: number;
    aiCitationScore: number;
    criticalIssues: number;
    trafficTrend: number[];
    citationsProfile: CitationsProfile;
    seoIssues: SEOIssue[];
    competitorSeoIssues: Record<string, SEOIssue[]>;
    aiVisibility: {
      comparison: AIVisibilityComparison[];
      topQuestionsPerformance: QuestionPerformance[];
    };
    quickWins: string[];
    forecast: {
      trafficData: Array<{ month: string; clicks: number; type: "historical" | "trend" | "forecast" }>;
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
    apiKeys: {
      awsBedrock: string;
      gscApi: string;
      ga4Api: string;
      webscrapingApi: string;
      semrushApi: string;
      ahrefsApi: string;
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
    seoScore: 30,
    aiCitationScore: 11,
    criticalIssues: Math.floor(Math.random() * 15) + 3, // 3-17
    trafficTrend: [74, 74, 133, 108, 157, 135, 125, 113],
    citationsProfile: {
      dr: 7,
      backlinks: 791,
      refDomains: 20
    },
    seoIssues: [
      {
        issue: "Missing biomedical structured data",
        page: "/alnylam-rnai",
        impact: "High",
        recommendation: "Add JSON-LD (Organization, MedicalEntity/Drug, ScholarlyArticle) with citations, sameAs IDs, and in-page identifiers for precise entity extraction."
      },
      {
        issue: "Clinical trial schema absent",
        page: "/pipeline-clinical-trials",
        impact: "High",
        recommendation: "Implement ClinicalTrial schema (phase, condition, intervention, status, registry IDs, locations) to improve LLM retrieval and SERP rich results."
      },
      {
        issue: "No LLM-friendly summaries",
        page: "/",
        impact: "Medium",
        recommendation: "Add concise \"Key Takeaways\" and a Q&A block with fact-checked bullets and definitions to aid snippet/LLM comprehension."
      },
      {
        issue: "AI crawler access not configured",
        page: "/",
        impact: "Medium",
        recommendation: "Review robots.txt and meta directives to explicitly allow or disallow GPTBot, Google-Extended, and PerplexityBot per policy, and log bot hits."
      },
      {
        issue: "Publications are PDF-only",
        page: "/congresses-publications",
        impact: "Medium",
        recommendation: "Publish HTML abstracts and metadata pages for each item with open graph, citation lists, and DOI links to maximize crawlability."
      },
      {
        issue: "Weak internal linking to entities",
        page: "/therapeutic-areas",
        impact: "Medium",
        recommendation: "Build hub-and-spoke links to conditions, mechanisms, and trials using descriptive anchors and add BreadcrumbList schema."
      },
      {
        issue: "Missing author and reviewer metadata",
        page: "/alnylam-rnai",
        impact: "Medium",
        recommendation: "Add author bios, medical reviewer credentials, \"last reviewed\" dates, and Article schema fields (author, reviewer, medicalSpecialty)."
      },
      {
        issue: "Ambiguous headings and synonyms",
        page: "/therapeutic-areas",
        impact: "Low",
        recommendation: "Standardize H1/H2 with the primary term plus common synonyms/acronyms to improve entity disambiguation for LLMs."
      },
      {
        issue: "FAQ schema not implemented",
        page: "/",
        impact: "Low",
        recommendation: "Add FAQPage schema with concise, cited answers to common HCP/patient queries to fuel rich results and LLM grounding."
      },
      {
        issue: "Sitemap lacks content segmentation",
        page: "/congresses-publications",
        impact: "Low",
        recommendation: "Create a sitemap index with separate sitemaps for publications, clinical trials, and therapeutic areas including lastmod and hreflang."
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
        { domain: input.website, citations: 3, SERP_mentions: Math.floor(Math.random() * 40) + 20 },
        ...input.competitors.map(competitor => ({
          domain: competitor,
          citations: Math.floor(Math.random() * 50) + 25,
          SERP_mentions: Math.floor(Math.random() * 60) + 30
        }))
      ],
      topQuestionsPerformance: input.targetQuestions.slice(0, 5).map((question, index) => ({
        question,
        rnaiscience: { rank: Math.floor(Math.random() * 5) + 3, citations: 3 },
        topCompetitor: { 
          domain: input.competitors[index % input.competitors.length] || input.competitors[0],
          rank: Math.floor(Math.random() * 2) + 1,
          citations: Math.floor(Math.random() * 5) + 3
        }
      }))
    },
    quickWins: [
      "Unblock crawl/snippets via robots.txt and robots/meta.",
      "Add precise Schema.org structured data on key templates.",
      "Fix canonical/hreflang so the right URL/locale indexes.",
      "Keep XML sitemaps accurate (lastmod) and strengthen internal links.",
      "Improve Core Web Vitals (LCP, INP, CLS) and server responsiveness."
    ],
    forecast: {
      trafficData: [
        { month: "Jan-25", clicks: 74, type: "historical" },
        { month: "Feb-25", clicks: 74, type: "historical" },
        { month: "Mar-25", clicks: 133, type: "historical" },
        { month: "Apr-25", clicks: 108, type: "historical" },
        { month: "May-25", clicks: 157, type: "historical" },
        { month: "Jun-25", clicks: 135, type: "historical" },
        { month: "Jul-25", clicks: 125, type: "historical" },
        { month: "Aug-25", clicks: 113, type: "historical" },
        { month: "Sep-25", clicks: 118, type: "historical" },
        { month: "Oct-25", clicks: 115, type: "trend" },
        { month: "Nov-25", clicks: 130, type: "forecast" },
        { month: "Dec-25", clicks: 180, type: "forecast" },
        { month: "Jan-26", clicks: 230, type: "forecast" },
        { month: "Feb-26", clicks: 278, type: "forecast" },
        { month: "Mar-26", clicks: 355, type: "forecast" }
      ],
      currentTraffic: [74, 74, 133, 108, 157, 135, 125, 113, 118, 115, 130, 180, 230, 278, 355],
      projectedUplift: [74, 74, 133, 108, 157, 135, 125, 113, 118, 115, 130, 180, 230, 278, 355]
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
    apiKeys: {
      awsBedrock: "",
      gscApi: "",
      ga4Api: "",
      webscrapingApi: "",
      semrushApi: "",
      ahrefsApi: ""
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

export const updateAuditSettings = (settings: any): void => {
  const currentData = getLatestAuditData();
  const updatedData = {
    ...currentData,
    settings: {
      ...currentData.settings,
      ...settings,
    },
    meta: {
      ...currentData.meta,
      lastUpdated: new Date().toISOString(),
    },
  };
  saveAuditData(updatedData);
};