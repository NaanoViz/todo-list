function TodoList(){

const todos =[
  {id:1, title: "Read More of the react intro"},
  {id:2, title: "Drink at least a gallon of water"},
  {id:3, title: "Eat a lot of food to stay healthy"},
]
    return (
            <ul>{todos.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>
    )
    
}

export default TodoList