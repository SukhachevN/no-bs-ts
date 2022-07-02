import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import { useCallback, useEffect } from 'react';

interface Todo {
  id: number;
  isDone: boolean;
  text: string;
}

const todoMachine = createMachine<
  { todos: Todo[] },
  | { type: 'SET_TODOS'; todos: Todo[] }
  | { type: 'ADD_TODO'; text: string }
  | { type: 'REMOVE_TODO'; id: number }
  | { type: 'START_WORKING' }
  | { type: 'END_WORKING' }
>(
  {
    id: 'todoMachine',
    initial: 'editing',
    context: {
      todos: [],
    },
    states: {
      editing: {
        on: {
          START_WORKING: {
            target: 'working',
            cond: 'haveUndoneTodos',
          },
          ADD_TODO: {
            actions: assign({
              todos: ({ todos }, { text }) => [
                ...todos,
                { id: todos.length, text, isDone: false },
              ],
            }),
          },
          REMOVE_TODO: {
            actions: assign({
              todos: ({ todos }, { id: delId }) =>
                todos.filter(({ id }) => id !== delId),
            }),
          },
          SET_TODOS: {
            actions: assign({
              todos: (_, { todos }) => todos,
            }),
          },
        },
      },
      working: {
        exit: assign({
          todos: ({ todos }) => {
            const newTodos = [...todos];
            const undoneTodo = newTodos.find(({ isDone }) => !isDone);
            if (undoneTodo) undoneTodo.isDone = true;
            return newTodos;
          },
        }),
        on: {
          END_WORKING: {
            target: 'editing',
          },
        },
      },
    },
  },
  {
    guards: {
      haveUndoneTodos: ({ todos }) => todos.some(({ isDone }) => !isDone),
    },
  }
);

const useTodos = (
  initialTodos: Todo[]
): {
  isEditing: boolean;
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  startWorking: () => void;
  endWorking: () => void;
} => {
  const [state, send] = useMachine(todoMachine);

  const addTodo = useCallback(
    (text: string) =>
      send({
        type: 'ADD_TODO',
        text,
      }),
    [send]
  );

  const removeTodo = useCallback(
    (id: number) => send({ type: 'REMOVE_TODO', id }),
    [send]
  );

  const startWorking = useCallback(
    () => send({ type: 'START_WORKING' }),
    [send]
  );

  const endWorking = useCallback(() => send({ type: 'END_WORKING' }), [send]);

  useEffect(() => {
    send({ type: 'SET_TODOS', todos: initialTodos });
  }, [initialTodos, send]);

  return {
    isEditing: state.matches('editing'),
    todos: state.context.todos,
    addTodo,
    removeTodo,
    startWorking,
    endWorking,
  };
};

export default useTodos;
