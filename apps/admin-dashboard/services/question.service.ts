import { fetchApi } from "../lib/api";
import { MockData } from "../mock/questions.data";

export const questionService = {
  getQuestions: async (params?: any) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/admin/questions?${queryString}` : `/admin/questions`;
      const data = await fetchApi<any[]>(endpoint);
      return {
        data: data,
        total: 12453, // Temp until meta logic
      };
    } catch (e) {
      console.warn("Fallback to mock data for questions list");
      return {
        data: MockData.mockQuestions,
        total: MockData.mockQuestions.length,
      };
    }
  },

  getQuestion: async (id: string) => {
    try {
      const data = await fetchApi<any>(`/admin/questions/${id}`);
      return data;
    } catch (e) {
      console.warn("Fallback to mock data for question details");
      return MockData.mockQuestions.find((q) => q.id === id);
    }
  },
};
