import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Label, Navbar } from "@janprashna/ui";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12 space-y-12">
        <div className="space-y-4">
          <h1 className="font-display text-4xl font-bold">Design System</h1>
          <p className="font-sans text-lg text-muted-foreground">
            A preview of the JanPrashna Portal UI components and design tokens.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Typography</h2>
          <div className="space-y-4 p-6 bg-paper rounded-xl border">
            <div>
              <span className="font-mono text-xs text-muted-foreground">Display (Playfair Display)</span>
              <h1 className="font-display text-4xl">Government Intelligence</h1>
            </div>
            <div>
              <span className="font-mono text-xs text-muted-foreground">Reading (Crimson Pro)</span>
              <p className="font-sans text-lg">The platform transforms thousands of unstructured citizen questions into concise, actionable intelligence.</p>
            </div>
            <div>
              <span className="font-mono text-xs text-muted-foreground">UI (Outfit)</span>
              <p className="font-ui font-medium">Submit Question</p>
            </div>
            <div>
              <span className="font-mono text-xs text-muted-foreground">Data (Space Mono)</span>
              <p className="font-mono">ID: JPN-2024-001</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-24 rounded-lg border bg-background flex items-center justify-center shadow-sm">
              <span className="font-ui text-sm font-medium">Background</span>
            </div>
            <div className="h-24 rounded-lg border bg-paper flex items-center justify-center shadow-sm">
              <span className="font-ui text-sm font-medium">Paper</span>
            </div>
            <div className="h-24 rounded-lg border bg-card flex items-center justify-center shadow-sm">
              <span className="font-ui text-sm font-medium">Card</span>
            </div>
            <div className="h-24 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <span className="font-ui text-sm font-medium text-primary-foreground">Primary (Saffron)</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Components</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Submit Question</CardTitle>
                <CardDescription>We will use AI to analyze your question.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Your Question</Label>
                  <Input id="question" placeholder="Enter your question here..." />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Submit</Button>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
