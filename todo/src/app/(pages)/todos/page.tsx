"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import SearchInput from "../../components/SearchInput";
import Link from "next/link";
import { RootState, useAppSelector } from "@/redux/store";
import Header from "@/app/components/Header";
import { INewTodo } from "../../../../types";
import { colorArray, pusher, textColors } from "@/app/utils";
import { useDispatch } from "react-redux";
import {
  createATodo,
  deleteTodo,
  editTodo,
  updateTodo,
} from "@/redux/slice/todoSlice";
import { useRouter } from "next/navigation";

const Todo = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const todos = useAppSelector((state: RootState) => state.todos);

  const router = useRouter();

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id: string) => {
    router.push(`/edit-todo/${id}`);
  };

  const handleCheck = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      dispatch(updateTodo({ ...todo, done: !todo.done }));
    }
  };

  useEffect(() => {
    const channel = pusher.subscribe("todo-channel");

    channel.bind("todo-edit", (data: { todo: INewTodo }) => {
      dispatch(editTodo(data.todo));
    });

    channel.bind("todo-added", (data: { todo: INewTodo }) => {
      dispatch(createATodo(data.todo));
    });

    channel.bind("todo-deleted", (data: { id: string }) => {
      dispatch(deleteTodo(data.id));
    });

    return () => {
      pusher.unsubscribe("todo-channel");
    };
  }, [dispatch]);

  const filteredtodo = todos?.filter(
    (item: INewTodo) =>
      item?.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className=" min-h-screen bg-white">
      <div className="py-10 w-full px-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="py-10">
            <Header title="Todos" />
          </div>
          <div className="">
            <SearchInput
              initialQuery={query}
              handleChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full py-10 flex flex-col gap-4 ">
          {filteredtodo.length > 0 ? (
            <>
              {filteredtodo.map(
                (
                  { id, title, description, date, createdby, done }: INewTodo,
                  index: number
                ) => (
                  <div
                    key={id}
                    className=" flex justify-between   items-center shadow-md py-10 px-24 
                      
                      "
                    style={{
                      backgroundColor: colorArray[index % colorArray.length],
                      color: textColors[index % textColors.length],
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => handleCheck(id)}
                    />
                    <div className="grid">
                      <div className="">{date}</div>
                      <div className="">{title}</div>
                      <div className="">{description}</div>
                      <div className="">{createdby}</div>
                      <div className=" flex gap-5 font-bold"></div>
                    </div>
                    <div className="flex gap-10">
                      <button
                        title="edit"
                        type="button"
                        onClick={() => handleEdit(id)}
                        className="text-3xl text-green-800 hover:bg-green-300"
                      >
                        <CiEdit />
                      </button>
                      <button
                        title="delete"
                        type="button"
                        onClick={() => handleDelete(id)}
                        className="text-3xl text-red-800 hover:bg-red-300"
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </div>
                  </div>
                )
              )}
            </>
          ) : (
            <div className="justify-center text-center items-center mx-auto text-amber-700">
              <p className=" font-bold text-2xl  ">No Available todo</p>
              <Link href="/create-todo" className="hover:text-blue-500 ">
                Create Todo now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
