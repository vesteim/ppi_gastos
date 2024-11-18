import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RegisterGoal from "./pages/RegisterGoal";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("userName", userName);
  }, [isAuthenticated, userName]);

  const handleLogin = (name) => {
    setIsAuthenticated(true);
    setUserName(name); // Asume que `name` viene del formulario de Login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
  };

  return (
    <>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home user={userName} onLogout={handleLogout} />} />
        
        {/* Registro */}
        <Route
          path="/Register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register onLogin={handleLogin} />}
        />
        
        {/* Login */}
        <Route
          path="/Login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />
        
        {/* Registro de metas */}
        <Route
          path="/RegisterGoal"
          element={
            isAuthenticated ? (
              <RegisterGoal user={userName} onLogout={handleLogout} />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />

        {/* Ingresos */}
        <Route
          path="/Income"
          element={isAuthenticated ? <Income /> : <Navigate to="/Login" />}
        />

        {/* Gastos */}
        <Route
          path="/Expenses"
          element={isAuthenticated ? <Expenses /> : <Navigate to="/Login" />}
        />

        {/* Categorías */}
        <Route
          path="/Categories"
          element={isAuthenticated ? <Categories /> : <Navigate to="/Login" />}
        />

        {/* Ruta no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
