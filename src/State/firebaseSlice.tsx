
import { createSlice } from "@reduxjs/toolkit"

const initialState={
    app:null
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