import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Save, Key } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentSettings: any;
  onSettingsUpdate: (settings: any) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  currentSettings,
  onSettingsUpdate
}) => {
  const [settings, setSettings] = useState(currentSettings);
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setSettings(currentSettings);
  }, [currentSettings]);

  const handleSave = () => {
    onSettingsUpdate(settings);
    onOpenChange(false);
    toast.success('Settings saved successfully');
  };

  const toggleApiKeyVisibility = (keyName: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [keyName]: !prev[keyName]
    }));
  };

  const updateApiKey = (keyName: string, value: string) => {
    setSettings({
      ...settings,
      apiKeys: {
        ...settings.apiKeys,
        [keyName]: value
      }
    });
  };

  const updateNotificationSetting = (key: string, value: any) => {
    setSettings({
      ...settings,
      mailNotifications: {
        ...settings.mailNotifications,
        [key]: value
      }
    });
  };

  const apiServices = [
    {
      key: 'awsBedrock',
      name: 'AWS Bedrock API',
      description: 'For AI-powered content analysis and generation',
      placeholder: 'Enter your AWS Bedrock API key',
      category: 'AI Services'
    },
    {
      key: 'gscApi',
      name: 'Google Search Console API',
      description: 'Access search performance data and insights',
      placeholder: 'Enter your GSC API key',
      category: 'Google Services'
    },
    {
      key: 'ga4Api',
      name: 'Google Analytics 4 API',
      description: 'Retrieve detailed website analytics data',
      placeholder: 'Enter your GA4 API key',
      category: 'Google Services'
    },
    {
      key: 'webscrapingApi',
      name: 'Web Scraping API',
      description: 'Gather competitor and market intelligence data',
      placeholder: 'Enter your Web Scraping API key',
      category: 'Data Collection'
    },
    {
      key: 'semrushApi',
      name: 'SEMrush API',
      description: 'Comprehensive SEO and competitor analysis',
      placeholder: 'Enter your SEMrush API key',
      category: 'SEO Tools'
    },
    {
      key: 'ahrefsApi',
      name: 'Ahrefs API',
      description: 'Backlink analysis and keyword research',
      placeholder: 'Enter your Ahrefs API key',
      category: 'SEO Tools'
    }
  ];

  const categoryGroups = apiServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof apiServices>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Settings & API Configuration
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* API Keys Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">API Keys Configuration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure your API keys to enable enhanced reporting features and data collection.
              </p>
            </div>

            {Object.entries(categoryGroups).map(([category, services]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-base">{category}</CardTitle>
                  <CardDescription>
                    Configure {category.toLowerCase()} integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service) => (
                    <div key={service.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={service.key} className="font-medium">
                          {service.name}
                        </Label>
                        <Badge variant="outline" className="text-xs">
                          {settings.apiKeys?.[service.key] ? 'Configured' : 'Not Set'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {service.description}
                      </p>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input
                            id={service.key}
                            type={showApiKeys[service.key] ? 'text' : 'password'}
                            placeholder={service.placeholder}
                            value={settings.apiKeys?.[service.key] || ''}
                            onChange={(e) => updateApiKey(service.key, e.target.value)}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => toggleApiKeyVisibility(service.key)}
                          >
                            {showApiKeys[service.key] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure how and when you receive audit updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Enable Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive automated audit reports and alerts
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.mailNotifications?.enabled || false}
                  onCheckedChange={(checked) => updateNotificationSetting('enabled', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-recipients">Recipients</Label>
                <Input
                  id="email-recipients"
                  placeholder="Enter email addresses (comma-separated)"
                  value={settings.mailNotifications?.recipients?.join(', ') || ''}
                  onChange={(e) => 
                    updateNotificationSetting(
                      'recipients', 
                      e.target.value.split(',').map(email => email.trim()).filter(Boolean)
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="attach-audit">Attach Audit Report</Label>
                  <p className="text-xs text-muted-foreground">
                    Include PDF report in notification emails
                  </p>
                </div>
                <Switch
                  id="attach-audit"
                  checked={settings.mailNotifications?.attachAuditFile || false}
                  onCheckedChange={(checked) => updateNotificationSetting('attachAuditFile', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Report Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Report Options</CardTitle>
              <CardDescription>
                Configure report generation and download settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="download-option">Enable Report Downloads</Label>
                  <p className="text-xs text-muted-foreground">
                    Allow PDF and Excel report generation
                  </p>
                </div>
                <Switch
                  id="download-option"
                  checked={settings.downloadOption || false}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, downloadOption: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;