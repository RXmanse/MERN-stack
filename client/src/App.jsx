import { useState } from "react";
import NavBar from "./components/NavBar";
import Carousel from "./components/Carousel";
import Alert from "./components/Alert";
import Card from "./components/card";
import Home from "./components/home";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import BlogState from "./content/blogs/BlogState";
import Form from "./components/reducer";
import "./app.css";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddProduct from "./components/AddProduct";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [mode, setMode] = useState("dark");
  const [themeText, setThemeText] = useState("enable light");
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const toggleTheme = () => {
    if (mode === "light") {
      setMode("dark");
      setThemeText("enable dark");
      showAlert("sucess!", "dark mode has been enabled");
    } else {
      setMode("light");
      setThemeText("enable light");
      showAlert("sucess!", "light mode has been enabled");
    }
  };

  return (
    <>
      <BlogState apiKey={apiKey}>
        <Router>
          <NavBar
            mode={mode}
            setMode={toggleTheme}
            text={themeText}
            setAlert={setAlert}
          />
          <Alert alert={alert} />
          {/* <Carousel /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Card apiKey={apiKey} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/reduce" element={<Form />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/login"
              element={<Login alert={alert} showAlert={showAlert} />}
            />
            <Route
              path="/signup"
              element={<SignUp alert={alert} showAlert={showAlert} />}
            />
            <Route
              path="/addproduct"
              element={<AddProduct alert={alert} showAlert={showAlert} />}
            />
          </Routes>
        </Router>
      </BlogState>
    </>
  );
}

export default App;
