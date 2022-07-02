import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  isDone: boolean;
  text: string;
}

interface TodosSliceState {
  todos: Todo[];
}

const initialState: TodosSliceState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: state.todos.length,
        text: action.payload,
        isDone: false,
      });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = todosSlice.actions;

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectTodos = (state: RootState) => state.todos.todos;

export default store;