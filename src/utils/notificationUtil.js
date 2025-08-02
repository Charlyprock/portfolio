import { useNotificationStore } from '@/stores/notificationsStore'

function notificationsUtil() {
  const notificationStore = useNotificationStore()

  return {
    
    notify: notificationStore.addNotification,
    success: notificationStore.success,
    error: notificationStore.error,
    warning: notificationStore.warning,
    info: notificationStore.info,
    remove: notificationStore.removeNotification,
    clear: notificationStore.clearAll,
    
    // État
    notifications: notificationStore.notifications
  }
}

export const NotificationUtil = {
  notificationsUtil,
}