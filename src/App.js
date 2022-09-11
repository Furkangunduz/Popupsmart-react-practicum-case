import { useState, useEffect } from "react";

import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Spinner from "./components/Spinner"

import { toast } from "react-toastify"

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [newTodo, setNewTodo] = useState({
    content: "",
    isCompleted: false,
  })

  const getDataFromApi = async () => {
    setLoading(true)
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "todos")
      .then((response) =>
        response.json()
      )
    setLoading(false)
    setTodos(response)
  }
  const onSubmit = async () => {
    if (newTodo.content.trim().length == 0) {
      toast.error("Lütfen todo giriniz.")
      return
    }
    if (newTodo.content.trim().length < 3) {
      toast.error("Todo'nun uzunluğu en az 3 karakter olabilir.")
      return
    }
    setLoading(true)
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
      toast.success("Todo başarıyla kaydedildi.")
      getDataFromApi()
      setInputEmpty()

    }).catch(error => {
      console.log("Error.", error)
    })
    setLoading(false)
  }
  const onChange = (e) => {
    setLoading(true)
    setNewTodo((prev) => ({ ...prev, "content": e.target.value }))
    setLoading(false)
  }
  const setInputEmpty = () => {
    setLoading(false)
    setNewTodo((prev) => ({ ...prev, "content": "" }))
    setLoading(true)
  }
  const onDelete = (id) => {
    setLoading(false)
    fetch(process.env.REACT_APP_API_ENDPOINT + "todos" + `/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE",
    }).then(() => {
      getDataFromApi()
      toast("Başarıyla silindi.")
    })
    setLoading(true)
  }

  useEffect(() => {
    getDataFromApi()
  }, [])



  if (loading) return <Spinner></Spinner>

  return (
    <main>
      <Header />
      <AddTodo value={newTodo.content} onChange={onChange} onSubmit={onSubmit} />
      <TodoList todos={todos} onDelete={onDelete} />
    </main>
  );
}

export default App;
