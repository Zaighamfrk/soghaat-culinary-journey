import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import CartIcon from './components/CartIcon';

function App() {
  return (
    <CartProvider>
      {/* Add CartIcon to your navbar */}
      <nav>
        {/* ... existing nav items ... */}
        <CartIcon />
      </nav>
      
      {/* Your existing sections */}
      <CartDrawer />
    </CartProvider>
  );
}
