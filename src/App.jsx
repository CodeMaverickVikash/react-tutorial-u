import React from "react";
import "./App.css";
import About from "./route-pages/About";
import Contact from "./route-pages/Contact";
import Navbar from "./components/Navbar";
import Home from "./route-pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import CartContext from "./stores/Cart-context";

function App() {
  let defaultDarkMode = false;
  let [isDarkModeEnabled, setDarkMode] = useState(defaultDarkMode); // useState hook is used to update local component state instead of a = 234

  const [user, setUser] = useState("vikash");

  const updateTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  }

  return (
    <CartContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar
          isDarkModeEnabled={isDarkModeEnabled}
          updateTheme={updateTheme}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </CartContext.Provider>
  );
}

export default App;