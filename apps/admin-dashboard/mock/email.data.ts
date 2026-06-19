export type FrequencyType = 'weekly' | 'monthly' | 'quarterly' | 'custom';
export type DeliveryStatus = 'sent' | 'failed' | 'pending' | 'retrying';

export interface EmailRecipient {
  id: string;
  name: string;
  email: string;
  designation: string;
  department: string;
  frequency: FrequencyType;
  is_active: boolean;
  created_at: string;
}

export interface EmailSchedule {
  id: string;
  schedule_name: string;
  frequency: FrequencyType;
  day_of_week?: string;
  day_of_month?: number;
  send_time: string;
  recipient_count: number;
  is_active: boolean;
  next_run_at: string;
}

export interface DeliveryLog {
  id: string;
  report_name: string;
  recipient_email: string;
  status: DeliveryStatus;
  sent_at: string;
  error_message?: string;
  retry_count: number;
}

export const mockRecipients: EmailRecipient[] = [
  { id: 'rec-001', name: 'Subroto Mukherjee', email: 'subroto.m@wb.gov.in', designation: 'Secretary', department: 'Women & Child Development', frequency: 'weekly', is_active: true, created_at: '2026-05-01T00:00:00Z' },
  { id: 'rec-002', name: 'Priya Sharma', email: 'priya.s@wb.gov.in', designation: 'Director', department: 'Health & Family Welfare', frequency: 'weekly', is_active: true, created_at: '2026-05-01T00:00:00Z' },
  { id: 'rec-003', name: 'Rajesh Kumar', email: 'rajesh.k@wb.gov.in', designation: 'Joint Secretary', department: 'Public Works', frequency: 'monthly', is_active: false, created_at: '2026-05-10T00:00:00Z' },
];

export const mockSchedules: EmailSchedule[] = [
  { id: 'sch-001', schedule_name: 'Weekly All Departments', frequency: 'weekly', day_of_week: 'Monday', send_time: '08:00', recipient_count: 12, is_active: true, next_run_at: '2026-06-23T08:00:00Z' },
  { id: 'sch-002', schedule_name: 'Monthly Summary', frequency: 'monthly', day_of_month: 1, send_time: '09:00', recipient_count: 5, is_active: true, next_run_at: '2026-07-01T09:00:00Z' },
];

export const mockDeliveryLogs: DeliveryLog[] = [
  { id: 'log-001', report_name: 'Weekly Report W24', recipient_email: 'subroto.m@wb.gov.in', status: 'sent', sent_at: '2026-06-17T08:01:32Z', retry_count: 0 },
  { id: 'log-002', report_name: 'Weekly Report W24', recipient_email: 'priya.s@wb.gov.in', status: 'sent', sent_at: '2026-06-17T08:01:45Z', retry_count: 0 },
  { id: 'log-003', report_name: 'Weekly Report W23', recipient_email: 'rajesh.k@wb.gov.in', status: 'failed', sent_at: '2026-06-10T08:02:10Z', error_message: 'Mailbox unavailable', retry_count: 2 },
];
