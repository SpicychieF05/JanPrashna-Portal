import { auditService } from "../../services/audit.service";
import { Card, CardContent } from "@janprashna/ui";
import { EmptyState } from "../../components/shared/EmptyState";

const actionColor = (action: string) => {
  if (action.includes('DELETE') || action.includes('DISABLE')) return 'text-red-600 bg-red-50 border-red-200';
  if (action.includes('LOGIN')) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (action.includes('GENERATED')) return 'text-green-600 bg-green-50 border-green-200';
  return 'text-foreground bg-paper border-border/50';
};

export default async function AuditLogsPage() {
  const logs = await auditService.getLogs();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground font-sans mt-1">Immutable record of all administrator actions.</p>
        </div>
        <button className="px-4 py-2 bg-paper border border-border rounded-lg text-sm font-ui font-medium hover:bg-background transition-colors">
          Export Logs
        </button>
      </div>

      <div className="flex gap-3">
        <input className="flex-1 max-w-sm h-9 rounded-md border border-input bg-background px-3 text-sm font-ui placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Search by user or action..." />
        <select className="h-9 rounded-md border border-input bg-background px-3 text-sm font-ui focus:outline-none focus:ring-2 focus:ring-ring">
          <option>All Actions</option>
          <option>LOGIN</option>
          <option>REPORT_GENERATED</option>
          <option>QUESTION_DELETED</option>
          <option>SETTINGS_UPDATED</option>
          <option>USER_CREATED</option>
        </select>
      </div>

      {logs.length === 0 ? (
        <EmptyState icon="📋" title="No Audit Logs" description="Administrator actions will be logged here." />
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log.id} className="flex items-center gap-4 p-4 bg-background border border-border/50 rounded-lg hover:bg-paper/30 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-ui font-semibold text-sm">{log.user_name}</span>
                  <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded border ${actionColor(log.action)}`}>{log.action}</span>
                  {log.resource_id && <span className="font-mono text-xs text-muted-foreground">{log.resource}: {log.resource_id}</span>}
                </div>
                <div className="flex gap-4 mt-1 text-xs text-muted-foreground font-mono">
                  <span>{log.user_email}</span>
                  <span>IP: {log.ip_hash}</span>
                  <span>REQ: {log.request_id}</span>
                </div>
              </div>
              <span className="font-mono text-xs text-muted-foreground shrink-0">
                {new Date(log.timestamp).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
