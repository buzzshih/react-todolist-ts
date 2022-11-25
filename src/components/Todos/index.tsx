import React, { useEffect, useState } from "react";
import { ITodoList } from "../TodoList";
import classes from "./Todos.module.sass";
import { deleteTodo } from "../../api";
interface Props {
  todos: ITodoList[];
  DeleteTodo: (_todoId: string) => Promise<string>;
  UpdateTodo: (_todoId: string, _todo: string) => Promise<any>;
}

const Todos = ({ todos, DeleteTodo, UpdateTodo }: Props) => {
  const [currentTodos, setCurrentTodos] = useState<ITodoList[]>([]);

  useEffect(() => {
    if (todos.length < 1) return;
    console.log("todos render");
    console.log("todos", todos);
    todos.sort((a, b) => a.id - b.id);

    setCurrentTodos(todos);
  }, [todos]);

  return (
    <>
      {currentTodos.map((item) => (
        <li className={classes.todoItem} key={item.id}>
          <div>{item.todo}</div>
          <div className={classes.buttonWrapper}>
            <button
              className={classes.button}
              onClick={() => DeleteTodo(item.id.toString())}
            >
              remove
            </button>
            <button
              className={classes.button}
              onClick={() => UpdateTodo("todoUpdate", item.id.toString())}
            >
              modify
            </button>
          </div>
        </li>
      ))}
    </>
  );
};

export default Todos;
