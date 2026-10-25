import { useState } from 'react';
import ShoppingItem from './components/ShoppingItem.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [error, setError] = useState('');

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  function addProduct(event) {
    event.preventDefault();

    const name = productName.trim();
    const price = Number(productPrice);

    if (name === '' || !Number.isFinite(price) || price <= 0) {
      setError('Введите название товара и цену больше нуля.');
      return;
    }

    const newProduct = {
      id: crypto.randomUUID(),
      name,
      price
    };

    setProducts((currentProducts) => [...currentProducts, newProduct]);
    setProductName('');
    setProductPrice('');
    setError('');
  }

  function deleteProduct(productId) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId)
    );
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>Список покупок</h1>
      </header>

      <section className="shopping-card">
        <form className="product-form" onSubmit={addProduct}>
          <label>
            <span>Название товара</span>
            <input
              type="text"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              placeholder="Например, хлеб"
              maxLength="60"
              autoFocus
            />
          </label>

          <label>
            <span>Цена, сом</span>
            <input
              type="number"
              value={productPrice}
              onChange={(event) => setProductPrice(event.target.value)}
              placeholder="0.00"
              min="0.01"
              step="0.01"
            />
          </label>

          <button className="add-button" type="submit">
            Добавить товар
          </button>
        </form>

        <p className="error-message" aria-live="polite">
          {error}
        </p>

        <div className="list-heading">
          <h2>Покупки</h2>
          <span>{products.length} шт.</span>
        </div>

        {products.length === 0 ? (
          <p className="empty-state">Список покупок пока пуст.</p>
        ) : (
          <ul className="shopping-list">
            {products.map((product) => (
              <ShoppingItem
                key={product.id}
                product={product}
                onDelete={deleteProduct}
              />
            ))}
          </ul>
        )}

        <footer className="total">
          <span>Общая стоимость</span>
          <strong>{totalPrice.toFixed(2)} сом</strong>
        </footer>
      </section>
    </main>
  );
}

export default App;
