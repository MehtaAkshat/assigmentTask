import React, { useState, useEffect} from "react";
import "./App.css";

const App = () => {


  const [task, setTask] = useState([]);
  const [input, setInput] = useState();
  const [taskEditing, setTaskEditing] = useState(null);
  const [editingtext, setEditingText] = useState("");

  
  useEffect(() => {
    const data = localStorage.getItem("task");
    const loadeddata = JSON.parse(data);

    if (loadeddata) {
      setTask(loadeddata);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(task);
    localStorage.setItem("task", data);
  }, [task]);


  function submitHandler(event) {
    event.preventDefault();
    const newTask = task;
    newTask.unshift({ name: input, id: Math.random(), inprogress: true });
    setTask([...newTask]);
    setInput("");
  }

  function deleteTask(id) {
    const updateList = task.filter((item) => item.id !== id);
    setTask(updateList);
  }
  function editTask(id) {
    const updatedTask = [...task].map((currentTask) => {
      if (currentTask.id === id) {
        currentTask.name = editingtext;
      }
      return currentTask;
    });
    setTask(updatedTask);
    setTaskEditing(null);
    setEditingText("");
  }

  function toggleComplete(id) {
    const updatedTask = [...task].map((currentTask) => {
      if (currentTask.id === id) {
        currentTask.inprogress = !currentTask.inprogress;
      }
      return currentTask;
    });

    setTask(updatedTask);
  }

  const inProgressTaskList = task.filter((item) => item.inprogress === true);
  const completedTaskList = task.filter((item) => item.inprogress === false);

  return (
    <div className="background">
      <div>
        <form>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button onClick={submitHandler}>Add Task</button>
        </form>
      </div>
      <div>
        <div>
          {inProgressTaskList.map((singleTask) => {
            return (
              <div key={singleTask.id}>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      onClick={() => {
                        toggleComplete(singleTask.id);
                      }}
                      name="completed"
                    />
                    <label for="completed">Completed</label>
                  </div>
                </div>
                {taskEditing === singleTask.id ? (
                  <input
                    type="text"
                    onChange={(e) => {
                      setEditingText(e.target.value);
                    }}
                    value={editingtext}
                  />
                ) : (
                  <div>{singleTask.name}</div>
                )}

                <div>
                  <button
                    onClick={() => {
                      deleteTask(singleTask.id);
                    }}
                  >
                    {" "}
                    Delete
                  </button>
                </div>

                {taskEditing === singleTask.id ? (
                  <div>
                    <button
                      onClick={() => {
                        editTask(singleTask.id);
                      }}
                    >
                      SubmitEdit
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        setTaskEditing(singleTask.id);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          {completedTaskList.map((singleTask) => {
            return (
              <div key={singleTask.id}>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      onClick={() => {
                        toggleComplete(singleTask.id);
                      }}
                      name="completed"
                      checked
                    />
                    <label for="completed">Completed</label>
                  </div>
                </div>
                {taskEditing === singleTask.id ? (
                  <input
                    type="text"
                    onChange={(e) => {
                      setEditingText(e.target.value);
                    }}
                    value={editingtext}
                  />
                ) : (
                  <div style={{ backgroundColor: "green"}}>{singleTask.name}</div>
                )}

                <div>
                  <button
                    onClick={() => {
                      deleteTask(singleTask.id);
                    }}
                  >
                    {" "}
                    Delete
                  </button>
                </div>

                {taskEditing === singleTask.id ? (
                  <div>
                    <button
                      onClick={() => {
                        editTask(singleTask.id);
                      }}
                    >
                      SubmitEdit
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        setTaskEditing(singleTask.id);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
