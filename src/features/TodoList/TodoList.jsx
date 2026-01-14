import TodoListItem from './TodoListItem.jsx'

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }){

    const filteredTodoList = todoList.filter(todo => !todo.isCompleted)


    return (

    filteredTodoList.length === 0 
    ? ( isLoading ? (<p>Is loading...</p>):  (<p>You have to add a todo first...</p>))
    : (<ul>{filteredTodoList.map(todo => <TodoListItem key = {todo.id} todo ={todo} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo} isLoading={isLoading}/>)}</ul>
    ))}
    

export default TodoList