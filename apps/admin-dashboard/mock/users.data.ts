export type UserRole = 'super_admin' | 'department_admin' | 'viewer' | 'auditor';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  last_login?: string;
  is_active: boolean;
  created_at: string;
}

export const mockUsers: AdminUser[] = [
  { id: 'usr-001', name: 'Anirban Das', email: 'anirban.d@wb.gov.in', role: 'super_admin', last_login: '2026-06-20T01:00:00Z', is_active: true, created_at: '2026-04-01T00:00:00Z' },
  { id: 'usr-002', name: 'Subroto Mukherjee', email: 'subroto.m@wb.gov.in', role: 'department_admin', department: 'Women & Child Development', last_login: '2026-06-19T18:00:00Z', is_active: true, created_at: '2026-04-10T00:00:00Z' },
  { id: 'usr-003', name: 'Priya Sharma', email: 'priya.s@wb.gov.in', role: 'department_admin', department: 'Health & Family Welfare', last_login: '2026-06-18T09:30:00Z', is_active: true, created_at: '2026-04-10T00:00:00Z' },
  { id: 'usr-004', name: 'Tanmoy Roy', email: 'tanmoy.r@wb.gov.in', role: 'viewer', department: 'Finance', last_login: '2026-06-15T14:00:00Z', is_active: true, created_at: '2026-05-01T00:00:00Z' },
  { id: 'usr-005', name: 'Sonali Ghosh', email: 'sonali.g@wb.gov.in', role: 'auditor', last_login: '2026-06-10T10:00:00Z', is_active: false, created_at: '2026-05-15T00:00:00Z' },
];
