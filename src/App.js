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
  const [isEditing, setIsEditing] = useState(false)
  const [editingTodoId, setEditingTodoId] = useState("")
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

  const getDataAndUpdateTodos = async () => {
    setLoading(true)
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "todos")
      .then((response) =>
        response.json()
      )
    setLoading(false)
    setTodos(response)
  }
  const getSingleTodo = async (id) => {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + `todos/${id}`)
      .then((response) =>
        response.json()
      )
    return response
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
        getDataAndUpdateTodos()
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
        getDataAndUpdateTodos()
        toast("Başarıyla silindi.")
      })
    setLoading(true)
  }
  const onEdit = async (id) => {
    console.log("onedit")
    await fetch(process.env.REACT_APP_API_ENDPOINT + `todos/${id}`, fetchOptions("PUT", newTodo))
      .then(() => {
        setIsEditing(false)
        setEditingTodoId("")
        setInputEmpty()
        getDataAndUpdateTodos()
        toast.success("Todo başarıyla güncellendi.")
      })
      .catch((error) => {
        toast.error("Bir hata oluştu.")
        console.log(error)
      })
  }
  const onLeave = () => {
    setIsLoggedIn(false)
    setUsername("")

  }

  const chooseTodoForEdit = async (id) => {
    setLoading(true)
    setIsEditing(true)
    setEditingTodoId(id)
    let { content } = await getSingleTodo(id)
    setNewTodo((prev) => ({ ...prev, "content": content }))
    setLoading(false)
  }
  const toggleCompleted = async (checked, todo) => {
    setLoading(true)
    await fetch(process.env.REACT_APP_API_ENDPOINT + `todos/${todo.id}`,
      fetchOptions("PUT", {
        ...todo,
        "isCompleted": checked,
      }))
      .then(() => {
        toast.success("Todo Başarıyla güncellendi.")
        getDataAndUpdateTodos()
      })
      .catch((error) => {
        toast.error("Bir hata oluştu.")
        console.log(error)
      })
    setLoading(false)

  }
  const deleteAllTodos = async () => {
    setLoading(true)

    for (let i = 0; i < todos.length; i++) {
      await fetch(process.env.REACT_APP_API_ENDPOINT + `todos/${todos[i].id}`, fetchOptions("DELETE"))
        .catch((error) => {
          console.log(error)
        })
    }

    setTodos([])
    setLoading(false)

    toast.success("Bütün todolar silindi.")

  }


  const setInputEmpty = () => {
    setNewTodo((prev) => ({ ...prev, "content": "" }))
  }




  useEffect(() => {
    let username = JSON.parse(localStorage.getItem("username"))
    if (!username) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
      setUsername(username)
      getDataAndUpdateTodos()
    }
  }, [])


  return (
    <main>
      {
        !isLoggedIn ?
          <Login username={username} setUsername={setUsername} onLogin={onLogin} />
          :
          <>
            {loading && <Spinner></Spinner>}
            <Header username={username} onLeave={onLeave} />
            <AddTodo value={newTodo.content} isEditing={isEditing} onEdit={onEdit} editingTodoId={editingTodoId} getSingleTodo={getSingleTodo} onChange={onChange} onSubmit={onSubmit} />
            <TodoList todos={todos} onDelete={onDelete} deleteAllTodos={deleteAllTodos} toggleCompleted={toggleCompleted} chooseTodoForEdit={chooseTodoForEdit} />
          </>
      }
    </main>
  );
}

export default App;
