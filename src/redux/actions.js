import nanoid from 'nanoid';

export const add_todo = 'add_todo';
export const update_todo_status = 'update_todo_status';
export const update_filter = 'update_filter';
export const clear_completed = 'clear_complated';

export const addTodo = task => {
  return {
    type: add_todo,
    todo: { 
      id: nanoid(),
      task,
      complete: false
    }
  };
};

export const updateTodoStatus = (todo, complete) => {
  return {
    type: update_todo_status,
    todo,
    complete
  };
};

export const updateFilter = filter => {
  return {
    type: update_filter,
    filter
  };
};

export const clearCompleted = () => {
  return {
    type: clear_completed
  };
};