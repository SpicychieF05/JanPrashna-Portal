import { fetchApi } from "../lib/api";

export const dashboardService = {
  getOverview: async () => {
    try {
      const data = await fetchApi<any>("/admin/dashboard");
      return data;
    } catch (error) {
      console.error("Failed to fetch dashboard overview, returning mock fallback", error);
      // Fallback for UI visualization before full backend logic
      return {
        total_questions: 12453,
        processed_questions: 10234,
        processing_queue: 2219,
        active_clusters: 45,
        reports_generated: 12,
      };
    }
  },

  getTrends: async () => {
    // Backend doesn't have trend API yet, return mock
    return [
      { date: 'Mon', questions: 400, processed: 240, failed: 20 },
      { date: 'Tue', questions: 300, processed: 139, failed: 10 },
      { date: 'Wed', questions: 200, processed: 980, failed: 30 },
      { date: 'Thu', questions: 278, processed: 390, failed: 15 },
      { date: 'Fri', questions: 189, processed: 480, failed: 5 },
      { date: 'Sat', questions: 239, processed: 380, failed: 12 },
      { date: 'Sun', questions: 349, processed: 430, failed: 25 },
    ];
  },
  
  getDepartmentDistribution: async () => {
    return [
      { name: 'Health', value: 4000 },
      { name: 'Education', value: 3000 },
      { name: 'Public Works', value: 2000 },
      { name: 'Transport', value: 1500 },
      { name: 'Panchayat', value: 1953 },
    ];
  }
};
