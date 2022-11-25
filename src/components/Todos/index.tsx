import React, { useEffect, useState } from "react";
import { ITodoList } from "../TodoList";
import classes from "./Todos.module.sass";
import { Divider, Modal, List, Typography, Input } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
interface Props {
  todos: ITodoList[];
  DeleteTodo: (_todoId: string) => Promise<string>;
  UpdateTodo: (_todo: string, _todoId: string) => Promise<any>;
}

const Todos = ({ todos, DeleteTodo, UpdateTodo }: Props) => {
  const [currentTodos, setCurrentTodos] = useState<ITodoList[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [databaseTodoId, setdatabaseTodoId] = useState<number>();
  const [editValue, setEditValue] = useState<string>();

  useEffect(() => {
    if (todos.length < 1) return;
    console.log("todos render");
    console.log("todos", todos);
    todos.sort((a, b) => a.id - b.id);

    setCurrentTodos(todos);
  }, [todos]);

  const showModal = (_currenTodoId: number, _dbTodoId: number) => {
    console.log("editValue", currentTodos[_currenTodoId].todo);
    console.log("databaseTodoId", _dbTodoId);
    setEditValue(currentTodos[_currenTodoId].todo);
    setdatabaseTodoId(_dbTodoId);
    setEdit(true);
  };

  useEffect(() => {
    console.log(editValue);
  }, [editValue]);

  const editInputHandle = (_editValue: string) => {
    setEditValue(_editValue);
  };

  const handleOk = () => {
    setEdit(false);
    console.log("editValue", editValue);
    console.log("databaseTodoId", databaseTodoId);

    if (editValue !== undefined && databaseTodoId !== undefined) {
      UpdateTodo(editValue, databaseTodoId.toString());
    }
  };

  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <ol className={classes.todolistWrapper}>
      <Divider orientation="left">待辦任務列表</Divider>
      <List
        // header={<div>Header</div>}
        // bordered
        dataSource={currentTodos}
        renderItem={(item, index) => (
          <List.Item className={classes.todoItem}>
            <div>{item.todo}</div>
            <div>
              <EditTwoTone onClick={() => showModal(index, item.id)} />
              <DeleteTwoTone onClick={() => DeleteTodo(item.id.toString())} />
            </div>
          </List.Item>
        )}
      />
      <Modal
        title="修改待辦任務"
        open={edit}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={editValue}
          onChange={(e) => editInputHandle(e.target.value)}
        />
      </Modal>
    </ol>
  );
};

export default Todos;
