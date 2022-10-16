import axios from 'axios';
import { useEffect, useState } from 'react'
import { createContext } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    //get current user by localStorage(string) and convert it into  an object
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    
    const login = async (inputs) => {
        const res = await axios.post("/auth/login",inputs)
        setCurrentUser(res.data)
    }

    const logout = async (inputs) => {
        await axios.post("/auth/logout")
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    

    return <AuthContext.Provider value={{ currentUser, login,logout }}>
        {children}
        </AuthContext.Provider>
};