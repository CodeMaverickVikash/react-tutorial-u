// app.js is a entry level component which is directly visible by browser and you can also make more component and include them in app.js , app.js is the whole website of your
import './App.css';
import About from './CustomComponents/About';
import Contact from './CustomComponents/Contact';
import Navbar from './CustomComponents/Navbar';
// import Footer from './CustomComponents/Footer';
import Home from './CustomComponents/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() { // app is function based component
  return ( // it will return JSX, jsx is the html which hold the mukkut of javascript
  
    <Router>
      <Navbar />  {/* Bydefault this component show up it means on every page */}
      <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route exact path="/" render={()=>{
            return (
              <Home/>
            )
          }}>
          </Route>
      </Switch>
      {/* <Footer/> */}
    </Router>
   
  );
}

export default App;
