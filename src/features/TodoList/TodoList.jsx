import TodoListItem from './TodoListItem.jsx'

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }){

    const filteredTodoList = todoList.filter(todo => !todo.isCompleted)


    return (
        
    filteredTodoList.length === 0 
    ? <p>You have to add a todo first...</p>
    : <ul>{filteredTodoList.map(todo => <TodoListItem key = {todo.id} todo ={todo} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo}/>)}</ul>
    )
    
}

export default TodoList