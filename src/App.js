import { useEffect, useContext } from "react";

import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Spinner from "./components/Spinner"
import Login from "./components/Login";
import ThemeSwitch from "./components/ThemeSwitch";

import TodoContext from "./context/TodoContext";
import ThemeContext from "./context/ThemeContext";

function App() {
  const { isLoggedIn, setIsLoggedIn, setUsername, loading, getDataAndUpdateTodos } = useContext(TodoContext)
  const { addCurrentThemeToBody } = useContext(ThemeContext)

  const checkIfUsernameExistLocalStorage = () => {
    let username = JSON.parse(localStorage.getItem("username"))
    if (!username) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
      setUsername(username)
      getDataAndUpdateTodos()
    }
  }

  useEffect(() => {
    addCurrentThemeToBody()
    checkIfUsernameExistLocalStorage()
  }, [])

  return (
    <main>
      <ThemeSwitch />
      {
        !isLoggedIn ?
          <Login />
          :
          <section>
            {loading && <Spinner></Spinner>}
            <Header />
            <AddTodo />
            <TodoList />
          </section>
      }
    </main>
  );
}

export default App;
