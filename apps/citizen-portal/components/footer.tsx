import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container grid md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold font-display text-lg">J</span>
            </div>
            <span className="font-display font-bold text-xl">JanPrashna Portal</span>
          </div>
          <p className="text-muted text-sm max-w-sm">
            An AI-powered citizen intelligence platform built to connect residents of West Bengal with actionable government insights.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold font-ui">Platform</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold font-ui">Legal</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t border-muted-foreground/20 text-sm text-muted text-center">
        © {new Date().getFullYear()} Government of West Bengal. All rights reserved.
      </div>
    </footer>
  );
}
