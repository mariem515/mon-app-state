import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  removeItem,
  clearCart,
  applyPromoCode,
   DEFAULT_STOCK,
} from '../redux/cartSlice.js';

const formatPrice = new Intl.NumberFormat('fr-FR', {
  maximumFractionDigits: 3,
});

export default function Cart() {
  const { items, totalCount, totalPrice, discountPercent } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState('');
  const [promoSubmitted, setPromoSubmitted] = useState(false);

  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalPrice = totalPrice - discountAmount;

  function handlePromoSubmit(event) {
    event.preventDefault();
    dispatch(applyPromoCode(promoCode));
    setPromoSubmitted(true);
  }

  return (
    <section>
      <h2 style={{ color: 'inherit' }}>Mon panier</h2>

      {items.length === 0 && <p>Le panier est vide.</p>}

      {items.map((item) => (
        <article key={item.id}>
          <p>{item.name} — {item.price} DT × {item.quantity}</p>
          <button
            type="button"
            onClick={() => dispatch(removeItem(item.id))}
          >
            −
          </button>
          <button
  type="button"
  disabled={item.quantity >= (item.stock ?? DEFAULT_STOCK)}
  onClick={() => dispatch(addItem(item))}
>
  +
</button>
        </article>
      ))}

      <p>Nombre total d’articles : {totalCount}</p>
      <p>Total avant remise : <strong>{formatPrice.format(totalPrice)} DT</strong></p>

      {items.length > 0 && (
        <>
          <form onSubmit={handlePromoSubmit}>
            <label htmlFor="promo-code">Code promo</label>{' '}
            <input
              id="promo-code"
              value={promoCode}
              onChange={(event) => {
                setPromoCode(event.target.value);
                setPromoSubmitted(false);
              }}
              placeholder="POLY2027"
              required
            />{' '}
            <button type="submit">Appliquer le code</button>
          </form>

          {promoSubmitted && discountPercent === 0 && (
            <p>Code promo invalide.</p>
          )}

          {discountPercent > 0 && (
            <>
              <p>Réduction de {discountPercent} % : {formatPrice.format(discountAmount)} DT</p>
              <p style={{ color: '#16a34a' }}>
                <strong>Prix remisé : {formatPrice.format(finalPrice)} DT</strong>
              </p>
            </>
          )}

          <button
            type="button"
            onClick={() => {
              dispatch(clearCart());
              setPromoCode('');
              setPromoSubmitted(false);
            }}
          >
            Vider
          </button>
        </>
      )}
    </section>
  );
}