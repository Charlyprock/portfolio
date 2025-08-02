import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: []
  }),

  actions: {
    addNotification(notification) {
      const id = Date.now() + Math.random()
      const newNotification = {
        id,
        type: notification.type || 'info', // success, warning, error, info
        title: notification.title || '',
        message: notification.message || '',
        duration: notification.duration || 5000, 
        autoClose: notification.autoClose !== false
      }

      this.notifications.push(newNotification)

      if (newNotification.autoClose) {
        setTimeout(() => {
          this.removeNotification(id)
        }, newNotification.duration)
      }

      return id
    },

    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    },

    clearAll() {
      this.notifications = []
    },

    success(message, title = 'Succès', options = {}) {
      return this.addNotification({
        type: 'success',
        title,
        message,
        ...options
      })
    },

    error(message, title = 'Erreur', options = {}) {
      return this.addNotification({
        type: 'error',
        title,
        message,
        ...options
      })
    },

    warning(message, title = 'Attention', options = {}) {
      return this.addNotification({
        type: 'warning',
        title,
        message,
        ...options
      })
    },

    info(message, title = 'Information', options = {}) {
      return this.addNotification({
        type: 'info',
        title,
        message,
        ...options
      })
    }
  }
})