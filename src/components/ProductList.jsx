import { useDispatch, useSelector } from 'react-redux';
import { addItem, DEFAULT_STOCK } from '../redux/cartSlice.js';

const products = [
  { id: 1, name: 'Écran UltraWide 4K', price: 850, stock: DEFAULT_STOCK },
  { id: 2, name: 'Clavier mécanique RGB', price: 180, stock: DEFAULT_STOCK },
  { id: 3, name: 'Souris sans fil', price: 95, stock: DEFAULT_STOCK },
  { id: 4, name: 'Casque audio ANC', price: 320, stock: DEFAULT_STOCK },
];

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => {
    const item = state.cart.items.find((item) => item.id === product.id);
    return item?.quantity ?? 0;
  });
  const outOfStock = quantity >= product.stock;

  return (
    <article>
      <p>{product.name} — {product.price} DT</p>
      <button
        type="button"
        disabled={outOfStock}
        onClick={() => dispatch(addItem(product))}
      >
        {outOfStock ? 'Rupture de stock' : 'Ajouter'}
      </button>
    </article>
  );
}

export default function ProductList() {
  return (
    <section>
      <h2 style={{ color: 'inherit' }}>Catalogue produits</h2>

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}