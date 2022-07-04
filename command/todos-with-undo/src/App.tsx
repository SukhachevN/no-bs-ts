import React from 'react';
import { useRef } from 'react';
import { useStateWithUndo } from './useStateWithUndo';

interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

function App() {
  const [todos, setTodos, undoTodo] = useStateWithUndo<Todo[]>([]);
  const todoText = useRef<HTMLInputElement>(null);

  return (
    <div className='App'>
      {todos.map(({ id, text, isDone }) => (
        <div key={id}>
          <input
            type='checkbox'
            checked={isDone}
            onChange={() =>
              setTodos(
                todos.map((todo) =>
                  todo.id === id
                    ? {
                        ...todo,
                        isDone: !todo.isDone,
                      }
                    : todo
                )
              )
            }
          />
          <label>{text}</label>
        </div>
      ))}
      <div>
        <input type='text' ref={todoText} />
        <button
          onClick={() =>
            setTodos([
              ...todos,
              {
                id: todos.length + 1,
                text: todoText.current!.value,
                isDone: false,
              },
            ])
          }
        >
          Add
        </button>
      </div>
      <div>
        <button onClick={undoTodo}>Undo</button>
      </div>
    </div>
  );
}

export default App;
