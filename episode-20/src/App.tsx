import React, { useCallback, useRef } from 'react';
import { TodosProvider, useAddTodo, useRemoveTodo, useTodos } from './useTodos';

import './App.css';
import { render } from '@testing-library/react';

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
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => itemClick(item)}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const todos = useTodos();
  const addTodo = useAddTodo();
  const removeTodo = useRemoveTodo();

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

const JustShowTodos = () => {
  const todos = useTodos();

  return (
    <UL
      items={todos}
      itemClick={({ id }) => alert(id)}
      render={({ text }) => text}
    />
  );
};

const AppWrapper = () => (
  <TodosProvider
    initialTodos={[
      {
        id: 0,
        text: 'initial todo',
        isDone: false,
      },
    ]}
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '50% 50%',
      }}
    >
      <App />
      <JustShowTodos />
    </div>
  </TodosProvider>
);

export default AppWrapper;
