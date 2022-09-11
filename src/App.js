import { useState, useEffect } from "react";

import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Spinner from "./components/Spinner"
import Login from "./components/Login";

import { toast } from "react-toastify"

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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

  const onLogin = () => {
    if (!(username.length >= 2)) {
      toast.error("Kullanıcı adı 3 veya daha fazla karakter içermeli.")
      return
    }
    setIsLoggedIn(true)
    localStorage.setItem("username", JSON.stringify(username))
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

  const onDelete = async (id) => {
    setLoading(false)
    await fetch(process.env.REACT_APP_API_ENDPOINT + `todos/${id}`, fetchOptions("DELETE"))
      .then(() => {
        getDataFromApi()
        toast("Başarıyla silindi.")
      })
    setLoading(true)
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



  useEffect(() => {
    getDataFromApi()

    let username = JSON.parse(localStorage.getItem("username"))
    if (!username) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
      setUsername(username)
    }


  }, [])

  if (loading) return <Spinner></Spinner>

  return (
    <main>
      {
        !isLoggedIn ?
          <Login username={username} setUsername={setUsername} onLogin={onLogin} />
          :
          <>
            <Header username={username} />
            <AddTodo value={newTodo.content} onChange={onChange} onSubmit={onSubmit} />
            <TodoList todos={todos} onDelete={onDelete} toggleCompleted={toggleCompleted} />
          </>
      }
    </main>
  );
}

export default App;
