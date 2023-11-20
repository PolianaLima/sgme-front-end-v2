// Importe js-cookie no seu componente ou utilitário
import Cookies from 'js-cookie';
import { createContext, useContext, useState, useEffect } from 'react';
import {getUserFromCookie, removeUserFromCookie, saveUserToCookie} from "@/utils/Cookies";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Tente recuperar o usuário do cookie ao carregar a aplicação
        const storedUser = getUserFromCookie();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        // Armazene o usuário no cookie ao efetuar login
        saveUserToCookie(userData);
    };

    const logout = () => {
        setUser(null);
        // Remova o usuário do cookie ao efetuar logout
        removeUserFromCookie('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
