import { questionService } from "../../../services/question.service";
import { Card, CardContent, CardHeader, CardTitle } from "@janprashna/ui";
import { StatusBadge, aiStatusBadge } from "../../../components/shared/StatusBadge";
import { EmptyState } from "../../../components/shared/EmptyState";
import Link from "next/link";

export default async function QuestionDetailPage({ params }: { params: { id: string } }) {
  const question = await questionService.getQuestion(params.id);

  if (!question) {
    return (
      <EmptyState
        icon="🔍"
        title="Question Not Found"
        description="This question may have been deleted or does not exist."
        action={<Link href="/questions" className="text-primary font-ui text-sm font-medium hover:underline">Back to Questions</Link>}
      />
    );
  }

  const badge = aiStatusBadge(question.ai_processing_status);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/questions" className="text-muted-foreground hover:text-foreground font-ui text-sm">← Questions</Link>
        <h1 className="font-display text-2xl font-bold">Question Detail</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card className="shadow-none border-border/60">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="font-display text-lg">Question Content</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-xs font-ui font-semibold text-muted-foreground uppercase tracking-wide mb-1">Original ({question.language})</p>
                <p className="font-sans text-base p-3 bg-paper rounded-lg">{question.original_question}</p>
              </div>
              <div>
                <p className="text-xs font-ui font-semibold text-muted-foreground uppercase tracking-wide mb-1">Translated (English)</p>
                <p className="font-sans text-base p-3 bg-background rounded-lg border border-border/50">{question.translated_question}</p>
              </div>
              <div>
                <p className="text-xs font-ui font-semibold text-muted-foreground uppercase tracking-wide mb-1">Normalized (AI Cleaned)</p>
                <p className="font-mono text-sm text-muted-foreground p-3 bg-paper rounded-lg">{question.normalized_question}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/60">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="font-display text-lg">Location Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-2 gap-4">
              {[
                ['District', question.district],
                ['Subdivision', question.subdivision],
                question.rural_urban === 'rural'
                  ? ['Block', question.block]
                  : ['Municipality', question.municipality ?? '—'],
                question.rural_urban === 'rural'
                  ? ['Gram Panchayat', question.gram_panchayat ?? '—']
                  : ['Ward', question.ward ?? '—'],
                ['Police Station', question.police_station],
                ['Pincode', question.pincode],
                ['Area Type', question.rural_urban],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-ui font-semibold text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
                  <p className="font-ui text-sm capitalize">{value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-none border-border/60">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="font-display text-lg">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-sm">
              {[
                ['Age', question.age],
                ['Occupation', question.occupation],
                ['Language', question.language],
                ['Submitted', new Date(question.created_at).toLocaleString('en-IN')],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-2">
                  <span className="text-muted-foreground font-ui">{label}</span>
                  <span className="font-ui font-medium capitalize">{String(value)}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/60">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="font-display text-lg">AI Intelligence</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-ui">AI Status</span>
                <StatusBadge label={badge.label} variant={badge.variant} />
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground font-ui">Department</span>
                <span className="font-ui text-right text-xs">{question.assigned_department ?? '—'}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground font-ui">Scheme</span>
                <span className="font-ui">{question.detected_scheme ?? '—'}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground font-ui">Cluster ID</span>
                {question.cluster_id ? (
                  <Link href={`/clusters/${question.cluster_id}`} className="font-mono text-xs text-primary hover:underline">{question.cluster_id}</Link>
                ) : (
                  <span className="font-mono text-xs text-muted-foreground">—</span>
                )}
              </div>
            </CardContent>
          </Card>

          <button className="w-full px-4 py-2.5 rounded-lg border border-red-200 text-red-600 bg-red-50 font-ui font-medium text-sm hover:bg-red-100 transition-colors">
            Soft Delete Question
          </button>
        </div>
      </div>
    </div>
  );
}
