# 🔄 How React Updates Work

> Understanding React's rendering mechanism, reconciliation, and update process

---

## 📚 Table of Contents

- [Overview](#-overview)
- [The Virtual DOM](#-the-virtual-dom)
- [Reconciliation Process](#-reconciliation-process)
- [Rendering Phases](#-rendering-phases)
- [State Updates](#-state-updates)
- [Batching](#-batching)
- [Keys and Reconciliation](#-keys-and-reconciliation)
- [Fiber Architecture](#-fiber-architecture)
- [Update Priority](#-update-priority)

---

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

## 🔗 Related Topics

- [Performance Optimization](./PERFORMANCE_OPTIMIZATION.md)
- [Rendering Behavior](./RENDERING_BEHAVIOR.md)
- [Main README](../README.md)

---

**📚 Additional Resources:**

- [React Reconciliation Docs](https://react.dev/learn/preserving-and-resetting-state)
- [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
- [React 18 Working Group](https://github.com/reactwg/react-18)

---

*Last Updated: 2026-02-09*
