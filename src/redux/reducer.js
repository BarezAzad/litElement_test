import {
    add_todo,
    update_filter,
    update_todo_status,
    clear_completed
  } from "./actions.js";
  import { createSelector } from "reselect";
  
  export const VisibilityFilters = {
    show_all: "all",
    show_active: "active",
    show_completed: "completed"
  };
  
  const initial_state = {
    todos: [],
    filter: VisibilityFilters.show_all
  }; 
  
  export const reducer = (state = initial_state, action) => {
    switch (action.type) {
      case add_todo:
        return {
          ...state,
          todos: [...state.todos, action.todo]
        };
      case update_todo_status:
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.todo.id
              ? { ...action.todo, complete: action.complete }
              : todo
          )
        };
      case update_filter:
        return {
          ...state,
          filter: action.filter
        };
      case clear_completed:
        return {
          ...state,
          todos: state.todos.filter(todo => !todo.complete)
        };
      default:
        return state;
    }
  };
  
  const getTodosSelector = state => state.todos;
  const getFilterSelector = state => state.filter;
  
  export const getVisibleTodosSelector = createSelector(
    getTodosSelector, getFilterSelector, 
    (todos, filter) => { 
      switch (filter) {
        case VisibilityFilters.show_completed:
          return todos.filter(todo => todo.complete);
        case VisibilityFilters.show_active:
          return todos.filter(todo => !todo.complete);
        default:
          return todos;
      }
    }
  );