import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import './App.css';

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

interface BoxProps {
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children }) => (
  <div style={{ padding: '1rem', fontWeight: 'bold' }}>{children}</div>
);

const List: React.FC<{ items: string[]; onClick?: (item: string) => void }> = ({
  items,
  onClick,
}) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
);

interface Payload {
  text: string;
}

interface Todo {
  id: number;
  isDone: boolean;
  text: string;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number }
  | { type: 'DONE'; id: number };

function App() {
  const onClickHandler = useCallback((item: string) => alert(item), []);

  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setPayload(data));
  }, []);

  const reducer = (state: Todo[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          { id: state.length, text: action.text, isDone: false },
        ];
      case 'REMOVE':
        return state.filter(({ id }) => id !== action.id);
      case 'DONE':
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo
        );
      default:
        return state;
    }
  };

  const [todos, dispatch] = useReducer(reducer, []);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: 'ADD',
        text: newTodoRef.current?.value,
      });
      newTodoRef.current.value = '';
    }
  }, []);

  return (
    <div>
      <Heading title='Introduction' />
      <Box>Hello there</Box>
      <List items={['1', '2', '3']} onClick={onClickHandler} />
      <Box>{JSON.stringify(payload)}</Box>
      <Heading title='Todos' />
      {todos.map(({ text, id, isDone }) => (
        <div key={id}>
          {text}
          <button onClick={() => dispatch({ type: 'REMOVE', id })}>
            Remove
          </button>
        </div>
      ))}

      <div>
        <input type='text' ref={newTodoRef} />
        <button onClick={onAddTodo}>Add new todo</button>
      </div>
    </div>
  );
}

export default App;
