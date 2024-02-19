import React from "react";
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import CartContext from "./stores/Cart-context";

function App() {
  const defaultDarkMode = true;
  const [isDarkModeEnabled, setDarkMode] = useState(defaultDarkMode);
  
  return (
    <CartContext.Provider value={{ items: [] }}>
      <Router>
        <Navbar isDarkModeEnabled={isDarkModeEnabled} />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route
            exact
            path="/"
            render={() => {
              return <Home />;
            }}
          ></Route>
        </Switch>
      </Router>
    </CartContext.Provider>
  );
}

export default App;
