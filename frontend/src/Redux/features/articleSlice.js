import {createSlice} from '@reduxjs/toolkit';

export const articleSlice = createSlice({
    name: 'article',
    initialState: {
        articleData: [],
        
    },
    reducers: {
        setArticleData: (state,action) => {
            console.log(action)
            state.articleData = action.payload
        }
    }
})

export const {setArticleData} = articleSlice.actions

export default articleSlice.reducer