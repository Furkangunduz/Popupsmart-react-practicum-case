import { createContext, useState } from 'react';
import { toast } from "react-toastify"


const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
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
            toast.error("Kullanıcı adı 3 veya daha fazla karakter içermeli.", { toastId: "1" })
            return
        }
        setIsLoggedIn(true)
        localStorage.setItem("username", JSON.stringify(username))
    }
    const onSubmit = async () => {
        if (newTodo.content.trim().length === 0) {
            toast.error("Lütfen todo giriniz.", { toastId: "2" })
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
                toast.success("Todo başarıyla kaydedildi.", { toastId: "3" })
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
                toast("Başarıyla silindi.", { toastId: "4" })
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
                toast.success("Todo başarıyla güncellendi.", { toastId: "5" })
            })
            .catch((error) => {
                toast.error("Bir hata oluştu.", { toastId: "6" })
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
                toast.success("Todo Başarıyla güncellendi.", { toastId: "7" })
                getDataAndUpdateTodos()
            })
            .catch((error) => {
                toast.error("Bir hata oluştu.", { toastId: "8" })
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

        toast.success("Bütün todolar silindi.", { toastId: "9" })

    }
    const setInputEmpty = () => {
        setNewTodo((prev) => ({ ...prev, "content": "" }))
    }



    return (
        <TodoContext.Provider
            value={{
                onLogin,
                onSubmit,
                onChange,
                onDelete,
                onEdit,
                onLeave,
                setIsLoggedIn,
                setUsername,
                setInputEmpty,
                getDataAndUpdateTodos,
                chooseTodoForEdit,
                toggleCompleted,
                deleteAllTodos,
                username,
                isEditing,
                newTodo,
                isLoggedIn,
                loading,
                editingTodoId,
                todos,
            }}>

            {children}
        </TodoContext.Provider>
    );

};
export default TodoContext;