import * as MockData from '../mock/reports.data';
import type { Report, ReportType } from '../mock/reports.data';

export interface GenerateReportParams {
  report_type: ReportType;
  period_start: string;
  period_end: string;
}

export const reportService = {
  getReports: async (): Promise<Report[]> => {
    return MockData.mockReports;
  },

  getReport: async (id: string): Promise<Report | undefined> => {
    return MockData.mockReports.find(r => r.id === id);
  },

  generateReport: async (params: GenerateReportParams): Promise<{ id: string }> => {
    // Future: POST /api/v1/admin/reports/generate
    return { id: `rpt-${Date.now()}` };
  },
};
