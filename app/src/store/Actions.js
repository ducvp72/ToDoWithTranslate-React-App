import {
  SET_TODO_INPUT,
  ADD_TODO,
  DELETE_ALL,
  RESET_INPUT,
  DELETE_TODO,
  SET_TODO_EDIT,
  EDIT_TODO,
  CLOSE_EDIT,
} from "./constants";

export const setTodoInput = (payload) => ({
  type: SET_TODO_INPUT,
  payload,
});

export const setTodoEdit = (payload, index) => ({
  type: SET_TODO_EDIT,
  payload,
  index,
});

export const addTodo = (payload) => ({
  type: ADD_TODO,
  payload,
});

export const deletALL = () => ({
  type: DELETE_ALL,
});

export const resetTodoInput = () => ({
  type: RESET_INPUT,
});

export const deleteTodo = (payload) => ({
  type: DELETE_TODO,
  payload,
});

export const editTodo = (payload, index) => ({
  type: EDIT_TODO,
  payload,
  index,
});

export const closeTodoEdit = () => ({
  type: CLOSE_EDIT,
});
