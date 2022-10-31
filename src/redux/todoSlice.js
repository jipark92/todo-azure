import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//state
const initialState = {
    todos: [],
    loading: false,
    id: 201
}

//A function that accepts a Redux action type string and a callback function that should return a promise.
//fetch api
export const fetchTodos = createAsyncThunk('todo/fetchTodos', () => {
    return axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.data)
})

//createSlice contains both a reducer and actions
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        //add todo
        addTodo: (state, action) => {
            const todo = {
                id: state.id++,
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
    //don't need to generate action creators for these, since it'll use thunk action creator.
    extraReducers: (builder) => {
        //The builder provides addCase functions that may be called to define what actions this reducer will handle.
        builder
            //pending api
            .addCase(fetchTodos.pending, (state, action) => {
                state.loading = true
            })
            //fulfilled api
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false
                state.todos = action.payload
            })
            //rejected api
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = true
            })
    },
})

export const { addTodo, removeTodo } = todoSlice.actions
export default todoSlice.reducer