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

const initState = {
  todos: [],
  todoInput: "",
  todoEdit: {
    value: "",
    index: "",
  },
  showEdit: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TODO_INPUT:
      return {
        ...state,
        todoInput: action.payload,
      };

    case SET_TODO_EDIT:
      return {
        ...state,
        showEdit: true,
        todoEdit: { value: action.payload, index: action.index },
      };

    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case RESET_INPUT:
      return {
        ...state,
        todoInput: "",
      };

    case DELETE_ALL:
      return {
        ...state,
        todos: [],
      };

    case DELETE_TODO:
      const newTodos = [...state.todos];
      newTodos.splice(action.payload, 1);
      return {
        ...state,
        todos: newTodos,
      };

    case EDIT_TODO:
      const newTodosEdit = [...state.todos];
      // console.log("newTodosEdit", newTodosEdit);
      // console.log("index: ", action.index, "; value: ", action.payload);
      newTodosEdit.splice(action.index, 1, action.payload);
      return {
        ...state,
        showEdit: false,
        todos: newTodosEdit,
      };

    case CLOSE_EDIT:
      return {
        ...state,
        showEdit: false,
      };
    default:
      throw new Error("invalid action");
  }
};

export { initState };
export default reducer;
