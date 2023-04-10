import { createWrapper } from "next-redux-wrapper"
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"

const makeStore=()=>{
    const store=configureStore({
        reducer:rootReducer
    })
    return store
}

export const wrapper=createWrapper(makeStore)