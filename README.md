# React learning project

This project will demonstrate the learning of react concepts.

Make react app by using below command:
```
npx create-react-app my-app
cd my-app
npm start
```
## React concepts

* **JSX (JavaScript XML)** - It allows you to write HTML-like code in your JavaScript files.
* **Props (Properties)** - Parent to child comunication (single level).
* **Conditional Rendering** - often done using conditional statements or the ternary operator.
* **Lists and Keys** - React makes it easy to render lists of data by using the map function. Each item in the list should have a unique "key" to help React efficiently update the DOM.
* **Lifting the state up** - Child to parent comunication (single level).
* **State** - State is a way for a component to maintain and manage its own data. It is mutable and can be changed using setState. State changes trigger a re-render of the component.
* **Lifecycle Methods** - Only for class component.
* **Hooks** - React Hooks are functions that adds the functionality to the functional components.
* **Event Handling** - most similar to traditional event handling.
* **React Router** - for handling navigation, it allows to create a single-page application.
* **Context API** - The Context API allows you to share state between components without having to pass props manually through every level of the component tree. (no level)
* **Redux**:
* **Styling component** - default Styling is global in react, We can make scoping by using css modules and styled-component package.
* **Fragments** - to reduce extra div, wrapping up elements.
* **Portal** - to add component on a specific element (ReactDOM.createPortal).
* **Ref** - useRef hook