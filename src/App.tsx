import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RequireAuth from "./pages/RequireAuth";
import NotFound from "./pages/NotFound";
import { useDispatch } from "react-redux";
import { setCredentials } from "./app/features/auth/authSlice";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRefresh = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/refresh", {
          credentials: "include",
        });
        const data = await res.json();

        if (data) {
          dispatch(setCredentials(data));
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchRefresh();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/get-started" Component={Login} />
      <Route Component={RequireAuth}>
        <Route index Component={Home} />
      </Route>
      <Route path="*" Component={NotFound} />
    </Routes>
  );
};

export default App;
