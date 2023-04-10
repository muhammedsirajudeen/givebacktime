import { createSlice } from "@reduxjs/toolkit"

const initialState={
    data:"hello world"
}

const analyticSlice=createSlice({
    name:"analytics",
    initialState,
    reducers:{}
})



export default analyticSlice.reducer