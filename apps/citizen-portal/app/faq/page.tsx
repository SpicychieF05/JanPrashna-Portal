import { Navbar } from "@janprashna/ui";
import { Footer } from "../../components/footer";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-20 max-w-4xl space-y-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
        <div className="prose prose-stone font-sans text-muted-foreground">
          <p>Content for Frequently Asked Questions will be provided by the administration.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
