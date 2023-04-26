import { useEffect, useState } from "react";
import "./index.css";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./components/hooks/useHttp";

export default function Lab() {
  const [tasks, setTasks] = useState([]);

  const transformedTask = (taskObj) => {
    const loadedTasks = [];

    for (const taskKey of Object.keys(taskObj)) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    fetchTasks(
      {
        url: "https://my-first-project-6becd-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      },
      transformedTask
    );
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </>
  );
}
