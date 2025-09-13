import { useState } from 'react'
import { toast } from 'sonner'
import { AuditData } from '@/lib/auditData'

export const useReportDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false)

  const generateCSVContent = (auditData: AuditData): string => {
    let csv = 'AI-SEO Audit Report\n\n'
    
    // Overview section
    csv += 'OVERVIEW\n'
    csv += 'Website,' + auditData.input.website + '\n'
    csv += 'Region,' + auditData.input.region + '\n'
    csv += 'Audience,' + auditData.input.audience + '\n'
    csv += 'SEO Score,' + auditData.audit.seoScore + '\n'
    csv += 'AI Citation Score,' + auditData.audit.aiCitationScore + '\n'
    csv += 'Critical Issues,' + auditData.audit.criticalIssues + '\n'
    csv += 'Target Questions,"' + auditData.input.targetQuestions.join('; ') + '"\n'
    csv += 'Competitors,"' + auditData.input.competitors.join('; ') + '"\n\n'
    
    // SEO Issues section
    csv += 'SEO ISSUES\n'
    csv += 'Issue,Page,Impact,Recommendation\n'
    auditData.audit.seoIssues.forEach(issue => {
      csv += '"' + issue.issue.replace(/"/g, '""') + '",'
      csv += '"' + issue.page.replace(/"/g, '""') + '",'
      csv += '"' + issue.impact + '",'
      csv += '"' + issue.recommendation.replace(/"/g, '""') + '"\n'
    })
    csv += '\n'
    
    // Quick Wins section
    csv += 'QUICK WIN RECOMMENDATIONS\n'
    csv += 'Recommendation\n'
    auditData.audit.quickWins.forEach(win => {
      csv += '"' + win.replace(/"/g, '""') + '"\n'
    })
    csv += '\n'
    
    // Traffic Forecast section
    csv += 'TRAFFIC FORECAST\n'
    csv += 'Month,Clicks,Type\n'
    auditData.audit.forecast.trafficData.forEach(item => {
      csv += item.month + ',' + item.clicks + ',' + item.type + '\n'
    })
    
    return csv
  }

  const generatePDFContent = (auditData: AuditData): string => {
    let content = `AI-SEO AUDIT REPORT
====================================

Website: ${auditData.input.website}
Region: ${auditData.input.region}
Audience: ${auditData.input.audience}
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
====================================
SEO Score: ${auditData.audit.seoScore}/100
AI Citation Score: ${auditData.audit.aiCitationScore}/100
Critical Issues: ${auditData.audit.criticalIssues}

TARGET QUESTIONS
====================================
${auditData.input.targetQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

COMPETITORS ANALYZED
====================================
${auditData.input.competitors.map((c, i) => `${i + 1}. ${c}`).join('\n')}

SEO ISSUES IDENTIFIED
====================================
${auditData.audit.seoIssues.map((issue, i) => `
${i + 1}. ${issue.issue}
   Page: ${issue.page}
   Impact: ${issue.impact}
   Recommendation: ${issue.recommendation}
`).join('\n')}

QUICK WIN OPPORTUNITIES
====================================
${auditData.audit.quickWins.map((win, i) => `${i + 1}. ${win}`).join('\n')}

TRAFFIC FORECAST
====================================
${auditData.audit.forecast.trafficData.map(item => 
  `${item.month}: ${item.clicks} clicks (${item.type})`
).join('\n')}
`

    return content
  }

  const downloadFile = (content: string, filename: string, contentType: string) => {
    try {
      const blob = new Blob([content], { type: contentType })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
      return true
    } catch (error) {
      console.error('Download error:', error)
      return false
    }
  }

  const downloadReport = async (format: 'excel' | 'pdf', auditData: AuditData) => {
    setIsDownloading(true)
    
    try {
      const timestamp = Date.now()
      let content: string
      let filename: string
      let contentType: string
      let success: boolean

      if (format === 'excel') {
        content = generateCSVContent(auditData)
        filename = `ai-seo-audit-${timestamp}.csv`
        contentType = 'text/csv;charset=utf-8;'
        success = downloadFile(content, filename, contentType)
      } else {
        content = generatePDFContent(auditData)
        filename = `ai-seo-audit-${timestamp}.txt`
        contentType = 'text/plain;charset=utf-8;'
        success = downloadFile(content, filename, contentType)
      }

      if (success) {
        toast.success(`${format === 'excel' ? 'CSV' : 'Text'} report downloaded successfully!`)
      } else {
        throw new Error('Failed to create download')
      }
    } catch (error) {
      console.error('Download error:', error)
      toast.error(`Failed to download ${format} report. Please try again.`)
    } finally {
      setIsDownloading(false)
    }
  }

  return { downloadReport, isDownloading }
}