export interface AuditLog {
  id: string;
  user_name: string;
  user_email: string;
  action: string;
  resource: string;
  resource_id?: string;
  ip_hash: string;
  request_id: string;
  timestamp: string;
}

export const mockAuditLogs: AuditLog[] = [
  { id: 'audit-001', user_name: 'Anirban Das', user_email: 'anirban.d@wb.gov.in', action: 'REPORT_GENERATED', resource: 'Report', resource_id: 'rpt-001', ip_hash: 'sha256:3b4c...', request_id: 'req-aaa1', timestamp: '2026-06-17T09:00:12Z' },
  { id: 'audit-002', user_name: 'Subroto Mukherjee', user_email: 'subroto.m@wb.gov.in', action: 'USER_LOGIN', resource: 'Auth', ip_hash: 'sha256:7f2a...', request_id: 'req-bbb2', timestamp: '2026-06-19T18:00:05Z' },
  { id: 'audit-003', user_name: 'Anirban Das', user_email: 'anirban.d@wb.gov.in', action: 'QUESTION_DELETED', resource: 'Question', resource_id: 'qs-009', ip_hash: 'sha256:3b4c...', request_id: 'req-ccc3', timestamp: '2026-06-18T11:30:45Z' },
  { id: 'audit-004', user_name: 'Anirban Das', user_email: 'anirban.d@wb.gov.in', action: 'USER_CREATED', resource: 'User', resource_id: 'usr-005', ip_hash: 'sha256:3b4c...', request_id: 'req-ddd4', timestamp: '2026-05-15T09:00:00Z' },
  { id: 'audit-005', user_name: 'Subroto Mukherjee', user_email: 'subroto.m@wb.gov.in', action: 'SETTINGS_UPDATED', resource: 'Settings', ip_hash: 'sha256:7f2a...', request_id: 'req-eee5', timestamp: '2026-06-16T15:00:00Z' },
  { id: 'audit-006', user_name: 'Anirban Das', user_email: 'anirban.d@wb.gov.in', action: 'AI_CLUSTER_MERGED', resource: 'Cluster', resource_id: 'cl-099', ip_hash: 'sha256:3b4c...', request_id: 'req-fff6', timestamp: '2026-06-15T10:20:00Z' },
  { id: 'audit-007', user_name: 'Anirban Das', user_email: 'anirban.d@wb.gov.in', action: 'USER_LOGIN', resource: 'Auth', ip_hash: 'sha256:3b4c...', request_id: 'req-ggg7', timestamp: '2026-06-20T01:00:02Z' },
];
