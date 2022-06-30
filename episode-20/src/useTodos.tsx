import create from 'zustand';

interface Todo {
  id: number;
  isDone: boolean;
  text: string;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

const useTodos = create<{
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (delId: number) => void;
}>((set) => ({
  todos: [
    {
      id: 0,
      text: 'initial todo',
      isDone: false,
    },
  ],
  addTodo: (text: string) =>
    set((state) => ({
      ...state,
      todos: [...state.todos, { id: state.todos.length, text, isDone: false }],
    })),
  removeTodo: (delId: number) =>
    set((state) => ({
      ...state,
      todos: state.todos.filter(({ id }) => id !== delId),
    })),
}));

export default useTodos;
