import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


// https://jsonplaceholder.typicode.com/todos
const initialState = {
    todos: [],
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
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload
        })
        // buider
    }
})

export default todoSlice.reducer