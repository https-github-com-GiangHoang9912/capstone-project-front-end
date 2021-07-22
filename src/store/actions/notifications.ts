import { SET_NOTIFICATION, NotificationAction, INotification } from '../types'

export const setNotification = (notification: INotification): NotificationAction => ({
  type: SET_NOTIFICATION,
  payload: notification,
})
