import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AuditData {
  input: {
    website: string;
    region: string;
    audience: string;
    targetQuestions: string[];
    competitors: string[];
  };
  audit: {
    seoScore: number;
    aiCitationScore: number;
    criticalIssues: number;
    trafficTrend: number[];
    seoIssues: Array<{
      issue: string;
      page: string;
      impact: string;
      recommendation: string;
    }>;
    quickWins: string[];
    forecast: {
      trafficData: Array<{
        month: string;
        clicks: number;
        type: string;
      }>;
    };
    aiVisibility?: {
      comparison: Array<{
        domain: string;
        citations: number;
        SERP_mentions: number;
      }>;
    };
    citationsProfile?: {
      dr: number;
      backlinks: number;
      refDomains: number;
    };
  };
}

function generateExcelCSV(auditData: AuditData): string {
  let csv = '';
  
  // Overview section
  csv += 'AI-SEO Audit Report\n';
  csv += `Website,${auditData.input.website}\n`;
  csv += `Region,${auditData.input.region}\n`;
  csv += `Audience,${auditData.input.audience}\n`;
  csv += `SEO Score,${auditData.audit.seoScore}\n`;
  csv += `AI Citation Score,${auditData.audit.aiCitationScore}\n`;
  csv += `Critical Issues,${auditData.audit.criticalIssues}\n`;
  csv += `Target Questions,"${auditData.input.targetQuestions.join('; ')}"\n`;
  csv += `Competitors,"${auditData.input.competitors.join('; ')}"\n\n`;
  
  // SEO Issues section
  csv += 'SEO Issues\n';
  csv += 'Issue,Page,Impact,Recommendation\n';
  auditData.audit.seoIssues.forEach(issue => {
    csv += `"${issue.issue}","${issue.page}","${issue.impact}","${issue.recommendation}"\n`;
  });
  csv += '\n';
  
  // Quick Wins section
  csv += 'Quick Win Recommendations\n';
  csv += 'Recommendation\n';
  auditData.audit.quickWins.forEach(win => {
    csv += `"${win}"\n`;
  });
  csv += '\n';
  
  // Forecast section
  csv += 'Traffic Forecast\n';
  csv += 'Month,Clicks,Type\n';
  auditData.audit.forecast.trafficData.forEach(item => {
    csv += `${item.month},${item.clicks},${item.type}\n`;
  });
  
  // Citations Profile if available
  if (auditData.audit.citationsProfile) {
    csv += '\nCitations Profile\n';
    csv += `DR Score,${auditData.audit.citationsProfile.dr}\n`;
    csv += `Backlinks,${auditData.audit.citationsProfile.backlinks}\n`;
    csv += `Referring Domains,${auditData.audit.citationsProfile.refDomains}\n`;
  }
  
  // AI Visibility if available
  if (auditData.audit.aiVisibility) {
    csv += '\nAI Visibility Comparison\n';
    csv += 'Domain,Citations,SERP Mentions\n';
    auditData.audit.aiVisibility.comparison.forEach(item => {
      csv += `${item.domain},${item.citations},${item.SERP_mentions}\n`;
    });
  }
  
  return csv;
}

function generatePDFContent(auditData: AuditData): string {
  let content = `AI-SEO AUDIT REPORT

Website: ${auditData.input.website}
Region: ${auditData.input.region}
Audience: ${auditData.input.audience}
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
═════════════════
SEO Score: ${auditData.audit.seoScore}/100
AI Citation Score: ${auditData.audit.aiCitationScore}/100
Critical Issues: ${auditData.audit.criticalIssues}

TARGET QUESTIONS
══════════════════
${auditData.input.targetQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

COMPETITORS ANALYZED
══════════════════════
${auditData.input.competitors.map((c, i) => `${i + 1}. ${c}`).join('\n')}

SEO ISSUES IDENTIFIED
═══════════════════════
${auditData.audit.seoIssues.map((issue, i) => `
${i + 1}. ${issue.issue}
   Page: ${issue.page}
   Impact: ${issue.impact}
   Recommendation: ${issue.recommendation}
`).join('\n')}

QUICK WIN OPPORTUNITIES
═════════════════════════
${auditData.audit.quickWins.map((win, i) => `${i + 1}. ${win}`).join('\n')}

TRAFFIC FORECAST
══════════════════
${auditData.audit.forecast.trafficData.map(item => 
  `${item.month}: ${item.clicks} clicks (${item.type})`
).join('\n')}
`;

  if (auditData.audit.citationsProfile) {
    content += `

CITATIONS PROFILE
═══════════════════
DR Score: ${auditData.audit.citationsProfile.dr}
Backlinks: ${auditData.audit.citationsProfile.backlinks}
Referring Domains: ${auditData.audit.citationsProfile.refDomains}
`;
  }

  return content;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { format = 'excel', auditData } = await req.json()

    if (!auditData) {
      return new Response(
        JSON.stringify({ error: 'Audit data is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    let fileContent: string
    let contentType: string
    let filename: string

    if (format === 'pdf') {
      fileContent = generatePDFContent(auditData)
      contentType = 'text/plain' // Simple text format for now
      filename = `ai-seo-audit-${Date.now()}.txt`
    } else {
      fileContent = generateExcelCSV(auditData)
      contentType = 'text/csv'
      filename = `ai-seo-audit-${Date.now()}.csv`
    }

    const fileBuffer = new TextEncoder().encode(fileContent)

    return new Response(fileBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('Error generating report:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate report' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})