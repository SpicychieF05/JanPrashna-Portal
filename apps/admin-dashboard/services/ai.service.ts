import * as MockData from '../mock/clusters.data';
import type { Cluster } from '../mock/clusters.data';

export const aiService = {
  getClusters: async (): Promise<Cluster[]> => {
    return MockData.mockClusters;
  },

  getCluster: async (id: string): Promise<Cluster | undefined> => {
    return MockData.mockClusters.find(c => c.id === id);
  },

  mergeClusters: async (sourceId: string, targetId: string): Promise<void> => {
    // Future: POST /api/v1/ai/clusters/merge
  },

  splitCluster: async (id: string): Promise<void> => {
    // Future: POST /api/v1/ai/clusters/split
  },

  reprocessCluster: async (id: string): Promise<void> => {
    // Future: POST /api/v1/ai/reprocess/{question_id}
  },
};
