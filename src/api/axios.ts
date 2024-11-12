import { useState, useEffect } from "react";
import axios from "axios";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      axios
        .get("https://course-orbit-api.onrender.com/api/auth/user/me", {
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
  console.log(isAuthenticated,userData);
  
  return { isAuthenticated, userData, setIsAuthenticated };
};
