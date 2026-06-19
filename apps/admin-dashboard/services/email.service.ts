import * as MockData from '../mock/email.data';
import type { EmailRecipient, EmailSchedule, DeliveryLog } from '../mock/email.data';

export const emailService = {
  getRecipients: async (): Promise<EmailRecipient[]> => {
    return MockData.mockRecipients;
  },

  createRecipient: async (data: Omit<EmailRecipient, 'id' | 'created_at'>): Promise<void> => {
    // Future: POST /api/v1/admin/email-recipients
  },

  updateRecipient: async (id: string, data: Partial<EmailRecipient>): Promise<void> => {
    // Future: PUT /api/v1/admin/email-recipients/{id}
  },

  deleteRecipient: async (id: string): Promise<void> => {
    // Future: DELETE /api/v1/admin/email-recipients/{id}
  },

  getSchedules: async (): Promise<EmailSchedule[]> => {
    return MockData.mockSchedules;
  },

  getDeliveryLogs: async (): Promise<DeliveryLog[]> => {
    return MockData.mockDeliveryLogs;
  },

  retryDelivery: async (logId: string): Promise<void> => {
    // Future: POST /api/v1/admin/email-delivery-logs/{id}/retry
  },
};
