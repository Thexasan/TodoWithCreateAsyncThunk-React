import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleChange } from "../reducer/todos";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  console.log(1);
  try {
    const response = await axios.get("http://localhost:3000/api/todos");
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const postTodo = createAsyncThunk(
  "todos/postTodo",
  async (_, { getState, dispatch }) => {
    const title = getState().todos.title;
    try {
      const response = await axios.post("http://localhost:3000/api/todos", {
        title: title,
        completed: false,
      });
      const data = response.data;
      dispatch(getTodos());
      dispatch(handleChange(""));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const patchTodo = createAsyncThunk(
  "todos/patchTodo",
  async ({ id, value }, { getState, dispatch }) => {
    const update = { ...getState().todos.list.find((todo) => todo.id === id) };
    update.completed = value;
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/todos/" + id,
        update
      );
      const data = response.data;
      dispatch(getTodos());
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { dispatch }) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/todos/" + id
      );
      const data = response.data;
      dispatch(getTodos());
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, title}, { dispatch }) => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/todos/" + id,
        { title}
      );
      const data = response.data;
      dispatch(getTodos());
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);
