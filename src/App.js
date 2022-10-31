import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from './redux/todoSlice'
//material ui
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

function App() {
  const dispatch = useDispatch()
  const todo = useSelector((state) => state.todo)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  console.log(todo.todos)

  return (
    <div className="App">
      {todo.loading ? <h1>Loading...</h1> : <TableContainer >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>USER ID</TableCell>
              <TableCell>TITLE</TableCell>
              <TableCell>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todo.todos.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell>{data.userId}</TableCell>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.completed.toString()}</TableCell>
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
