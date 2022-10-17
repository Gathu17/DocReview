import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    docs: [],
    quantity: 0,
    isLoading: false,
    error: false
}

const docSlice = createSlice({
    name: 'doc',
    initialState,
    reducers: {
        loadingDocs: (state) => {
            state.isLoading = true;
        },
        loadedDocs: (state,action) => {
            state.isLoading = true;
            state.docs = action.payload.data;
            state.quantity = action.payload.quantity
        },
        errorDocs : (state) => {
          state.isLoading = false;
          state.error = true
        }

    }
})
export const {loadedDocs,loadingDocs,errorDocs} = docSlice.actions
export default docSlice.reducer