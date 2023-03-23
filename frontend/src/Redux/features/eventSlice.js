import {createSlice} from '@reduxjs/toolkit';

export const eventSlice = createSlice({
    name: 'events',
    initialState: {
        eventData: [],
        
    },
    reducers: {
        setEventData: (state,action) => {
            console.log(action)
            state.eventData = action.payload
        }
    }
})

export const {setEventData} = eventSlice.actions

export default eventSlice.reducer