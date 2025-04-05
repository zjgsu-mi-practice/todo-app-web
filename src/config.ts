// Environment variables
const env = process.env.NODE_ENV || 'development';

// API configuration
export const API_CONFIG = {
  baseUrl: '/api',
  timeout: 30000, // 30 seconds
};

// Feature flags
export const FEATURES = {
  enableReminderNotifications: true,
  enableTagsManagement: true,
  enableCategoriesManagement: true,
  enableMemoWithAttachments: true,
}; 