import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import mailReducer from "./mail";
import activeOptionReducer from "./activeOption";

export default configureStore({
  reducer: {
    user: userReducer,
    mail: mailReducer,
    activeOption: activeOptionReducer,
  },
});
