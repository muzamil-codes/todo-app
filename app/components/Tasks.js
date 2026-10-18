"use client";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MdDeleteSweep } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { IoSave } from "react-icons/io5";

const Tasks = () => {
  const [task, setTask] = useState([]);
  const [popup, setPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setId] = useState("");
  const [prior, setPrior] = useState("");
  console.log(title, desc, prior);

 

  const openPopup = (task) => {
    setPopup(true);
    setId(task._id);
    setTitle(task.title);
    setDesc(task.desc);
    setPrior(task.prior);
    console.log(id);
  };

  const editHandler = async (e, id) => {
    e.preventDefault();
    try {
      const updatedTask = await fetch(`api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title: title, desc: desc, prior: prior }),
      });

    setPopup(false);
    fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (task) => {
    const del = await fetch(`/api/tasks?id=${task._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task._id }),
    });
    await fetchData();
    toast.success("Task Removed");
  };

  const fetchData = async () => {
    const data = await fetch("/api/tasks");
    const a = await data.json();
    setTask(a);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="tasks bg-purple-700 h-screen ">
        <h1 className=" text-white px-4 py-2 rounded-xl w-fit mx-auto my-3 text-3xl">
          Your Tasks
        </h1>
        <div className="tasksCards p-2  ">
          <div className="flex flex-wrap gap-4 p-4 rounded-2xl  ">
            {task.map((task) => {
              return (
                <div
                  key={task._id}
                  className="bg-purple-700 dark:bg-purple-800 hover:bg-purple-800 hover:dark:bg-purple-700 dark:text-white text-white px-10 py-4 rounded-xl shadow-[0_0_2px] hover:shadow-[0_0_6px] hover:-translate-y-2 duration-300 relative h-fit  "
                >
                  <div className="flex justify-between">
                    <div className="title text-2xl font-bold ">
                      {task.title}
                    </div>
                    <div className="prior text-sm absolute top-2 right-2">
                      {task.prior == "high" && (
                        <div className="bg-red-600 h-3 w-3 rounded-full"></div>
                      )}
                      {task.prior == "low" && (
                        <div className="bg-green-600 h-3 w-3 rounded-full"></div>
                      )}
                      {task.prior == "medium" && (
                        <div className="bg-orange-600 h-3 w-3 rounded-full"></div>
                      )}
                      {task.prior == "" && (
                        <div className="bg-yellow-500 h-3 w-3 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <div className="desc opacity-70 hover:opacity-100 line-clamp-3 ">
                    {task.desc}
                  </div>

                  <div className="buttons flex gap-2 justify-center items-center px-3 py-2">
                    <button
                      onClick={() => deleteHandler(task)}
                      className="bg-purple-950 cursor-pointer mt-4 justify-center items-center px-2 py-1 rounded-full"
                    >
                      <MdDeleteSweep />
                    </button>
                    <button
                      onClick={() => openPopup(task)}
                      className="bg-purple-950 cursor-pointer mt-4 justify-center items-center px-2 py-1 rounded-full"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {popup ? (
        <div className="backdrop-blur-3xl z-10 fixed inset-0 flex justify-center items-center">
          <div className="absolute w-[400px] h-[300px] bg-purple-950 p-5 rounded-2xl z-10 text-white dark:text-white  ">
            <form onSubmit={(e) => editHandler(e, id)}>
              <h1 className="text-2xl">Update Todo</h1>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-purple-900 outline-0 border-0 px-4 py-2 rounded-md my-2"
                placeholder="Enter Title"
              />
              <textarea
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="bg-purple-900 outline-0 border-0 px-4 py-2 rounded-md resize-none scrollbar-thin scrollbar-thumb-purple-950 "
                placeholder="Enter Description"
                rows={3}
                cols={30}
              ></textarea>
              <br />
              <div className="my-3 flex gap-5 items-center shadow-[0_0_1px] rounded-2xl px-2 py-1 flex justify-between ">
                <label htmlFor="">Priority</label>
                <select
                  className="bg-purple-800 w-[200px] h-[30px] rounded-2xl px-1 outline-0 border-0  "
                  value={prior}
                  required
                  onChange={(e) => setPrior(e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-purple-800 cursor-pointer px-8 py-1 rounded-2xl flex gap-3 justify-center items-center "
              >
                Save  <span><IoSave /></span>
              </button>
            </form>

            <button
              onClick={() => setPopup(false)}
              className="absolute top-1 right-1 text-2xl hover:text-red-500"
            >
              <IoCloseCircle className="hover:rotate-180 duration-500" />
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Tasks;
