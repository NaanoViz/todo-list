import TodoListItem from './TodoListItem.jsx'
import styles from '../../../TodoList.module.css'

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }){

    const filteredTodoList = todoList.filter(todo => !todo.isCompleted)


    return (

    filteredTodoList.length === 0 
    ? ( isLoading ? (<p>Is loading...</p>):  (<p>You have to add a todo first...</p>))
    : (<ul className = {styles.removalLists}>{filteredTodoList.map(todo => <TodoListItem key = {todo.id} todo ={todo} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo} isLoading={isLoading}/>)}</ul>
    ))}
    

export default TodoList