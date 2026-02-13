### 📊 Learning Progression

```
┌─────────────────────────────────────────────────────────────┐
│                    REACT LEARNING PATH                       │
│                  (Basic → Advanced)                          │
└─────────────────────────────────────────────────────────────┘

    Level 1: FUNDAMENTALS 🎯
    ┌──────────────────────────────────┐
    │ • JSX Syntax                     │
    │ • Components & Props             │
    │ • Conditional Rendering          │
    │ • Lists & Keys                   │
    │ • Event Handling                 │
    │ • Lifting State Up               │
    └──────────────────────────────────┘
                  ↓
    Level 2: REACT HOOKS 📦
    ┌──────────────────────────────────┐
    │ • useState (State Management)    │
    │ • useEffect (Side Effects)       │
    │ • useRef (DOM & Mutable Values)  │
    │ • useReducer (Complex State)     │
    └──────────────────────────────────┘
                  ↓
    Level 3: STATE MANAGEMENT 🗄️
    ┌──────────────────────────────────┐
    │ • Context API (Global State)     │
    │ • Redux Toolkit (Scalable State) │
    └──────────────────────────────────┘
                  ↓
    Level 4: ROUTING 🛣️
    ┌──────────────────────────────────┐
    │ • React Router                   │
    │ • Nested Routes                  │
    │ • Navigation                     │
    └──────────────────────────────────┘
                  ↓
    Level 5: STYLING 🎨
    ┌──────────────────────────────────┐
    │ • Tailwind CSS                   │
    │ • Utility-First Approach         │
    │ • Responsive Design              │
    └──────────────────────────────────┘
                  ↓
    Level 6: ADVANCED 🚀
    ┌──────────────────────────────────┐
    │ • Fragments & Portals            │
    │ • Component Composition          │
    │ • Performance Optimization       │
    │ • Custom Hooks                   │
    └──────────────────────────────────┘
```

## 📖 React Concepts Covered

### 1. React Basics

Before diving into hooks and advanced concepts, let's understand the fundamental building blocks of React.

---

#### 🎭 **JSX (JavaScript XML)**

**What it is:** Syntax extension that allows writing HTML-like code in JavaScript.

**Key Concepts:**
- Combines JavaScript and HTML-like syntax
- Makes component structure more readable
- Compiles to `React.createElement()` calls
- Must return a single parent element

**Code Example:**
```jsx
// JSX syntax
const element = <h1 className="title">Hello, World!</h1>;

// Compiles to JavaScript:
const element = React.createElement('h1', { className: 'title' }, 'Hello, World!');

// JSX with expressions
const name = 'John';
const greeting = <h1>Hello, {name}!</h1>;

// JSX with multiple elements (needs wrapper)
const component = (
  <div>
    <h1>Title</h1>
    <p>Description</p>
  </div>
);

// Or use Fragment
const component = (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);
```

**JSX Rules:**
- ✅ Use `className` instead of `class`
- ✅ Use `htmlFor` instead of `for`
- ✅ Use camelCase for attributes: `onClick`, `onChange`
- ✅ Self-closing tags must end with `/`: `<img />`, `<input />`
- ✅ JavaScript expressions go in curly braces: `{variable}`
- ✅ Comments: `{/* comment */}`

---

#### 📦 **Props (Properties)**

**What they are:** Data passed from parent to child components (one-way data flow).

**Key Concepts:**
- Read-only (immutable)
- Passed from parent to child
- Can be any data type (string, number, object, array, function)
- Enable component reusability

**Code Example:**
```jsx
// Parent component passes props
const App = () => {
  return (
    <UserCard
      name="John Doe"
      age={30}
      isAdmin={true}
      hobbies={['Reading', 'Coding']}
      onEdit={() => console.log('Edit clicked')}
    />
  );
};

// Child component receives props
const UserCard = ({ name, age, isAdmin, hobbies, onEdit }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isAdmin && <span className="badge">Admin</span>}
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
      <button onClick={onEdit}>Edit Profile</button>
    </div>
  );
};

// Default props
const Button = ({ text = 'Click Me', variant = 'primary' }) => (
  <button className={`btn btn-${variant}`}>{text}</button>
);

// Props destructuring
const Greeting = (props) => <h1>Hello, {props.name}!</h1>;
// Better: destructure in parameters
const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;
```

**Props Best Practices:**
- ✅ Destructure props for cleaner code
- ✅ Use default values for optional props
- ✅ Pass functions for child-to-parent communication
- ✅ Keep props simple and focused
- ❌ Never modify props (they're read-only)

---

#### 🔄 **Conditional Rendering**

**What it is:** Displaying different UI based on conditions.

**Techniques:**

```jsx
// 1. Ternary Operator (most common)
const LoginButton = ({ isLoggedIn }) => (
  <div>
    {isLoggedIn ? (
      <button>Logout</button>
    ) : (
      <button>Login</button>
    )}
  </div>
);

// 2. Logical AND (&&) - for single condition
const Notification = ({ hasMessages, count }) => (
  <div>
    {hasMessages && <span>You have {count} new messages</span>}
  </div>
);

// 3. If-Else Statement (in function body)
const Dashboard = ({ user }) => {
  if (!user) {
    return <Login />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
};

// 4. Switch Statement (multiple conditions)
const StatusBadge = ({ status }) => {
  switch (status) {
    case 'pending':
      return <span className="badge-yellow">Pending</span>;
    case 'approved':
      return <span className="badge-green">Approved</span>;
    case 'rejected':
      return <span className="badge-red">Rejected</span>;
    default:
      return <span className="badge-gray">Unknown</span>;
  }
};

// 5. Inline Styles Based on Condition
const Alert = ({ type, message }) => (
  <div className={type === 'error' ? 'alert-danger' : 'alert-info'}>
    {message}
  </div>
);

// 6. Null/Undefined to hide component
const OptionalComponent = ({ show }) => {
  if (!show) return null;
  return <div>Visible content</div>;
};
```

**When to use each:**
- **Ternary (`? :`)**: Two options (if-else)
- **Logical AND (`&&`)**: Show or hide (single condition)
- **If-Else**: Complex logic, early returns
- **Switch**: Multiple specific values

---

#### 📝 **Lists and Keys**

**What they are:** Rendering arrays of data with unique identifiers.

**Key Concepts:**
- Use `.map()` to transform arrays into JSX
- Each item needs a unique `key` prop
- Keys help React identify changes
- Keys should be stable and unique

**Code Example:**
```jsx
// Basic list rendering
const fruits = ['Apple', 'Banana', 'Cherry'];

const FruitList = () => (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={index}>{fruit}</li>
    ))}
  </ul>
);

// ⚠️ Using index as key is OK only if:
// - List is static (no reordering)
// - Items don't have unique IDs
// - List is never filtered/sorted

// ✅ Better: Use unique IDs
const todos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build project', completed: true },
  { id: 3, text: 'Deploy app', completed: false },
];

const TodoList = () => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id} className={todo.completed ? 'completed' : ''}>
        {todo.text}
      </li>
    ))}
  </ul>
);

// Complex list with multiple elements
const UserList = ({ users }) => (
  <div>
    {users.map(user => (
      <div key={user.id} className="user-card">
        <img src={user.avatar} alt={user.name} />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <button>View Profile</button>
      </div>
    ))}
  </div>
);

// Filtering and mapping
const ActiveTodos = ({ todos }) => (
  <ul>
    {todos
      .filter(todo => !todo.completed)
      .map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
  </ul>
);

// Empty state handling
const ItemList = ({ items }) => {
  if (items.length === 0) {
    return <p>No items found.</p>;
  }

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
```

**Why Keys Matter:**
- ✅ Help React identify which items changed
- ✅ Improve rendering performance
- ✅ Prevent rendering bugs
- ✅ Maintain component state correctly

**Key Best Practices:**
- ✅ Use unique, stable IDs (from database)
- ✅ Don't use array index if list can change
- ✅ Keys must be unique among siblings
- ❌ Don't use random values (breaks on re-render)
- ❌ Don't use `Math.random()` or `Date.now()`

---

#### 🎯 **Event Handling**

**What it is:** Responding to user interactions (clicks, inputs, form submissions).

**Key Concepts:**
- Events use camelCase: `onClick`, `onChange`, `onSubmit`
- Pass function reference, not function call
- Event object is automatically passed
- Use `preventDefault()` to stop default behavior

**Code Example:**
```jsx
// Click events
const Button = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
};

// With parameters
const DeleteButton = ({ id, onDelete }) => {
  return (
    <button onClick={() => onDelete(id)}>
      Delete
    </button>
  );
};

// Form events
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('Login:', email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

// Keyboard events
const SearchInput = () => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('Search:', e.target.value);
    }
  };

  return (
    <input
      type="text"
      onKeyPress={handleKeyPress}
      placeholder="Press Enter to search"
    />
  );
};

// Mouse events
const HoverCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={isHovered ? 'card-hover' : 'card'}
    >
      Hover over me!
    </div>
  );
};

// Event object properties
const InputLogger = () => {
  const handleChange = (e) => {
    console.log('Value:', e.target.value);
    console.log('Name:', e.target.name);
    console.log('Type:', e.type);
  };

  return <input name="username" onChange={handleChange} />;
};
```

**Common Events:**
- **Mouse**: `onClick`, `onDoubleClick`, `onMouseEnter`, `onMouseLeave`
- **Keyboard**: `onKeyDown`, `onKeyUp`, `onKeyPress`
- **Form**: `onChange`, `onSubmit`, `onFocus`, `onBlur`
- **Clipboard**: `onCopy`, `onPaste`, `onCut`

**Event Handling Best Practices:**
- ✅ Use arrow functions for inline handlers with parameters
- ✅ Define handlers outside JSX for complex logic
- ✅ Use `e.preventDefault()` for forms
- ✅ Use `e.stopPropagation()` to prevent bubbling
- ❌ Don't call function: `onClick={handleClick()}` ❌
- ✅ Pass reference: `onClick={handleClick}` ✅

---

#### ⬆️ **Lifting State Up**

**What it is:** Moving state to the closest common parent when multiple children need to share it.

**Key Concepts:**
- State lives in parent component
- Parent passes state and updater to children
- Children communicate through parent
- Enables data sharing between siblings

**Code Example:**
```jsx
// Parent manages shared state
const TemperatureConverter = () => {
  const [celsius, setCelsius] = useState('');

  const handleCelsiusChange = (value) => {
    setCelsius(value);
  };

  const handleFahrenheitChange = (value) => {
    setCelsius(((value - 32) * 5 / 9).toFixed(1));
  };

  const fahrenheit = celsius ? (celsius * 9 / 5 + 32).toFixed(1) : '';

  return (
    <div>
      <TemperatureInput
        scale="Celsius"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="Fahrenheit"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
    </div>
  );
};

// Child components receive state and updater
const TemperatureInput = ({ scale, temperature, onTemperatureChange }) => {
  return (
    <div>
      <label>Enter temperature in {scale}:</label>
      <input
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
      />
    </div>
  );
};

// Another example: Filter and List
const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState([
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Phone' },
    { id: 3, name: 'Tablet' },
  ]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

const SearchBar = ({ value, onChange }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Search products..."
  />
);

const ProductList = ({ products }) => (
  <ul>
    {products.map(p => (
      <li key={p.id}>{p.name}</li>
    ))}
  </ul>
);
```

**When to Lift State Up:**
- Multiple components need the same data
- Components need to stay in sync
- Child components need to communicate
- Shared state logic

**Pattern:**
1. Identify shared state
2. Move state to common parent
3. Pass state down as props
4. Pass updater functions down
5. Children call updaters to modify state

---

### 2. React Hooks

React Hooks are functions that let you use state and other React features in functional components.

#### 📦 **useState** - State Management

**What it does:** Adds state to functional components.

**Key Concepts:**
- State initialization
- State updates trigger re-renders
- Updating primitive values (numbers, strings, booleans)
- Updating objects (use spread operator)
- Updating arrays (immutable operations)

**Interactive Demos:**
1. ✅ Simple counter (increment/decrement/reset)
2. ✅ Input handling (controlled components)
3. ✅ Object state (form with multiple fields)
4. ✅ Array state (add/remove items from list)

**Code Example:**
```javascript
const [count, setCount] = useState(0);
setCount(count + 1); // Update state

// Object state - always spread previous state
const [user, setUser] = useState({ name: '', age: '' });
setUser({ ...user, name: 'John' });

// Array state - use immutable methods
const [items, setItems] = useState([]);
setItems([...items, newItem]); // Add
setItems(items.filter((_, i) => i !== index)); // Remove
```

**When to use:**
- Managing component-specific data
- Form inputs and controls
- UI state (modals, dropdowns, etc.)
- Any value that affects rendering

---

#### ⚡ **useEffect** - Side Effects

**What it does:** Performs side effects in functional components (data fetching, subscriptions, DOM manipulation).

**Key Concepts:**
- Runs after render
- Dependency array controls when it runs
- Cleanup function prevents memory leaks
- Replaces lifecycle methods (componentDidMount, componentDidUpdate, componentWillUnmount)

**Dependency Array Behavior:**
```javascript
useEffect(() => { /* ... */ });           // Runs after EVERY render
useEffect(() => { /* ... */ }, []);       // Runs ONCE on mount
useEffect(() => { /* ... */ }, [a, b]);   // Runs when a or b changes
```

**Interactive Demos:**
1. ✅ Run on every render (with render counter)
2. ✅ Run once on mount (initialization)
3. ✅ Run when dependency changes (reactive updates)
4. ✅ Cleanup function (timer management)
5. ✅ Fetch data from API (async operations)

**Code Example:**
```javascript
// Fetch data on mount
// Mount - first rendered and added to the DOM, Unmount - component removed from the DOM
useEffect(() => {
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => setData(data));
}, []); // Empty array = run once

// Cleanup function
useEffect(() => {
  const interval = setInterval(() => {
    setSeconds(prev => prev + 1);
  }, 1000);

  return () => clearInterval(interval); // Cleanup
}, [isRunning]);
```

**When to use:**
- Data fetching
- Setting up subscriptions
- Timers and intervals
- DOM manipulation
- Event listeners
- Syncing with external systems

---

#### 🎯 **useRef** - Mutable References

**What it does:** Creates a mutable reference that persists across renders without triggering re-renders.

**Key Concepts:**
- Doesn't trigger re-renders when updated
- Persists across component re-renders
- Perfect for DOM element access
- Store mutable values (timers, previous values)

**Interactive Demos:**
1. ✅ Access DOM elements (focus, select)
2. ✅ Store mutable values without re-render (render counter)
3. ✅ Track previous value (comparison)
4. ✅ Timer with useRef (interval management)
5. ✅ Scroll to element (programmatic scrolling)

**Code Example:**
```javascript
// Access DOM elements
const inputRef = useRef(null);
inputRef.current.focus();

// Store mutable values (no re-render)
const renderCount = useRef(0);
renderCount.current = renderCount.current + 1;

// Track previous value
const previousValue = useRef('');
useEffect(() => {
  previousValue.current = value;
}, [value]);

// Store interval ID
const intervalRef = useRef(null);
intervalRef.current = setInterval(() => { /* ... */ }, 1000);
clearInterval(intervalRef.current);
```

**useRef vs useState:**
| Feature | useRef | useState |
|---------|--------|----------|
| **Triggers re-render** | ❌ No | ✅ Yes |
| **Persists across renders** | ✅ Yes | ✅ Yes |
| **Use for UI updates** | ❌ No | ✅ Yes |
| **Use for DOM access** | ✅ Yes | ❌ No |
| **Use for mutable values** | ✅ Yes | ❌ No |

**When to use:**
- Accessing DOM elements
- Storing interval/timeout IDs
- Tracking previous values
- Storing mutable values that don't affect rendering
- Avoiding unnecessary re-renders

---

#### 🔄 **useReducer** - Complex State Logic

**What it does:** Alternative to useState for managing complex state logic with multiple sub-values or actions.

**Key Concepts:**
- Reducer function: `(state, action) => newState`
- Dispatch actions to update state
- Predictable state transitions
- Similar to Redux pattern
- Better for complex state logic

**Interactive Demos:**
1. ✅ Simple counter with multiple actions
2. ✅ Complex form state (multiple fields)
3. ✅ Todo list with CRUD operations
4. ✅ Comparison with useState

**Code Example:**
```javascript
// Define reducer
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return 0;
    case 'incrementBy':
      return state + action.payload;
    default:
      return state;
  }
};

// Use reducer
const [count, dispatch] = useReducer(counterReducer, 0);

// Dispatch actions
dispatch({ type: 'increment' });
dispatch({ type: 'incrementBy', payload: 5 });

// Complex state example (Todo list)
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};
```

**useReducer vs useState:**
| Use useReducer when: | Use useState when: |
|----------------------|-------------------|
| Complex state logic | Simple state values |
| Multiple sub-values | Independent values |
| Next state depends on previous | Straightforward updates |
| Multiple actions update same state | Single update pattern |
| Need testable state logic | Quick prototyping |
| Optimize performance (pass dispatch) | Learning React basics |

**When to use:**
- Complex state with multiple sub-values
- State transitions are predictable
- Multiple actions update the same state
- Need to test state logic separately
- Want to optimize performance (dispatch doesn't change)

---

### 3. State Management

#### 🗄️ **Context API** - Global State Without Props Drilling

**What it does:** Share state between components without passing props through every level.

**Key Concepts:**
- Create context with `createContext()`
- Provide value with `<Context.Provider>`
- Consume value with `useContext()` hook
- Avoid props drilling
- Global state management

**Implementation in this project:**

```javascript
// 1. Create Context
import { createContext } from 'react';
export const UserContext = createContext();

// 2. Create Provider Component
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'John Doe', role: 'Admin' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Create Custom Hook (Best Practice)
import { useContext } from 'react';
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserContextProvider');
  }
  return context;
};

// 4. Use in Components
const MyComponent = () => {
  const { user, setUser } = useUser();
  return <div>Hello, {user.name}!</div>;
};
```

**When to use:**
- Theme management (dark/light mode)
- User authentication state
- Language/localization
- Small to medium apps
- Avoid props drilling

**Limitations:**
- Performance issues with frequent updates
- Not ideal for very large applications
- No built-in dev tools

---

#### 🔴 **Redux Toolkit** - Scalable State Management

**What it does:** Centralized state management with predictable state updates.

**Key Concepts:**
- Single source of truth (store)
- State is read-only
- Changes made with pure functions (reducers)
- Actions describe what happened
- Slices organize features

**Modern Redux Toolkit Implementation:**

```javascript
// 1. Create Slice (features/counter/counterSlice.js)
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer allows "mutations"
    },
    decrement: (state) => {
      state.value -= 1;
    },
    increaseBy: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, increaseBy } = counterSlice.actions;
export default counterSlice.reducer;

// 2. Configure Store (ReduxProvider.jsx)
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

// 3. Use in Components
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, increaseBy } from './features/counter/counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increaseBy(5))}>+5</button>
    </div>
  );
};
```

**Redux Toolkit Benefits:**
- ✅ Less boilerplate than classic Redux
- ✅ Built-in Immer for immutable updates
- ✅ DevTools integration
- ✅ TypeScript support
- ✅ Best practices built-in

**Context API vs Redux:**
| Feature | Context API | Redux Toolkit |
|---------|-------------|---------------|
| **Setup complexity** | Simple | Moderate |
| **Boilerplate** | Minimal | Low (with RTK) |
| **DevTools** | ❌ No | ✅ Yes |
| **Middleware** | ❌ No | ✅ Yes |
| **Performance** | Can be slow | Optimized |
| **Best for** | Small/medium apps | Large apps |

**When to use Redux:**
- Large applications with complex state
- Need time-travel debugging
- Multiple developers working on state
- Need middleware (logging, async)
- State needs to be persisted

---

### 4. Routing

#### 🛣️ **React Router** - Client-Side Navigation

**What it does:** Enables navigation between different views/pages without full page reload.

**Key Concepts:**
- Single Page Application (SPA)
- Nested routes
- Dynamic routing
- Route parameters
- Programmatic navigation

**Implementation:**

```javascript
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="hooks/use-state" element={<UseStatePage />} />
          <Route path="hooks/use-effect" element={<UseEffectPage />} />
          <Route path="hooks/use-ref" element={<UseRefPage />} />
          <Route path="hooks/use-reducer" element={<UseReducerPage />} />
          <Route path="state/redux" element={<ReduxPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

// Layout with Outlet for nested routes
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div>
    <Sidebar />
    <main>
      <Outlet /> {/* Nested routes render here */}
    </main>
  </div>
);
```

**Features used:**
- Nested routes with `<Outlet />`
- Layout wrapper for consistent UI
- Sidebar navigation with `<Link>`
- Route organization by feature

---

### 5. Styling

#### 🎨 **Tailwind CSS v4** - Utility-First CSS

**What it does:** Utility-first CSS framework for rapid UI development.

**Key Concepts:**
- Utility classes for styling
- No custom CSS needed
- Responsive design built-in
- Dark mode support
- JIT (Just-In-Time) compilation

**Tailwind v4 Setup (Vite):**

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 Vite plugin
  ],
});

// src/index.css
@import "tailwindcss"; // v4 syntax

@layer components {
  .btn {
    @apply px-4 py-2 rounded-md font-medium transition-colors;
  }
  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }
}
```

**Why Tailwind v4:**
- ⚡ Faster with native Vite plugin
- 🎯 Simpler configuration
- 📦 Smaller bundle size
- 🔥 Better HMR (Hot Module Replacement)

**Example Usage:**

```jsx
<div className="bg-white rounded-lg shadow-md border-2 border-blue-200">
  <div className="bg-blue-600 text-white px-6 py-4">
    <h2 className="text-2xl font-bold">Card Title</h2>
  </div>
  <div className="p-6">
    <button className="btn btn-primary">Click Me</button>
  </div>
</div>
```

**Important Note - Dynamic Classes:**
```javascript
// ❌ DON'T - Template literals don't work
className={`bg-${color}-600`}

// ✅ DO - Use static mapping
const styles = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
};
className={styles[color]}
```

---

### 6. Advanced Concepts

#### 🧩 **Fragments**

**Purpose:** Group elements without adding extra DOM nodes.

```jsx
// Long syntax
<React.Fragment>
  <h1>Title</h1>
  <p>Description</p>
</React.Fragment>

// Short syntax
<>
  <h1>Title</h1>
  <p>Description</p>
</>

// With key (only long syntax supports keys)
{items.map(item => (
  <React.Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
  </React.Fragment>
))}
```

---

#### 🚪 **Portals**

**Purpose:** Render children into a DOM node outside the parent hierarchy.

```jsx
import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
  return createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
};
```

**Use cases:**
- Modals
- Tooltips
- Dropdowns
- Notifications

---

#### 🎨 **Component Composition**

**Pattern:** Build complex UIs from smaller, reusable components.

```jsx
// Reusable Card component
const ConceptCard = ({ title, icon, description, children }) => (
  <div className="card">
    <div className="card-header">
      <span>{icon}</span>
      <h3>{title}</h3>
    </div>
    <p>{description}</p>
    <div className="card-body">
      {children}
    </div>
  </div>
);

// Usage
<ConceptCard
  title="useState"
  icon="📦"
  description="Manage component state"
>
  <Counter />
</ConceptCard>
```

---

## 🎮 Interactive Demos

This project includes **20+ interactive demos** across 5 tutorial pages:

### useState Page (4 demos)
1. ✅ Simple counter with increment/decrement
2. ✅ Input handling with controlled components
3. ✅ Object state management
4. ✅ Array state with add/remove operations

### useEffect Page (5 demos)
1. ✅ Run on every render (render counter)
2. ✅ Run once on mount (initialization)
3. ✅ Run when dependency changes (reactive)
4. ✅ Cleanup function (timer)
5. ✅ Fetch data from API

### useRef Page (5 demos)
1. ✅ Access DOM elements (focus/select)
2. ✅ Store mutable values (no re-render)
3. ✅ Track previous value
4. ✅ Timer with useRef
5. ✅ Scroll to element

### useReducer Page (4 demos)
1. ✅ Simple counter with actions
2. ✅ Complex form state
3. ✅ Todo list with CRUD
4. ✅ Comparison with useState

### Redux Page
1. ✅ Redux Toolkit counter
2. ✅ Multiple actions
3. ✅ State inspection

---

## 🎓 Learning Path

**Recommended order for beginners:**

```
📚 Level 1: Fundamentals (Start Here)
   ├─ 1. HomePage (Project Overview)
   ├─ 2. JSX Syntax
   ├─ 3. Components & Props
   ├─ 4. Conditional Rendering
   ├─ 5. Lists & Keys
   ├─ 6. Event Handling
   └─ 7. Lifting State Up

📦 Level 2: React Hooks (Core Concepts)
   ├─ 1. useState ⭐ Start with this hook
   │     └─ Counter, Forms, Objects, Arrays
   ├─ 2. useEffect
   │     └─ Side effects, Data fetching, Cleanup
   ├─ 3. useRef
   │     └─ DOM access, Mutable values
   └─ 4. useReducer
         └─ Complex state, Actions, Reducers

🗄️ Level 3: State Management (Scaling Up)
   ├─ 1. Context API
   │     └─ Global state, Custom hooks
   └─ 2. Redux Toolkit
         └─ Slices, Store, Actions, Reducers

🛣️ Level 4: Routing & Navigation
   └─ React Router
         └─ Routes, Nested routes, Navigation

🎨 Level 5: Styling
   └─ Tailwind CSS
         └─ Utility classes, Responsive design

🚀 Level 6: Advanced Concepts
   ├─ 1. Fragments
   ├─ 2. Portals
   ├─ 3. Component Composition
   ├─ 4. Performance Optimization
   │     └─ React.memo, useCallback, useMemo
   └─ 5. Custom Hooks
         └─ Reusable logic extraction
```

**Estimated Time:**
- **Level 1 (Fundamentals)**: 2-3 days
- **Level 2 (Hooks)**: 3-4 days
- **Level 3 (State Management)**: 2-3 days
- **Level 4 (Routing)**: 1 day
- **Level 5 (Styling)**: 1-2 days
- **Level 6 (Advanced)**: 2-3 days

**Total**: ~2 weeks for comprehensive understanding

## 🏆 Best Practices

### ✅ **Component Design**
```javascript
// ✅ DO: Small, focused components
const UserCard = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </div>
);

// ❌ DON'T: Large, monolithic components
```

### ✅ **State Management**
```javascript
// ✅ DO: Keep state close to where it's used
const Counter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};

// ❌ DON'T: Lift state unnecessarily
```

### ✅ **Immutability**
```javascript
// ✅ DO: Use spread operator for objects/arrays
setUser({ ...user, name: 'John' });
setItems([...items, newItem]);

// ❌ DON'T: Mutate state directly
user.name = 'John'; // Wrong!
items.push(newItem); // Wrong!
```

### ✅ **useEffect Dependencies**
```javascript
// ✅ DO: Include all dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);

// ❌ DON'T: Omit dependencies (causes bugs)
useEffect(() => {
  fetchData(userId);
}, []); // Missing userId!
```

### ✅ **Custom Hooks**
```javascript
// ✅ DO: Extract reusable logic
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('Must be used within provider');
  return context;
};

// Usage
const { user } = useUser();
```

### ✅ **Component Naming**
```javascript
// ✅ DO: PascalCase for components
const UserProfile = () => { /* ... */ };

// ✅ DO: camelCase for hooks
const useAuth = () => { /* ... */ };

// ✅ DO: Descriptive names
const SubmitButton = () => { /* ... */ };
```

## 📋 Quick Reference Guide

### React Hooks Cheat Sheet

```javascript
// useState - State management
const [state, setState] = useState(initialValue);
setState(newValue);
setState(prev => prev + 1); // Functional update

// useEffect - Side effects
useEffect(() => { /* effect */ });              // Every render
useEffect(() => { /* effect */ }, []);          // Once on mount
useEffect(() => { /* effect */ }, [dep]);       // When dep changes
useEffect(() => { return () => { /* cleanup */ }; }, []); // With cleanup

// useRef - Mutable references
const ref = useRef(initialValue);
ref.current = newValue;                         // No re-render
<input ref={ref} />                             // DOM access

// useReducer - Complex state
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'ACTION_TYPE', payload: data });

// useContext - Consume context
const value = useContext(MyContext);
```

### Common Patterns

```javascript
// Conditional Rendering
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}

// List Rendering
{items.map(item => <Item key={item.id} {...item} />)}

// Event Handling
<button onClick={handleClick}>Click</button>
<button onClick={() => handleClick(id)}>Delete</button>
<input onChange={(e) => setValue(e.target.value)} />

// Form Handling
const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form
};

// Lifting State Up
// Parent: <Child value={state} onChange={setState} />
// Child: <input value={value} onChange={(e) => onChange(e.target.value)} />
```

### Performance Tips

```javascript
// ✅ DO: Memoize expensive calculations
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// ✅ DO: Memoize callback functions
const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);

// ✅ DO: Memoize components
const MemoizedComponent = React.memo(Component);

// ✅ DO: Use keys properly
{items.map(item => <Item key={item.id} />)}

// ❌ DON'T: Create functions in render
{items.map(item => <Item onClick={() => handleClick(item.id)} />)} // Re-creates function

// ✅ DO: Use useCallback
const handleClick = useCallback((id) => { /* ... */ }, []);
{items.map(item => <Item onClick={() => handleClick(item.id)} />)}
```

# 🎨 React Rendering Behavior

> Understanding when and why React components re-render

## 🎯 Overview

Understanding React's rendering behavior is crucial for building performant applications. This guide explains:

- 🔄 **When components re-render**
- 🎯 **Why re-renders happen**
- 🚫 **How to prevent unnecessary re-renders**
- 🐛 **How to debug rendering issues**

### **Key Concept:**

> **Rendering is NOT the same as updating the DOM!**

- **Rendering** = Calling your component function
- **Committing** = Updating the actual DOM

---

## 🔄 What Triggers a Render

### **1. State Changes**

```javascript
const Counter = () => {
  const [count, setCount] = useState(0);
  
  console.log('Rendering Counter'); // Logs on every state change
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

// Clicking button → State changes → Component re-renders
```

### **2. Props Changes**

```javascript
const Child = ({ name }) => {
  console.log('Rendering Child');
  return <div>Hello, {name}!</div>;
};

const Parent = () => {
  const [name, setName] = useState('John');
  
  return (
    <div>
      <Child name={name} />
      <button onClick={() => setName('Jane')}>
        Change Name
      </button>
    </div>
  );
};

// Clicking button → Parent state changes → Parent re-renders → Child receives new prop → Child re-renders
```

### **3. Parent Re-renders**

```javascript
const Child = () => {
  console.log('Rendering Child');
  return <div>I am a child</div>;
};

const Parent = () => {
  const [count, setCount] = useState(0);
  
  console.log('Rendering Parent');
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child />
    </div>
  );
};

// Clicking button → Parent re-renders → Child ALSO re-renders (even though it has no props!)
```

### **4. Context Changes**

```javascript
const ThemeContext = createContext();

const ThemedButton = () => {
  const theme = useContext(ThemeContext);
  console.log('Rendering ThemedButton');
  return <button className={theme}>Click me</button>;
};

const App = () => {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <ThemedButton />
      <button onClick={() => setTheme('dark')}>Toggle Theme</button>
    </ThemeContext.Provider>
  );
};

// Clicking toggle → Context value changes → All consumers re-render
```

### **5. Force Update (Rare)**

```javascript
import { useReducer } from 'react';

const MyComponent = () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  
  return (
    <div>
      <button onClick={forceUpdate}>Force Re-render</button>
    </div>
  );
};

// ⚠️ Rarely needed! Usually indicates a design problem
```

---

## 🎬 Render vs Commit

### **The Two Phases**

```javascript
const MyComponent = () => {
  const [count, setCount] = useState(0);
  
  // RENDER PHASE: This runs every time component renders
  console.log('1. Render phase - count:', count);
  
  // COMMIT PHASE: This runs after DOM updates
  useEffect(() => {
    console.log('2. Commit phase - DOM updated');
  });
  
  return <div>{count}</div>;
};

// Flow:
// 1. State changes
// 2. RENDER PHASE: Component function runs
// 3. React compares Virtual DOMs
// 4. COMMIT PHASE: DOM updates (if needed)
// 5. useEffect runs
```

### **Render Without Commit**

```javascript
const OptimizedChild = React.memo(({ value }) => {
  console.log('Rendering OptimizedChild');
  return <div>{value}</div>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const [value] = useState('constant');
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <OptimizedChild value={value} />
    </div>
  );
};

// Clicking button:
// - Parent re-renders (RENDER PHASE)
// - OptimizedChild skips render (props haven't changed)
// - Only Parent's DOM updates (COMMIT PHASE)
```

---

## 👨‍👩‍👧‍👦 Parent-Child Rendering

### **Default Behavior**

```javascript
const GrandChild = () => {
  console.log('Rendering GrandChild');
  return <div>GrandChild</div>;
};

const Child = () => {
  console.log('Rendering Child');
  return (
    <div>
      Child
      <GrandChild />
    </div>
  );
};

const Parent = () => {
  const [count, setCount] = useState(0);
  console.log('Rendering Parent');
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child />
    </div>
  );
};

// Clicking button logs:
// "Rendering Parent"
// "Rendering Child"
// "Rendering GrandChild"
// 
// All descendants re-render when parent re-renders!
```

### **Preventing Child Re-renders**

```javascript
// Option 1: React.memo
const Child = React.memo(() => {
  console.log('Rendering Child');
  return <div>Child</div>;
});

// Option 2: Move state down
const Parent = () => {
  return (
    <div>
      <CounterSection /> {/* State lives here */}
      <Child /> {/* Doesn't re-render when counter changes */}
    </div>
  );
};

const CounterSection = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
};

// Option 3: Children prop
const Parent = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {children} {/* Doesn't re-render! */}
    </div>
  );
};

// Usage
<Parent>
  <ExpensiveChild />
</Parent>
```

---

## 📦 Props and Rendering

### **Primitive Props**

```javascript
const Child = React.memo(({ count }) => {
  console.log('Rendering Child');
  return <div>Count: {count}</div>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  return (
    <div>
      <button onClick={() => setName('Jane')}>Change Name</button>
      <Child count={count} />
    </div>
  );
};

// Changing name → Parent re-renders → Child DOESN'T re-render (count prop unchanged)
```

### **Object Props (Gotcha!)**

```javascript
const Child = React.memo(({ user }) => {
  console.log('Rendering Child');
  return <div>{user.name}</div>;
});

const Parent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child user={{ name: 'John' }} /> {/* ❌ New object every render! */}
    </div>
  );
};

// Clicking button → Parent re-renders → Child re-renders (new object reference!)

// ✅ FIX 1: Move object outside
const user = { name: 'John' };

const Parent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child user={user} /> {/* ✅ Same reference */}
    </div>
  );
};

// ✅ FIX 2: useMemo
const Parent = () => {
  const [count, setCount] = useState(0);
  const user = useMemo(() => ({ name: 'John' }), []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child user={user} /> {/* ✅ Memoized */}
    </div>
  );
};
```

### **Function Props (Gotcha!)**

```javascript
const Child = React.memo(({ onClick }) => {
  console.log('Rendering Child');
  return <button onClick={onClick}>Click me</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child onClick={() => console.log('Clicked')} /> {/* ❌ New function every render! */}
    </div>
  );
};

// ✅ FIX: useCallback
const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child onClick={handleClick} /> {/* ✅ Same function reference */}
    </div>
  );
};
```

---

## 🌐 Context and Rendering

### **Context Re-renders All Consumers**

```javascript
const UserContext = createContext();

const UserProfile = () => {
  const user = useContext(UserContext);
  console.log('Rendering UserProfile');
  return <div>{user.name}</div>;
};

const UserSettings = () => {
  const user = useContext(UserContext);
  console.log('Rendering UserSettings');
  return <div>{user.email}</div>;
};

const App = () => {
  const [user, setUser] = useState({ name: 'John', email: 'john@example.com' });

  return (
    <UserContext.Provider value={user}>
      <UserProfile />
      <UserSettings />
      <button onClick={() => setUser({ ...user, name: 'Jane' })}>
        Change Name
      </button>
    </UserContext.Provider>
  );
};

// Clicking button → Both UserProfile AND UserSettings re-render
// (Even though UserSettings only uses email!)
```

### **Optimizing Context**

```javascript
// Split contexts by update frequency
const UserNameContext = createContext();
const UserEmailContext = createContext();

const UserProfile = () => {
  const name = useContext(UserNameContext);
  console.log('Rendering UserProfile');
  return <div>{name}</div>;
};

const UserSettings = () => {
  const email = useContext(UserEmailContext);
  console.log('Rendering UserSettings');
  return <div>{email}</div>;
};

const App = () => {
  const [name, setName] = useState('John');
  const [email] = useState('john@example.com');

  return (
    <UserNameContext.Provider value={name}>
      <UserEmailContext.Provider value={email}>
        <UserProfile />
        <UserSettings />
        <button onClick={() => setName('Jane')}>Change Name</button>
      </UserEmailContext.Provider>
    </UserNameContext.Provider>
  );
};

// Now changing name only re-renders UserProfile!
```

### **Context with Object Value (Gotcha!)**

```javascript
const ThemeContext = createContext();

const ThemedButton = React.memo(() => {
  const theme = useContext(ThemeContext);
  console.log('Rendering ThemedButton');
  return <button className={theme.color}>Click me</button>;
});

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <ThemeContext.Provider value={{ color: 'blue' }}> {/* ❌ New object every render! */}
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ThemedButton />
    </ThemeContext.Provider>
  );
};

// Clicking button → ThemedButton re-renders (new context value!)

// ✅ FIX: useMemo
const App = () => {
  const [count, setCount] = useState(0);
  const theme = useMemo(() => ({ color: 'blue' }), []);

  return (
    <ThemeContext.Provider value={theme}> {/* ✅ Stable reference */}
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ThemedButton />
    </ThemeContext.Provider>
  );
};
```

---

## ⚠️ Common Rendering Pitfalls

### **1. Inline Object/Array Props**

```javascript
// ❌ BAD
<Component data={{ id: 1, name: 'John' }} />
<Component items={[1, 2, 3]} />

// ✅ GOOD
const data = { id: 1, name: 'John' };
const items = [1, 2, 3];
<Component data={data} items={items} />

// Or use useMemo
const data = useMemo(() => ({ id: 1, name: 'John' }), []);
```

### **2. Inline Function Props**

```javascript
// ❌ BAD
<Component onClick={() => console.log('Clicked')} />

// ✅ GOOD
const handleClick = useCallback(() => console.log('Clicked'), []);
<Component onClick={handleClick} />
```

### **3. Creating Components Inside Components**

```javascript
// ❌ BAD: Component recreated every render
const Parent = () => {
  const Child = () => <div>Child</div>; // ❌ New component every render!

  return <Child />;
};

// ✅ GOOD: Component defined outside
const Child = () => <div>Child</div>;

const Parent = () => {
  return <Child />;
};
```

### **4. Spreading Props Unnecessarily**

```javascript
// ❌ BAD: Passes all props, even unchanged ones
const Parent = () => {
  const [count, setCount] = useState(0);
  const props = { a: 1, b: 2, c: 3, count };

  return <Child {...props} />; // Child re-renders even if only count changed
};

// ✅ GOOD: Pass only what's needed
const Parent = () => {
  const [count, setCount] = useState(0);

  return <Child count={count} />;
};
```

### **5. State in Wrong Place**

```javascript
// ❌ BAD: State too high in tree
const App = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <Header /> {/* Re-renders when typing! */}
      <Sidebar /> {/* Re-renders when typing! */}
      <SearchInput value={inputValue} onChange={setInputValue} />
      <Footer /> {/* Re-renders when typing! */}
    </div>
  );
};

// ✅ GOOD: State closer to where it's used
const App = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <SearchSection /> {/* State lives here */}
      <Footer />
    </div>
  );
};

const SearchSection = () => {
  const [inputValue, setInputValue] = useState('');
  return <SearchInput value={inputValue} onChange={setInputValue} />;
};
```

---

## 🐛 Debugging Renders

### **1. Console Logging**

```javascript
const MyComponent = ({ prop1, prop2 }) => {
  console.log('Rendering MyComponent', { prop1, prop2 });

  return <div>Content</div>;
};
```

### **2. useEffect for Prop Changes**

```javascript
const MyComponent = ({ user, settings }) => {
  useEffect(() => {
    console.log('user changed:', user);
  }, [user]);

  useEffect(() => {
    console.log('settings changed:', settings);
  }, [settings]);

  return <div>Content</div>;
};
```

### **3. Custom Hook for Debugging**

```javascript
const useWhyDidYouUpdate = (name, props) => {
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changedProps = {};

      allKeys.forEach(key => {
        if (previousProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length > 0) {
        console.log('[why-did-you-update]', name, changedProps);
      }
    }

    previousProps.current = props;
  });
};

// Usage
const MyComponent = (props) => {
  useWhyDidYouUpdate('MyComponent', props);
  return <div>Content</div>;
};
```

### **4. React DevTools Profiler**

```javascript
// 1. Open React DevTools
// 2. Go to Profiler tab
// 3. Click Record
// 4. Interact with app
// 5. Stop recording
// 6. Analyze:
//    - Which components rendered
//    - How long each render took
//    - Why component rendered (props/state/parent)
```

### **5. Highlight Updates**

```javascript
// In React DevTools:
// Settings (gear icon) → General → "Highlight updates when components render"
//
// Now you'll see visual highlights when components re-render!
```

---

## 📝 Summary

### **Key Takeaways:**

1. ✅ **Parent re-renders → Children re-render** (by default)
2. ✅ **State/Props/Context changes trigger re-renders**
3. ✅ **Rendering ≠ DOM updates** (Virtual DOM diffing happens first)
4. ✅ **Object/Function props need memoization** (new reference = re-render)
5. ✅ **Use React.memo for expensive components**
6. ✅ **Use useMemo/useCallback for stable references**
7. ✅ **Keep state close to where it's used**

### **Optimization Strategy:**

1. **Measure** - Use React DevTools Profiler
2. **Identify** - Find unnecessary re-renders
3. **Fix** - Apply appropriate optimization
4. **Verify** - Measure improvement

### **Common Fixes:**

- 🔧 **React.memo** - Prevent re-renders when props unchanged
- 🔧 **useMemo** - Memoize expensive calculations and object props
- 🔧 **useCallback** - Memoize function props
- 🔧 **Move state down** - Keep state close to where it's used
- 🔧 **Split context** - Separate frequently-changing values
- 🔧 **Children prop** - Prevent re-renders of static children

---

# 🔄 How React Updates Work

> Understanding React's rendering mechanism, reconciliation, and update process

## 🎯 Overview

React uses a sophisticated update mechanism to efficiently update the UI when state or props change. Understanding this process helps you write better, more performant React applications.

### **Key Concepts:**
- 🌳 **Virtual DOM** - Lightweight copy of the actual DOM
- 🔄 **Reconciliation** - Process of comparing old and new Virtual DOM
- ⚡ **Batching** - Grouping multiple updates together
- 🎯 **Fiber** - React's reconciliation engine
- 📊 **Priority** - Different updates have different priorities

---

## 🌳 The Virtual DOM

### **What is the Virtual DOM?**

The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React keeps a virtual copy of the UI in memory.

```javascript
// Actual DOM (expensive to manipulate)
<div id="root">
  <h1>Hello, World!</h1>
  <p>Welcome to React</p>
</div>

// Virtual DOM (JavaScript object - cheap to manipulate)
{
  type: 'div',
  props: { id: 'root' },
  children: [
    { type: 'h1', props: {}, children: ['Hello, World!'] },
    { type: 'p', props: {}, children: ['Welcome to React'] }
  ]
}
```

### **Why Virtual DOM?**

✅ **Fast** - JavaScript objects are faster to manipulate than DOM
✅ **Efficient** - Only updates what changed
✅ **Declarative** - You describe what you want, React figures out how
✅ **Cross-platform** - Same concept works for React Native

### **How it Works:**

```
1. State/Props Change
   ↓
2. Create New Virtual DOM
   ↓
3. Compare with Old Virtual DOM (Diffing)
   ↓
4. Calculate Minimal Changes
   ↓
5. Update Real DOM (Reconciliation)
```

---

## 🔄 Reconciliation Process

### **What is Reconciliation?**

Reconciliation is the process React uses to compare the old Virtual DOM with the new one and determine what needs to change in the actual DOM.

### **The Diffing Algorithm**

React uses a heuristic O(n) algorithm based on two assumptions:

1. **Different types produce different trees**
   - If element type changes, React rebuilds the entire subtree
   
2. **Keys help identify which items changed**
   - Stable keys help React track elements across renders

### **Example: Element Type Changes**

```jsx
// Before
<div>
  <Counter />
</div>

// After (type changed from div to span)
<span>
  <Counter />
</span>

// Result: React destroys old <div> and <Counter>, creates new ones
// Counter state is LOST!
```

### **Example: Same Type, Different Props**

```jsx
// Before
<div className="before" title="old" />

// After
<div className="after" title="new" />

// Result: React keeps the same DOM node, only updates attributes
// Much more efficient!
```

### **Example: Children Reconciliation**

```jsx
// ❌ BAD: Without keys (inefficient)
<ul>
  <li>First</li>
  <li>Second</li>
</ul>

// Add item at beginning
<ul>
  <li>Zero</li>   // React thinks this was "First" (updates text)
  <li>First</li>  // React thinks this was "Second" (updates text)
  <li>Second</li> // React creates new element
</ul>
// Result: Updates all 3 elements!

// ✅ GOOD: With keys (efficient)
<ul>
  <li key="first">First</li>
  <li key="second">Second</li>
</ul>

// Add item at beginning
<ul>
  <li key="zero">Zero</li>    // React creates new element
  <li key="first">First</li>  // React recognizes and keeps
  <li key="second">Second</li> // React recognizes and keeps
</ul>
// Result: Only creates 1 new element!
```

---

## 🎬 Rendering Phases

React's rendering process has two main phases:

### **1. Render Phase** (Pure, can be paused)

**What happens:**
- Call component functions
- Execute hooks (useState, useEffect, etc.)
- Build new Virtual DOM tree
- Compare with previous tree (diffing)
- Mark what needs to change

**Characteristics:**
- ✅ Pure (no side effects)
- ✅ Can be interrupted
- ✅ Can be paused and resumed
- ✅ Can be aborted and restarted

```javascript
const MyComponent = () => {
  // RENDER PHASE: This runs during render
  const [count, setCount] = useState(0);
  
  console.log('Rendering...'); // Runs during render phase
  
  return <div>{count}</div>;
};
```

### **2. Commit Phase** (Cannot be interrupted)

**What happens:**
- Apply changes to actual DOM
- Run layout effects (useLayoutEffect)
- Run effects (useEffect)
- Update refs

**Characteristics:**
- ❌ Cannot be interrupted
- ❌ Synchronous
- ✅ Side effects allowed
- ✅ DOM mutations happen here

```javascript
const MyComponent = () => {
  const [count, setCount] = useState(0);
  
  // COMMIT PHASE: These run after DOM updates
  useLayoutEffect(() => {
    console.log('Layout effect'); // Runs synchronously after DOM updates
  });
  
  useEffect(() => {
    console.log('Effect'); // Runs asynchronously after paint
  });
  
  return <div>{count}</div>;
};
```

### **Complete Flow:**

```
User Action (e.g., button click)
   ↓
State Update Scheduled
   ↓
┌─────────────────────────────────────┐
│      RENDER PHASE (Interruptible)   │
├─────────────────────────────────────┤
│ 1. Call component function          │
│ 2. Execute hooks                    │
│ 3. Build Virtual DOM                │
│ 4. Diff with previous Virtual DOM   │
│ 5. Mark changes needed              │
└─────────────────────────────────────┘
   ↓
┌─────────────────────────────────────┐
│     COMMIT PHASE (Not interruptible) │
├─────────────────────────────────────┤
│ 1. Apply DOM changes                │
│ 2. Run useLayoutEffect              │
│ 3. Browser paints screen            │
│ 4. Run useEffect                    │
└─────────────────────────────────────┘
   ↓
UI Updated!
```

---

## 📊 State Updates

### **How setState Works**

```javascript
const [count, setCount] = useState(0);

// When you call setState:
setCount(1);

// What happens:
// 1. React schedules an update
// 2. Marks component as "needs update"
// 3. Batches with other updates (if any)
// 4. Re-renders component
// 5. Compares Virtual DOMs
// 6. Updates real DOM
```

### **State Updates are Asynchronous**

```javascript
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // ❌ Still 0! (not updated yet)

  // State updates are scheduled, not immediate
};

// ✅ Use useEffect to see updated value
useEffect(() => {
  console.log(count); // ✅ Updated value
}, [count]);
```

### **Functional Updates**

```javascript
// ❌ BAD: Using stale state
const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1); // Still uses old count!
  // Result: count increases by 1, not 2
};

// ✅ GOOD: Using functional update
const handleClick = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  // Result: count increases by 2
};
```

### **Object and Array Updates**

```javascript
// ❌ BAD: Mutating state
const [user, setUser] = useState({ name: 'John', age: 30 });

const updateAge = () => {
  user.age = 31; // ❌ Mutation!
  setUser(user); // ❌ React won't detect change (same reference)
};

// ✅ GOOD: Creating new object
const updateAge = () => {
  setUser({ ...user, age: 31 }); // ✅ New object
};

// ❌ BAD: Mutating array
const [items, setItems] = useState([1, 2, 3]);

const addItem = () => {
  items.push(4); // ❌ Mutation!
  setItems(items); // ❌ Won't trigger re-render
};

// ✅ GOOD: Creating new array
const addItem = () => {
  setItems([...items, 4]); // ✅ New array
};
```

---

## 🎯 Batching

### **What is Batching?**

Batching is when React groups multiple state updates into a single re-render for better performance.

### **Automatic Batching (React 18+)**

```javascript
// React 18: All updates are batched
const handleClick = () => {
  setCount(c => c + 1);
  setFlag(f => !f);
  setItems([...items, newItem]);

  // Only 1 re-render! (all batched together)
};

// Even in async code!
const handleAsync = async () => {
  await fetch('/api/data');

  setCount(c => c + 1);
  setFlag(f => !f);

  // Still batched! (React 18 feature)
};

// Even in timeouts!
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);

  // Still batched! (React 18 feature)
}, 1000);
```

### **Before React 18**

```javascript
// React 17: Only event handlers were batched
const handleClick = () => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // ✅ Batched (1 re-render)
};

// React 17: Async updates were NOT batched
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // ❌ Not batched (2 re-renders)
}, 1000);
```

### **Opting Out of Batching**

```javascript
import { flushSync } from 'react-dom';

const handleClick = () => {
  flushSync(() => {
    setCount(c => c + 1);
  }); // Forces immediate re-render

  flushSync(() => {
    setFlag(f => !f);
  }); // Forces another immediate re-render

  // Result: 2 re-renders (not batched)
};

// ⚠️ Use sparingly! Batching is usually better for performance
```

---

## 🔑 Keys and Reconciliation

### **Why Keys Matter**

Keys help React identify which items have changed, been added, or removed.

### **Good Keys vs Bad Keys**

```javascript
// ❌ BAD: Using index as key
{items.map((item, index) => (
  <Item key={index} {...item} />
))}
// Problems:
// - Breaks when list is reordered
// - Breaks when items are added/removed from middle
// - Can cause state bugs

// ✅ GOOD: Using unique, stable ID
{items.map(item => (
  <Item key={item.id} {...item} />
))}
// Benefits:
// - Works with reordering
// - Works with insertions/deletions
// - Preserves component state correctly

// ❌ VERY BAD: Using random values
{items.map(item => (
  <Item key={Math.random()} {...item} />
))}
// Problems:
// - New key every render
// - Component unmounts and remounts
// - State is lost
// - Terrible performance
```

### **Example: Keys Preserving State**

```javascript
const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', editing: false },
    { id: 2, text: 'Build app', editing: false },
  ]);

  // ✅ With proper keys
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
        // If todo moves position, state is preserved
      ))}
    </ul>
  );
};

// ❌ With index keys
return (
  <ul>
    {todos.map((todo, index) => (
      <TodoItem key={index} todo={todo} />
      // If todo moves position, state gets mixed up!
    ))}
  </ul>
);
```

---

## 🧵 Fiber Architecture

### **What is Fiber?**

Fiber is React's reconciliation engine (introduced in React 16). It enables:
- ⏸️ Pause work and come back to it later
- 🎯 Assign priority to different types of work
- ♻️ Reuse previously completed work
- 🗑️ Abort work if it's no longer needed

### **Fiber Node Structure**

Each element in the Virtual DOM is represented as a Fiber node:

```javascript
{
  type: 'div',              // Component type
  key: null,                // Key for reconciliation
  props: { className: 'container' },

  // Relationships
  child: fiberNode,         // First child
  sibling: fiberNode,       // Next sibling
  return: fiberNode,        // Parent

  // State
  memoizedState: {},        // Current state
  memoizedProps: {},        // Current props

  // Effects
  effectTag: 'UPDATE',      // What needs to happen

  // Work
  alternate: fiberNode,     // Previous version (for comparison)
}
```

### **Work Loop**

```javascript
// Simplified Fiber work loop
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (nextUnitOfWork) {
    // More work to do, schedule next chunk
    requestIdleCallback(workLoop);
  } else {
    // All work done, commit to DOM
    commitRoot();
  }
}

// This allows React to:
// - Break work into chunks
// - Pause if browser needs to do something
// - Resume where it left off
```

---

## ⚡ Update Priority

### **Priority Levels**

React 18 introduced different priority levels for updates:

```javascript
// 1. Immediate Priority (Sync)
// - User input (typing, clicking)
// - Needs to feel instant

// 2. User-Blocking Priority
// - Hover effects
// - Should respond quickly

// 3. Normal Priority (Default)
// - Network responses
// - Most updates

// 4. Low Priority
// - Analytics
// - Can be delayed

// 5. Idle Priority
// - Background work
// - Only when browser is idle
```

### **Transitions (React 18)**

```javascript
import { useTransition } from 'react';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // High priority: Update input immediately
    setQuery(e.target.value);

    // Low priority: Update results (can be interrupted)
    startTransition(() => {
      const filtered = filterResults(e.target.value);
      setResults(filtered);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results data={results} />
    </div>
  );
};
```

### **useDeferredValue (React 18)**

```javascript
import { useDeferredValue } from 'react';

const SearchResults = ({ query }) => {
  // Defer the query value (low priority)
  const deferredQuery = useDeferredValue(query);

  // Use deferred value for expensive operation
  const results = useMemo(() => {
    return expensiveFilter(deferredQuery);
  }, [deferredQuery]);

  return <ResultsList results={results} />;
};

// Input stays responsive while filtering happens in background
```

---

## 📝 Summary

### **Key Takeaways:**

1. ✅ **Virtual DOM** - Lightweight copy of real DOM for efficient updates
2. ✅ **Reconciliation** - Diffing algorithm to find minimal changes
3. ✅ **Two Phases** - Render (interruptible) and Commit (not interruptible)
4. ✅ **Batching** - Multiple updates grouped into one re-render
5. ✅ **Keys** - Help React track elements across renders
6. ✅ **Fiber** - Enables pausable, prioritized rendering
7. ✅ **Priorities** - Different updates have different urgency levels

### **Best Practices:**

- ✅ Use stable, unique keys (not index or random)
- ✅ Keep state updates immutable
- ✅ Use functional updates when depending on previous state
- ✅ Leverage batching (don't force synchronous updates)
- ✅ Use transitions for non-urgent updates
- ✅ Understand render vs commit phase

---

# ⚡ React Performance Optimization

> Comprehensive guide to optimizing React applications for better performance

## 🎯 Overview

Performance optimization in React is about making your application faster and more responsive. The key is to:

- 🎯 **Prevent unnecessary re-renders**
- 📦 **Reduce bundle size**
- ⚡ **Load resources efficiently**
- 🔄 **Optimize expensive computations**
- 📊 **Measure before optimizing**

### **Golden Rule:**

> **"Premature optimization is the root of all evil"** - Donald Knuth

Always measure first, then optimize what matters!

---

## 🔍 Identifying Performance Issues

### **React DevTools Profiler**

```javascript
// 1. Install React DevTools browser extension
// 2. Open DevTools → Profiler tab
// 3. Click "Record" → Interact with app → Stop
// 4. Analyze flame graph

// Look for:
// - Components that render frequently
// - Long render times
// - Unnecessary renders
```

### **Performance API**

```javascript
// Measure component render time
const MyComponent = () => {
  useEffect(() => {
    performance.mark('component-start');
    
    return () => {
      performance.mark('component-end');
      performance.measure(
        'component-render',
        'component-start',
        'component-end'
      );
      
      const measure = performance.getEntriesByName('component-render')[0];
      console.log(`Render time: ${measure.duration}ms`);
    };
  });
  
  return <div>Content</div>;
};
```

### **Why Did You Render**

```javascript
// Install: npm install @welldone-software/why-did-you-render

// whyDidYouRender.js
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

// In your component
MyComponent.whyDidYouRender = true;

// Logs why component re-rendered
```

---

## 🧊 React.memo

### **What is React.memo?**

`React.memo` is a higher-order component that memoizes the result. It only re-renders if props change.

### **Basic Usage**

```javascript
// ❌ Without memo: Re-renders every time parent renders
const ExpensiveComponent = ({ data }) => {
  console.log('Rendering ExpensiveComponent');
  return <div>{data.map(item => <Item key={item.id} {...item} />)}</div>;
};

// ✅ With memo: Only re-renders when props change
const ExpensiveComponent = React.memo(({ data }) => {
  console.log('Rendering ExpensiveComponent');
  return <div>{data.map(item => <Item key={item.id} {...item} />)}</div>;
});
```

### **Custom Comparison Function**

```javascript
const MyComponent = React.memo(
  ({ user }) => {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip render)
    // Return false if props are different (re-render)
    return prevProps.user.id === nextProps.user.id;
  }
);
```

### **When to Use React.memo**

```javascript
// ✅ GOOD: Pure component with expensive render
const DataTable = React.memo(({ data }) => {
  // Expensive rendering logic
  return <table>{/* ... */}</table>;
});

// ✅ GOOD: Component that receives same props often
const Sidebar = React.memo(({ isOpen }) => {
  return <aside>{/* ... */}</aside>;
});

// ❌ DON'T: Component that always receives new props
const Clock = React.memo(({ time }) => {
  return <div>{time}</div>; // time changes every second
});

// ❌ DON'T: Simple components (overhead not worth it)
const Button = React.memo(({ text }) => {
  return <button>{text}</button>; // Too simple
});
```

---

## 💾 useMemo Hook

### **What is useMemo?**

`useMemo` memoizes the result of an expensive calculation.

### **Basic Usage**

```javascript
// ❌ Without useMemo: Recalculates every render
const MyComponent = ({ items }) => {
  const expensiveValue = calculateExpensiveValue(items); // Runs every render!
  
  return <div>{expensiveValue}</div>;
};

// ✅ With useMemo: Only recalculates when items change
const MyComponent = ({ items }) => {
  const expensiveValue = useMemo(
    () => calculateExpensiveValue(items),
    [items] // Only recalculate when items change
  );
  
  return <div>{expensiveValue}</div>;
};
```

### **Real-World Examples**

```javascript
// Example 1: Filtering large lists
const SearchResults = ({ query, items }) => {
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);
  
  return <List items={filteredItems} />;
};

// Example 2: Sorting
const SortedList = ({ items, sortBy }) => {
  const sortedItems = useMemo(() => {
    console.log('Sorting items...');
    return [...items].sort((a, b) => {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    });
  }, [items, sortBy]);
  
  return <List items={sortedItems} />;
};

// Example 3: Complex calculations
const Dashboard = ({ data }) => {
  const statistics = useMemo(() => {
    console.log('Calculating statistics...');
    return {
      total: data.reduce((sum, item) => sum + item.value, 0),
      average: data.reduce((sum, item) => sum + item.value, 0) / data.length,
      max: Math.max(...data.map(item => item.value)),
      min: Math.min(...data.map(item => item.value)),
    };
  }, [data]);
  
  return <StatsDisplay stats={statistics} />;
};
```

### **When NOT to Use useMemo**

```javascript
// ❌ DON'T: Simple calculations
const total = useMemo(() => a + b, [a, b]); // Overhead > benefit

// ❌ DON'T: Primitive values
const doubled = useMemo(() => count * 2, [count]); // Not worth it

// ✅ DO: Expensive operations
const filtered = useMemo(() =>
  largeArray.filter(complexFilter),
  [largeArray]
);
```

---

## 🔄 useCallback Hook

### **What is useCallback?**

`useCallback` memoizes a function so it doesn't get recreated on every render.

### **Basic Usage**

```javascript
// ❌ Without useCallback: New function every render
const MyComponent = () => {
  const handleClick = () => {
    console.log('Clicked');
  }; // New function every render!

  return <ExpensiveChild onClick={handleClick} />;
  // ExpensiveChild re-renders even if memoized!
};

// ✅ With useCallback: Same function reference
const MyComponent = () => {
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Same function reference

  return <ExpensiveChild onClick={handleClick} />;
  // ExpensiveChild doesn't re-render if memoized
};
```

### **With Dependencies**

```javascript
const TodoList = ({ todos }) => {
  const [filter, setFilter] = useState('all');

  // ❌ Without useCallback
  const handleDelete = (id) => {
    deleteTodo(id, filter); // Uses filter
  };
  // New function every render, even if filter doesn't change

  // ✅ With useCallback
  const handleDelete = useCallback((id) => {
    deleteTodo(id, filter);
  }, [filter]); // Only recreate when filter changes

  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
      ))}
    </div>
  );
};
```

### **Real-World Examples**

```javascript
// Example 1: Event handlers with memoized children
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ✅ Memoized callback
  const handleSubmit = useCallback(() => {
    console.log('Submitting:', text);
  }, [text]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <MemoizedForm onSubmit={handleSubmit} />
      {/* Form doesn't re-render when count changes */}
    </div>
  );
};

// Example 2: Passing callbacks to lists
const UserList = ({ users }) => {
  const handleUserClick = useCallback((userId) => {
    console.log('User clicked:', userId);
    // Navigate or show details
  }, []); // No dependencies

  return (
    <div>
      {users.map(user => (
        <MemoizedUserCard
          key={user.id}
          user={user}
          onClick={handleUserClick}
        />
      ))}
    </div>
  );
};
```

### **useCallback vs useMemo**

```javascript
// These are equivalent:

// useCallback
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// useMemo
const memoizedCallback = useMemo(() => {
  return () => doSomething(a, b);
}, [a, b]);

// Rule of thumb:
// - useCallback: Memoize functions
// - useMemo: Memoize values
```

---

## 📦 Code Splitting

### **What is Code Splitting?**

Code splitting breaks your bundle into smaller chunks that can be loaded on demand.

### **Route-Based Splitting**

```javascript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ❌ Without code splitting: All routes loaded upfront
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

// ✅ With code splitting: Routes loaded on demand
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
```

### **Component-Based Splitting**

```javascript
import { lazy, Suspense } from 'react';

// Heavy component loaded only when needed
const HeavyChart = lazy(() => import('./components/HeavyChart'));

const Dashboard = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>

      {showChart && (
        <Suspense fallback={<Spinner />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
};
```

### **Named Exports**

```javascript
// If component uses named export
const MyComponent = lazy(() =>
  import('./MyComponent').then(module => ({
    default: module.MyComponent
  }))
);
```

---

## 🚀 Lazy Loading

### **Images**

```javascript
// Native lazy loading
const ImageGallery = ({ images }) => {
  return (
    <div>
      {images.map(img => (
        <img
          key={img.id}
          src={img.url}
          alt={img.alt}
          loading="lazy" // ✅ Browser handles lazy loading
        />
      ))}
    </div>
  );
};

// Custom lazy loading with Intersection Observer
const LazyImage = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc || 'placeholder.jpg'}
      alt={alt}
    />
  );
};
```

### **Infinite Scroll**

```javascript
const InfiniteList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const loadMore = async () => {
      setLoading(true);
      const newItems = await fetchItems(page);
      setItems(prev => [...prev, ...newItems]);
      setLoading(false);
    };

    loadMore();
  }, [page]);

  return (
    <div>
      {items.map(item => <Item key={item.id} {...item} />)}
      <div ref={loaderRef}>{loading && <Spinner />}</div>
    </div>
  );
};
```

---

## 📊 Virtualization

### **What is Virtualization?**

Virtualization renders only visible items in a long list, dramatically improving performance.

### **Using react-window**

```bash
npm install react-window
```

```javascript
import { FixedSizeList } from 'react-window';

// ❌ Without virtualization: Renders 10,000 items
const HugeList = ({ items }) => {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

// ✅ With virtualization: Renders only visible items
const VirtualizedList = ({ items }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
};
```

### **Variable Size Lists**

```javascript
import { VariableSizeList } from 'react-window';

const VariableList = ({ items }) => {
  const getItemSize = (index) => {
    // Return different heights based on content
    return items[index].isExpanded ? 200 : 50;
  };

  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].content}
    </div>
  );

  return (
    <VariableSizeList
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </VariableSizeList>
  );
};
```

---

## ⏱️ Debouncing and Throttling

### **Debouncing**

Delays execution until after a pause in events.

```javascript
// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Usage: Search input
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // API call only after user stops typing for 500ms
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
};
```

### **Throttling**

Limits execution to once per time period.

```javascript
// Custom throttle hook
const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    const now = Date.now();

    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    }
  }, [callback, delay]);
};

// Usage: Scroll handler
const ScrollComponent = () => {
  const handleScroll = useThrottle(() => {
    console.log('Scroll position:', window.scrollY);
    // Expensive operation
  }, 200); // Max once per 200ms

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return <div>Scroll me!</div>;
};
```

---

## 🖼️ Image Optimization

### **Responsive Images**

```javascript
const ResponsiveImage = ({ src, alt }) => {
  return (
    <picture>
      <source
        media="(min-width: 1200px)"
        srcSet={`${src}-large.webp`}
        type="image/webp"
      />
      <source
        media="(min-width: 768px)"
        srcSet={`${src}-medium.webp`}
        type="image/webp"
      />
      <source
        srcSet={`${src}-small.webp`}
        type="image/webp"
      />
      <img src={`${src}.jpg`} alt={alt} loading="lazy" />
    </picture>
  );
};
```

### **Progressive Image Loading**

```javascript
const ProgressiveImage = ({ placeholder, src, alt }) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoading(false);
    };
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      style={{
        filter: imageLoading ? 'blur(10px)' : 'none',
        transition: 'filter 0.3s',
      }}
    />
  );
};
```

---

## 📦 Bundle Size Optimization

### **Analyze Bundle**

```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# For Vite
npm install --save-dev rollup-plugin-visualizer
```

```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
};
```

### **Tree Shaking**

```javascript
// ❌ BAD: Imports entire library
import _ from 'lodash';
const result = _.debounce(fn, 300);

// ✅ GOOD: Imports only what's needed
import debounce from 'lodash/debounce';
const result = debounce(fn, 300);

// ❌ BAD: Imports all icons
import * as Icons from 'react-icons/fa';

// ✅ GOOD: Imports specific icons
import { FaHome, FaUser } from 'react-icons/fa';
```

### **Dynamic Imports**

```javascript
// Load library only when needed
const handleExport = async () => {
  const { exportToPDF } = await import('./exportUtils');
  exportToPDF(data);
};

// Load heavy component conditionally
const AdminPanel = lazy(() => {
  if (user.isAdmin) {
    return import('./AdminPanel');
  }
  return Promise.resolve({ default: () => null });
});
```

---

## 📝 Summary

### **Performance Checklist:**

- ✅ **Measure first** - Use React DevTools Profiler
- ✅ **Prevent re-renders** - React.memo, useMemo, useCallback
- ✅ **Split code** - Route-based and component-based splitting
- ✅ **Lazy load** - Images, components, routes
- ✅ **Virtualize lists** - Use react-window for long lists
- ✅ **Debounce/Throttle** - Limit expensive operations
- ✅ **Optimize images** - Lazy loading, responsive images, WebP
- ✅ **Reduce bundle** - Tree shaking, dynamic imports
- ✅ **Use production build** - Always test with production build

### **Common Mistakes:**

- ❌ Optimizing too early
- ❌ Using memo/useMemo/useCallback everywhere
- ❌ Not measuring impact
- ❌ Ignoring bundle size
- ❌ Not using production build for testing

### **When to Optimize:**

1. **Measure** - Identify actual bottlenecks
2. **Prioritize** - Fix biggest issues first
3. **Optimize** - Apply appropriate technique
4. **Verify** - Measure improvement
5. **Repeat** - Continue for next bottleneck

---

---

## �📚 Additional Resources

### Official Documentation
- [React Docs](https://react.dev/) - Official React documentation
- [Vite Guide](https://vitejs.dev/guide/) - Vite build tool
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Router](https://reactrouter.com/) - Client-side routing

### Learning Resources
- [React Beta Docs](https://react.dev/learn) - Modern React tutorial
- [JavaScript.info](https://javascript.info/) - Modern JavaScript
- [MDN Web Docs](https://developer.mozilla.org/) - Web standards
- [React Patterns](https://reactpatterns.com/) - Common React patterns
- [Awesome React](https://github.com/enaqx/awesome-react) - Curated list of React resources

---
