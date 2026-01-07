import { useRef } from 'react'
import { useState } from 'react'
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx'

function TodoForm ({onAddTodo}){

    const [workingTodoTitle, setWorkingTodoTitle] = useState("")

    const todoTitleInput= useRef("")

    function handleAddTodo(event){
    event.preventDefault()
    
    onAddTodo(workingTodoTitle)
    setWorkingTodoTitle("")

    todoTitleInput.current.focus(); 

    };

    return (
    <form onSubmit={handleAddTodo}>
    <TextInputWithLabel value={workingTodoTitle} onChange={(event) => setWorkingTodoTitle(event.target.value)} elementId="todoTitle" labelText={"Todo"} ref ={todoTitleInput}/>
     <button id = "TodoButton" disabled = {workingTodoTitle === ""}>Add Todo</button>
    </form>
    )
}

export default TodoForm