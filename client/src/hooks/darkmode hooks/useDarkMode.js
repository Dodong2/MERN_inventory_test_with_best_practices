    import { useEffect, useState } from "react"

    export const useDarkMode = () => {
        const [darkMode, setDarkmode] =  useState(() => {
            return localStorage.getItem("darkMode") === "true";
        })

        useEffect(() => {
            if(darkMode) {
                document.body.classList.add('dark-mode')
            } else {
                document.body.classList.remove('dark-mode')
            }
            localStorage.setItem("darkMode", darkMode)
        }, [darkMode])

        const toggleDarkMode = () => {
            setDarkmode((prev) => !prev)
        }

        return { toggleDarkMode, darkMode }
    }

