"use client";

import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Formik } from "formik";
import { todoValidation } from "../../utils";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { INewTodo, ITodo } from "../../../../types";
import Pusher from "pusher-js";
import { useDispatch } from "react-redux";
import { createATodo } from "@/redux/slice/todoSlice";

const initialTodo: ITodo = {
  title: "",
  date: "",
  description: "",
  createdby: "",
  done: false,
};

const Create = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const handleCreateTodo = (value: ITodo) => {
    try {
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        // useTLS: true,
      });

      const channel = pusher.subscribe("todo-channel");

      channel.bind("todo-update", (data: INewTodo) => {
        createATodo(data);
      });

      dispatch(createATodo({ ...value, id: "" }));

      toast.success("Task created successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white px-12 py-10 lg:px-6  w-full lg:w-1/2 lg:shadow-lg min-h-screen mx-auto">
      <div>
        <Header title="New Task" />

        <div className="py-10 flex flex-col gap-6">
          <Formik
            initialValues={initialTodo}
            onSubmit={(values) => handleCreateTodo(values)}
            validationSchema={todoValidation}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
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

                <CustomButton title="Create Task" handleClick={handleSubmit} />
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Create;
