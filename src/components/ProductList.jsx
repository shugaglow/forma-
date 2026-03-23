import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart, onRemoveFromCart }) {
    return (
        <div className="flex gap-4 grid grid-cols-3 px-48 py-10 justify-center">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    onAddToCart={onAddToCart}
                    onRemoveFromCart={onRemoveFromCart}
                />
            ))}
        </div>
    );
}

export default ProductList;