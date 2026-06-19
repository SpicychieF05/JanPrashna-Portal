import { reportService } from "../../services/report.service";
import { Card, CardContent } from "@janprashna/ui";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { EmptyState } from "../../components/shared/EmptyState";
import Link from "next/link";

const reportStatusBadge = (status: string) => {
  const map: Record<string, { label: string; variant: any }> = {
    generated: { label: 'Generated', variant: 'success' },
    generating: { label: 'Generating...', variant: 'warning' },
    failed: { label: 'Failed', variant: 'error' },
  };
  return map[status] ?? { label: status, variant: 'neutral' };
};

export default async function ReportsPage() {
  const reports = await reportService.getReports();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground font-sans mt-1">Government intelligence reports generated from citizen questions.</p>
        </div>
        <Link href="/reports/generate" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-ui font-medium hover:bg-primary/90 transition-colors">
          Generate Report
        </Link>
      </div>

      {reports.length === 0 ? (
        <EmptyState icon="📊" title="No Reports Yet" description="Generate your first intelligence report from citizen questions." />
      ) : (
        <div className="space-y-3">
          {reports.map((report) => {
            const badge = reportStatusBadge(report.status);
            return (
              <Card key={report.id} className="shadow-none border-border/60 hover:border-primary/30 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-ui text-muted-foreground uppercase tracking-wide font-medium">{report.report_type}</span>
                        <StatusBadge label={badge.label} variant={badge.variant} />
                      </div>
                      <h3 className="font-display font-semibold text-base">{report.report_name}</h3>
                      <p className="text-sm text-muted-foreground font-sans mt-1 line-clamp-2">{report.ai_summary || 'Report is being generated...'}</p>
                      <div className="flex gap-4 mt-3 text-xs font-mono text-muted-foreground">
                        <span>{report.period_start} → {report.period_end}</span>
                        {report.total_questions > 0 && <span>{report.total_questions.toLocaleString()} questions</span>}
                        {report.clusters_analyzed > 0 && <span>{report.clusters_analyzed} clusters</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {report.status === 'generated' && (
                        <>
                          <button className="px-3 py-1.5 rounded-md border border-border text-xs font-ui font-medium hover:bg-paper transition-colors">PDF</button>
                          <button className="px-3 py-1.5 rounded-md border border-border text-xs font-ui font-medium hover:bg-paper transition-colors">Excel</button>
                        </>
                      )}
                      <Link href={`/reports/${report.id}`} className="px-3 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/20 text-xs font-ui font-medium hover:bg-primary/20 transition-colors">
                        View
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
