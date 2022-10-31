import { useState, useEffect } from 'react'
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

  const dispatch = useDispatch()
  //grab redux state values(todos, loading, id)
  const todo = useSelector((state) => state.todo)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  //add todo
  const handleAddTodo = (titleValue) => {
    dispatch(addTodo(titleValue))
  }

  //remove todo
  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="App">
      <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} />
      <button onClick={() => {
        handleAddTodo(title)
        setTitle('')

      }}>ADD TODO</button>

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
