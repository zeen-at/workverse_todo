"use client";

import { RootState, useAppSelector } from "@/redux/store";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { INewTodo } from "../../types";
import TaskCard from "./components/TaskCard";
import { colorArray, textColors } from "./utils";

const Home = () => {
  const todo = useAppSelector((state: RootState) => state.todos);

  const router = useRouter();
  const dateToday = moment().format("MMMM DD, YYYY ");
  const timeToday = moment().format(" h:mm a");

  return (
    <main className="bg-white py-10 h-screen">
      <div className="w-full px-10 lg:px-24 flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col gap-3 my-5">
          <h1 className="text-base lg:text-xl font-bold tracking-wider text-slate-800">
            Hello, User
          </h1>
          <p className="text-slate-500">{dateToday}</p>
          <p className="text-slate-500">{timeToday}</p>
        </div>
        <div>
          <button
            onClick={() => router.push("/create-todo")}
            className="hover:text-blue-200 hover:underline bg-blue-400 rounded-md"
          >
            <p className="text-white p-4  text-sm md:text-base">Create New Todo</p>
          </button>
        </div>
      </div>

      <div className="px-10 lg:px-24 w-full">
        <div className="flex flex-row justify-between items-center">
          <p className="pt-6 pb-2 text-lg font-bold text-slate-800">My Tasks</p>
          <div className="flex gap-4">
            <Link href="/todos" className=" hover:underline">
              <p className="text-slate-500 hover:text-blue-700 text-sm md:text-base">View All</p>
            </Link>
          </div>
        </div>

        <div className="">
          {
            // map todos taking note of empty state
            todo.length > 0 ? (
              todo.slice(0, 4).map((item: INewTodo, index: number) => (
                <div
                  className="my-6 shadow-md hover:bg-white
                "
                  style={{
                    backgroundColor: colorArray[index % colorArray.length],
                    color: textColors[index % textColors.length],
                  }}
                  key={item.id}
                >
                  <TaskCard
                    done={item.done}
                    date={item.date}
                    title={item.title}
                    description={item.description}
                    id={item.id}
                    createdby={item.createdby}
                  />
                </div>
              ))
            ) : (
              <div className="flex py-10">
                <p className="text-slate-800 mx-auto">No available Todo</p>
              </div>
            )
          }
        </div>
      </div>
    </main>
  );
};

export default Home;
