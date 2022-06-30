import React, {
  useCallback,
  useReducer,
  createContext,
  useContext,
} from 'react';

interface Todo {
  id: number;
  isDone: boolean;
  text: string;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

export function useTodosManager(initialTodos: Todo[]): {
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

export const TodosProvider: React.FC<{
  initialTodos: Todo[];
  children: React.ReactNode;
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): Todo[] => {
  const { todos } = useContext(TodoContext);
  return todos;
};

export const useAddTodo = (): UseTodosManagerResult['addTodo'] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};

export const useRemoveTodo = (): UseTodosManagerResult['removeTodo'] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};
