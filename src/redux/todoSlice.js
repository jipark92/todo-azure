import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//state
const initialState = {
    todos: [],
    loading: false,
}

//fetch api
export const fetchTodos = createAsyncThunk('todo/fetchTodos', () => {
    return axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.data)
})

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        //add todo
        addTodo: (state, action) => {
            let id = 201
            const todo = {
                id: id++,
                userId: Math.round(Math.random() * 10),
                title: action.payload
            }
            state.todos.push(todo)
        },
        //remove todo
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        }
    },
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
    },
})

export const { addTodo, removeTodo } = todoSlice.actions
export default todoSlice.reducer