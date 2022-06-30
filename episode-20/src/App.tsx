import React, { useCallback, useRef } from 'react';
import { useTodosManager } from './useTodos';

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

function UL<T>({
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick?: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => itemClick?.(item)}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

const initialTodos = [
  {
    id: 0,
    text: 'initial todo',
    isDone: false,
  },
];

function App() {
  const { todos, addTodo, removeTodo } = useTodosManager(initialTodos);

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
      <UL
        items={todos}
        itemClick={({ id }) => alert(id)}
        render={({ text, id }) => (
          <>
            {text}
            <button onClick={() => removeTodo(id)}>Remove</button>
          </>
        )}
      />
      <div>
        <input type='text' ref={newTodoRef} />
        <Button onClick={onAddTodo}>Add todo</Button>
      </div>
    </div>
  );
}

const JustTodos = () => {
  const { todos } = useTodosManager(initialTodos);
  return <UL items={todos} render={({ text }) => text} />;
};

const AppWrapper = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
    <App />
    <JustTodos />
  </div>
);

export default AppWrapper;
