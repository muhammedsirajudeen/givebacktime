import { createSlice } from "@reduxjs/toolkit"
import firebaseConfig from "@/FirebaseHelper/Authentication"
import { initializeApp } from "firebase/app";

const app=initializeApp(firebaseConfig)

const initialState={
    app:app
}

const firebaseSlice=createSlice({
    name:"firebase",
    initialState,
    reducers:{
        setFirebaseApp:(state,action)=>{
            state.app=action.payload
        }
    }
})


export const {setFirebaseApp}=firebaseSlice.actions
export default firebaseSlice.reducer