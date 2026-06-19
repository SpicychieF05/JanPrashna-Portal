export type ReportType = 'weekly' | 'monthly' | 'quarterly' | 'custom';
export type ReportStatus = 'generated' | 'generating' | 'failed';

export interface Report {
  id: string;
  report_name: string;
  report_type: ReportType;
  period_start: string;
  period_end: string;
  generated_by: string;
  ai_summary: string;
  status: ReportStatus;
  total_questions: number;
  clusters_analyzed: number;
  pdf_path?: string;
  excel_path?: string;
  generated_at: string;
}

export const mockReports: Report[] = [
  {
    id: 'rpt-001',
    report_name: 'Weekly Intelligence Report – W24 2026',
    report_type: 'weekly',
    period_start: '2026-06-10',
    period_end: '2026-06-16',
    generated_by: 'Dept Admin',
    ai_summary: 'This week saw a 12% increase in Lakshmir Bhandar scheme queries across Birbhum, Murshidabad, and Malda districts. Road infrastructure complaints peaked in Kolkata. Swasthya Sathi hospital coverage queries rose by 8%. Action recommended: Health department to communicate updated hospital empanelment list.',
    status: 'generated',
    total_questions: 2691,
    clusters_analyzed: 173,
    pdf_path: '/reports/rpt-001.pdf',
    excel_path: '/reports/rpt-001.xlsx',
    generated_at: '2026-06-17T09:00:00Z',
  },
  {
    id: 'rpt-002',
    report_name: 'Weekly Intelligence Report – W23 2026',
    report_type: 'weekly',
    period_start: '2026-06-03',
    period_end: '2026-06-09',
    generated_by: 'Dept Admin',
    ai_summary: 'Krishak Bandhu registration queries dominated this week across rural districts. Kanyashree application process questions rose sharply ahead of the academic year. Recommend issuing a public FAQ document.',
    status: 'generated',
    total_questions: 2410,
    clusters_analyzed: 162,
    pdf_path: '/reports/rpt-002.pdf',
    excel_path: '/reports/rpt-002.xlsx',
    generated_at: '2026-06-10T09:00:00Z',
  },
  {
    id: 'rpt-003',
    report_name: 'Monthly Intelligence Report – May 2026',
    report_type: 'monthly',
    period_start: '2026-05-01',
    period_end: '2026-05-31',
    generated_by: 'Super Admin',
    ai_summary: 'May 2026 saw the highest monthly question volume since platform launch (10,234 questions). Top concern: Lakshmir Bhandar (34%), followed by Swasthya Sathi (22%) and Krishak Bandhu (18%).',
    status: 'generated',
    total_questions: 10234,
    clusters_analyzed: 289,
    pdf_path: '/reports/rpt-003.pdf',
    excel_path: '/reports/rpt-003.xlsx',
    generated_at: '2026-06-01T08:00:00Z',
  },
  {
    id: 'rpt-004',
    report_name: 'Weekly Intelligence Report – W25 2026',
    report_type: 'weekly',
    period_start: '2026-06-17',
    period_end: '2026-06-23',
    generated_by: 'Dept Admin',
    ai_summary: '',
    status: 'generating',
    total_questions: 0,
    clusters_analyzed: 0,
    generated_at: '2026-06-20T01:00:00Z',
  },
];
