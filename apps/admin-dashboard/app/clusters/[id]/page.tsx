import { aiService } from "../../../services/ai.service";
import { Card, CardContent, CardHeader, CardTitle } from "@janprashna/ui";
import { StatusBadge, trendBadge, aiStatusBadge } from "../../../components/shared/StatusBadge";
import { EmptyState } from "../../../components/shared/EmptyState";
import Link from "next/link";

export default async function ClusterDetailPage({ params }: { params: { id: string } }) {
  const cluster = await aiService.getCluster(params.id);

  if (!cluster) {
    return (
      <EmptyState icon="🔍" title="Cluster Not Found" description="This cluster may not exist."
        action={<Link href="/clusters" className="text-primary font-ui text-sm font-medium hover:underline">Back to Clusters</Link>}
      />
    );
  }

  const trend = trendBadge(cluster.trend);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Link href="/clusters" className="text-muted-foreground hover:text-foreground font-ui text-sm">← Clusters</Link>
        <h1 className="font-display text-2xl font-bold">{cluster.cluster_name}</h1>
        <StatusBadge label={trend.label} variant={trend.variant} />
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Questions', value: cluster.question_count.toLocaleString() },
          { label: 'Confidence', value: `${(cluster.confidence * 100).toFixed(0)}%` },
          { label: 'Department', value: cluster.department },
          { label: 'Scheme', value: cluster.scheme ?? 'None detected' },
        ].map(({ label, value }) => (
          <Card key={label} className="shadow-none border-border/60 bg-paper">
            <CardContent className="p-4">
              <p className="text-xs font-ui text-muted-foreground uppercase tracking-wide">{label}</p>
              <p className="font-display font-bold text-xl mt-1">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-none border-border/60">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="font-display">Canonical Question</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <blockquote className="border-l-4 border-primary pl-4 font-sans text-lg text-foreground leading-relaxed">
            "{cluster.canonical_question}"
          </blockquote>
          <div className="flex gap-3 mt-6">
            <button className="px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-ui font-medium hover:bg-green-100 transition-colors">
              ✓ Approve Canonical
            </button>
            <button className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-ui font-medium hover:bg-red-100 transition-colors">
              ✗ Reject Canonical
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none border-border/60">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="font-display">Sample Questions</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          {cluster.sample_questions.map((q) => {
            const lang = q.language === 'bengali' ? 'বাংলা' : 'EN';
            return (
              <div key={q.id} className="flex items-start gap-3 p-4 bg-paper rounded-lg border border-border/40">
                <span className="text-xs font-mono text-muted-foreground bg-background border border-border/50 rounded px-1.5 py-0.5 shrink-0">{lang}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-sm">{q.original_question}</p>
                  <div className="flex gap-3 mt-1 text-xs text-muted-foreground font-ui">
                    <span>{q.district}</span>
                    <span>·</span>
                    <span>{new Date(q.created_at).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-paper border border-border rounded-lg text-sm font-ui font-medium hover:bg-background transition-colors">
          Merge with Another Cluster
        </button>
        <button className="px-4 py-2 bg-paper border border-border rounded-lg text-sm font-ui font-medium hover:bg-background transition-colors">
          Split Cluster
        </button>
        <button className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-ui font-medium hover:bg-primary/20 transition-colors">
          Reprocess Questions
        </button>
      </div>
    </div>
  );
}
