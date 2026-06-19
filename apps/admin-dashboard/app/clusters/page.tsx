import { aiService } from "../../services/ai.service";
import { Card, CardContent } from "@janprashna/ui";
import { StatusBadge, trendBadge } from "../../components/shared/StatusBadge";
import { EmptyState } from "../../components/shared/EmptyState";
import Link from "next/link";

export default async function ClustersPage() {
  const clusters = await aiService.getClusters();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">AI Clusters</h1>
        <p className="text-muted-foreground font-sans mt-1">{clusters.length} active clusters</p>
      </div>

      {clusters.length === 0 ? (
        <EmptyState icon="🤖" title="No Clusters Yet" description="The AI engine has not created any clusters. Questions need to be processed first." />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {clusters.map((cluster) => {
            const trend = trendBadge(cluster.trend);
            return (
              <Card key={cluster.id} className="shadow-none border-border/60 hover:border-primary/30 transition-colors group">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-muted-foreground">{cluster.id}</span>
                        <StatusBadge label={trend.label} variant={trend.variant} />
                      </div>
                      <h3 className="font-display font-semibold text-base text-foreground leading-tight">{cluster.cluster_name}</h3>
                    </div>
                    <span className="text-2xl font-display font-bold text-primary shrink-0">{cluster.question_count.toLocaleString()}</span>
                  </div>

                  <blockquote className="border-l-2 border-primary pl-3 text-sm font-sans text-muted-foreground italic line-clamp-2">
                    "{cluster.canonical_question}"
                  </blockquote>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex gap-3 text-muted-foreground font-ui">
                      <span>Confidence: <strong className="font-mono text-foreground">{(cluster.confidence * 100).toFixed(0)}%</strong></span>
                      {cluster.scheme && <span>Scheme: <strong className="text-foreground">{cluster.scheme}</strong></span>}
                    </div>
                    <Link href={`/clusters/${cluster.id}`} className="text-primary font-ui font-medium hover:underline">
                      View Details →
                    </Link>
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
