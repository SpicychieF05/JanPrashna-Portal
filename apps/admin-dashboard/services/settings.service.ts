import * as MockData from '../mock/settings.data';

export const settingsService = {
  getSettings: async () => {
    return MockData.mockSettings;
  },

  updateSettings: async (section: string, data: Record<string, unknown>): Promise<void> => {
    // Future: PUT /api/v1/admin/settings
  },
};
