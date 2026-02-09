# 🎨 React Rendering Behavior

> Understanding when and why React components re-render

---

## 📚 Table of Contents

- [Overview](#-overview)
- [What Triggers a Render](#-what-triggers-a-render)
- [Render vs Commit](#-render-vs-commit)
- [Parent-Child Rendering](#-parent-child-rendering)
- [Props and Rendering](#-props-and-rendering)
- [Context and Rendering](#-context-and-rendering)
- [Common Rendering Pitfalls](#-common-rendering-pitfalls)
- [Debugging Renders](#-debugging-renders)

---

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

## 🔗 Related Topics

- [How React Updates Work](./HOW_REACT_UPDATES.md)
- [Performance Optimization](./PERFORMANCE_OPTIMIZATION.md)
- [Main README](../README.md)

---

**📚 Additional Resources:**

- [React Rendering Behavior](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Before You memo()](https://overreacted.io/before-you-memo/)

---

*Last Updated: 2026-02-09*



