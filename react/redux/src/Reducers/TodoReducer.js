import { TODO_ADD, TODO_TOGGLE } from '../Actions/Types';

const todos = [
  { id: '0', name: 'learn redux' },
  { id: '1', name: 'learn mobx' }
];

function todoReducer (state = todos, action) {
  switch(action.type) {
    case TODO_ADD : {
      return applyAddTodo(state, action);
    }
    case TODO_TOGGLE: {
      return applyToggleTodo(state, action);
    }
    default:
      return state;
  }
}

function applyAddTodo(state, action) {
  const todo = Object.assign({}, action.todo, {completed: false});
  return state.concat(todo);
}

function applyToggleTodo(state, action) {
  return state.map(todo =>
    todo.id === action.todo.id
    ? Object.assign({}, todo, { completed: !todo.completed })
    : todo
  );
}

export default todoReducer;