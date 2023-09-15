import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification (state , action) {
      console.log('state now: ', state)
      console.log('action', action)
      return action.payload
      }
    }
  })

  export const { setNotification } = notificationSlice.actions;

  let timeoutId = '';
  
  export const createNotification = (message, delay) => {
    return async (dispatch) => {
      dispatch(setNotification(message));
  
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => dispatch(setNotification('')), delay * 1000);
    };
  };

  
export default notificationSlice.reducer