import './App.css'
import TodoList from './TodoList.jsx'
import TodoForm from './TodoForm.jsx'
import { useState } from 'react'

function App() {
  
  const [todoList,setTodoList] = useState([])
  
  function addTodo(title) {
  const newTodo = {
    title,
    id:Date.now(),
    isCompleted :false
  }
  setTodoList([...todoList, newTodo])
  }

  function completeTodo(Id){
  const updatedTodos = todoList.map((todo) => {
    if (todo.id === Id){
      return {...todo, isCompleted: true};
      } 
      return todo;
    })
    setTodoList(updatedTodos)
  }

  return (
   <div>
    <h1>Todo List</h1>
    <TodoForm onAddTodo={addTodo}></TodoForm>
    <TodoList todoList={todoList} onCompleteTodo={completeTodo}></TodoList>

   </div>
  )

  }


export default App
