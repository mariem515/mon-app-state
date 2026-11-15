import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const totalCount = useSelector((state) => state.cart.totalCount);

  return (
    <header>
      <h1 style={{ color: 'inherit' }}>TechStore</h1>

      <button type="button" onClick={toggleTheme}>
        {theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
      </button>

      <p>Panier : <strong>{totalCount}</strong></p>
    </header>
  );
}