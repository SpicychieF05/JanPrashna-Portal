import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function Navbar({ title = "JanPrashna Portal", className, ...props }: NavbarProps) {
  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)} {...props}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold font-display text-lg">J</span>
          </div>
          <span className="font-display font-bold text-xl">{title}</span>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost">About</Button>
          <Button variant="ghost">FAQ</Button>
          <Button variant="default">Submit Question</Button>
        </nav>
      </div>
    </header>
  )
}
