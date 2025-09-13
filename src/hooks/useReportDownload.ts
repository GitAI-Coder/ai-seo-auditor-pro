import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { AuditData } from '@/lib/auditData'

export const useReportDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadReport = async (format: 'excel' | 'pdf', auditData: AuditData) => {
    setIsDownloading(true)
    
    try {
      // Call the edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ format, auditData })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Get the blob from response
      const blob = await response.blob()
      
      // Create download link
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      
      // Set filename based on format
      const timestamp = Date.now()
      a.download = format === 'pdf' 
        ? `ai-seo-audit-${timestamp}.txt` 
        : `ai-seo-audit-${timestamp}.csv`
      
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success(`${format.toUpperCase()} report downloaded successfully!`)
    } catch (error) {
      console.error('Download error:', error)
      toast.error(`Failed to download ${format.toUpperCase()} report`)
    } finally {
      setIsDownloading(false)
    }
  }

  return { downloadReport, isDownloading }
}