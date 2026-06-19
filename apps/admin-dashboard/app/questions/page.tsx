import { questionService } from "../../services/question.service";
import { Card, CardContent, CardHeader, CardTitle } from "@janprashna/ui";
import { StatusBadge, aiStatusBadge } from "../../components/shared/StatusBadge";
import { EmptyState } from "../../components/shared/EmptyState";
import Link from "next/link";

export default async function QuestionsPage() {
  const { data: questions, total } = await questionService.getQuestions();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Questions</h1>
          <p className="text-muted-foreground font-sans mt-1">{total.toLocaleString()} total submissions</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-paper border border-border rounded-lg text-sm font-ui font-medium hover:bg-background transition-colors">
          Export CSV
        </button>
      </div>

      <Card className="shadow-none border-border/60">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="flex flex-wrap gap-3">
            <input
              className="flex-1 min-w-[200px] h-9 rounded-md border border-input bg-background px-3 text-sm font-ui placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Search questions..."
            />
            <select className="h-9 rounded-md border border-input bg-background px-3 text-sm font-ui focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">All Districts</option>
              <option>Birbhum</option>
              <option>Kolkata</option>
              <option>Darjeeling</option>
              <option>Howrah</option>
              <option>North 24 Parganas</option>
            </select>
            <select className="h-9 rounded-md border border-input bg-background px-3 text-sm font-ui focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">All Languages</option>
              <option>bengali</option>
              <option>english</option>
              <option>mixed</option>
            </select>
            <select className="h-9 rounded-md border border-input bg-background px-3 text-sm font-ui focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">All Statuses</option>
              <option>completed</option>
              <option>processing</option>
              <option>unprocessed</option>
              <option>failed</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {questions.length === 0 ? (
            <EmptyState icon="💬" title="No Questions Found" description="No questions match your current filters." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-paper/40">
                    <th className="text-left px-6 py-3 font-ui font-semibold text-muted-foreground text-xs uppercase tracking-wide">ID</th>
                    <th className="text-left px-6 py-3 font-ui font-semibold text-muted-foreground text-xs uppercase tracking-wide">Question</th>
                    <th className="text-left px-6 py-3 font-ui font-semibold text-muted-foreground text-xs uppercase tracking-wide">District</th>
                    <th className="text-left px-6 py-3 font-ui font-semibold text-muted-foreground text-xs uppercase tracking-wide">Language</th>
                    <th className="text-left px-6 py-3 font-ui font-semibold text-muted-foreground text-xs uppercase tracking-wide">Status</th>
                    <th className="text-left px-6 py-3 font-ui font-semibold text-muted-foreground text-xs uppercase tracking-wide">Scheme</th>
                    <th className="text-left px-6 py-3 font-ui font-semibold text-muted-foreground text-xs uppercase tracking-wide">Submitted</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {questions.map((q) => {
                    const badge = aiStatusBadge(q.ai_processing_status);
                    return (
                      <tr key={q.id} className="hover:bg-paper/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{q.id}</td>
                        <td className="px-6 py-4 max-w-xs">
                          <p className="font-sans truncate" title={q.translated_question}>{q.translated_question}</p>
                        </td>
                        <td className="px-6 py-4 font-ui text-sm">{q.district}</td>
                        <td className="px-6 py-4 capitalize font-ui text-sm">{q.language}</td>
                        <td className="px-6 py-4">
                          <StatusBadge label={badge.label} variant={badge.variant} />
                        </td>
                        <td className="px-6 py-4 font-ui text-sm text-muted-foreground">{q.detected_scheme ?? '—'}</td>
                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                          {new Date(q.created_at).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/questions/${q.id}`} className="text-primary font-ui text-sm font-medium hover:underline">
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-ui">Showing 5 of {total.toLocaleString()}</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-md border border-border text-sm font-ui text-muted-foreground hover:bg-paper transition-colors">Previous</button>
              <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-ui hover:bg-primary/90 transition-colors">1</button>
              <button className="px-3 py-1.5 rounded-md border border-border text-sm font-ui text-muted-foreground hover:bg-paper transition-colors">Next</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
