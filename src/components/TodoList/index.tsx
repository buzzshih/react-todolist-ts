import { useEffect, useState } from "react";
import Todos from "../Todos";
import {
  getTodos,
  updateTodo,
  deleteTodo,
  addTodo,
  updateTodoDone,
} from "../../api";
import { Input, Button } from "antd";
import classes from "./Todolist.module.sass";

export interface ITodoList {
  id: number;
  todo: string;
  done: boolean;
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
      setTodoList(await getTodos());
      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  const UpdateTodo = async (_todoId: string, _todo: string) => {
    try {
      const data = await updateTodo(_todoId, _todo);
      setTodoList(await getTodos());
      console.log(data);

      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  const UpdateTodoDone = async (_todoId: number, _done: boolean) => {
    try {
      const data = await updateTodoDone(_todoId, _done);
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
      setInputValue(null);
    }
  };

  return (
    <div className={classes.container}>
      <h1>TODOLIST</h1>
      <div className={classes.content}>
        <Input
          size="large"
          className={classes.todoInput}
          placeholder="要增加的代辦事項"
          onChange={(e) => onChange(e.target.value)}
          value={inputValue ?? ""}
        />
        <Button size="large" onClick={addToDoList} type="primary">
          新增任務
        </Button>
      </div>

      <Todos
        todos={todoList}
        DeleteTodo={DeleteTodo}
        UpdateTodo={UpdateTodo}
        UpdateTodoDone={UpdateTodoDone}
      />
    </div>
  );
};
export default TodoList;
