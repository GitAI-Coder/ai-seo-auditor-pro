import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { AuditData } from "@/lib/auditData";

interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auditData: AuditData | null;
  onSettingsUpdate: (settings: any) => void;
}

export const NotificationsDialog = ({
  open,
  onOpenChange,
  auditData,
  onSettingsUpdate,
}: NotificationsDialogProps) => {
  const [email, setEmail] = useState(
    auditData?.settings.mailNotifications.recipients[0] || ""
  );
  const [enabled, setEnabled] = useState(
    auditData?.settings.mailNotifications.enabled || false
  );
  const [weekly, setWeekly] = useState(
    auditData?.settings.mailNotifications.frequency.includes("weekly") || false
  );
  const [monthly, setMonthly] = useState(
    auditData?.settings.mailNotifications.frequency.includes("monthly") || false
  );
  const [attachReport, setAttachReport] = useState(
    auditData?.settings.mailNotifications.attachAuditFile || false
  );

  const handleSave = () => {
    if (!email && enabled) {
      toast.error("Please enter an email address");
      return;
    }

    if (enabled && !weekly && !monthly) {
      toast.error("Please select at least one notification frequency");
      return;
    }

    const frequency = [];
    if (weekly) frequency.push("weekly");
    if (monthly) frequency.push("monthly");

    const updatedSettings = {
      ...auditData?.settings,
      mailNotifications: {
        enabled,
        frequency,
        recipients: email ? [email] : [],
        attachAuditFile: attachReport,
      },
    };

    onSettingsUpdate(updatedSettings);
    
    toast.success("Notification settings saved successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
          <DialogDescription>
            Configure your email notifications for SEO audit status reports.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications-enabled" className="text-base">
                Enable Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates about your SEO audit status
              </p>
            </div>
            <Switch
              id="notifications-enabled"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>

          {enabled && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base">Notification Frequency</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="weekly"
                      checked={weekly}
                      onCheckedChange={(checked) => setWeekly(checked === true)}
                    />
                    <Label htmlFor="weekly" className="text-sm">
                      Weekly Reports
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="monthly"
                      checked={monthly}
                      onCheckedChange={(checked) => setMonthly(checked === true)}
                    />
                    <Label htmlFor="monthly" className="text-sm">
                      Monthly Reports
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="attach-report" className="text-sm">
                    Attach Audit Report
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Include full audit report in email
                  </p>
                </div>
                <Switch
                  id="attach-report"
                  checked={attachReport}
                  onCheckedChange={setAttachReport}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};