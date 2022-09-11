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


  const fetchOptions = (method, body = undefined) => {
    return {
      headers: {
        "Content-Type": "application/json"
      },
      method: method,
      body: JSON.stringify(body),
    }
  }

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
    if (newTodo.content.trim().length === 0) {
      toast.error("Lütfen todo giriniz.")
      return
    }
    if (newTodo.content.trim().length < 3) {
      toast.error("Todo'nun uzunluğu en az 3 karakter olabilir.")
      return
    }
    setLoading(true)
    await fetch(
      process.env.REACT_APP_API_ENDPOINT + "todos", fetchOptions("POST", newTodo))
      .then(() => {
        toast.success("Todo başarıyla kaydedildi.")
        getDataFromApi()
        setInputEmpty()
      }).catch(error => {
        console.log("Error.", error)
      })
    setLoading(false)
  }
  const onChange = (e) => {
    setNewTodo((prev) => ({ ...prev, "content": e.target.value }))
  }
  const toggleCompleted = async (checked, todo) => {
    setLoading(true)
    await fetch(process.env.REACT_APP_API_ENDPOINT + `todos/${todo.id}`,
      fetchOptions("PUT", {
        ...todo,
        "isCompleted": checked,
      }))
      .then((response) => {
        toast.success("Todo Başarıyla güncellendi.")
        getDataFromApi()
        console.log(response.json())
      })
      .catch((error) => {
        toast.error("Bir hata oluştu.")
        console.log(error)
      })
    setLoading(false)

  }
  const setInputEmpty = () => {
    setNewTodo((prev) => ({ ...prev, "content": "" }))
  }
  const onDelete = async (id) => {
    setLoading(false)
    await fetch(process.env.REACT_APP_API_ENDPOINT + `todos/${id}`, fetchOptions("DELETE"))
      .then(() => {
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
      <TodoList todos={todos} onDelete={onDelete} toggleCompleted={toggleCompleted} />
    </main>
  );
}

export default App;
