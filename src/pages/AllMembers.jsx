import { useEffect, useState } from "react";
import {
  addTaskDB,
  deleteTaskDB,
  fetchNextTasksDB,
  fetchTasksDB,
  updateTaskDB,
} from "../utils/functions.js";
import { collection } from "firebase/firestore";
import { db } from "../utils/firebase.js";
import toast, { Toaster } from "react-hot-toast";

const AllMembers = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState("");
  const [updateTodo, setUpdateTodo] = useState(false);
  const [todoid, setTodoId] = useState("");
  const [lastDoc,setLastDoc]=useState(null)

  const tasksCollectionRef = collection(db, "tasks");

  // Create Task
  async function addTask() {
    event.preventDefault();
    try {
      const response = await addTaskDB(newTodo);

      if (response.success) {
        const structredData = {
          text: newTodo,
          completed: false,
        };
        toast.success("Task Added");
        setTodos((prev) => {
          return [...prev, structredData];
        });
      } else {
        alert(`Error:${response.error}`);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  // Read Tasks
  async function fetchTasks() {
    const response = await fetchTasksDB();
    if (response.success) {
      toast.success("Task fetched");
      setTodos(response.data);
      setLastDoc(response.lastdoc)
    } else {
      alert(`Error:${response.error}`);
    }
  }

  // Update Task
  async function updateTask() {
    const response = await updateTaskDB(newTodo, todoid);
    if (response.success) {
      toast.success("Task Updated");

      setUpdateTodo(false);
      setNewTodo("");
    } else {
      alert(`Error:${response.error}`);
    }
  }

  // Delete Task
  async function deleteTask(task) {
    event.preventDefault();

    try {
      const response = await deleteTaskDB(task);
      if (response.success) {
        toast.success("Task Deleted");
      } else {
        alert(`Error:${response.error}`);
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

  //show more task

  async function showMoreTask() {
    event.preventDefault()

    const response = await fetchNextTasksDB(lastDoc);

    if (response.success) {
      toast.success("Fetched Next Task");
      console.log('response success ==> ', response.data);
      setTodos((prev) => { return [...prev, ...response.data] })
      
      console.log('next-lastdoc==>',response.nextLastDoc);
      setLastDoc(response.nextLastDoc)
      
    } else {
      alert("Failed to fetch next task");
      console.log("Error==>", response.error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {/* Left side - Traffic lights and navigation */}
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 bg-gray-900 min-h-screen border-r border-gray-700">
          <div className="flex flex-col items-center py-6 space-y-6">
            <div className="w-8 h-8 bg-lime-300  rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <button className="w-8 h-8 text-gray-400 hover:text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
            <button className="w-8 h-8 text-gray-400 hover:text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            <button className="w-8 h-8 bg-lime-300 text-black rounded-lg">
              <svg
                className="w-5 h-5 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </button>
            <button className="w-8 h-8 text-gray-400 hover:text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button className="w-8 h-8 text-gray-400 hover:text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button className="w-8 h-8 text-gray-400 hover:text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header with back button and title */}
          <div className="flex items-center mb-8">
            <h1 className="text-3xl font-bold">All Members</h1>
          </div>

          {/* Tab Navigation */}
          <div className=" flex space-x-1 mb-8  ">
            {/* Input bar */}

            <div className="  mx-auto flex gap-4 ">
              <form onSubmit={addTask} className="mx-auto flex gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder=""
                    onChange={(e) => setNewTodo(e.target.value)}
                    value={newTodo}
                    className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {updateTodo == true ? (
                  <div className="flex gap-4">
                    <button
                      onClick={updateTask}
                      className="px-4 py-2 bg-lime-300 text-black rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setUpdateTodo(false)}
                      className="px-4 py-2 bg-white text-black rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    // onClick={addTask}
                    type="submit"
                    className="px-4 py-2 bg-lime-300 text-black rounded-lg"
                  >
                    Add Task
                  </button>
                )}

                <button
                  onClick={showMoreTask}
                  className="px-4 py-2 bg-white text-black rounded-lg"
                >
                  Show More
                </button>
              </form>
            </div>
          </div>

          {/* containers of task */}
          <div className="mx-auto w-xl">
            {todos &&
              todos.map((todo) => {
                // console.log(todo);

                return (
                  <div className="bg-gray-900 rounded-xl p-4 mb-4 flex items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{todo.text}</h3>
                      <p className="text-sm text-gray-400">{todo.completed}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => deleteTask(todo)}
                        className="px-3 py-1 bg-red-600 text-sm rounded-lg"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setUpdateTodo(true);
                          setNewTodo(todo.text);
                          setTodoId(todo.id);
                        }}
                        className="px-3 py-1 bg-lime-300 text-sm rounded-lg text-black"
                      >
                        Update
                      </button>
                      <button className="text-gray-400 hover:text-white">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AllMembers;
