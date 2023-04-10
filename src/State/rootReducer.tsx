import { combineReducers } from "@reduxjs/toolkit"
import firebaseReducer from "./firebaseSlice"
import analyticReducer from "./analyticSlice"
const rootReducer=combineReducers({
    firebase:firebaseReducer,
    analytics:analyticReducer
})

export default rootReducer