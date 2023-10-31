# React learning project

This project will demonstrate the learning of react concepts.

Make react app by using below command:

```
npx create-react-app my-app
cd my-app
npm start
```

## React concepts

- **JSX (JavaScript XML)** - It allows you to write HTML-like code in your JavaScript files.
- **Props (Properties)** - Parent to child comunication (single level).
- **Conditional Rendering** - often done using conditional statements or the ternary operator.
- **Lists and Keys** - React makes it easy to render lists of data by using the map function. Each item in the list should have a unique "key" to help React efficiently update the DOM.
- **Lifting the state up** - Child to parent comunication (single level).
- **State** - State is a way for a component to maintain and manage its own data. It is mutable and can be changed using setState. State changes trigger a re-render of the component.
- **Lifecycle Methods** - Only for class component.
- **Hooks** - React Hooks are functions that adds the functionality to the functional components.
- **Event Handling** - most similar to traditional event handling.
- **React Router** - for handling navigation, it allows to create a single-page application.
- **Context API** - The Context API allows you to share state between components without having to pass props manually through every level of the component tree. (no level)
- **Redux**: Redux is a state management library for React and other JavaScript libraries. It provides a predictable and centralized way to manage the state of your application, making it easier to develop and maintain complex applications. NOTE: Similar to context API
- **Styling component** - default Styling is global in react, We can make scoping by using css modules and styled-component package.
- **Fragments** - to reduce extra div, wrapping up elements (`React.Fragment or <></>`).
- **Portal** - to add component on a specific element (`ReactDOM.createPortal`).
- **Ref** - useRef hook, used when we are working with forms to get ref with input element (`ref={nameRef = useRef();}`).
- **useReducer** - The useReducer hook in React is a powerful tool for managing complex state logic in functional components. It provides a way to manage state by defining a reducer function, which is similar to how state management works in Redux
- **useEffect** - It is used for managing side effects in functional components. Side effects refer to any code that needs to interact with the outside world, such as data fetching, DOM manipulation, and subscription management.
- **useCallback**: hook
- **memo**: The memo function is used to optimize the rendering performance of functional components. When you memoize a functional component using `React.memo`, it prevents the component from re-rendering unless its props have changed. This can be especially useful for preventing unnecessary re-renders of components when their inputs haven't changed, improving application performance.
- **Virtual DOM Concepts**: React checks for neccessary DOM updates via a `Virtual DOM`. It creates and compare virtual DOM snapshots to find out which parts of the rendered UI need to be updated.
- **Rules of hook**:
- **Creating custom hook**:

## React concepts

#### 16. **Ref**;

- useRef hook
- useState hook
