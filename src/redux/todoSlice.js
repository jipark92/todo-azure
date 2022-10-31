import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    todos: [],
    loading: false,
}

export const fetchTodos = createAsyncThunk('todo/fetchTodos', () => {
    return axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.data)
})

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    extraReducers: (builder) => {
        //pending api
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true
        })
        //fulfilled api
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false
            state.todos = action.payload
        })
        //rejected api
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export default todoSlice.reducer