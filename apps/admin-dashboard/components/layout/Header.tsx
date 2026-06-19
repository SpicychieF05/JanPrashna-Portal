import { logoutAction } from "../../services/auth.service";

export function Header() {
  return (
    <header className="h-16 bg-paper border-b border-border/50 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex-1">
        <h2 className="font-display text-xl font-bold">JanPrashna Intelligence</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="h-9 px-4 rounded-md bg-background border border-border text-sm font-ui font-medium hover:bg-paper transition-colors">
          View Citizen Portal
        </button>
        <form action={logoutAction}>
          <button type="submit" className="h-9 px-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm font-ui font-medium hover:bg-red-100 transition-colors">
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
