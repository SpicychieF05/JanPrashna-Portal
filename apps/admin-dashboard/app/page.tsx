import { Card, CardContent, CardHeader, CardTitle } from "@janprashna/ui";
import { dashboardService } from "../services/dashboard.service";
import { 
  QuestionTrendChart, 
  DistrictDistributionChart, 
  DepartmentDistributionChart, 
  LanguageDistributionChart, 
  QuestionStatusChart, 
  AiProcessingTimeChart, 
  WeeklyTrendsChart 
} from "../components/charts/DashboardCharts";

export default async function AdminDashboardPage() {
  const overview = await dashboardService.getOverview();
  const trendData = await dashboardService.getQuestionTrend();
  const districtData = await dashboardService.getDistrictDistribution();
  const departmentData = await dashboardService.getDepartmentDistribution();
  const schemeData = await dashboardService.getSchemeDistribution();
  const languageData = await dashboardService.getLanguageDistribution();
  const statusData = await dashboardService.getQuestionStatus();
  const processingTimeData = await dashboardService.getAiProcessingTime();
  const weeklyTrendsData = await dashboardService.getWeeklyTrends();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground font-sans mt-1">High-level view of platform intelligence and metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-paper border-border/50 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground font-ui">Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">{overview.totalQuestions.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-paper border-border/50 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground font-ui">Questions Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-primary">{overview.todayQuestions.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-paper border-border/50 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground font-ui">Questions This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">{overview.weeklyQuestions.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-paper border-border/50 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground font-ui">Active AI Clusters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">{overview.activeClusters.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-paper border-border/50 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground font-ui">Reports Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">{overview.reportsGenerated.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">Question Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <QuestionTrendChart data={trendData} />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">Question Status</CardTitle>
          </CardHeader>
          <CardContent>
            <QuestionStatusChart data={statusData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">District Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <DistrictDistributionChart data={districtData} />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <DepartmentDistributionChart data={departmentData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">Language</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageDistributionChart data={languageData} />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">AI Processing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <AiProcessingTimeChart data={processingTimeData} />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">Weekly Volume vs Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyTrendsChart data={weeklyTrendsData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="shadow-sm bg-paper/50">
          <CardHeader>
            <CardTitle className="font-display">Question Heatmap</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed border-border/50 rounded-lg bg-background">
            <p className="text-muted-foreground font-ui font-medium">Interactive Heatmap coming in Version 2.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
