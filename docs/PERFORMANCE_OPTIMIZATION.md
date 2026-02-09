# ⚡ React Performance Optimization

> Comprehensive guide to optimizing React applications for better performance

---

## 📚 Table of Contents

- [Overview](#-overview)
- [Identifying Performance Issues](#-identifying-performance-issues)
- [React.memo](#-reactmemo)
- [useMemo Hook](#-usememo-hook)
- [useCallback Hook](#-usecallback-hook)
- [Code Splitting](#-code-splitting)
- [Lazy Loading](#-lazy-loading)
- [Virtualization](#-virtualization)
- [Debouncing and Throttling](#-debouncing-and-throttling)
- [Image Optimization](#-image-optimization)
- [Bundle Size Optimization](#-bundle-size-optimization)

---

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

## 🔗 Related Topics

- [How React Updates Work](./HOW_REACT_UPDATES.md)
- [Rendering Behavior](./RENDERING_BEHAVIOR.md)
- [Main README](../README.md)

---

**📚 Additional Resources:**

- [React Performance Docs](https://react.dev/learn/render-and-commit)
- [Web.dev Performance](https://web.dev/performance/)
- [React Window](https://react-window.vercel.app/)
- [Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

---

*Last Updated: 2026-02-09*



