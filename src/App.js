import { useState, useEffect } from "react";

import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { toast } from "react-toastify"

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState({
    content: "",
    isCompleted: false,
  })
  const getDataFromApi = async () => {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "todos")
      .then((response) =>
        response.json()
      )
    setTodos(response)
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  const onSubmit = async () => {
    if (newTodo.content.trim() == "") {
      toast.error("Input required.")
      return
    }
    await fetch(
      process.env.REACT_APP_API_ENDPOINT + "todos", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(newTodo),
    }).then(
      (response) => response.json()

    ).then(data => {
      console.log("Succes.")
      getDataFromApi()
      setInputEmpty()

    }).catch(error => {
      console.log("Error.", error)
    })
  }

  const onChange = (e) => {
    setNewTodo((prev) => ({ ...prev, "content": e.target.value }))
  }

  const setInputEmpty = () => {
    setNewTodo((prev) => ({ ...prev, "content": "" }))
  }

  return (
    <main>
      <Header />
      <AddTodo value={newTodo.content} onChange={onChange} onSubmit={onSubmit} />
      <TodoList todos={todos} />
    </main>
  );
}

export default App;
