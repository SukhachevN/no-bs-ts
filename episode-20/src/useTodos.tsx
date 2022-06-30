import React, { useCallback, useContext, useEffect } from 'react';

import { createGlobalState } from 'react-use';

interface Todo {
  id: number;
  isDone: boolean;
  text: string;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const useGlobalTodos = createGlobalState<Todo[]>([]);

export function useTodosManager(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, setTodos] = useGlobalTodos();

  const addTodo = useCallback(
    (text: string) =>
      setTodos((state) => [
        ...state,
        { id: state.length, text, isDone: false },
      ]),
    [setTodos]
  );

  const removeTodo = useCallback(
    (delId: number) =>
      setTodos((state) => state.filter(({ id }) => id !== delId)),
    [setTodos]
  );

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos, setTodos]);

  return { todos, addTodo, removeTodo };
}
