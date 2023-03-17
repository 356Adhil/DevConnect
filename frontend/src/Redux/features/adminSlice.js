import {createSlice} from '@reduxjs/toolkit';

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        adminDetails: [],
        
    },
    reducers: {
        setAdminDetails: (state,action) => {
            console.log(action)
            state.adminDetails = action.payload
        }
    }
})

export const {setAdminDetails} = adminSlice.actions

export default adminSlice.reducer