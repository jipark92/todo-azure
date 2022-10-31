import './css/App.css'
import { useState, useEffect } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from './redux/todoSlice'
import { addTodo, removeTodo } from './redux/todoSlice'
//material ui
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

function App() {
  const [title, setTitle] = useState('')

  //dispatch action
  const dispatch = useDispatch()
  //get redux state values(todos, loading, id)
  const todo = useSelector((state) => state.todo)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  //add todo function
  const handleAddTodo = (e) => {
    e.preventDefault()
    if (!title) {
      alert('type something in!')
      return
    }
    dispatch(addTodo(title))
    setTitle('')
  }

  //remove todo function
  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="App">
      <h1>Redux Todo List</h1>
      <form action="">
        <input
          type='text'
          placeholder='walk dog'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button onClick={(e) => { handleAddTodo(e) }}>ADD TODO</button>
      </form>

      {todo.loading ? <h1>Loading...</h1> : <TableContainer >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>USER ID</TableCell>
              <TableCell>TITLE</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todo.todos.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell>{data.userId}</TableCell>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>
                    <button onClick={() => { handleRemoveTodo(data.id) }}>REMOVE TODO</button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  );
}

export default App;