import { SET_NOTIFICATION, NotificationAction, INotification } from '../types';

const initialState: INotification = {
  message: '',
  types: 'success'
};

const notificationReducer = (state = initialState, action: NotificationAction) => {
  switch(action.type) {
    case SET_NOTIFICATION:
      return {
        message: action.payload.message,
        type: action.payload.types
      }
    default: 
      return state;
  }
}

export default notificationReducer;