import { useCallback, useEffect, useRef, useState } from "react";
import Todos from "../Todos";
import Axios from "axios";
import { getTodos, updateTodo, deleteTodo, addTodo } from "../../api";

export interface ITodoList {
  id: number;
  todo: string;
}

const TodoList = () => {
  const [todoList, setTodoList] = useState<ITodoList[]>([]);
  const [inputValue, setInputValue] = useState<string | null>(null);

  const GetTodos = async () => {
    try {
      const data = await getTodos();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    (async () => {
      const data = await GetTodos();
      setTodoList(data);
    })();
  }, []);

  const AddTodo = async (_todo: string) => {
    try {
      const data = await addTodo(_todo);
      setTodoList((t) => [...t, data]);
      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  const DeleteTodo = async (_todoId: string) => {
    try {
      const data = await deleteTodo(_todoId);
      console.log(data);
      setTodoList(await getTodos());
      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  const UpdateTodo = async (_todo: string, _todoId: string) => {
    try {
      const data = await updateTodo(_todo, _todoId);
      setTodoList(await getTodos());
      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  const onChange = (value: string) => {
    setInputValue(value);
  };

  const addToDoList = async () => {
    if (inputValue !== null) {
      AddTodo(inputValue);
    }
  };

  return (
    <div
      style={{
        fontSize: "18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "1rem",
      }}
    >
      <h1>ToDoList</h1>

      <input
        style={{ marginRight: "1rem" }}
        type="text"
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={addToDoList}>add Todo</button>

      <ol>
        <Todos
          todos={todoList}
          DeleteTodo={DeleteTodo}
          UpdateTodo={UpdateTodo}
        />
      </ol>
    </div>
  );
};
export default TodoList;
