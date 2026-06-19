import { loginAction } from "../../services/auth.service";
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from "@janprashna/ui";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold font-display text-2xl">J</span>
          </div>
          <span className="font-display font-bold text-3xl">JanPrashna</span>
        </div>

        <Card className="shadow-lg border-border/60">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-display font-bold text-center">Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground text-center font-sans">
              Enter your official email to access the intelligence dashboard.
            </p>
          </CardHeader>
          <CardContent>
            <form action={loginAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-ui font-semibold">Official Email</Label>
                <Input id="email" name="email" type="email" placeholder="admin@wb.gov.in" required className="font-ui" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-ui font-semibold">Password</Label>
                  <a href="#" className="text-xs text-primary font-ui hover:underline">Forgot password?</a>
                </div>
                <Input id="password" name="password" type="password" required className="font-ui" />
              </div>
              
              <Button type="submit" className="w-full font-ui mt-2">
                Sign In securely
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-muted-foreground mt-8 font-sans">
          Government of West Bengal Public Grievance Intelligence Platform.<br/>
          Unauthorized access is strictly prohibited.
        </p>
      </div>
    </div>
  );
}
