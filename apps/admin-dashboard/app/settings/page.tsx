import { settingsService } from "../../services/settings.service";
import { Card, CardContent, CardHeader, CardTitle } from "@janprashna/ui";

export default async function SettingsPage() {
  const settings = await settingsService.getSettings();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground font-sans mt-1">Platform configuration and system preferences.</p>
      </div>

      <Card className="shadow-none border-border/60">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="font-display">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-2 gap-6">
          {Object.entries(settings.general).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <label className="text-xs font-ui font-semibold text-muted-foreground uppercase tracking-wide">{key.replace(/_/g, ' ')}</label>
              <input defaultValue={String(value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm font-ui focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-none border-border/60">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="font-display">AI Configuration</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-2 gap-6">
          {Object.entries(settings.ai).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <label className="text-xs font-ui font-semibold text-muted-foreground uppercase tracking-wide">{key.replace(/_/g, ' ')}</label>
              <input defaultValue={String(value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm font-ui focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-none border-border/60">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="font-display">Email Configuration</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-2 gap-6">
          {Object.entries(settings.email).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <label className="text-xs font-ui font-semibold text-muted-foreground uppercase tracking-wide">{key.replace(/_/g, ' ')}</label>
              <input defaultValue={String(value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm font-ui focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 bg-paper border border-border rounded-lg text-sm font-ui font-medium hover:bg-background transition-colors">Discard</button>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-ui font-medium hover:bg-primary/90 transition-colors">Save Changes</button>
      </div>

      <Card className="shadow-none border-red-200 bg-red-50/30">
        <CardHeader className="border-b border-red-200/60 pb-4">
          <CardTitle className="font-display text-red-700">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-red-200">
            <div>
              <p className="font-ui font-semibold text-sm text-red-700">Run Data Cleanup</p>
              <p className="text-xs text-muted-foreground font-sans">Permanently delete questions older than 90 days.</p>
            </div>
            <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-ui font-medium hover:bg-red-50 transition-colors">Run Now</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-red-200">
            <div>
              <p className="font-ui font-semibold text-sm text-red-700">Reset AI Clusters</p>
              <p className="text-xs text-muted-foreground font-sans">Delete all AI clusters and requeue questions for reprocessing.</p>
            </div>
            <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-ui font-medium hover:bg-red-50 transition-colors">Reset</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
