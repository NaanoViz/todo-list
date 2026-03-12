import './App.css'
import TodoList from './features/TodoList/TodoList.jsx'
import TodoForm from './features/TodoForm.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import TodosViewForm from './features/TodosViewForm.jsx';
import { useCallback } from 'react'
import styles from '../App.module.css'
import { useReducer } from 'react';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer.js';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;


//Taking the code inside the arrow function of encode URL(Helper Function) and puttin it inside variable encodeURL

// const encodeUrl = ({ sortField, sortDirection, queryString }) => {
//   // let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

//   // let searchQuery = "";

//   // if (queryString) {
//   //   searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
//   // }

//   // return encodeURI(`${url}?${sortQuery}${searchQuery}`);
// };

function App() {

  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

  
  // const [todoList,setTodoList] = useState([])
  
  // const [isSaving,setIsSaving] = useState(false);

  // State variables created for filter/sorting, in this case based on time and desc

  const [sortField,setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");

  // State Variables for queryString

  const [queryString, setQueryString] = useState("");

  const encodeUrl = useCallback(() => {  
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

  let searchQuery = "";

  if (queryString) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
  }

  return encodeURI(`${url}?${sortQuery}${searchQuery}`);}
  
  ,[sortField, sortDirection, queryString])

  const addTodo = async (title) => { // Changed newTodo to title
  const payload = {
    records: [
    {
      fields: {
        title: title, // Changed newTodo.title to title
        isCompleted: false, // Changed newTodo.isCompleted to false
      },
    },
  ],
  };

    
  // const [isSaving,setIsSaving] = useState(false);

  // const addTodo = async (newTodo) => {
  // const payload = {
  //   records: [
  //   {
  //     fields: {
  //       title: newTodo.title,
  //       isCompleted: newTodo.isCompleted,
  //     },
  //   },
  // ],
  // };

    const options = {
      method: 'POST',
      headers: {
      Authorization: token,
      'Content-Type':'application/json',
      },
      body: JSON.stringify(payload),
      };

    try{
      dispatch({ type: todoActions.startRequest });

      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok){
      throw new Error(resp.message)
    }
    const { records } = await resp.json();

      dispatch({ 
      type: todoActions.addTodo, 
      record: records[0] 
    });      
  }
    
    
    catch(error){
    console.error(error);
    dispatch({ 
      type: todoActions.setLoadError, 
      error: error 
    });
    }
    
    finally {
      dispatch({ type: todoActions.endRequest });
    }

    };
  


  // function completeTodo(Id){
  // const updatedTodos = todoList.map((todo) => {
  //   if (todo.id === Id){
  //     return {...todo, isCompleted: true};
  //     } 
  //     return todo;
  //   })
  //   setTodoList(updatedTodos)
  // }
    
    const completeTodo = async (Id) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === Id)
    
    dispatch({ type: todoActions.completeTodo, id: Id });
    
    const payload = {
    records: [
        {
            id: Id,
            fields: {
                title: originalTodo.title,
                isCompleted: true
            },
        },
    ],
};
    const options = {
      method:"PATCH",
      headers:{Authorization: token,
      'Content-Type':'application/json',},
      body: JSON.stringify(payload),

    };

    try{
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok){
      throw new Error(resp.message)
      }

    }
    catch(error){
      dispatch({ 
        type: todoActions.revertTodo, 
        editedTodo: originalTodo, 
        error: error 
});
  }
  
  finally {
    dispatch({ type: todoActions.endRequest });
    }
  };

  

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === editedTodo.id)

    dispatch({ 
    type: todoActions.updateTodo, 
    editedTodo: editedTodo 
  });

    const payload = {
    records: [
        {
            id: editedTodo.id,
            fields: {
                title: editedTodo.title,
                isCompleted: editedTodo.isCompleted,
            },
        },
    ],
};
    const options = {
      method:"PATCH",
      headers:{Authorization: token,
      'Content-Type':'application/json',},
      body: JSON.stringify(payload),

    };

    try{
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok){
      throw new Error(resp.message)
      }

    }
    catch(error){
    dispatch({ 
      type: todoActions.revertTodo, 
      editedTodo: originalTodo, 
      error: error 
    });
  }
  
  finally {
      dispatch({ type: todoActions.endRequest });
    }
  };


  // const [isLoading,setIsLoading] = useState(false);

  // const [errorMessage,setErrorMessage] = useState("");

  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => { 
      
      dispatch({ type: todoActions.fetchTodos });

      const options = {
      method:"GET",
      headers:{"Authorization": token},
    };

    try{
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok){
      throw new Error(resp.message)
      }
    
    const { records } = await resp.json();
  
    //for UseEffect actions.todoClausd  
    // const fetchedTodos = records.map((record) => {
    //   const todo = {
    //     id: record.id,
    //     ...record.fields,
        
    //   };
    //   if (!todo.isCompleted){
    //     todo.isCompleted = false;
    //   }
    //   return todo;
    // });

    dispatch({ 
          type: todoActions.loadTodos, 
          records: records 
   });
   
    }
    catch(error){
      dispatch({ 
          type: todoActions.setLoadError, 
          error: error 
        });
    }
    finally {
    } 
    
    };
    fetchTodos();
  
  },[sortField , sortDirection, queryString, encodeUrl, token]);


  return (
   <div className = {styles.appCenter}>
    <h1>Todo List</h1>
    <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving}></TodoForm>
    <TodoList todoList={todoState.todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} isLoading={todoState.isLoading}></TodoList>

    <hr />

    <TodosViewForm 
    sortField={sortField} 
    setSortField={setSortField} 
    sortDirection={sortDirection} 
    setSortDirection={setSortDirection} 
    queryString={queryString}
    setQueryString={setQueryString}
    ></TodosViewForm>

    {todoState.errorMessage ? 
    (<div className = {styles.errorMessageBorder}> 
   
    <hr /> 
    
    <p>{todoState.errorMessage}</p> 
    
    <button id = "errorMessageDis" onClick={() => dispatch({ type: todoActions.clearError })}>RemoveButton </button> 
    
    </div>) :'No Error' }
    </div>
  )


  }


export default App


// import './App.css'; 

// function App() {
//   return (
//     <div className="app-background">
//     </div>
//   );
// }

// export default App;

// Insetad of ^, can also do 
// <div className={`app-background ${styles.appCenter}`}></div>