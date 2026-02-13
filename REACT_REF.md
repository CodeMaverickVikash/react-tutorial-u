# React Quick Reference

## Core Concepts

- **JSX (JavaScript XML)** - JavaScript syntax extension that allows you to write HTML-like code in JavaScript files.

- **Props (Properties)** - Parent to child communication (single level).

- **State** - Component's own data that can be changed. State changes trigger re-renders.

- **Conditional Rendering** - Render different UI based on conditions using conditional statements or ternary operators.

- **Lists and Keys** - Render lists using `.map()` function. Each item needs a unique `key` for efficient DOM updates.

- **Lifting State Up** - Child to parent communication (single level).

- **Event Handling** - Similar to traditional event handling in JavaScript.

---

## Component Types

- **Lifecycle Methods** - Only available in class components.

- **Hooks** - Functions that add functionality to functional components.

---

## Hooks

- **useEffect** - Manages side effects (data fetching, DOM manipulation, subscriptions).

- **useRef** - Get reference to DOM elements, commonly used with forms.
  ```javascript
  const nameRef = useRef();
  <input ref={nameRef} />
  ```

- **useReducer** - Manages complex state logic using reducer functions (similar to Redux).

- **useCallback** - Memoizes functions to prevent unnecessary re-renders.

---

## State Management

- **Context API** - Share state between components without prop drilling (works at any level).

- **Redux** - Alternative to Context API. Centralized state management library for complex applications.

- **Redux Toolkit** - Modern alternative to Redux with simpler API.

---

## Routing

- **React Router** - Handles navigation in single-page applications.

---

## Styling

- **Default Styling** - Global by default. Use CSS Modules or styled-components for scoped styling.

---

## Advanced Concepts

- **Fragments** - Reduce extra `<div>` wrappers using `<React.Fragment>` or `<>...</>`.

- **Portals** - Render components to specific DOM elements using `ReactDOM.createPortal`.

- **React.memo** - Optimizes functional components by preventing re-renders when props haven't changed.

- **Virtual DOM** - React compares virtual DOM snapshots to find necessary DOM updates.

---

## Rules of Hooks

1. Only call Hooks inside functional components
2. Only call Hooks at the top level (not in loops, conditions, or nested functions)

---

## Additional Libraries

- **React Query (TanStack Query)** - Helps send HTTP requests to servers (alternative to fetch or useEffect for data fetching).

---

## Custom Hooks

- **Custom Hooks** - Create reusable logic by extracting hook functionality into custom hooks.