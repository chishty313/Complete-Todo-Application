import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TTodo = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
};

type TInitialState = {
  todos: TTodo[];
};

const initialState: TInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const taskIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      if (taskIndex === -1) return;

      const task = state.todos[taskIndex];
      task.isCompleted = !task.isCompleted;

      // Remove the task from its current position
      state.todos.splice(taskIndex, 1);

      if (task.isCompleted) {
        // Push the task to the end of its completed
        state.todos.push(task);
      } else {
        state.todos.unshift(task);
      }
    },
    sortByPriority: (state, action: PayloadAction<string>) => {
      state.todos = state.todos
        .filter((todo) => todo.priority === action.payload)
        .concat(state.todos.filter((todo) => todo.priority !== action.payload));
    },
    editTodo: (state, action: PayloadAction<TTodo>) => {
      const taskIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );

      if (taskIndex !== -1) {
        state.todos[taskIndex] = action.payload;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleComplete, sortByPriority, editTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
