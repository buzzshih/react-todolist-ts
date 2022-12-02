import React, { useEffect, useState } from "react";
import { ITodoList } from "../TodoList";
import classes from "./Todos.module.sass";
import { Divider, Modal, List, Typography, Input, Checkbox } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
interface Props {
  todos: ITodoList[];
  DeleteTodo: (_todoId: string) => Promise<string>;
  UpdateTodo: (_todoId: string, _todo: string) => Promise<any>;
  UpdateTodoDone: (_todoId: number, _done: boolean) => Promise<any>;
}

const Todos = ({ todos, DeleteTodo, UpdateTodo, UpdateTodoDone }: Props) => {
  const [currentTodos, setCurrentTodos] = useState<ITodoList[] | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [databaseTodoId, setdatabaseTodoId] = useState<number>();
  const [editValue, setEditValue] = useState<string>();

  const { Text, Link, Paragraph } = Typography;

  useEffect(() => {
    todos.sort((a, b) => a.id - b.id);
    setCurrentTodos(todos);
  }, [todos]);

  const showModal = (_currenTodoId: number, _dbTodoId: number) => {
    if (currentTodos !== null) {
      setEditValue(currentTodos[_currenTodoId].todo);
      setdatabaseTodoId(_dbTodoId);
      setEdit(true);
    }
  };

  const editInputHandle = (_editValue: string) => {
    setEditValue(_editValue);
  };

  useEffect(() => {
    console.log(editValue);
    console.log(databaseTodoId);
  }, [editValue, databaseTodoId]);

  const handleOk = () => {
    setEdit(false);
    if (editValue !== undefined && databaseTodoId !== undefined) {
      UpdateTodo(databaseTodoId.toString(), editValue);
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
        dataSource={currentTodos ?? []}
        renderItem={(item, index) => (
          <List.Item className={classes.todoItem}>
            <div>
              <Checkbox
                checked={item.done}
                className={classes.checkbox}
                onChange={(e) => UpdateTodoDone(item.id, e.target.checked)}
              />
              {item.done ? (
                <Text delete>{item.todo}</Text>
              ) : (
                <Text>{item.todo}</Text>
              )}
            </div>
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
