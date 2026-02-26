import { useRef } from 'react'
import { useState } from 'react'
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx'
import styled from 'styled-components'

function TodoForm ({onAddTodo, isSaving}){

    const [workingTodoTitle, setWorkingTodoTitle] = useState("")

    const todoTitleInput= useRef("")

    function handleAddTodo(event){
    event.preventDefault()
    
    onAddTodo(workingTodoTitle)
    setWorkingTodoTitle("")

    todoTitleInput.current.focus(); 

    };

    const ItalicDisabledButton = styled.button`
    font-style: ${props => (props.disabled ? 'italic' : 'normal')}
    `;

    return (
    <form onSubmit={handleAddTodo}>
    <TextInputWithLabel value={workingTodoTitle} onChange={(event) => setWorkingTodoTitle(event.target.value)} elementId="todoTitle" labelText={"Todo"} ref ={todoTitleInput}/>
     <ItalicDisabledButton id = "TodoButton" disabled = {workingTodoTitle === ""}>{isSaving ? 'Saving...' : 'Add Todo'} </ItalicDisabledButton>
    </form>
    )
}

export default TodoForm