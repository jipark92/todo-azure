import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from './redux/todoSlice'

function App() {
  const dispatch = useDispatch()
  const todo = useSelector((state) => state.todo)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  console.log(todo.todos)
  return (
    <div className="App">
      hello world

      {todo.todos.map((to) => {
        return (
          <li>{to.id}</li>
        )
      })}

    </div>
  );
}

export default App;
