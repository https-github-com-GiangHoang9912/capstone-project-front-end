export const SET_NOTIFICATION = 'SET_NOTIFICATION';

export interface INotification {
  message: string;
  types: 'success' | 'danger' | 'warning';
}

interface SetNotificationAction {
  type: typeof SET_NOTIFICATION;
  payload: INotification;
}

export type NotificationAction = SetNotificationAction;