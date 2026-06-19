import { emailService } from "../../services/email.service";
import { Card, CardContent, CardHeader, CardTitle } from "@janprashna/ui";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { EmptyState } from "../../components/shared/EmptyState";
import Link from "next/link";

export default async function EmailRecipientsPage() {
  const recipients = await emailService.getRecipients();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Email Recipients</h1>
          <p className="text-muted-foreground font-sans mt-1">Manage officials who receive intelligence reports.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-ui font-medium hover:bg-primary/90 transition-colors">
          Add Recipient
        </button>
      </div>
      
      <div className="flex gap-4 text-sm font-ui font-medium border-b border-border/50 pb-0">
        <Link href="/email/recipients" className="pb-3 border-b-2 border-primary text-primary">Recipients</Link>
        <Link href="/email/schedules" className="pb-3 text-muted-foreground hover:text-foreground">Schedules</Link>
        <Link href="/email/logs" className="pb-3 text-muted-foreground hover:text-foreground">Delivery Logs</Link>
      </div>

      {recipients.length === 0 ? (
        <EmptyState icon="📧" title="No Recipients" description="Add government officials who should receive scheduled reports." />
      ) : (
        <Card className="shadow-none border-border/60">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-paper/40">
                  {['Name', 'Email', 'Designation', 'Department', 'Frequency', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-6 py-3 font-ui font-semibold text-muted-foreground text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {recipients.map((r) => (
                  <tr key={r.id} className="hover:bg-paper/30 transition-colors">
                    <td className="px-6 py-4 font-ui font-medium">{r.name}</td>
                    <td className="px-6 py-4 font-mono text-xs">{r.email}</td>
                    <td className="px-6 py-4 font-ui text-muted-foreground">{r.designation}</td>
                    <td className="px-6 py-4 font-ui text-sm">{r.department}</td>
                    <td className="px-6 py-4 capitalize font-ui text-sm">{r.frequency}</td>
                    <td className="px-6 py-4">
                      <StatusBadge label={r.is_active ? 'Active' : 'Inactive'} variant={r.is_active ? 'success' : 'neutral'} />
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary text-sm font-ui font-medium hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
