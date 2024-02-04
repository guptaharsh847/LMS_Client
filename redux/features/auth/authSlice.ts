import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState={
    token:'',
    user: "",
};

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        userRegistration:(state,action: PayloadAction<{token: string}>)=>{
            // state.user=action.payload;
            state.token=action.payload.token;
        },
        userLoggedIn:(state,action: PayloadAction<{accessToken: string,user: string}>)=>{
            state.user=action.payload.user;
            state.token=action.payload.accessToken;
        },
        userLoggedOut:(state)=>{
            state.user="";
            state.token="";
            
        }
    }
})
export const {userRegistration,userLoggedIn,userLoggedOut}=authSlice.actions;
export default authSlice.reducer;