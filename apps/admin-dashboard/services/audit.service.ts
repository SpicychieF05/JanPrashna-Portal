import { fetchApi } from "../lib/api";
import { MockData } from "../mock/audit.data";

export const auditService = {
  getLogs: async () => {
    try {
      const data = await fetchApi<any[]>("/admin/audit-logs");
      return data;
    } catch (e) {
      console.warn("Fallback to mock data for audit logs");
      return MockData.mockLogs;
    }
  },
};
