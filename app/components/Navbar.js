"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { MdLaptopChromebook } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { MdDoneOutline } from "react-icons/md";
import { toast } from "sonner";
import { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {



  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prior, setPrior] = useState("");



  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const req = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          desc: desc,
          prior: prior,
        }),
      });
      if (!req.ok) {
        throw new Error("PROBLEM ADDING TASK");
      }
    } catch (error) {
      console.log(error);
    }

    setTitle(" ");
    setDesc(" ");
    setPrior(" ");
    setPopup(false);
    
    window.location.reload();
    
    toast.success("Task Added Successfully")
  };

  const addTaskHandler = () => {
    setPopup(true);
  };




  const [popup, setPopup] = useState(false);

  const { setTheme } = useTheme();

  return (
    <header>
      <nav className="navbar bg-purple-700 dark:bg-gray-700 text-white flex justify-between items-center px-4 py-1   ">
        <div className="logo text-2xl font-bold ">
          <h1>TO-DO</h1>
        </div>
        <div className="flex items-center gap-1 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4">
          <button
            onClick={addTaskHandler}
            className="bg-purple-950 px-4 py-1 rounded-xl cursor-pointer "
          >
            Add Task
          </button>
          <div className="tasksWrapper p-4  ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="primary"
                  size="icon"
                  className=" bg-purple-950 shadow-[0_0_4px] shadow-purple-500 rounded-full "
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <MdLaptopChromebook /> System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {popup ? (
        <div className="backdrop-blur-3xl z-10 fixed inset-0 flex justify-center items-center">
          <div className="absolute w-[400px] h-[300px] bg-purple-950  p-5 h-fit rounded-2xl z-10 text-white dark:text-white  ">
            <form onSubmit={handelSubmit} 
            className=""
            >
              <h1 className="text-2xl">Add Todo</h1>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-purple-900 outline-0 border-0 px-4 py-2  rounded-md my-2"
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
                className="bg-purple-800 cursor-pointer  px-5 py-1  rounded-2xl flex gap-3 justify-center items-center "
              >
                Add <span><MdDoneOutline /></span>
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
    </header>
  );
};

export default Navbar;
