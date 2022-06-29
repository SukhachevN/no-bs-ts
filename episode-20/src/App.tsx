import React, { useCallback, useRef } from 'react';
import { useTodos } from './useTodos';

import './App.css';

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

interface BoxProps {
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children }) => (
  <div style={{ padding: '1rem', fontWeight: 'bold' }}>{children}</div>
);

const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
  }
> = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      backgroundColor: 'red',
      color: 'white',
      fontSize: 'xx-large',
    }}
  >
    {title ?? children}
  </button>
);

function App() {
  const { todos, addTodo, removeTodo } = useTodos([
    {
      id: 0,
      text: 'initial todo',
      isDone: false,
    },
  ]);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current?.value);
      newTodoRef.current.value = '';
    }
  }, []);

  return (
    <div>
      <Heading title='Introduction' />
      <Box>Hello there</Box>
      <Heading title='Todos' />
      {todos.map(({ text, id, isDone }) => (
        <div key={id}>
          {text}
          <button onClick={() => removeTodo(id)}>Remove</button>
        </div>
      ))}

      <div>
        <input type='text' ref={newTodoRef} />
        <Button onClick={onAddTodo}>Add new todo</Button>
      </div>
    </div>
  );
}

export default App;
