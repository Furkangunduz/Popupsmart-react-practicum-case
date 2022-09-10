import { useState, useEffect } from "react";

import Header from "./components/Header";
import AddTodo from "./components/AddTodo";


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
      console.log("Succes.", data)
      getDataFromApi()

    }).catch(error => {
      console.log("Error.", error)
    })
  }

  const onChange = (e) => {
    setNewTodo((prev) => ({ ...prev, "content": e.target.value }))
  }

  return (
    <main>
      <Header />
      <AddTodo value={newTodo.content} onChange={onChange} onSubmit={onSubmit} />


      <ul>
        {todos.map((todo) =>
          <li key={todo.id}> {todo.content} </li>
        )}
      </ul>
    </main>
  );
}

export default App;
