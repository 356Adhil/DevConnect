import {createSlice} from '@reduxjs/toolkit';

export const communitySlice = createSlice({
    name: 'community',
    initialState: {
        communityData: [],
        
    },
    reducers: {
        setCommunityData: (state,action) => {
            console.log(action.payload,"from Slice")
            state.communityData = action.payload
        }
    }
})

export const {setCommunityData} = communitySlice.actions

export default communitySlice.reducer