import { createSlice } from "@reduxjs/toolkit";
import { IContact } from "../type/contact";
import { contactDB } from "../fake-db/contact-db";
import { CONSTANT } from "../const/constant";
import { CommonUtil } from "../utils/utils";

const initContact: IContact[] = contactDB;

export const contactSlice = createSlice({
  initialState: initContact,
  name: "contact",
  reducers: {
    getAllContact: (state) => {
      const contacts = CommonUtil.getLocalStorage(CONSTANT.LS_CONTACT);
      if (contacts) {
        return contacts;
      }
      return state;
    },

    addContact: (state, action) => {
      state.push(action.payload);
      CommonUtil.setLocalStorage(CONSTANT.LS_CONTACT, state);
    },

    updateContact: (state, action) => {
      const index = state.findIndex(
        (contact) => contact.id === action.payload.id
      );
      state[index] = action.payload;
      CommonUtil.setLocalStorage(CONSTANT.LS_CONTACT, state);
    },

    removeContact: (state, action) => {
      const index = state.findIndex((contact) => contact.id === action.payload);
      state.splice(index, 1);
      CommonUtil.setLocalStorage(CONSTANT.LS_CONTACT, state);
    },

    // detailContact: (state, action) => {
    //   // const index = state.findIndex((contact) => contact.id === action.payload);
    //   const detail = state.find((c) => c.id === action.payload);
    //   // return state[index];
    //   return detail;
    // },
  },
});

export const {
  getAllContact,
  addContact,
  removeContact,
  updateContact,
  // detailContact,
} = contactSlice.actions;

const contactReducer = contactSlice.reducer;
export default contactReducer;
