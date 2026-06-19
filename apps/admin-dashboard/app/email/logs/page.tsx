import { emailService } from "../../../services/email.service";
import { Card, CardContent } from "@janprashna/ui";
import { StatusBadge } from "../../../components/shared/StatusBadge";
import { EmptyState } from "../../../components/shared/EmptyState";
import Link from "next/link";

const deliveryBadge = (status: string) => {
  const map: Record<string, any> = {
    sent: { label: 'Sent', variant: 'success' },
    failed: { label: 'Failed', variant: 'error' },
    pending: { label: 'Pending', variant: 'neutral' },
    retrying: { label: 'Retrying', variant: 'warning' },
  };
  return map[status] ?? { label: status, variant: 'neutral' };
};

export default async function DeliveryLogsPage() {
  const logs = await emailService.getDeliveryLogs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Delivery Logs</h1>
        <p className="text-muted-foreground font-sans mt-1">Track email delivery status for all scheduled reports.</p>
      </div>

      <div className="flex gap-4 text-sm font-ui font-medium border-b border-border/50 pb-0">
        <Link href="/email/recipients" className="pb-3 text-muted-foreground hover:text-foreground">Recipients</Link>
        <Link href="/email/schedules" className="pb-3 text-muted-foreground hover:text-foreground">Schedules</Link>
        <Link href="/email/logs" className="pb-3 border-b-2 border-primary text-primary">Delivery Logs</Link>
      </div>

      {logs.length === 0 ? (
        <EmptyState icon="📬" title="No Delivery Logs" description="Email delivery logs will appear here." />
      ) : (
        <Card className="shadow-none border-border/60">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-paper/40">
                  {['Report', 'Recipient', 'Status', 'Sent At', 'Retries', ''].map(h => (
                    <th key={h} className="text-left px-6 py-3 font-ui font-semibold text-muted-foreground text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {logs.map((log) => {
                  const badge = deliveryBadge(log.status);
                  return (
                    <tr key={log.id} className="hover:bg-paper/30 transition-colors">
                      <td className="px-6 py-4 font-ui">{log.report_name}</td>
                      <td className="px-6 py-4 font-mono text-xs">{log.recipient_email}</td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <StatusBadge label={badge.label} variant={badge.variant} />
                          {log.error_message && <p className="text-xs text-red-500">{log.error_message}</p>}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{new Date(log.sent_at).toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4 font-mono text-sm text-center">{log.retry_count}</td>
                      <td className="px-6 py-4">
                        {log.status === 'failed' && (
                          <button className="text-primary text-xs font-ui font-medium hover:underline">Retry</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
