"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { EditTodoSchema } from "@/app/utils";
import { INewTodo } from "../../../../../types";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "@/redux/store";
import { editTodo } from "@/redux/slice/todoSlice";

const EditEvent = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  const router = useRouter();

  const todoId = Array.isArray(id) ? id[0] : id;

  const todos = useAppSelector((state: RootState) =>
    state.todos.find((todo) => todo.id === todoId)
  );


  const [initialTodo, setInitialTodo] = useState<INewTodo>({
    id: "",
    title: "",
    date: "",
    description: "",
    createdby: "",
    done: false,
  });

  useEffect(() => {
    if (todos) {
      setInitialTodo({
        id: todoId,
        title: todos.title,
        date: todos.date,
        description: todos.description,
        createdby: todos.createdby,
        done: false,
      });
    }
  }, [todos, todoId]);


  const handleEdit = (values: INewTodo) => {
    if (id) {
      dispatch(
        editTodo({
          ...values,
          id: todoId,
        })
      );
    }

    toast.success("Todo edited successfully!");
    router.push("/")
  };

  if (!initialTodo) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white px-12 py-10 lg:px-6  w-full lg:w-1/2 lg:shadow-lg min-h-screen mx-auto">
      <div>
        <Header title={"Edit Existing Todo"} />

        <div className="py-10 flex flex-col gap-6">
          <Formik
            initialValues={initialTodo}
            validationSchema={EditTodoSchema}
            onSubmit={(values) => handleEdit(values)}
          >
            {({
              touched,
              values,
              setFieldValue,
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form
                className="flex flex-col gap-10 py-6"
                onSubmit={handleSubmit}
              >
                <CustomInput
                  title="Title"
                  placeholder=""
                  value={values.title}
                  handleChange={handleChange("title")}
                  handleBlur={handleBlur("title")}
                  error={errors.title}
                  type="text"
                />
                <CustomInput
                  title="Date"
                  placeholder=""
                  value={values.date}
                  handleChange={handleChange("date")}
                  handleBlur={handleBlur("date")}
                  error={errors.date}
                  type="date"
                />
                <CustomInput
                  title="Description"
                  placeholder={""}
                  value={values.description}
                  handleChange={handleChange("description")}
                  otherStyles="my-2"
                  type="text"
                />
                <CustomInput
                  title="Created By"
                  placeholder={""}
                  value={values.createdby}
                  handleChange={handleChange("createdby")}
                  otherStyles="my-2"
                  type="text"
                />
                <CustomButton title="Update Task" handleClick={handleSubmit} />{" "}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
