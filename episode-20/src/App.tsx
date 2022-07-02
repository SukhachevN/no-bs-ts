import React, { useCallback, useRef } from 'react';
import useTodos from './useTodos';

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
    text: 'Xin chào',
    isDone: false,
  },
];

function App() {
  const { isEditing, todos, addTodo, removeTodo, startWorking, endWorking } =
    useTodos(initialTodos);

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
      {isEditing ? (
        <>
          <UL
            items={todos}
            itemClick={({ id }) => alert(id)}
            render={({ text, id, isDone }) => (
              <>
                ({isDone ? 'Done' : 'Not done'})&nbsp;
                {text}
                <button onClick={() => removeTodo(id)}>Remove</button>
              </>
            )}
          />
          <div>
            <input type='text' ref={newTodoRef} />
            <Button onClick={onAddTodo}>Add todo</Button>
          </div>
          <Button onClick={startWorking}>Start working</Button>
        </>
      ) : (
        <Button onClick={endWorking}>Stop working</Button>
      )}
    </div>
  );
}

export default App;
