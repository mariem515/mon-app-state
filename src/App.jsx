import { useTheme } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';

export default function App() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <main
      style={{
        boxSizing: 'border-box',
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: isDark ? '#111827' : '#f8fafc',
        color: isDark ? '#f8fafc' : '#111827',
      }}
    >
      <Navbar />
      <ProductList />
      <Cart />
    </main>
  );
}