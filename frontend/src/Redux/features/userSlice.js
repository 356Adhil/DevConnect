import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: [],
        
    },
    reducers: {
        setUserDetails: (state,action) => {
            console.log(action)
            state.userDetails = action.payload
        }
    }
})

export const {setUserDetails} = userSlice.actions

export default userSlice.reducer