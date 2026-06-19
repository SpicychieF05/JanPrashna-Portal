import { emailService } from "../../../services/email.service";
import { Card, CardContent } from "@janprashna/ui";
import { StatusBadge } from "../../../components/shared/StatusBadge";
import Link from "next/link";

export default async function EmailSchedulesPage() {
  const schedules = await emailService.getSchedules();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Email Scheduler</h1>
        <p className="text-muted-foreground font-sans mt-1">Configure automated report delivery schedules.</p>
      </div>

      <div className="flex gap-4 text-sm font-ui font-medium border-b border-border/50 pb-0">
        <Link href="/email/recipients" className="pb-3 text-muted-foreground hover:text-foreground">Recipients</Link>
        <Link href="/email/schedules" className="pb-3 border-b-2 border-primary text-primary">Schedules</Link>
        <Link href="/email/logs" className="pb-3 text-muted-foreground hover:text-foreground">Delivery Logs</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {schedules.map((sch) => (
          <Card key={sch.id} className="shadow-none border-border/60">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-display font-semibold">{sch.schedule_name}</h3>
                <StatusBadge label={sch.is_active ? 'Active' : 'Paused'} variant={sch.is_active ? 'success' : 'neutral'} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  ['Frequency', sch.frequency],
                  ['Send Time', sch.send_time],
                  ['Recipients', sch.recipient_count],
                  ['Next Run', new Date(sch.next_run_at).toLocaleDateString('en-IN')],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground font-ui">{label}</p>
                    <p className="font-ui font-medium capitalize">{String(value)}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-1.5 rounded-md border border-border text-xs font-ui font-medium hover:bg-paper transition-colors">
                  {sch.is_active ? 'Pause' : 'Enable'}
                </button>
                <button className="flex-1 py-1.5 rounded-md border border-border text-xs font-ui font-medium hover:bg-paper transition-colors">
                  Edit
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
