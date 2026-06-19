import { Navbar, Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@janprashna/ui";
import Link from "next/link";
import { Footer } from "../components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 container text-center space-y-8">
          <h1 className="font-display text-5xl md:text-7xl font-bold max-w-4xl mx-auto leading-tight">
            Government Intelligence, Powered by Citizens.
          </h1>
          <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
            Submit your questions regarding public services, government schemes, and infrastructure. We use AI to identify trends and summarize your needs for government officials.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/submit">
              <Button size="lg" className="text-lg">Submit Question</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="text-lg">Learn More</Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-paper">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="font-display text-4xl font-bold">How the Platform Works</h2>
              <p className="font-sans text-lg text-muted-foreground">Transforming unstructured questions into actionable intelligence.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Submit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Ask questions in English or Bengali without creating an account. Quick, simple, and secure.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>2. AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our AI engine detects language, removes duplicates, and groups similar questions automatically.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>3. Actionable Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Government officials receive scheduled executive summaries highlighting the most frequent citizen needs.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
