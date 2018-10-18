import { TODO_ADD, TODO_TOGGLE, FILTER_SET } from "./Types";

export function doAddTodo(id, name) {
  return {
    type: TODO_ADD,
    todo: {id, name}
  }
}

export function doToggleTodo(id) {
  return {
    type: TODO_TOGGLE,
    todo: { id }
  }
}

export function doSetFilter(filter) {
  return {
    type: FILTER_SET,
    filter
  }
}