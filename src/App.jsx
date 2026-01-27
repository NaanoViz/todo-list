import './App.css'
import TodoList from './features/TodoList/TodoList.jsx'
import TodoForm from './features/TodoForm.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import TodosViewForm from './features/TodosViewForm.jsx';
import { useCallback } from 'react'

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
  
  const [todoList,setTodoList] = useState([])
  
  const [isSaving,setIsSaving] = useState(false);

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
      setIsSaving(true);
      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok){
      throw new Error(resp.message)
    }
    const { records } = await resp.json();

    const savedTodo = {
      id:records[0].id,
      ...records[0].fields,
    };

    if (!records[0].fields.isCompleted) {
      savedTodo.isCompleted = false;
    }

    setTodoList([...todoList, savedTodo]);      
  }
    
    
    catch(error){
    console.error(error);
    setErrorMessage(error.message);
    }
    
    finally {
      setIsSaving(false);
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
    const originalTodo = todoList.find((todo) => todo.id === Id)
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
      ;
      const updatedTodos = todoList.map((todo) => {
      if (todo.id === Id){
      return {...todo, isCompleted: true};
      } 
      return todo;
    })
    setTodoList(updatedTodos)
    }
    catch(error){
    console.error(error);
    setErrorMessage(`${error.message}. Reverting todo...`);
    const revertedTodos = {...todoList, originalTodo};
    setTodoList([...revertedTodos]);
  }
  
  finally {
      setIsSaving(false);
    }
  };

  

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id)
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
      const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id){
      return editedTodo;
      } 
      return todo;
      })
      setTodoList(updatedTodos)
      ;

    }
    catch(error){
    console.error(error);
    setErrorMessage(`${error.message}. Reverting todo...`);
    const revertedTodos = {...todoList, originalTodo};
    setTodoList([...revertedTodos]);
  }
  
  finally {
      setIsSaving(false);
    }
  };


  const [isLoading,setIsLoading] = useState(false);

  const [errorMessage,setErrorMessage] = useState("");

  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => { 
      
      setIsLoading(true); 

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
    const fetchedTodos = records.map((record) => {
      const todo = {
        id: record.id,
        ...record.fields,
        
      };
      if (!todo.isCompleted){
        todo.isCompleted = false;
      }
      return todo;
    });

    setTodoList(fetchedTodos); 

    }
    catch(error){
      setErrorMessage(error.message);
    }
    finally {
      setIsLoading(false);
    } 
    
    };
    fetchTodos();
  
  },[sortField , sortDirection, queryString]);

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA I put isloading in TodoList instead of TODOFORM WHY!?!?!?!?!?!?!?!?!?
  return (
   <div>
    <h1>Todo List</h1>
    <TodoForm onAddTodo={addTodo} isSaving={isSaving}></TodoForm>
    <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} isLoading={isLoading}></TodoList>

    <hr />

    <TodosViewForm 
    sortField={sortField} 
    setSortField={setSortField} 
    sortDirection={sortDirection} 
    setSortDirection={setSortDirection} 
    queryString={queryString}
    setQueryString={setQueryString}
    ></TodosViewForm>

    {errorMessage ? 
    (<div> 
   
    <hr /> 
    
    <p>errorMessage</p> 
    
    <button id = "errorMessageDis" disabled = {errorMessage}>RemoveButton </button> 
    
    </div>) :'No Error' }
    </div>
  )


  }


export default App
