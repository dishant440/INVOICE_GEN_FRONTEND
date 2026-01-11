import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    // Configure axios defaults
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    useEffect(() => {
        // Optionally fetch user profile if token exists but user is null
        const checkUser = async () => {
            if (token && !user) {
                try {
                    // You might want to create a /me endpoint or just decode token if that's enough
                    // For now, we will trust the token exists. 
                    // Ideally: const res = await axios.get('http://localhost:3000/api/v1/user/me');
                    // setUser(res.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Token invalid or expired");
                    logout();
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        checkUser();
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/login", {
                email,
                password,
            });

            const { token: newToken, user: userData } = response.data;

            setToken(newToken);
            setUser(userData); // Adjust based on your actual API response structure where user might be just name or obj

            localStorage.setItem("token", newToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

            return { success: true };
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
