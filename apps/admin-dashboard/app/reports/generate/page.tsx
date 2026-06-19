"use client";

import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@janprashna/ui";
import { reportService } from "../../../services/report.service";
import Link from "next/link";

export default function GenerateReportPage() {
  const [reportType, setReportType] = useState('weekly');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsGenerating(false);
    setIsGenerated(true);
  };

  if (isGenerated) {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center space-y-6">
        <div className="text-5xl">✅</div>
        <h2 className="font-display text-2xl font-bold">Report Generated</h2>
        <p className="text-muted-foreground font-sans">Your report is ready. The AI summary will appear shortly.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/reports">
            <Button variant="outline">Back to Reports</Button>
          </Link>
          <Button>Download PDF</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link href="/reports" className="text-muted-foreground hover:text-foreground font-ui text-sm">← Reports</Link>
        <h1 className="font-display text-3xl font-bold mt-2">Generate Report</h1>
        <p className="text-muted-foreground font-sans mt-1">Configure and generate an intelligence report.</p>
      </div>

      <Card className="shadow-none border-border/60">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label className="font-ui font-semibold">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly Report</SelectItem>
                <SelectItem value="monthly">Monthly Report</SelectItem>
                <SelectItem value="quarterly">Quarterly Report</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-ui font-semibold">Period Start</Label>
              <Input type="date" defaultValue="2026-06-17" />
            </div>
            <div className="space-y-2">
              <Label className="font-ui font-semibold">Period End</Label>
              <Input type="date" defaultValue="2026-06-23" />
            </div>
          </div>

          <div className="p-4 bg-paper rounded-lg border border-border/50 text-sm font-ui text-muted-foreground">
            This report will analyze all questions from the selected period, generate AI-driven cluster summaries, and produce both a PDF and Excel export.
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
            {isGenerating ? 'Generating Report...' : 'Generate Intelligence Report'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
