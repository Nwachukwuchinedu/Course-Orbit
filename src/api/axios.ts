// axios.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../components/AuthContext";

export const useAuth = () => {

  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const [userData, setUserData] = useState<any>(null);
  const apiUrl = import.meta.env.VITE_API_URL_ME;
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Authentication error:", error);
          localStorage.removeItem("jwtToken");
          setIsAuthenticated(false);
        });
    }
  }, []);
  
  return { isAuthenticated, userData, setIsAuthenticated };
};

