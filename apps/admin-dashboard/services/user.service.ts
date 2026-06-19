import * as MockData from '../mock/users.data';
import type { AdminUser, UserRole } from '../mock/users.data';

export const userService = {
  getUsers: async (): Promise<AdminUser[]> => {
    return MockData.mockUsers;
  },

  createUser: async (data: Omit<AdminUser, 'id' | 'created_at' | 'last_login'>): Promise<void> => {
    // Future: POST /api/v1/admin/users
  },

  updateUser: async (id: string, data: Partial<AdminUser>): Promise<void> => {
    // Future: PUT /api/v1/admin/users/{id}
  },

  disableUser: async (id: string): Promise<void> => {
    // Future: PATCH /api/v1/admin/users/{id}/disable
  },
};
