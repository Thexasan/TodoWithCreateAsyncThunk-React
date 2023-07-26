import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/reducer";

export const store = configureStore(
    {
        reducer:rootReducer
        
    }
)