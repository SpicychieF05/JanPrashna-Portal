import { userService } from "../../services/user.service";
import { Card, CardContent } from "@janprashna/ui";
import { StatusBadge, userRoleBadge } from "../../components/shared/StatusBadge";
import { EmptyState } from "../../components/shared/EmptyState";

export default async function UsersPage() {
  const users = await userService.getUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground font-sans mt-1">Manage administrator access and roles.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-ui font-medium hover:bg-primary/90 transition-colors">
          Add User
        </button>
      </div>

      {users.length === 0 ? (
        <EmptyState icon="👤" title="No Users" description="Add administrators to manage the platform." />
      ) : (
        <Card className="shadow-none border-border/60">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-paper/40">
                  {['Name', 'Email', 'Role', 'Department', 'Last Login', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-6 py-3 font-ui font-semibold text-muted-foreground text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {users.map((user) => {
                  const roleBadge = userRoleBadge(user.role);
                  return (
                    <tr key={user.id} className="hover:bg-paper/30 transition-colors">
                      <td className="px-6 py-4 font-ui font-medium">{user.name}</td>
                      <td className="px-6 py-4 font-mono text-xs">{user.email}</td>
                      <td className="px-6 py-4">
                        <StatusBadge label={roleBadge.label} variant={roleBadge.variant} />
                      </td>
                      <td className="px-6 py-4 font-ui text-muted-foreground text-sm">{user.department ?? '—'}</td>
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                        {user.last_login ? new Date(user.last_login).toLocaleDateString('en-IN') : 'Never'}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge label={user.is_active ? 'Active' : 'Disabled'} variant={user.is_active ? 'success' : 'neutral'} />
                      </td>
                      <td className="px-6 py-4 flex gap-3">
                        <button className="text-primary text-sm font-ui font-medium hover:underline">Edit</button>
                        {user.is_active && <button className="text-red-500 text-sm font-ui font-medium hover:underline">Disable</button>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
