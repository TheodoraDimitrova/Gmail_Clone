import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sendMessageIsOpen: false,
    isExpandSendMessage: true,
    mails: [],
    sentedMails: null,
  },
  reducers: {
    setMails: (state, action) => {
      state.mails = action.payload;
    },

    sentedMails: (state, action) => {
      state.sentedMails = action.payload;
    },
    openSendMeggase: (state) => {
      state.sendMessageIsOpen = true;
      state.isExpandSendMessage = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
    toggleSendMesage: (state) => {
      state.isExpandSendMessage = !state.isExpandSendMessage;
    },
  },
});

export const {
  openSendMeggase,
  closeSendMessage,
  toggleSendMesage,
  setMails,
  sentedMails,
} = mailSlice.actions;

export default mailSlice.reducer;
