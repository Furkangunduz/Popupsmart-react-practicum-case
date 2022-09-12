import { createContext, useState } from 'react';

const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || "")


    const addCurrentThemeToBody = () => {
        if (theme == "dark") {
            document.querySelector("body").classList.add("dark-theme")
        } else {
            document.querySelector("body").classList.remove("dark-theme")

        }
    }

    const changeTheme = () => {
        setTheme(prev => {
            if (prev == "dark") {
                localStorage.setItem("theme", JSON.stringify(""))
                document.querySelector("body").classList.remove("dark-theme")
                return ""
            } else {
                localStorage.setItem("theme", JSON.stringify("dark"))
                document.querySelector("body").classList.add("dark-theme")
                return "dark"
            }
        })
    }

    return <ThemeContext.Provider
        value={{
            addCurrentThemeToBody,
            changeTheme,
            theme
        }}> {children}</ThemeContext.Provider >
}


export default ThemeContext
