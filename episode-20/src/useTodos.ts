import { useCallback, useReducer } from 'react';

interface Todo {
  id: number;
  isDone: boolean;
  text: string;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

export function useTodos(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const reducer = (state: Todo[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          { id: state.length, text: action.text, isDone: false },
        ];
      case 'REMOVE':
        return state.filter(({ id }) => id !== action.id);
      default:
        return state;
    }
  };

  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const addTodo = useCallback(
    (text: string) => dispatch({ type: 'ADD', text }),
    []
  );

  const removeTodo = useCallback(
    (id: number) => dispatch({ type: 'REMOVE', id }),
    []
  );

  return { todos, addTodo, removeTodo };
}
