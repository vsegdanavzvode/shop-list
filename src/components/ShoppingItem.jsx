function ShoppingItem({ product, onDelete }) {
  return (
    <li className="shopping-item">
      <div>
        <h3>{product.name}</h3>
        <p>{product.price.toFixed(2)} сом</p>
      </div>

      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(product.id)}
        aria-label={`Удалить товар ${product.name}`}
      >
        Удалить
      </button>
    </li>
  );
}

export default ShoppingItem;
