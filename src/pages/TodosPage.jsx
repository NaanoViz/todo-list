import { useSearchParams, useNavigate } from 'react-router'; 
import { useEffect } from 'react';

const TodosPage = ({ 
  TodoForm, 
  TodoList, 
  TodosViewForm, 
  onAddTodo, 
  isSaving,
  todoList,
  onCompleteTodo, 
  onUpdateTodo, 
  isLoading, 
  ...todoState 
}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const itemsPerPage = 15;

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

    const totalPages = Math.ceil(todoList.length / itemsPerPage);

    const currentTodos = todoList.slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  };

  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate("/");
      }
    }
  }, [currentPage, totalPages, navigate]);

    return (
<>
    <TodoForm onAddTodo={onAddTodo} isSaving={isSaving}></TodoForm>
    <TodoList todoList={currentTodos} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo} isLoading={isLoading}></TodoList>
 
 <div className="paginationControls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        
        <span>Page {currentPage} of {totalPages}</span>
        
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    <hr />

    <TodosViewForm 
{...todoState}
    ></TodosViewForm>

    </>
    )
}

export default TodosPage;