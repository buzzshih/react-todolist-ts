import Axios from "axios";

const todoAxios = Axios.create({ baseURL: process.env.REACT_APP_APIBASEURL });

/**
 * 查詢所有todo資料
 *
 */
export const getTodos = async () => {
  try {
    const { data } = await todoAxios.request({ url: "/todos", method: "get" });
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * 查詢該id的todo資料
 * @param _todoId todo id
 *
 */
export const getTodosById = async (_todoId: string) => {
  try {
    const { data } = await todoAxios.request({
      url: `/todo/${_todoId}`,
      method: "get",
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 *  修改該id todo資料
 * @param _todoId todo id
 * @param _todo Want to modify todo data
 */
export const updateTodo = async (_todoId: string, _todo: string) => {
  try {
    const { data } = await todoAxios.request({
      url: `/todos/${_todoId}`,
      method: "PUT",
      data: { todo: _todo },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 *  修改該id todo狀態 是否已經完成
 * @param _todoId todo id
 * @param _done Want to modify todo data
 */
export const updateTodoDone = async (_todoId: number, _done: boolean) => {
  try {
    const { data } = await todoAxios.request({
      url: `/todosDone/${_todoId}`,
      method: "PUT",
      data: { done: _done },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 *  刪除id todo資料
 * @param _todoId todo id
 */
export const deleteTodo = async (_todoId: string) => {
  try {
    const { data } = await todoAxios.request({
      url: `/todos/${_todoId}`,
      method: "delete",
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 *  新增 todo 資料
 * @param _todo Want to add todo data
 */
export const addTodo = async (_todo: string) => {
  try {
    const { data } = await todoAxios.request({
      url: "/todos",
      method: "post",
      data: { todo: _todo },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
